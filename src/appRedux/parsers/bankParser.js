import _ from 'lodash';

export const DEFAULT_LOGO_BANK =
  'https://png.pngtree.com/png-vector/20190225/ourmid/pngtree-concept-banking-logo-png-image_712961.jpg';

export const parseDataUserBank = obj => {
  if (_.isObject(obj)) {
    const {fullName, branchName, bankCode, bankNumber, bank, isDefault} =
      obj || {};
    return {
      ...obj,
      fullName: fullName,
      branchName: branchName,
      bankCode: bankCode,
      bankNumber: bankNumber,
      fullBankName: bank?.fullName,
      bankName: bank?.name,
      logoBank: bank?.logoUrl || DEFAULT_LOGO_BANK,
      isDefault: isDefault || false,
    };
  }
  return {};
};

export const parseDataSettingBank = obj => {
  if (_.isObject(obj)) {
    const {id, name, fullName, logoUrl, isActive} = obj || {};
    return {
      ...obj,
      id: id,
      name: name,
      fullName: fullName,
      logoUrl: logoUrl || DEFAULT_LOGO_BANK,
      isActive: isActive || true,
    };
  }
  return {};
};
