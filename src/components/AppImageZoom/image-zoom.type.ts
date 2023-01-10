import { GestureResponderEvent, PanResponderGestureState, LayoutChangeEvent, ViewStyle } from 'react-native';

export interface ICenterOn {
    x: number;
    y: number;
    scale: number;
    duration: number;
}

export interface IOnMove {
    type: string;
    positionX: number;
    positionY: number;
    scale: number;
    zoomCurrentDistance: number;
}

export interface IOnClick {
    locationX: number;
    locationY: number;
    pageX: number;
    pageY: number;
}

export class ImageZoomProps {
    /**
     * Operation area width
     */
    public cropWidth: number = 100;

    /**
     * Operation area height
     */
    public cropHeight: number = 100;

    /**
     * Image width
     */
    public imageWidth: number = 100;

    /**
     * Picture height
     */
    public imageHeight: number = 100;

    /**
     * Can you move pictures with one hand
     */
    public panToMove?: boolean = true;

    /**
     * Whether multiple fingers can zoom
     */
    public pinchToZoom?: boolean = true;

    /**
     * Can double click zoom in?
     */
    public enableDoubleClickZoom?: boolean = true;

    /**
     * Click for maximum displacement
     */
    public clickDistance?: number = 10;

    /**
     * Maximum sliding threshold
     */
    public maxOverflow?: number = 100;

    /**
     * Threshold for long press (milliseconds)
     */
    public longPressTime?: number = 800;

    /**
     * Double tap timer max interval
     */
    public doubleClickInterval?: number = 175;

    /**
     * If provided this will cause the view to zoom and pan to the center point
     * Duration is optional and defaults to 300 ms.
     */
    public centerOn?: ICenterOn;

    public style?: ViewStyle = {};

    /**
     * threshold for firing swipe down function
     */
    public swipeDownThreshold?: number = 230;

    /**
     * for enabling vertical movement if user doesn't want it
     */
    public enableSwipeDown?: boolean = false;

    /**
     * for disabling focus on image center if user doesn't want it
     */
    public enableCenterFocus?: boolean = true;

    /**
     * for disabling rendering to hardware texture on Android
     */
    public useHardwareTextureAndroid?: boolean = true;

    /**
     * minimum zoom scale
     */
    public minScale?: number = 0.6;

    /**
     * maximum zoom scale
     */
    public maxScale?: number = 10;

    /**
     * Whether to enable native animation driver
     *Whether to use native code to perform animations.
     */
    public useNativeDriver?: boolean = false;

    /**
     * Click callback
     */
    public onClick?: (eventParams: IOnClick) => void = () => {
        //
    };

    /**
     * Double click callback
     */
    public onDoubleClick?: (eventParams: IOnClick) => void = () => {
        //
    };

    /**
     * long press callback
     */
    public onLongPress?: (eventParams: IOnClick) => void = () => {
        //
    };

    /**
     * The distance beyond the horizontal direction, when the parent switches pictures, you can monitor this function
     * When this function is triggered, you can do the switching operation
     */
    public horizontalOuterRangeOffset?: (offsetX: number) => void = () => {
        //
    };

    /**
     * Trigger the image you want to switch to the left, and trigger when the sliding speed to the left exceeds the threshold
     */
    public onDragLeft?: () => void = () => {
        //
    };

    /**
     * Let go but not cancel the callback for viewing the picture
     */
    public responderRelease?: (vx: number, scale: number) => void = () => {
        //
    };

    /**
     * If provided, this will be called everytime the map is moved
     */
    public onMove?: (position: IOnMove) => void = () => {
        //
    };

    /**
     * If provided, this method will be called when the onLayout event fires
     */
    public layoutChange?: (event: LayoutChangeEvent) => void = () => {
        //
    };

    /**
     * function that fires when user swipes down
     */
    public onSwipeDown?: () => void = () => {
        //
    };

    /**
     * Allows defining the onMoveShouldSetResponder behavior.
     */
    public onMoveShouldSetPanResponder?: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState
    ) => boolean;

    /**
     * Allows overriding the default onStartShouldSetPanResponder behavior.
     * By default, always becomes the responder
     */
    public onStartShouldSetPanResponder?: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState
    ) => boolean = () => true;

    /**
     * Allows overriding the default onPanResponderTerminationRequest behavior.
     * By default, doesn't terminate until the press ends
     */
    public onPanResponderTerminationRequest?: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState
    ) => boolean = () => false;
}

export class ImageZoomState {
    /**
     * center x coordinate
     */
    public centerX?: number = 0.5;
    /**
     * center y coordinate
     */
    public centerY?: number = 0.5;
}