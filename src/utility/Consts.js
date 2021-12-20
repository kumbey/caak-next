const Consts = {
  typeEmail: "email",
  typePhoneNumber: "phoneNumber",
  typeMismatch: "mismatch",
  typeUsername: "username",
  typeName: "name",
  typeGender: "gender",
  typePassword: "password",
  typePasswordRepeat: "passwordRepeat",
  typeRequired: "required",
  typeDate: "date",
  typeConfirmationCode: "confirmationCode",
  typeAge: "age",
  regexEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  regexPhoneNumber: /^[0-9]{4}[-\s\.]?[0-9]{4}$/,
  regexUsername:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^[0-9]{8}$/,
  regexPassword: /^(?=.*[0-9])(?=.*[a-z]).{8,}$/,
  regexDate: /^\d{4}-\d{2}-\d{2}$/,
  regexNumber: /[^\d.]/gi,
  regexImage: /((^|, )(image\/)(jpg|jpeg|png|JPG|JPEG|PNG))+$/,
  SS_UserKey: "user",
  SS_CognitoUserKey: "uc",
  SS_UserSignUp: "signUpKey",
  signInUp: "signInUp",
  signIn: "signIn",
  signUp: "signUp",
  loggedUserAuth: "AMAZON_COGNITO_USER_POOLS",
  publicUserAuth: "AWS_IAM",
  siteMainTitle: "саак.мн"
};

export default Consts;
