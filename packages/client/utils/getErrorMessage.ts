export const getLoginErrorMessage = (error: string): string => {
  switch (error) {
    case 'LOGIN.ERROR':
      return 'Incorrect password. Please try again!';
    case 'LOGIN.USER_NOT_FOUND':
      return 'Email not found!';
    case 'LOGIN.EMAIL_NOT_VERIFIED':
      return 'You have to confirm your email!';
    default:
      return 'Whoops! Somethings went wrong!';
  }
};

export const getRegistrationErrorMessage = (error: string): string => {
  switch (error) {
    case 'REGISTRATION.ERROR.MUST_BE_UNIQUE':
      return 'This email already used!';
    case 'REGISTRATION.ERROR.MAIL_NOT_SENT':
      return 'This email already used!';
    case 'REGISTRATION.ERROR.GENERIC_ERROR':
      return 'This email already used!';
    //needs to be added more
    default:
      return 'Whoops! Somethings wrong!';
  }
};
