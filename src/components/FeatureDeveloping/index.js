import React from 'react';
import AppView from 'components/AppView';
import AppImage from 'components/AppImage';
import {getSize} from 'hooks/useIconSvgResizeHOC';
import AppText from 'components/AppText';
import {t} from 'i18next';
import {COLOR} from 'utils/AppConst';

const FeatureDeveloping = () => {
  return (
    <AppView flex={1} center>
      <AppImage
        source={require('assets/developing.gif')}
        style={{
          width: getSize.s(120),
          height: getSize.s(120),
        }}
      />

      <AppText
        style={{
          fontSize: getSize.m(12),
          color: COLOR.TEXT_GREY_SECONDARY,
        }}>
        {t('common:featureDeveloping')}
      </AppText>
    </AppView>
  );
};

export default React.memo(FeatureDeveloping);
