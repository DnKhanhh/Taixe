import _ from 'lodash';

export const DEFAULT_LOGO_BANK =
  'https://png.pngtree.com/png-vector/20190225/ourmid/pngtree-concept-banking-logo-png-image_712961.jpg';

export const parseDataUserGateway = obj => {
  if (_.isObject(obj)) {
    const {fullName, paymentCode, paymentNumber, payment, isDefault} =
      obj || {};
    return {
      ...obj,
      fullName: fullName,
      paymentCode: paymentCode,
      paymentNumber: paymentNumber,
      fullGatewayName: payment?.fullName,
      gatewayName: payment?.name,
      logoGateway: payment?.logoUrl || DEFAULT_LOGO_BANK,
      isDefault: isDefault || false,
    };
  }
  return {};
};

export const parseDataSettingGateway = obj => {
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
