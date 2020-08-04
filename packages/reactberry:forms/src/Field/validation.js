function maxLength(value, length) {
  if (!value) {
    return 'missing value';
  }

  if (value.length > length) {
    return 'too long';
  }

  return false;
}

export const isEmail = (email = null) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email) ? false : 'This is not a valid email';
};

function minLength(value, length) {
  if (!value) {
    return 'missing value';
  }

  if (value.length <= length) {
    return 'too short';
  }

  return false;
}

function isCheck(value) {
  if (!value) {
    return 'This field is required';
  }

  return false;
}

function notNull(value) {
  if (!value) {
    return 'missing value';
  }

  return false;
}

const validationSchema = {
  maxLength,
  minLength,
  notNull,
  isEmail,
  isCheck
};

export default function validation(validation, v) {
  const result = Object.keys(validation)
    .map(key => validationSchema[key](v, validation[key]))
    .filter(v => v !== false);

  return result[0] || false;
}
