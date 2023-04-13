import { ValidationRules } from 'react-hook-form';

const SubjectValidation: ValidationRules = {
  required: true,
  validate: value => {
    if (value) {
      if (value.toString().length > 60) {
        return 'features.helpDesk.create.validation.maxLengthSubject';
      }
    }
    return undefined;
  },
};

export default SubjectValidation;
