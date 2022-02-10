const { validateUser, validateEmail, validatePassword } = require('../schema/validations');

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

module.exports = {
  validations,
  loginValidations,
};