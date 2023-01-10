import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {SVG_NAME} from 'assets/path';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {statusTransfer} from 'utils/appUtils';
import {COLOR, DEFAULT_AVATAR_IMAGE} from 'utils/AppConst';
import LinearGradient from 'react-native-linear-gradient';

//Components
import AppText from 'components/AppText';
import AppImage from 'components/AppImage';

//hooks
import useTranslate from 'hooks/useTranslate';
import {useStatusColor} from 'hooks/useStatusColor';

const SummaryDriverInfo = ({
  avatarUrl,
  nameUser,
  ratingUser,
  statusUser,
  createdAt,
  updatedAt,
  widthContainer = '96',
}) => {
  const {t} = useTranslate();

  //Filter color follow account status
  const colorStatusPoint = useStatusColor(statusUser).colorPointStatus;
  const pointStatusColor = useMemo(() => {
    return [styles.pointStatusIntro(colorStatusPoint)];
  }, [colorStatusPoint]);

  return (
    <View style={styles.container}>
      <AppImage
        source={{uri: avatarUrl || DEFAULT_AVATAR_IMAGE}}
        style={[
          styles.imageAvatar,
          {width: widthContainer - 4, height: widthContainer - 4},
        ]}
      />
      <AppText
        style={[
          STYLE_GLOBAL.subTitle2,
          STYLE_GLOBAL.weight700,
          STYLE_GLOBAL.color_textContent,
          {marginTop: 8},
        ]}>
        {nameUser || 'User Name'}
      </AppText>

      <View style={[STYLE_GLOBAL.containerCenter, styles.containerStatusPoint]}>
        <View style={[STYLE_GLOBAL.containerCenter]}>
          <View style={pointStatusColor} />
          <AppText style={styles.pointStatusText}>
            {t(`${statusTransfer(statusUser).nameStatus}`)}
          </AppText>
        </View>

        <View style={styles.separateStatusPoint} />
        <View style={[STYLE_GLOBAL.containerCenter]}>
          {!ratingUser ? (
            <AppText style={styles.pointStatusText}>
              {t('common:noInformation')}
            </AppText>
          ) : (
            <View style={[STYLE_GLOBAL.containerCenter]}>
              <SVG_NAME.STAR />
              <AppText style={styles.pointStatusText}>{ratingUser}</AppText>
            </View>
          )}
          <TouchableOpacity onPress={() => {}}>
            <SVG_NAME.INFO style={{marginLeft: 5}} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rankMarkContainer}>
        <View style={styles.rankContainer}>
          <SVG_NAME.RANK_START />
          <AppText
            style={[
              STYLE_GLOBAL.body2,
              STYLE_GLOBAL.color_secondary,
              {marginLeft: 5},
            ]}>
            Platinum
          </AppText>
        </View>
        <LinearGradient
          style={styles.markContainer}
          colors={COLOR.MARK_LINEAR_GRADIENT}>
          <AppText style={[STYLE_GLOBAL.body2, STYLE_GLOBAL.color_secondary]}>
            10000 điểm
          </AppText>
        </LinearGradient>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 4}}>
        <AppText style={styles.textTitleIntro}>
          {t('common:textContent.createdAt')}
        </AppText>
        <AppText style={styles.textContentIntro}>
          {createdAt || 'mm/yyyy'}
        </AppText>
      </View>
      <View style={{flexDirection: 'row'}}>
        <AppText style={styles.textTitleIntro}>
          {t('common:textContent.updatedAt')}
        </AppText>
        <AppText style={styles.textContentIntro}>
          {updatedAt || 'dd/mm/yyyy'}
        </AppText>
      </View>
    </View>
  );
};

export default React.memo(SummaryDriverInfo);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointStatusIntro: color => ({
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: color,
    marginRight: 8,
  }),
  containerStatusPoint: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '85%',
  },
  separateStatusPoint: {
    marginHorizontal: 10,
    borderRightWidth: 1,
    borderColor: COLOR.COLOR_BORDER,
    height: 16,
  },
  textTitleIntro: [
    STYLE_GLOBAL.caption,
    STYLE_GLOBAL.color_textTitleIntro,
    {marginRight: 8},
  ],
  textContentIntro: [STYLE_GLOBAL.caption, STYLE_GLOBAL.color_textContent],
  pointStatusText: [STYLE_GLOBAL.body2, STYLE_GLOBAL.color_textContent],
  rankMarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  rankContainer: {
    backgroundColor: COLOR.BLUE_DARK2,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  markContainer: {
    backgroundColor: 'red',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  imageAvatar: {
    width: 148,
    height: 148,
    resizeMode: 'contain',
    borderRadius: 76,
  },
});
