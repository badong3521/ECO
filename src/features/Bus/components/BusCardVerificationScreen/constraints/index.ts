import i18n from '../../../../../i18n';

const constraints = {
  livingArea: {
    presence: {
      message: `^${i18n.t(
        'validation.busCardVerificationScreen.livingAreaPresence',
      )}`,
    },
  },
  cardNumber: {
    presence: {
      message: `^${i18n.t(
        'validation.busCardVerificationScreen.cardNumberPresence',
      )}`,
    },
    length: {
      minimum: 8,
      message: `^${i18n.t(
        'validation.busCardVerificationScreen.cardNumberLength',
      )}`,
    },
    numericality: {
      onlyInteger: true,
      message: `^${i18n.t(
        'validation.busCardVerificationScreen.cardNumberNumericality',
      )}`,
    },
  },
};

export default constraints;
