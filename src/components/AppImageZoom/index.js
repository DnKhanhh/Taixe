
import * as React from 'react';
import { Animated, LayoutChangeEvent, PanResponder, StyleSheet, View } from 'react-native';
import styles from './styles';
import { ICenterOn, ImageZoomProps, ImageZoomState } from './image-zoom.type';

export default class AppImageZoom extends React.Component<ImageZoomProps, ImageZoomState> {
    static defaultProps = new ImageZoomProps();
    state = new ImageZoomState();

    // last/current/animation x displacement
    lastPositionX: number | null = null;
    positionX = 0;
    animatedPositionX = new Animated.Value(0);

    // last/current/animation y displacement
    lastPositionY: number | null = null;
    positionY = 0;
    animatedPositionY = new Animated.Value(0);

    // zoom size
    scale = 1;
    animatedScale = new Animated.Value(1);
    zoomLastDistance: number | null = null;
    zoomCurrentDistance = 0;

    // last time the hand was pressed
    lastTouchStartTime = 0;

    // During the sliding process, the overall horizontal cross-border offset
    horizontalWholeOuterCounter = 0;

    // During the sliding process, the offset of swipeDown
    swipeDownOffset = 0;

    // During the sliding process, the total displacement of x y
    horizontalWholeCounter = 0;
    verticalWholeCounter = 0;

    // The distance between the two hands from the center point
    centerDiffX = 0;
    centerDiffY = 0;

    // trigger the timeout of the click
    singleClickTimeout: number | undefined;

    // Calculate the timeout for long press
    longPressTimeout: number | undefined;

    // time of last click
    lastClickTime = 0;

    // position when double clicked
    doubleClickX = 0;
    doubleClickY = 0;

    // is double clicked
    isDoubleClick = false;

    // Whether it is a long press
    isLongPress = false;

    // Whether to slide left and right
    isHorizontalWrap = false;

