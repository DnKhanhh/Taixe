import {useState, useMemo} from 'react';
import {statusTransfer, statusGpsTransfer} from 'utils/appUtils';
import {COLOR, ACCOUNT_STATUS} from 'utils/AppConst';

const useStatusColor = status => {
  const [colorTextStatus, setColorTextStatus] = useState(
    COLOR.STATUS_DEFAULT_TEXT,
  );
  const [colorBackgroundStatus, setColorBackgroundStatus] = useState(
    COLOR.STATUS_DEFAULT_BACKGROUND,
  );
  const [colorPointStatus, setColorPointStatus] = useState(
    COLOR.STATUS_DEFAULT_POINT,
  );
  const [colorBorderStatus, setColorBorderStatus] = useState(
    COLOR.STATUS_DEFAULT_BORDER,
  );
  useMemo(() => {
    const statusName = statusTransfer(status).changeNameStatus;
    switch (statusName) {
      case ACCOUNT_STATUS.WORKING:
        setColorTextStatus(COLOR.STATUS_SUCCESS_TEXT);
        setColorBackgroundStatus(COLOR.STATUS_SUCCESS_BACKGROUND);
        setColorPointStatus(COLOR.STATUS_SUCCESS_POINT);
        setColorBorderStatus(COLOR.STATUS_SUCCESS_BORDER);
        break;
      case ACCOUNT_STATUS.STOP_WORKING:
      case ACCOUNT_STATUS.CLOSED:
        setColorTextStatus(COLOR.STATUS_CLOSE_TEXT);
        setColorBackgroundStatus(COLOR.STATUS_CLOSE_BACKGROUND);
        setColorPointStatus(COLOR.STATUS_CLOSE_POINT);
        setColorBorderStatus(COLOR.STATUS_CLOSE_BORDER);
        break;
      case ACCOUNT_STATUS.PENDING_APPROVAL:
        setColorTextStatus(COLOR.STATUS_WAITING_TEXT);
        setColorBackgroundStatus(COLOR.STATUS_WAITING_BACKGROUND);
        setColorPointStatus(COLOR.STATUS_WAITING_POINT);
        setColorBorderStatus(COLOR.STATUS_WAITING_BORDER);
        break;
      case ACCOUNT_STATUS.NEED_UPDATE:
        setColorTextStatus(COLOR.STATUS_WARNING_TEXT);
        setColorBackgroundStatus(COLOR.STATUS_WARNING_BACKGROUND);
        setColorPointStatus(COLOR.STATUS_WARNING_POINT);
        setColorBorderStatus(COLOR.STATUS_WARNING_BORDER);
        break;
      case ACCOUNT_STATUS.UNFINISHED:
        setColorTextStatus(COLOR.STATUS_WARNING_TEXT);
        setColorBackgroundStatus(COLOR.STATUS_WARNING_BACKGROUND);
        setColorPointStatus(COLOR.STATUS_WARNING_POINT);
        setColorBorderStatus(COLOR.STATUS_WARNING_BORDER);
        break;
      case ACCOUNT_STATUS.DRAFT:
        setColorTextStatus(COLOR.STATUS_DEFAULT_TEXT);
        setColorBackgroundStatus(COLOR.STATUS_DEFAULT_BACKGROUND);
        setColorPointStatus(COLOR.STATUS_DEFAULT_POINT);
        setColorBorderStatus(COLOR.STATUS_DEFAULT_BORDER);
        break;
      case ACCOUNT_STATUS.LOCKED:
        setColorTextStatus(COLOR.STATUS_ERROR_TEXT);
        setColorBackgroundStatus(COLOR.STATUS_ERROR_BACKGROUND);
        setColorPointStatus(COLOR.STATUS_ERROR_POINT);
        setColorBorderStatus(COLOR.STATUS_ERROR_BORDER);
        break;
      case ACCOUNT_STATUS.PENDING_UPGRADE_REVIEW: {
        setColorTextStatus(COLOR.STATUS_WARNING_TEXT);
        setColorBackgroundStatus(COLOR.STATUS_WARNING_BACKGROUND);
        setColorPointStatus(COLOR.STATUS_WARNING_POINT);
        setColorBorderStatus(COLOR.STATUS_WARNING_BORDER);
        break;
      }
      default:
        setColorTextStatus(COLOR.STATUS_DEFAULT_TEXT);
        setColorBackgroundStatus(COLOR.STATUS_DEFAULT_BACKGROUND);
        setColorPointStatus(COLOR.STATUS_DEFAULT_POINT);
        setColorBorderStatus(COLOR.STATUS_DEFAULT_BORDER);
    }
  }, [status]);
  return {
    colorTextStatus,
    colorBackgroundStatus,
    colorPointStatus,
    colorBorderStatus,
  };
};

const useStatusGpsTextColor = status => {
  const [colorStatus, setColorStatus] = useState('');
  useMemo(() => {
    const statusName = statusGpsTransfer(status).changeNameStatus;
    switch (statusName) {
      case 'connected':
        setColorStatus('#036FE3');
        break;
      case 'unconnected':
        setColorStatus('#99afc3');
        break;
      default:
        setColorStatus('#99afc3');
    }
  }, [status]);

  return colorStatus;
};

export {useStatusGpsTextColor, useStatusColor};
