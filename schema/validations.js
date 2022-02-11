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
  nameIsValid: '"name" is required',
  emptyTitle: '"title" is required',
  emptyContent: '"content" is required',
  emptyCategoryIds: '"categoryIds" is required',
};

const displayNameLength = (value, min) => (value.length < min);
const testEmail = (value) => (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)));
const empty = (value) => (!value);
const passwordLength = (value) => (value.length !== 6);
const blank = (value) => (value === '');
const emptyName = (value) => (value === undefined);

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

const validateName = (name) => {
  switch (true) {
    case emptyName(name): return { code: code.BAD_REQUEST, message: error.nameIsValid };
    default: return {};
  }
};

const validatePost = ({ title, content, categoryIds }) => {
  switch (true) {
    case empty(title): return { code: code.BAD_REQUEST, message: error.emptyTitle };
    case empty(content): return { code: code.BAD_REQUEST, message: error.emptyContent };
    case empty(categoryIds): return { code: code.BAD_REQUEST, message: error.emptyCategoryIds };
    default: return {};
  }
};

const validatePostId = ({ title, content }) => {
  switch (true) {
    case empty(title): return { code: code.BAD_REQUEST, message: error.emptyTitle };
    case empty(content): return { code: code.BAD_REQUEST, message: error.emptyContent };
    default: return {};
  }
};

module.exports = {
  validateUser,
  validateEmail,
  validatePassword,
  validateName,
  validatePost,
  validatePostId,
};