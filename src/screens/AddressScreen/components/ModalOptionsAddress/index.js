import React, {useState} from 'react';
import ModalOptionsAddress from './view';
import {useActions} from 'hooks/useActions';
import {
  deleteAddressBookSubmit,
  setDefaultAddressBookSubmit,
} from 'appRedux/actions/addressBookActions';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';

export default function ({
  showModalOption,
  setShowModalOption,
  addressBookSelectedId,
  isDetailScreen,
}) {
  const actions = useActions({
    deleteAddressBookSubmit,
    setDefaultAddressBookSubmit,
  });
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleDeleteAddress = () => {
    const options = {
      callback: () => {
        if (isDetailScreen) {
          NavigationServices.goBack(SCENE_NAMES.ADDRESS);
        } else {
          NavigationServices.replace(SCENE_NAMES.ADDRESS);
        }
      },
      id: addressBookSelectedId,
    };
    actions.deleteAddressBookSubmit({...options});
  };
  const handleSetDefaultAddress = () => {
    const options = {
      callback: () => {
        if (isDetailScreen) {
          NavigationServices.goBack(SCENE_NAMES.ADDRESS);
        } else {
          NavigationServices.replace(SCENE_NAMES.ADDRESS);
        }
      },
      id: addressBookSelectedId,
    };
    actions.setDefaultAddressBookSubmit({...options});
  };
  return (
    <ModalOptionsAddress
      showModalOption={showModalOption}
      setShowModalOption={setShowModalOption}
      addressBookSelectedId={addressBookSelectedId}
      showModalDelete={showModalDelete}
      setShowModalDelete={setShowModalDelete}
      onPressDeleteAddress={handleDeleteAddress}
      onPressSetDefaultAddress={handleSetDefaultAddress}
    />
  );
}
