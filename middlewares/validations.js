const {
  validateUser,
  validateEmail,
  validatePassword,
  validateName,
  validatePost,
  validatePostId,
} = require('../schema/validations');

const validations = (req, res, next) => {
  const { displayName, email, password } = req.body;
  
  const userValidation = validateUser(displayName);
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  if (userValidation.message) {
    return res.status(userValidation.code).json({ message: userValidation.message });
  }

  if (emailValidation.message) {
    return res.status(emailValidation.code).json({ message: emailValidation.message });
  }

  if (passwordValidation.message) {
    return res.status(passwordValidation.code).json({ message: passwordValidation.message });
  }

  next();
};

const loginValidations = (req, res, next) => {
  const { email, password } = req.body;

  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  if (emailValidation.message) {
    return res.status(emailValidation.code).json({ message: emailValidation.message });
  }

  if (passwordValidation.message) {
    return res.status(passwordValidation.code).json({ message: passwordValidation.message });
  }

  next();
};

const nameValidations = (req, res, next) => {
  const { name } = req.body;

  const nameValidation = validateName(name);

  if (nameValidation.message) {
    return res.status(nameValidation.code).json({ message: nameValidation.message });
  }

  next();
};

const postValidations = (req, res, next) => {
  const post = req.body;

  const postValidation = validatePost(post);

  if (postValidation.message) {
    return res.status(postValidation.code).json({ message: postValidation.message });
  }

  next();
};

const postIdValidations = (req, res, next) => {
  const post = req.body;

  const postIdValidation = validatePostId(post);

  if (postIdValidation.message) {
    return res.status(postIdValidation.code).json({ message: postIdValidation.message });
  }

  next();
};

module.exports = {
  validations,
  loginValidations,
  nameValidations,
  postValidations,
  postIdValidations,
};