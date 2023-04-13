import { ValidationRules } from 'react-hook-form';

const PhoneNumberValidation: ValidationRules = {
  required: true,
  validate: value => {
    if (value) {
      const pattern = new RegExp(/(^84|^0)[0-9]{9}$/i);
      if (value.length > 12 || value.length < 10 || !pattern.test(value)) {
        return 'errors.user.phone_number.invalid';
      }
    }
    return undefined;
  },
};
export default PhoneNumberValidation;
