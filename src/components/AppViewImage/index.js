import { StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import AppView from 'components/AppView';
import AppImage from 'components/AppImage';
import { COLOR, CONST_SIZE } from 'utils/AppConst';
import AppText from 'components/AppText';
import { CloseIcon } from 'native-base';
import PagerView from 'react-native-pager-view';
import _ from 'lodash';
import AppImageZoom from 'components/AppImageZoom';

const AppViewImage = ({ isOpen, onClosed, imgs, position }) => {
    const [showModal, setShowModal] = React.useState(isOpen);
    const [currentPage, setCurrentPage] = React.useState(position);
    const [data, setData] = React.useState(imgs || []);

    const onScrollEnd = React.useCallback((e) => {
        setCurrentPage(e.nativeEvent.position);
    }, []);

    React.useEffect(() => {
        if ((imgs || []).length > 0 && isOpen) {
            setShowModal(true);
        }
        else {
            setShowModal(false);
        }

        return () => { };
    }, [isOpen, imgs, position]);

    React.useEffect(() => {
        setData(imgs || []);

        return () => { };
    }, [imgs]);

    const handleCloseModal = React.useCallback(() => {
        setShowModal(false);
        onClosed?.();
    }, []);

    return (
        <Modal
            visible={showModal}
            transparent
            onRequestClose={(e) => {
                handleCloseModal();
            }}
        >

            <AppView
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }}
            >

                <AppView
                    absolute
                    width={CONST_SIZE.DEVICE_WIDTH}
                    minHeight={52}
                    top={0}
                    left={0}
                    safeAreaTop
                    zIndex={Number.MAX_VALUE}
                >
                    <AppView
                        flex={1}
                        minHeight={52}
                        center
                        alignEnd
                        paddingRight={CONST_SIZE.DEFAULT_PADDING_HORIZONTAL}
                        safeAreaRight
                    >
                        <TouchableOpacity onPress={handleCloseModal}>
                            <AppView
                                borderRadius={120}
                                backgroundColor={'rgba(200, 200, 200, 0.1)'}
                                center
                                padding={12}
                            >
                                <CloseIcon color={'white'} size={6} />
                            </AppView>
                        </TouchableOpacity>
                    </AppView>
                </AppView>

                {
                    _.isEmpty(data) ? null : (
                        <PagerView
                            style={{
                                flex: 1
                            }}
                            initialPage={position || 0}
                            onPageSelected={onScrollEnd}
                        >
                            {
                                data?.map((item, index) => {
                                    return (
                                        <AppImageZoom
                                            key={index}
                                            cropHeight={CONST_SIZE.DEVICE_HEIGHT}
                                            cropWidth={CONST_SIZE.DEVICE_WIDTH}
                                            imageWidth={CONST_SIZE.DEVICE_WIDTH}
                                            imageHeight={CONST_SIZE.DEVICE_HEIGHT}
                                            useNativeDriver={true}
                                            enableSwipeDown={false}
                                        >
                                            <AppImage
                                                url={item}
                                                style={{
                                                    width: CONST_SIZE.DEVICE_WIDTH,
                                                    height: CONST_SIZE.DEVICE_HEIGHT,
                                                    backgroundColor: 'transparent'
                                                }}
                                                resizeMode={'contain'}
                                            />
                                        </AppImageZoom>
                                    )
                                })
                            }
                        </PagerView>
                    )
                }

                <AppView
                    absolute
                    width={CONST_SIZE.DEVICE_WIDTH}
                    paddingVertical={12}
                    center
                    bottom={0}
                    left={0}
                    safeAreaBottom
                    zIndex={Number.MAX_VALUE}
                >
                    <AppView
                        borderRadius={120}
                        backgroundColor={'rgba(200, 200, 200, 0.1)'}
                        center
                        paddingHorizontal={20}
                        paddingVertical={4}
                    >
                        <AppText
                            color={COLOR.COLOR_BACKGROUND}
                            style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                            }}
                        >
                            {currentPage + 1}/{data.length}
                        </AppText>
                    </AppView>
                </AppView>
            </AppView>
        </Modal>
    )
}

export default React.memo(AppViewImage);