    // image gesture processing
    imagePanResponder = PanResponder.create({
        // Request to be a responder:
        onStartShouldSetPanResponder: this.props.onStartShouldSetPanResponder,
        onPanResponderTerminationRequest: this.props.onPanResponderTerminationRequest,
        onMoveShouldSetPanResponder: this.props.onMoveShouldSetPanResponder,

        onPanResponderGrant: (evt) => {
            // Start gesture operation
            this.lastPositionX = null;
            this.lastPositionY = null;
            this.zoomLastDistance = null;
            this.horizontalWholeCounter = 0;
            this.verticalWholeCounter = 0;
            this.lastTouchStartTime = new Date().getTime();
            this.isDoubleClick = false;
            this.isLongPress = false;
            this.isHorizontalWrap = false;

            // Any gesture starts, clears the click timer
            if (this.singleClickTimeout) {
                clearTimeout(this.singleClickTimeout);
            }

            if (evt.nativeEvent.changedTouches.length > 1) {
                const centerX = (evt.nativeEvent.changedTouches[0].pageX + evt.nativeEvent.changedTouches[1].pageX) / 2;
                this.centerDiffX = centerX - this.props.cropWidth / 2;

                const centerY = (evt.nativeEvent.changedTouches[0].pageY + evt.nativeEvent.changedTouches[1].pageY) / 2;
                this.centerDiffY = centerY - this.props.cropHeight / 2;
            }

            // Calculate long press
            if (this.longPressTimeout) {
                clearTimeout(this.longPressTimeout);
            }
            const { locationX, locationY, pageX, pageY } = evt.nativeEvent;
            this.longPressTimeout = setTimeout(() => {
                this.isLongPress = true;
                if (this.props.onLongPress) {
                    this.props.onLongPress({ locationX, locationY, pageX, pageY });
                }
            }, this.props.longPressTime);

            if (evt.nativeEvent.changedTouches.length <= 1) {
                // the case of a finger
                if (new Date().getTime() - this.lastClickTime < (this.props.doubleClickInterval || 0)) {
                    // think double click is triggered
                    this.lastClickTime = 0;

                    // Because zooming may be triggered, record the coordinate position of the double-click
                    this.doubleClickX = evt.nativeEvent.changedTouches[0].pageX;
                    this.doubleClickY = evt.nativeEvent.changedTouches[0].pageY;

                    if (this.props.onDoubleClick) {
                        this.props.onDoubleClick({
                            locationX: evt.nativeEvent.changedTouches[0].locationX,
                            locationY: evt.nativeEvent.changedTouches[0].locationY,
                            pageX: this.doubleClickX,
                            pageY: this.doubleClickY,
                        });
                    }

                    // cancel long press
                    clearTimeout(this.longPressTimeout);

                    // zoom
                    this.isDoubleClick = true;

                    if (this.props.enableDoubleClickZoom) {
                        if (this.scale > 1 || this.scale < 1) {
                            // return to original position
                            this.scale = 1;

                            this.positionX = 0;
                            this.positionY = 0;
                        } else {
                            // start zooming at the displacement location
                            // scale before recording
                            // At this point this.scale must be 1
                            const beforeScale = this.scale;

                            // start zooming
                            this.scale = 2;

                            // zoom diff
                            const diffScale = this.scale - beforeScale;
                            // Find the displacement of the center of both hands from the center of the page
                            // moving position
                            this.positionX = ((this.props.cropWidth / 2 - this.doubleClickX) * diffScale) / this.scale;

                            this.positionY = ((this.props.cropHeight / 2 - this.doubleClickY) * diffScale) / this.scale;
                        }

                        this.imageDidMove('centerOn');

                        Animated.parallel([
                            Animated.timing(this.animatedScale, {
                                toValue: this.scale,
                                duration: 100,
                                useNativeDriver: !!this.props.useNativeDriver,
                            }),
                            Animated.timing(this.animatedPositionX, {
                                toValue: this.positionX,
                                duration: 100,
                                useNativeDriver: !!this.props.useNativeDriver,
                            }),
                            Animated.timing(this.animatedPositionY, {
                                toValue: this.positionY,
                                duration: 100,
                                useNativeDriver: !!this.props.useNativeDriver,
                            }),
                        ]).start();
                    }
                } else {
                    this.lastClickTime = new Date().getTime();
                }
            }
        },
        onPanResponderMove: (evt, gestureState) => {
            if (this.isDoubleClick) {
                // Sometimes double-clicking will be used as displacement, which is blocked here
                return;
            }

            if (evt.nativeEvent.changedTouches.length <= 1) {
                // x displacement
                let diffX = gestureState.dx - (this.lastPositionX || 0);
                if (this.lastPositionX === null) {
                    diffX = 0;
                }
                // y displacement
                let diffY = gestureState.dy - (this.lastPositionY || 0);
                if (this.lastPositionY === null) {
                    diffY = 0;
                }

                // Keep this displacement as the next previous displacement
                this.lastPositionX = gestureState.dx;
                this.lastPositionY = gestureState.dy;

                this.horizontalWholeCounter += diffX;
                this.verticalWholeCounter += diffY;

                if (Math.abs(this.horizontalWholeCounter) > 5 || Math.abs(this.verticalWholeCounter) > 5) {
                    // If the displacement is beyond the range of the finger, cancel the long press monitoring
                    clearTimeout(this.longPressTimeout);
                }

                if (this.props.panToMove) {
                    // Handle left and right swiping, if it is swipeDown, left and right swiping will fail
                    if (this.swipeDownOffset === 0) {
                        if (Math.abs(diffX) > Math.abs(diffY)) {
                            this.isHorizontalWrap = true;
                        }

                        // diffX > 0 means that the hand slides to the right and the image moves to the left, and vice versa
                        // horizontalWholeOuterCounter > 0 means overflow on the left, otherwise on the right, the larger the absolute value, the more overflow
                        if (this.props.imageWidth * this.scale > this.props.cropWidth) {
                            // If the image width is larger than the image box width, it can be dragged horizontally
                            // There is no overflow offset or this displacement completely retracts the offset before dragging
                            if (this.horizontalWholeOuterCounter > 0) {
                                // overflow on the right
                                if (diffX < 0) {
                                    // tighten from the right
                                    if (this.horizontalWholeOuterCounter > Math.abs(diffX)) {
                                        // offsets are not used up
                                        this.horizontalWholeOuterCounter += diffX;
                                        diffX = 0;
                                    } else {
                                        // The overflow is set to 0, the offset is subtracted from the remaining overflow, and it can be dragged
                                        diffX += this.horizontalWholeOuterCounter;
                                        this.horizontalWholeOuterCounter = 0;
                                        if (this.props.horizontalOuterRangeOffset) {
                                            this.props.horizontalOuterRangeOffset(0);
                                        }
                                    }
                                } else {
                                    // expand to the right
                                    this.horizontalWholeOuterCounter += diffX;
                                }
                            } else if (this.horizontalWholeOuterCounter < 0) {
                                // overflow on the left
                                if (diffX > 0) {
                                    // tighten from the left
                                    if (Math.abs(this.horizontalWholeOuterCounter) > diffX) {
                                        // offsets are not used up
                                        this.horizontalWholeOuterCounter += diffX;
                                        diffX = 0;
                                    } else {
                                        // The overflow is set to 0, the offset is subtracted from the remaining overflow, and it can be dragged
                                        diffX += this.horizontalWholeOuterCounter;
                                        this.horizontalWholeOuterCounter = 0;
                                        if (this.props.horizontalOuterRangeOffset) {
                                            this.props.horizontalOuterRangeOffset(0);
                                        }
                                    }
                                } else {
                                    // expand to the left
                                    this.horizontalWholeOuterCounter += diffX;
                                }
                            } else {
                                // overflow offset is 0, normal movement
                            }

                            // generate displacement
                            this.positionX += diffX / this.scale;

                            // But no black borders can appear horizontally
                            // absolute value of horizontal tolerance
                            const horizontalMax = (this.props.imageWidth * this.scale - this.props.cropWidth) / 2 / this.scale;
                            if (this.positionX < -horizontalMax) {
                                // beyond the left critical point, and continue to move to the left
                                this.positionX = -horizontalMax;

                                // Let it have a slight displacement and deviate from the track
                                this.horizontalWholeOuterCounter += -1 / 1e10;
                            } else if (this.positionX > horizontalMax) {
                                // Beyond the right critical point, continue to move to the right
                                this.positionX = horizontalMax;

                                // Let it have a slight displacement and deviate from the track
                                this.horizontalWholeOuterCounter += 1 / 1e10;
                            }
                            this.animatedPositionX.setValue(this.positionX);
                        } else {
                            // Cannot drag horizontally, all count as overflow offset
                            this.horizontalWholeOuterCounter += diffX;
                        }

                        // The overflow amount will not exceed the set limit
                        if (this.horizontalWholeOuterCounter > (this.props.maxOverflow || 0)) {
                            this.horizontalWholeOuterCounter = this.props.maxOverflow || 0;
                        } else if (this.horizontalWholeOuterCounter < -(this.props.maxOverflow || 0)) {
                            this.horizontalWholeOuterCounter = -(this.props.maxOverflow || 0);
                        }

                        if (this.horizontalWholeOuterCounter !== 0) {
                            // If the overflow offset is not 0, execute the overflow callback
                            if (this.props.horizontalOuterRangeOffset) {
                                this.props.horizontalOuterRangeOffset(this.horizontalWholeOuterCounter);
                            }
                        }
                    }

                    // If the height of the picture is greater than the height of the box, it can be elastically dragged vertically
                    if (this.props.imageHeight * this.scale > this.props.cropHeight) {
                        this.positionY += diffY / this.scale;
                        this.animatedPositionY.setValue(this.positionY);

                    } else {
                        // swipeDown is not allowed to fire when there is already a lateral offset
                        if (this.props.enableSwipeDown && !this.isHorizontalWrap) {
                            // The height of the picture is less than the height of the box, it can only be dragged down, and it must be a swipeDown action
                            this.swipeDownOffset += diffY;

                            // You can drag as long as the swipe overflow is not less than 0
                            if (this.swipeDownOffset > 0) {
                                this.positionY += diffY / this.scale;
                                this.animatedPositionY.setValue(this.positionY);

                                // The further down you go, the smaller the zoom
                                this.scale = this.scale - diffY / 1000;
                                this.animatedScale.setValue(this.scale);
                            }
                        }
                    }
                }
            } else {
                // the case of multiple fingers
                // Cancel the long press state
                if (this.longPressTimeout) {
                    clearTimeout(this.longPressTimeout);
                }

                if (this.props.pinchToZoom) {
                    // find the smallest x and largest x
                    let minX: number;
                    let maxX: number;
                    if (evt.nativeEvent.changedTouches[0].locationX > evt.nativeEvent.changedTouches[1].locationX) {
                        minX = evt.nativeEvent.changedTouches[1].pageX;
                        maxX = evt.nativeEvent.changedTouches[0].pageX;
                    } else {
                        minX = evt.nativeEvent.changedTouches[0].pageX;
                        maxX = evt.nativeEvent.changedTouches[1].pageX;
                    }

                    let minY: number;
                    let maxY: number;
                    if (evt.nativeEvent.changedTouches[0].locationY > evt.nativeEvent.changedTouches[1].locationY) {
                        minY = evt.nativeEvent.changedTouches[1].pageY;
                        maxY = evt.nativeEvent.changedTouches[0].pageY;
                    } else {
                        minY = evt.nativeEvent.changedTouches[0].pageY;
                        maxY = evt.nativeEvent.changedTouches[1].pageY;
                    }

                    const widthDistance = maxX - minX;
                    const heightDistance = maxY - minY;
                    const diagonalDistance = Math.sqrt(widthDistance * widthDistance + heightDistance * heightDistance);
                    this.zoomCurrentDistance = Number(diagonalDistance.toFixed(1));

                    if (this.zoomLastDistance !== null) {
                        const distanceDiff = (this.zoomCurrentDistance - this.zoomLastDistance) / 200;
                        let zoom = this.scale + distanceDiff;

                        if (zoom < (this.props.minScale || 0)) {
                            zoom = this.props.minScale || 0;
                        }
                        if (zoom > (this.props.maxScale || 0)) {
                            zoom = this.props.maxScale || 0;
                        }

                        // scale before recording
                        const beforeScale = this.scale;

                        // start zooming
                        this.scale = zoom;
                        this.animatedScale.setValue(this.scale);

                        // The picture should slowly move to the center of the two fingers
                        // zoom diff
                        const diffScale = this.scale - beforeScale;
                        // Find the displacement of the center of both hands from the center of the page
                        // moving position
                        this.positionX -= (this.centerDiffX * diffScale) / this.scale;
                        this.positionY -= (this.centerDiffY * diffScale) / this.scale;
                        this.animatedPositionX.setValue(this.positionX);
                        this.animatedPositionY.setValue(this.positionY);
                    }
                    this.zoomLastDistance = this.zoomCurrentDistance;
                }
            }

            this.imageDidMove('onPanResponderMove');
        },
        onPanResponderRelease: (evt, gestureState) => {
            // cancel long press
            if (this.longPressTimeout) {
                clearTimeout(this.longPressTimeout);
            }

            // Double-click to end, end the tail judgment
            if (this.isDoubleClick) {
                return;
            }

            // long press to end, end the tail judgment
            if (this.isLongPress) {
                return;
            }

            // If it is a single finger, the distance from the last press is greater than the preset seconds, and the sliding distance is less than the preset value, it may be a single click (if the gesture is not started within the subsequent double-click interval)
            // const stayTime = new Date().getTime() - this.lastTouchStartTime!
            const moveDistance = Math.sqrt(gestureState.dx * gestureState.dx + gestureState.dy * gestureState.dy);
            const { locationX, locationY, pageX, pageY } = evt.nativeEvent;

            if (evt.nativeEvent.changedTouches.length === 1 && moveDistance < (this.props.clickDistance || 0)) {
                this.singleClickTimeout = setTimeout(() => {
                    if (this.props.onClick) {
                        this.props.onClick({ locationX, locationY, pageX, pageY });
                    }
                }, this.props.doubleClickInterval);
            } else {
                // Multi-gesture ends, or swipe ends
                if (this.props.responderRelease) {
                    this.props.responderRelease(gestureState.vx, this.scale);
                }

                this.panResponderReleaseResolve();
            }
        },
        onPanResponderTerminate: () => {
            //
        },
    });

