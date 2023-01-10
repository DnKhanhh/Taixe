import React from 'react';
import DatePicker from 'react-native-date-picker';
import useTranslate from 'hooks/useTranslate';

const AppDatePicker = ({
  openModalDate,
  setOpenModalDate,
  date,
  dateDefault = new Date(),
  minDate,
  maxDate,
  mode = 'date',
  ...otherProps
}) => {
  const {t, i18n} = useTranslate();
  return (
    <DatePicker
      modal
      open={openModalDate}
      maximumDate={maxDate || undefined}
      minimumDate={minDate || undefined}
      mode={mode}
      date={date || dateDefault}
      locale={i18n.language}
      confirmText={t('common:button:confirm')}
      cancelText={t('common:button:cancel')}
      title={t('common:pleaseChooseDay')}
      onCancel={() => {
        setOpenModalDate(false);
      }}
      {...otherProps}
    />
  );
};

export default React.memo(AppDatePicker);
