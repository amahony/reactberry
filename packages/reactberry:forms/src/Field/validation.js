function hasValue(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== null && typeof value !== 'undefined' && value !== '';
}

function normalizeValidationResult(result) {
  return result === false || result === null || typeof result === 'undefined' ? false : result;
}

function required(value, message = 'This field is required') {
  return hasValue(value) ? false : message;
}

function maxLength(value, length) {
  if (!hasValue(value)) {
    return false;
  }

  if (String(value).length > length) {
    return `Must be ${length} characters or fewer`;
  }

  return false;
}

export const isEmail = (email = null) => {
  if (!hasValue(email)) {
    return false;
  }

  // eslint-disable-next-line no-useless-escape
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email) ? false : 'This is not a valid email';
};

function minLength(value, length) {
  if (!hasValue(value)) {
    return false;
  }

  if (String(value).length < length) {
    return `Must be at least ${length} characters`;
  }

  return false;
}

function isCheck(value, message) {
  return required(value, message);
}

function notNull(value, message) {
  return required(value, message);
}

export const validationSchema = {
  required,
  maxLength,
  minLength,
  notNull,
  isEmail,
  isCheck
};

async function runValidationRule(ruleName, ruleConfig, value, fieldApi) {
  const validator = validationSchema[ruleName];

  if (!validator) {
    return typeof ruleConfig === 'function' ? ruleConfig(value, fieldApi) : false;
  }

  if (ruleConfig === false || ruleConfig === null || typeof ruleConfig === 'undefined') {
    return false;
  }

  if (ruleName === 'required' || ruleName === 'notNull' || ruleName === 'isCheck') {
    return validator(value, typeof ruleConfig === 'string' ? ruleConfig : undefined, fieldApi);
  }

  return validator(value, ruleConfig, fieldApi);
}

export default async function validation(validationConfig, value, fieldApi) {
  if (!validationConfig) {
    return false;
  }

  if (typeof validationConfig === 'function') {
    return normalizeValidationResult(await validationConfig(value, fieldApi));
  }

  if (Array.isArray(validationConfig)) {
    for (let index = 0; index < validationConfig.length; index += 1) {
      const result = await validation(validationConfig[index], value, fieldApi);

      if (normalizeValidationResult(result)) {
        return result;
      }
    }

    return false;
  }

  const keys = Object.keys(validationConfig);

  for (let index = 0; index < keys.length; index += 1) {
    const result = await runValidationRule(keys[index], validationConfig[keys[index]], value, fieldApi);

    if (normalizeValidationResult(result)) {
      return result;
    }
  }

  return false;
}
