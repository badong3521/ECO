import { ValidationRules } from 'react-hook-form';

export const PasswordValidation: ValidationRules = {
  required: true,
  validate: value => {
    if (value && value.length < 6) {
      return 'errors.user.password.invalid';
    }
    return undefined;
  },
};

export const RetypePasswordValidation = (
  password: string,
): ValidationRules => ({
  required: true,
  validate: value => {
    if (value) {
      if (value.length < 6) {
        return 'errors.user.password.invalid';
      }
      if (value !== password) {
        return 'errors.user.password.notMatched';
      }
    }
    return undefined;
  },
});
