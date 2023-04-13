type InputCaseType = 'camel' | 'snake';

// Can deep convert snake_case objects to camelCase and the other way
export default class CamelCaseConverter {
  static convertKeys = (inputCase: InputCaseType, input: any): any => {
    const convertFunc =
      inputCase === 'camel'
        ? CamelCaseConverter.toCamel
        : CamelCaseConverter.toSnake;
    if (CamelCaseConverter.isObject(input)) {
      const n = {};

      Object.keys(input).forEach(k => {
        let value = input[k];
        if (k === 'latitude' || k === 'longitude') {
          value = Number(value);
        }
        n[convertFunc(k)] = CamelCaseConverter.convertKeys(inputCase, value);
      });

      return n;
    }
    if (Array.isArray(input)) {
      return input.map(i => {
        return CamelCaseConverter.convertKeys(inputCase, i);
      });
    }

    return input;
  };

  private static toCamel = (string: string) => {
    return string.replace(/([-_][a-z])/gi, $1 => {
      return $1
        .toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  };

  private static toSnake = (string: string) => {
    // no property using `-` in this project, so if there any param has `-` inside, it should be kept because it will be special key
    // for example: 'E1-1705': {
    //   'payment_verification_notification': true
    // }
    return string.indexOf('-') >= 0
      ? string
      : string
          .replace(/[\w]([A-Z])/g, m => {
            return `${m[0]}_${m[1]}`;
          })
          .toLowerCase();
  };

  private static isObject = (o: any): boolean => {
    return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
  };
}
