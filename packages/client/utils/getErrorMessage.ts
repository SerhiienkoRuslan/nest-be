export const getLoginErrorMessage = (error: string): string => {
  switch (error) {
    case 'LOGIN.ERROR':
      return 'Incorrect password. Please try again!';
    case 'LOGIN.USER_NOT_FOUND':
      return 'Email not found!';
    case 'LOGIN.EMAIL_NOT_VERIFIED':
      return 'You have to confirm your email!';
    case 'LOGIN.EMAIL_CODE_NOT_VALID':
      return 'Incorrect confirmation code!';
    default:
      return 'Whoops! Somethings went wrong!';
  }
};

export const getRegistrationErrorMessage = (error: string): string => {
  switch (error) {
    case 'REGISTRATION.ERROR.MUST_BE_UNIQUE':
      return 'This email already used!';
    case 'REGISTRATION.ERROR.MAIL_NOT_SENT':
      return 'Confirmation Code not send, try again!';
    case 'REGISTRATION.ERROR.GENERIC_ERROR':
      return 'Server trouble, try again later!';
    default:
      return 'Whoops! Somethings wrong!';
  }
};

export const getCreatePostErrorMessage = (error: string): string => {
  switch (error) {
    // TODO:
    case 'REGISTRATION.ERROR.MUST_BE_UNIQUE':
      return 'This email already used!';
    default:
      return 'Whoops! Somethings wrong!';
  }
};
