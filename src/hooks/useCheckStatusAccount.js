import {useState, useMemo} from 'react';
import {statusTransfer} from 'utils/appUtils';
import {ACCOUNT_STATUS} from 'utils/AppConst';

const useCheckStatusAccount = status => {
  const [editableInput, setEditableInput] = useState(true);
  const [editableStatus, setEditableStatus] = useState(true);
  const statusName = statusTransfer(status).changeNameStatus;
  useMemo(() => {
    switch (statusName) {
      case ACCOUNT_STATUS.WORKING:
      case ACCOUNT_STATUS.DRAFT: //check BA for case draft
      case ACCOUNT_STATUS.PENDING_UPGRADE_REVIEW: //temp for test, confirm with BE this status
      case ACCOUNT_STATUS.UNFINISHED:
        setEditableInput(true);
        setEditableStatus(true);
        break;
      case ACCOUNT_STATUS.STOP_WORKING:
        setEditableInput(false);
        setEditableStatus(true);
        break;
      case ACCOUNT_STATUS.PENDING_APPROVAL:
      case ACCOUNT_STATUS.LOCKED:
      case ACCOUNT_STATUS.CLOSED:
        setEditableInput(false);
        setEditableStatus(false);
        break;
      case ACCOUNT_STATUS.NEED_UPDATE:
        setEditableInput(true);
        setEditableStatus(false);
        break;
      default:
        break;
    }
  }, [status]);
  return {editableInput, editableStatus, statusName};
};

const useCheckStatusTransporter = status => {
  const [editableInput, setEditableInput] = useState(true);
  const [editableStatus, setEditableStatus] = useState(true);
  const statusName = statusTransfer(status).changeNameStatus;
  useMemo(() => {
    switch (statusName) {
      case ACCOUNT_STATUS.WORKING:
      case ACCOUNT_STATUS.DRAFT: //check BA for case draft
      case ACCOUNT_STATUS.NEED_UPDATE:
      case ACCOUNT_STATUS.UNFINISHED:
      case ACCOUNT_STATUS.STOP_WORKING:
        setEditableInput(true);
        setEditableStatus(true);
        break;
      case ACCOUNT_STATUS.PENDING_APPROVAL:
      case ACCOUNT_STATUS.LOCKED:
        setEditableInput(false);
        setEditableStatus(false);
        break;
      default:
        break;
    }
  }, [status]);
  return {editableInput, editableStatus, statusName};
};

export {useCheckStatusAccount, useCheckStatusTransporter};