    resetScale = (): void => {
        this.positionX = 0;
        this.positionY = 0;
        this.scale = 1;
        this.animatedScale.setValue(1);
    };

    panResponderReleaseResolve = (): void => {
        // Determine if it is swipeDown
        if (this.props.enableSwipeDown && this.props.swipeDownThreshold) {
            if (this.swipeDownOffset > this.props.swipeDownThreshold) {
                if (this.props.onSwipeDown) {
                    this.props.onSwipeDown();
                }
                // Stop reset.
                return;
            }
        }

        if (this.props.enableCenterFocus && this.scale < 1) {
            // if zoom is less than 1, force reset to 1
            this.scale = 1;
            Animated.timing(this.animatedScale, {
                toValue: this.scale,
                duration: 100,
                useNativeDriver: !!this.props.useNativeDriver,
            }).start();
        }

        if (this.props.imageWidth * this.scale <= this.props.cropWidth) {
            // If the image width is smaller than the box width, the horizontal position is reset
            this.positionX = 0;
            Animated.timing(this.animatedPositionX, {
                toValue: this.positionX,
                duration: 100,
                useNativeDriver: !!this.props.useNativeDriver,
            }).start();
        }

        if (this.props.imageHeight * this.scale <= this.props.cropHeight) {
            // If the image height is less than the box height, the vertical position is reset
            this.positionY = 0;
            Animated.timing(this.animatedPositionY, {
                toValue: this.positionY,
                duration: 100,
                useNativeDriver: !!this.props.useNativeDriver,
            }).start();
        }

        // The horizontal direction will definitely not exceed the range, controlled by dragging
        // If the height of the image is greater than the height of the box, no black borders can appear vertically
        if (this.props.imageHeight * this.scale > this.props.cropHeight) {
            // absolute value of vertical tolerance
            const verticalMax = (this.props.imageHeight * this.scale - this.props.cropHeight) / 2 / this.scale;
            if (this.positionY < -verticalMax) {
                this.positionY = -verticalMax;
            } else if (this.positionY > verticalMax) {
                this.positionY = verticalMax;
            }
            Animated.timing(this.animatedPositionY, {
                toValue: this.positionY,
                duration: 100,
                useNativeDriver: !!this.props.useNativeDriver,
            }).start();
        }

        if (this.props.imageWidth * this.scale > this.props.cropWidth) {
            // absolute value of vertical tolerance
            const horizontalMax = (this.props.imageWidth * this.scale - this.props.cropWidth) / 2 / this.scale;
            if (this.positionX < -horizontalMax) {
                this.positionX = -horizontalMax;
            } else if (this.positionX > horizontalMax) {
                this.positionX = horizontalMax;
            }
            Animated.timing(this.animatedPositionX, {
                toValue: this.positionX,
                duration: 100,
                useNativeDriver: !!this.props.useNativeDriver,
            }).start();
        }

        // After the dragging ends normally, if there is no zoom, return directly to the 0,0 point
        if (this.props.enableCenterFocus && this.scale === 1) {
            this.positionX = 0;
            this.positionY = 0;
            Animated.timing(this.animatedPositionX, {
                toValue: this.positionX,
                duration: 100,
                useNativeDriver: !!this.props.useNativeDriver,
            }).start();
            Animated.timing(this.animatedPositionY, {
                toValue: this.positionY,
                duration: 100,
                useNativeDriver: !!this.props.useNativeDriver,
            }).start();
        }

        // The horizontal overflow amount is empty
        this.horizontalWholeOuterCounter = 0;

        // swipeDown overflow amount is empty
        this.swipeDownOffset = 0;

        this.imageDidMove('onPanResponderRelease');
    };

