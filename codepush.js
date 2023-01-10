import CodePush, { SyncOptions } from 'react-native-code-push';
import React from 'react';
import { t } from 'i18next';
import { Alert, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import AppImage from 'components/AppImage';
import AppConfigs from 'utils/appConfigs';
import { formatBytes } from 'utils/appUtils';
import { getSize } from 'utils/responsive';

const { width, height } = Dimensions.get('window');
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };

const withCodePush = (WrappedComponent) => {
    class WrappedApp extends React.Component {
        constructor(props) {
            super(props);
            CodePush.disallowRestart();
            this.state = {
                isUpdate: false,
                totalBytes: 0,
                receivedBytes: 0,
                isLoad: false,
                downloading: false,
                installing: false,
                progress: null,
                syncMessage: t('common:codepush.msg_checking_new_app')
            }
        }

        componentDidMount() {
            try {
                CodePush.checkForUpdate()
                    .then((status) => {
                        if (status) {
                            const syncOption: SyncOptions = {
                                deploymentKey: Platform.OS == 'android' ? AppConfigs.CP_DEPLOYMENT_KEY.ANDROID.STAGING : AppConfigs.CP_DEPLOYMENT_KEY.IOS.STAGING,
                                installMode: CodePush.InstallMode.IMMEDIATE,
                                updateDialog: {
                                    title: t('common:codepush.title_update_new_path_version'),
                                    optionalUpdateMessage: t('common:codepush.msg_update_new_path_version', { version: AppConfigs.APP_VERSION, appSize: formatBytes(status.packageSize || 0) }),
                                    optionalIgnoreButtonLabel: t('common:codepush.btn_stay'),
                                    optionalInstallButtonLabel: t('common:codepush.btn_download'),
                                }
                            }

                            CodePush.sync(
                                syncOption,
                                this.codePushStatusDidChange,
                                this.codePushDownloadDidProgress
                            )
                        }
                        else {
                            console.log('App up to date.');
                        }
                    })
                    .catch((err) => {
                        console.log('Check update codepush error: ', err);

                    })
            } catch (error) {

            }
        }

        codePushStatusDidChange = (syncStatus) => {
            switch (syncStatus) {
                case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                    this.setState({
                        syncMessage: t('common:codepush.msg_checking_new_app')
                    });
                    break;
                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                    this.setState({
                        syncMessage: t('common:codepush.msg_downloading_path_update'),
                        downloading: true
                    });

                    break;
                case CodePush.SyncStatus.AWAITING_USER_ACTION:
                    this.setState({
                        syncMessage: t('common:codepush.msg_awaiting_user_action')
                    });
                    break;
                case CodePush.SyncStatus.INSTALLING_UPDATE:
                    this.setState({
                        syncMessage: t('common:codepush.msg_installing_path_update'),
                        installing: true
                    });
                    break;
                case CodePush.SyncStatus.UP_TO_DATE:
                    this.setState({
                        syncMessage: 'App up to date.'
                    });
                    break;
                case CodePush.SyncStatus.UPDATE_IGNORED:
                    this.setState({
                        syncMessage: 'Cập nhật được huỷ bởi người dùng.',
                        installing: false,
                        downloading: false
                    });
                    break;
                case CodePush.SyncStatus.UPDATE_INSTALLED:
                    this.setState({
                        syncMessage: t('common:codepush.msg_installed_path_update'),
                        installing: false,
                        downloading: false
                    });
                    Alert.alert(
                        t('common:codepush.msg_installed_path_update'),
                        t('common:codepush.msg_restart_app'),
                        [
                            {
                                text: t('common:codepush.btn_restart'),
                                style: 'destructive',
                                onPress: () => {
                                    CodePush.allowRestart();
                                }
                            }
                        ]);
                    break;
                case CodePush.SyncStatus.UNKNOWN_ERROR:
                    this.setState({
                        syncMessage: 'An unknown error occurred.',
                        installing: false,
                        downloading: false
                    });
                    break;
            }
        }

        codePushDownloadDidProgress = (progress) => {
            this.setState({
                progress: progress
            });
        }

        render() {
            return (
                <React.Fragment>
                    <WrappedComponent />
                    {
                        !this.state.downloading ? null : (
                            <React.Fragment>
                                <View
                                    style={{
                                        ...styles.modalContainer
                                    }}
                                >

                                    <View
                                        style={{
                                            ...styles.modalContent
                                        }}
                                    >

                                        <View
                                            style={{
                                                ...styles.modalHeader
                                            }}
                                        >
                                            <View
                                                style={{
                                                    ...styles.logoContent
                                                }}
                                            >
                                                <AppImage
                                                    source={require('assets/images/AppIcon.png')}
                                                    style={{
                                                        width: getSize.v(45),
                                                        height: getSize.v(45),
                                                        borderRadius: getSize.m(8),

                                                    }}
                                                    resizeMethod='auto'
                                                    resizeMode='contain'
                                                />
                                            </View>

                                            <View style={{ width: getSize.m(12) }} />

                                            <View style={{ flex: 1 }}>
                                                <Text
                                                    style={{
                                                        fontSize: getSize.m(17),
                                                        fontWeight: 'bold',
                                                    }}
                                                    numberOfLines={2}
                                                >
                                                    {AppConfigs.APP_NAME}
                                                </Text>

                                                <View style={{ height: getSize.m(4) }} />

                                                <Text
                                                    style={{
                                                        fontSize: getSize.m(12),
                                                        fontWeight: 'normal',
                                                        color: '#4D4F4E'
                                                    }}
                                                    numberOfLines={1}
                                                >
                                                    {AppConfigs.APP_VERSION}
                                                </Text>
                                            </View>

                                        </View>

                                        <Text
                                            style={{
                                                color: '#51B747',
                                                textAlign: 'center',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {this.state.syncMessage}
                                        </Text>

                                        <Text
                                            style={{
                                                color: '#51B747',
                                                marginTop: 12
                                            }}
                                        >
                                            {t('common:codepush.msg_process_download')}: {formatBytes(this.state.progress?.receivedBytes || 0)}/{formatBytes(this.state.progress?.totalBytes || 0)}
                                        </Text>

                                    </View>

                                </View>
                            </React.Fragment>
                        )
                    }

                </React.Fragment>
            );
        }
    }

    return CodePush(codePushOptions)(WrappedApp);
}

export { withCodePush };

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        left: 0,
        zIndex: Number.MAX_SAFE_INTEGER,
        backgroundColor: 'rgba(0, 0, 0, .4)',
    },
    modalContent: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: width - getSize.v(32),
        minHeight: getSize.v(120),
        paddingVertical: getSize.m(24),
        borderRadius: getSize.m(12),
        zIndex: 1000,
        elevation: 10,
        ...Platform.select({
            android: {
                elevation: 10,
            },
            ios: {
                shadowColor: "#e0e0e0",
                shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 1,
                shadowRadius: 4.14,
            }
        })
    },
    modalHeader: {
        width: width - getSize.m(32),
        flexDirection: 'row',
        marginBottom: getSize.m(30),
        alignItems: 'center',
        paddingHorizontal: getSize.m(12)
    },
    logoContent: {
        borderWidth: 1,
        borderColor: '#DBDCDC',
        borderRadius: getSize.m(8),
    }
});