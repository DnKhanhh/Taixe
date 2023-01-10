import {useState, useCallback} from 'react';
import {getValidationLogSubmit} from 'appRedux/actions/authActions';
import {useActions} from 'hooks/useActions';

const useGetValidationLog = (types, accountId, vehicleId) => {
  const actions = useActions({getValidationLogSubmit});
  const [invalidValidation, setInvalidValidation] = useState({});
  const [noteInvalidValidation, setNoteInvalidValidation] = useState(null);
  const getProfileAttributesValidationLog = useCallback(() => {
    const errorsTemp = {};
    const options = {
      callback: res => {
        setNoteInvalidValidation(res.note);
        res.invalidProfileAttributes.map(item => {
          errorsTemp[item.fieldName] = item.name + ' không hợp lệ';
        });
        setInvalidValidation(errs => ({
          ...errs,
          ...errorsTemp,
        }));
      },
      types: types,
      accountId: accountId,
      vehicleId: vehicleId,
    };
    actions.getValidationLogSubmit({...options});
  }, [actions]);

  return {
    invalidValidation,
    noteInvalidValidation,
    getProfileAttributesValidationLog,
  };
};

export {useGetValidationLog};
