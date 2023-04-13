import { ValidationRules } from 'react-hook-form';

const BusCardValidation: ValidationRules = {
  required: true,
  validate: value => {
    if (value) {
      const trimmedValue = value.replace(/\s/g, '');
      const pattern = new RegExp(/^\d{8}$/);
      if (!pattern.test(trimmedValue)) {
        return 'validation.busCardVerificationScreen.cardNumberFormat';
      }
    }
    return undefined;
  },
};

export default BusCardValidation;
