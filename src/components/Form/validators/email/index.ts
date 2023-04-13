import { ValidationRules } from 'react-hook-form';

const EmailValidation: ValidationRules = {
  validate: value => {
    if (value) {
      const pattern = new RegExp(/[\w+\-.]+@[a-z\d]+(\.[a-z\d]+)*\.[a-z]+/i);
      if (!pattern.test(value)) {
        return 'errors.user.email.invalid';
      }
    }
    return undefined;
  },
};

export default EmailValidation;