    componentDidMount(): void {
        if (this.props.centerOn) {
            this.centerOn(this.props.centerOn);
        }
    }

    componentDidUpdate(prevProps: ImageZoomProps): void {
        // Either centerOn has never been called, or it is a repeat and we should ignore it
        if (
            (this.props.centerOn && !prevProps.centerOn) ||
            (this.props.centerOn && prevProps.centerOn && this.didCenterOnChange(prevProps.centerOn, this.props.centerOn))
        ) {
            this.centerOn(this.props.centerOn);
        }
    }

    imageDidMove(type: string): void {
        if (this.props.onMove) {
            this.props.onMove({
                type,
                positionX: this.positionX,
                positionY: this.positionY,
                scale: this.scale,
                zoomCurrentDistance: this.zoomCurrentDistance,
            });
        }
    }

    didCenterOnChange(
        params: { x: number; y: number; scale: number; duration: number },
        paramsNext: { x: number; y: number; scale: number; duration: number }
    ): boolean {
        return params.x !== paramsNext.x || params.y !== paramsNext.y || params.scale !== paramsNext.scale;
    }

    centerOn(params: ICenterOn): void {
        this.positionX = params.x;
        this.positionY = params.y;
        this.scale = params.scale;
        const duration = params.duration || 300;
        Animated.parallel([
            Animated.timing(this.animatedScale, {
                toValue: this.scale,
                duration,
                useNativeDriver: !!this.props.useNativeDriver,
            }),
            Animated.timing(this.animatedPositionX, {
                toValue: this.positionX,
                duration,
                useNativeDriver: !!this.props.useNativeDriver,
            }),
            Animated.timing(this.animatedPositionY, {
                toValue: this.positionY,
                duration,
                useNativeDriver: !!this.props.useNativeDriver,
            }),
        ]).start(() => {
            this.imageDidMove('centerOn');
        });
    }

