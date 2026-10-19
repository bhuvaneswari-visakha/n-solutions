export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) => (
  typeof password === 'string'
  && password.length >= 12
  && password.length <= 72
  && /[a-z]/.test(password)
  && /[A-Z]/.test(password)
  && /\d/.test(password)
  && /[^A-Za-z0-9\s]/.test(password)
);

const strongPasswordMessage = 'Password must be 12-72 characters and include an uppercase letter, a lowercase letter, a number, and a special character.';

export const validateRegistrationInput = ({ name, email, password }) => {
  const errors = {};

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    errors.name = 'Name must be between 2 and 100 characters.';
  }
  if (typeof email !== 'string' || !isValidEmail(email.trim())) {
    errors.email = 'A valid email is required.';
  }
  if (!isStrongPassword(password)) errors.password = strongPasswordMessage;

  return errors;
};

export const validateLoginInput = ({ email, password }) => {
  const errors = {};
  if (typeof email !== 'string' || !isValidEmail(email.trim())) errors.email = 'A valid email is required.';
  if (typeof password !== 'string' || password.length === 0) errors.password = 'Password is required.';
  return errors;
};

export const validateProfileInput = ({ fullName, emailAddress }) => {
  const errors = {};
  if (fullName === undefined && emailAddress === undefined) {
    errors.profile = 'At least one profile field is required.';
    return errors;
  }
  if (fullName !== undefined && (typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100)) {
    errors.fullName = 'Full name must be between 2 and 100 characters.';
  }
  if (emailAddress !== undefined && (typeof emailAddress !== 'string' || !isValidEmail(emailAddress.trim()))) {
    errors.emailAddress = 'A valid email address is required.';
  }
  return errors;
};

export const validatePassword = ({ currentPassword, newPassword }) => {
  const errors = {};
  if (typeof currentPassword !== 'string' || currentPassword.length === 0) {
    errors.currentPassword = 'Current password is required.';
  }
  if (!isStrongPassword(newPassword)) errors.newPassword = strongPasswordMessage.replace('Password', 'New password');
  return errors;
};

export const parseLimit = (value, defaultLimit, maxLimit) => {
  if (value === undefined) return defaultLimit;
  const limit = Number.parseInt(value, 10);
  if (!Number.isInteger(limit) || limit < 1) return defaultLimit;
  return Math.min(limit, maxLimit);
};
