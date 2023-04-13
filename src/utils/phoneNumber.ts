export function convertTo84(phoneNumber?: string) {
  const startWithZeroPattern = new RegExp(/(^0)/i);

  if (phoneNumber && startWithZeroPattern.test(phoneNumber)) {
    return phoneNumber.replace('0', '84');
  }
  return phoneNumber;
}

export default {
  convertTo84,
};
