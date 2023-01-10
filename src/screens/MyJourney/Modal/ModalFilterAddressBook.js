import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';

import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import AppModal from 'components/Modal/AppModal';
import {getListProvince} from 'appRedux/actions/addressActions';
import {useActions} from 'hooks/useActions';
import STYLE_GLOBAL from 'utils/StyleGlobal';

const ModalFilterAddressBook = ({showModal, setShowModal, onFilter}) => {
  const [showModalSelectCity, setShowModalSelectCity] = useState(false);
  const {t} = useTranslate();
  const refTimeOut = useRef(null);
  // const listCity = useSelectorShallow(getListProvinceSelector);
  const actions = useActions({getListProvince});
  // const handleGetListCity = useCallback(() => {
  //   if (listCity && listCity.length > 0) {
  //     setShowModalSelectCity(true);
  //     return;
  //   }
  //   actions.getListProvince();
  //   refTimeOut.current = setTimeout(() => {
  //     setShowModalSelectCity(true);
  //   }, 50);
  // }, [actions, listCity]);
  useEffect(() => {
    return () => {
      setShowModalSelectCity(false);
      clearTimeout(refTimeOut.current);
    };
  }, []);

  return (
    <AppModal
      iconClose={<SVG_NAME.ICON_CLOSE />}
      titleModal={t('common:modalbox.filter')}
      setShowAppModal={setShowModal}
      showAppModal={showModal}>
      <AppView paddingLeft={24}>
        <TouchableOpacity onPress={() => {}}>
          <AppView rowAlignCenter paddingTop={24}>
            <SVG_NAME.ICON_NOT_RECEIVE />
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                color: COLOR.TEXT_CONTENT,
                marginLeft: 24,
              }}>
              Chưa nhận lệnh
            </AppText>
          </AppView>
        </TouchableOpacity>
        <TouchableOpacity>
          <AppView rowAlignCenter paddingTop={24}>
            <SVG_NAME.ICON_DENY_FILTER />
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                color: COLOR.TEXT_CONTENT,
                marginLeft: 24,
              }}>
              Từ chối
            </AppText>
          </AppView>
        </TouchableOpacity>
        <TouchableOpacity>
          <AppView rowAlignCenter paddingTop={24}>
            <SVG_NAME.ICON_ALL_FILTER />
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                color: COLOR.TEXT_CONTENT,
                marginLeft: 24,
              }}>
              Tất cả
            </AppText>
          </AppView>
        </TouchableOpacity>
      </AppView>
    </AppModal>
  );
};

export default ModalFilterAddressBook;