    /**
     * The image area view is rendered
     */
    handleLayout(event: LayoutChangeEvent): void {
        if (this.props.layoutChange) {
            this.props.layoutChange(event);
        }
    }

    /**
     * Reset size and position
     */
    reset(): void {
        this.scale = 1;
        this.animatedScale.setValue(this.scale);
        this.positionX = 0;
        this.animatedPositionX.setValue(this.positionX);
        this.positionY = 0;
        this.animatedPositionY.setValue(this.positionY);
    }

    render(): React.ReactNode {
        const animateConf = {
            transform: [
                {
                    scale: this.animatedScale,
                },
                {
                    translateX: this.animatedPositionX,
                },
                {
                    translateY: this.animatedPositionY,
                },
            ],
        };

        const parentStyles = StyleSheet.flatten(this.props.style);

        return (
            <View
                style={{
                    ...styles.container,
                    ...parentStyles,
                    width: this.props.cropWidth,
                    height: this.props.cropHeight,
                }}
                {...this.imagePanResponder.panHandlers}
            >
                <Animated.View style={animateConf} renderToHardwareTextureAndroid={this.props.useHardwareTextureAndroid}>
                    <View
                        onLayout={this.handleLayout.bind(this)}
                        style={{
                            width: this.props.imageWidth,
                            height: this.props.imageHeight,
                        }}
                    >
                        {this.props.children}
                    </View>
                </Animated.View>
            </View>
        );
    }
}