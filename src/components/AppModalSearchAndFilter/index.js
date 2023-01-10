import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AppView from 'components/AppView';
import useTranslate from 'hooks/useTranslate';
import { SVG_NAME } from 'assets/path';
import { COLOR } from 'utils/AppConst';
import AppModal from 'components/Modal/AppModal';
import AppText from 'components/AppText';
import AppPickerInput from 'components/AppPickerInput';
import { getSize } from 'utils/responsive';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppDatePicker from 'components/AppDatePicker';
import AppTextInput from 'components/AppTextInput';
import { getDateFuture } from 'utils/AppConst';
import { datePostToApi, dateSelect } from 'utils/appUtils';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const ModalSearchAndFilter = ({
  showModalSearch,
  setshowModalSearch,
  getDataSearchAndFilter,
  searchAndFilter,
  setSearchAndFilter,
  defaultSearchAndFilter,
}) => {
  const { t } = useTranslate();
  const dataStatus = [
    {
      title: 'Chưa nhận lệnh',
      keyWord: ['journey_assignment_wait_accept'],
    },
    {
      title: 'Đã nhận lệnh',
      keyWord: ['journey_assignment_accepted'],
    },
    {
      title: 'Từ chối',
      keyWord: ['journey_assignment_reject'],
    },
    {
      title: 'Tất cả',
      keyWord: [
        'journey_assignment_wait_accept',
        'journey_assignment_reject',
        'journey_assignment_accepted'
      ],
    },
  ];
  const widthWindow = Dimensions.get('window').width;
  const heightWindow = Dimensions.get('window').height;
  const [bodyData, setBodyData] = useState();
  // const [openModalDate, setOpenModalDate] = useState(false);
  const [showModalSelectStatus, setShowModalSelectStatus] = useState(false);

  // const [startDate, setStartDate] = useState(undefined);
  // const [endDate, setEndDate] = useState(undefined);

  // console.log('body data', bodyData);
  // console.log('start', bodyData?.startDate);
  // console.log('end', bodyData?.endDate);

  const [dateVisible, setDateVisibleState] = useState(0); // 0-hide , 1-start date, 2-end date
  const dateVisibleRef = useRef(0);
  const setDateVisible = val => {
    dateVisibleRef.current = val;
    setDateVisibleState(val);
  };
  const [calendarDate, setCalendarDate] = useState(new Date());
  // console.log('body data', bodyData);
  // console.log('default value', defaultSearchAndFilter);
  return (
    <AppModal
      iconClose={<SVG_NAME.ICON_CLOSE />}
      setShowAppModal={setshowModalSearch}
      showAppModal={showModalSearch}>
      <AppView marginHorizontal={12}>
        <AppView height={heightWindow * 0.5}>
          <AppView
            rowAlignCenter
            paddingBottom={5}
            borderBottomWidth={1}
            borderColor={'#DFE0E2'}>
            <AppView>
              <AppText
                style={{
                  ...STYLE_GLOBAL.subTitle1,
                  ...STYLE_GLOBAL.weight600,
                  color: COLOR.TEXT_CONTENT,
                }}>
                Tìm kiếm chuyến xe tiếp theo
              </AppText>
            </AppView>
          </AppView>

          <AppView marginVertical={16}>
            <AppTextInput
              returnKeyType={'search'}
              containerStyle={styles.containerTextInput}
              placeholder="Tìm kiếm theo mã số, mã cung đường, biển số xe"
              placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
              value={bodyData?.keyWordSearch}
              iconLeft={
                <TouchableOpacity>
                  <SVG_NAME.SEARCH />
                </TouchableOpacity>
              }
              onChangeText={e => {
                setBodyData(prev => ({
                  ...prev,
                  keyWordSearch: e,
                }));
              }}
            />
            <AppView marginTop={15} marginBottom={10}>
              <AppText
                style={{ ...STYLE_GLOBAL.body1, ...STYLE_GLOBAL.weight600 }}>
                Thời gian
              </AppText>
            </AppView>

            <AppView rowAlignCenter space={'between'}>
              <TouchableOpacity
                onPress={() => setDateVisible(1)}
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderColor: '#CACBCE',
                  borderRadius: 5,
                  backgroundColor: '#F3F5F6',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppView rowAlignCenter space={'evenly'}>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                      color: COLOR.COLOR_TEXT_INPUT,
                    }}>
                    Từ {''}{' '}
                    {bodyData?.startDate
                      ? moment(bodyData?.startDate)
                        .subtract(7, 'hours')
                        .format('DD/MM/YYYY')
                      : 'dd/mm/yyyy'}
                  </AppText>
                  <SVG_NAME.CALENDAR style={{ marginLeft: 5 }} />
                </AppView>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDateVisible(2)}
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderColor: '#CACBCE',
                  borderRadius: 5,
                  backgroundColor: '#F3F5F6',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppView rowAlignCenter space={'evenly'}>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                      color: COLOR.COLOR_TEXT_INPUT,
                    }}>
                    Đến {''}
                    {bodyData?.endDate
                      ? moment(bodyData?.endDate)
                        .subtract(7, 'hours')
                        .format('DD/MM/YYYY')
                      : 'dd/mm/yyyy'}
                  </AppText>
                  <SVG_NAME.CALENDAR style={{ marginLeft: 5 }} />
                </AppView>
              </TouchableOpacity>
            </AppView>

            <AppView marginTop={15} marginBottom={10}>
              <AppText
                style={{ ...STYLE_GLOBAL.body1, ...STYLE_GLOBAL.weight600 }}>
                Trạng thái
              </AppText>
              <AppPickerInput
                isSelectOne
                selectedName={bodyData?.assignmentStatusName}
                style={{ marginTop: getSize.m(8) }}
                placeholder="Chọn trạng thái"
                onPressIcon={() => {
                  setShowModalSelectStatus(true);
                }}
              />
            </AppView>
          </AppView>
        </AppView>
        <AppConfirmButton
          titleCancel="Thiết lập lại"
          titleConfirm="Áp dụng"
          style={styles.buttonConfirm}
          title={t('common:button.confirm')}
          onPressCancel={() => {
            setBodyData();
          }}
          onPressConfirm={() => {
            getDataSearchAndFilter(bodyData);
            setshowModalSearch(false);
          }}
        />
      </AppView>

      <DatePicker
        modal
        maximumDate={dateVisible === 1 ? getDateFuture(0) : null}
        minimumDate={dateVisible === 2 ? bodyData?.startDate : null}
        mode="datetime"
        locale="vi"
        open={dateVisibleRef.current > 0}
        date={calendarDate}
        onDateChange={setCalendarDate}
        onConfirm={date => {
          let state = dateVisibleRef.current;
          setDateVisible(0);
          if (state == 1)
            setBodyData(prev => ({
              ...prev,
              startDate: moment(date).add(7, 'hours'),
            }));
          else if (state == 2)
            setBodyData(prev => ({
              ...prev,
              endDate: moment(date).add(7, 'hours'),
            }));
        }}
        onCancel={() => {
          setDateVisible(0);
        }}
      />

      <AppModal
        maxHeight={'70%'}
        titleModal="Trạng thái"
        dataModal={dataStatus}
        isSelectOne={true}
        setShowAppModal={setShowModalSelectStatus}
        showAppModal={showModalSelectStatus}
        onPressDataModal={item => {
          console.log("111", item)
          setBodyData(prev => ({
            ...prev,
            assignmentStatusName: item.title,
            assignmentStatusId: item.keyWord,
          }));
          setShowModalSelectStatus(false);
        }}
      />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  containerTextInput: {
    borderWidth: 1,
    borderColor: COLOR.COLOR_BORDER_TEXT_INPUT,
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    flex: 1,
  },
  viewSearch: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ModalSearchAndFilter;
