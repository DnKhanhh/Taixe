import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';

import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import AppModal from 'components/Modal/AppModal';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import AppTextInput from 'components/AppTextInput';
import AppCheckBox from 'components/AppCheckBox';
import {scalePortrait} from 'utils/responsive';

const reasonData = [
  {title: 'Trùng lịch vận chuyển  ', index: 0},
  {title: 'Xe hư', index: 1},
  {title: 'Khác', index: 2},
];
const assignmentStatusId = 'journey_assignment_reject';
const ModalRefuse = ({
  dataItem,
  showModal,
  setShowModal,
  handleUpdateTripAssignmentStatus,
}) => {
  const {t} = useTranslate();

  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [validateReason, setValidateReason] = useState(false);
  const [validateOtherReason, setValidateOtherReason] = useState(false);

  const ReasonItem = ({item, onPress, index}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <AppView alignCenter row marginTop={index !== 0 ? 24 : 0}>
          <AppCheckBox isChecked={reason === item.title ? true : false} />
          <AppText style={STYLE_GLOBAL.body1}>{item.title}</AppText>
        </AppView>
      </TouchableOpacity>
    );
  };

  const handelConfirmBtn = () => {
    if (!reason) {
      setValidateReason('Vui lòng chọn lý do');
      return;
    }
    // if (!otherReason) {
    //   setValidateOtherReason('Vui lòng nhập chi tiết lý do');
    //   return;
    // } else {
    //   setValidateOtherReason(false);
    // }
    handleUpdateTripAssignmentStatus(dataItem?.id, assignmentStatusId, reason);
    setShowModal();
  };

  return (
    <AppModal
      onClosed={() => {
        setReason('');
        setOtherReason('');
        setValidateReason(false);
        setValidateOtherReason(false);
      }}
      iconClose={<SVG_NAME.ICON_CLOSE />}
      setShowAppModal={setShowModal}
      titleModal={'Nhập lý do từ chối'}
      showAppModal={showModal}>
      <>
        <AppView padding={16}>
          <AppView>
            {reasonData.map(item => (
              <ReasonItem
                key={item.index}
                item={item}
                onPress={() => {
                  setReason(item.title);
                  setValidateReason(false);
                }}
                index={item.index}
              />
            ))}
            <AppView marginTop={10}>
              {validateReason ? (
                <AppView>
                  <AppText style={styles.errorMess}>{validateReason}</AppText>
                </AppView>
              ) : (
                <AppText style={styles.tempMess}>{validateReason}</AppText>
              )}
            </AppView>
          </AppView>
          <AppView marginTop={14}>
            <AppTextInput
              value={otherReason}
              error={validateOtherReason}
              onChangeText={setOtherReason}
              placeholder={t(
                'Vui lòng nhập giá mong muốn hoặc lý do khác vào đây',
              )}
              messageError={validateOtherReason}
              numberOfLines={10}
              multiline={true}
            />
            <AppView marginTop={24}>
              <AppText style={[STYLE_GLOBAL.body2, STYLE_GLOBAL.weight600]}>
                Lưu ý: Chuyến đi sẽ bị từ chối sau khi bạn chọn lý do và xác
                nhận
              </AppText>
            </AppView>
          </AppView>
        </AppView>
        <AppConfirmButton
          onPressCancel={() => {
            setShowModal(false);
            setReason('');
            setOtherReason('');
            setValidateReason(false);
            setValidateOtherReason(false);
          }}
          onPressConfirm={() => handelConfirmBtn()}
          style={{paddingBottom: 20}}
          titleConfirm={'Xác nhận'}
        />
      </>
    </AppModal>
  );
};

export default ModalRefuse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
  },
  textUnFilter: {
    ...STYLE_GLOBAL.body2,
    color: COLOR.COLOR_PRIMARY,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    paddingBottom: 0,
  },
  flex1: {
    flex: 1,
  },
  itemType: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 35,
  },
  textPlace: {
    ...STYLE_GLOBAL.body1,
    fontWeight: '600',
  },
  text: {
    ...STYLE_GLOBAL.caption,
    color: '#F07F23',
  },
  detailOrder: {
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 8,
    marginTop: 16,
  },
  popupTitle: {
    marginTop: 18.67,
    marginBottom: 16,
  },
  errorMess: {color: 'red', fontSize: scalePortrait(12) - 2},
  tempMess: {color: 'white', fontSize: scalePortrait(12) - 2},
});
