// Regex utilizada na linha 12 foi retirada de https://stackoverflow.com/questions/53377994/email-validation-in-reactjs-is-not-working-properly

const code = {
  BAD_REQUEST: 400,
};

const error = {
  displayNameLength: '"displayName" length must be at least 8 characters long',
  emailIsValid: '"email" must be a valid email',
  emptyEmail: '"email" is required',
  emptyPassword: '"password" is required',
  passwordLength: '"password" length must be 6 characters long',
  blankEmail: '"email" is not allowed to be empty',
  blankPassword: '"password" is not allowed to be empty',
};

const displayNameLength = (value, min) => (value.length < min);
const testEmail = (value) => (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)));
const empty = (value) => (!value);
const passwordLength = (value) => (value.length !== 6);
const blank = (value) => (value === '');

const validateUser = (displayName) => {
  switch (true) {
    case displayNameLength(displayName, 8): return {
      code: code.BAD_REQUEST, message: error.displayNameLength,
    };
    default: return {};
  }
};

const validateEmail = (email) => {
  switch (true) {
    case blank(email): return { code: code.BAD_REQUEST, message: error.blankEmail };
    case empty(email): return { code: code.BAD_REQUEST, message: error.emptyEmail };
    case testEmail(email): return { code: code.BAD_REQUEST, message: error.emailIsValid };
    default: return {};
  }
};

const validatePassword = (password) => {
  switch (true) {
    case blank(password): return { code: code.BAD_REQUEST, message: error.blankPassword };
    case empty(password): return { code: code.BAD_REQUEST, message: error.emptyPassword };
    case passwordLength(password): return { 
      code: code.BAD_REQUEST, message: error.passwordLength,
    };
    default: return {};
  }
};

module.exports = {
  validateUser,
  validateEmail,
  validatePassword,
};