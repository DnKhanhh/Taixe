export const settingUserProfileData = settingsData => {
  const requiredFields = [];
  const requiredVerifyFields = [];
  const openFields = [];
  const editableFields = [];
  const originRequiredVerify = [];
  settingsData.forEach(setting => {
    const {fieldName, required, requiredVerify, open, editable} = setting;
    if (required) {
      requiredFields.push(fieldName);
    }
    if (requiredVerify) {
      requiredVerifyFields.push(fieldName);
      originRequiredVerify.push(setting);
    }
    if (open) {
      openFields.push(fieldName);
    }
    if (editable) {
      editableFields.push(fieldName);
    }
  });
  return {
    original: settingsData,
    required: requiredFields,
    requiredVerify: requiredVerifyFields,
    open: openFields,
    editable: editableFields,
    originRequiredVerify: originRequiredVerify,
  };
};
