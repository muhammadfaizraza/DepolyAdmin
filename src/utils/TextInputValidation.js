const TextInputValidation = (Language, GivenValue, FieldName) => {
  let Answer = {
    status: false,
    message: " ",
  };
  if (GivenValue === " ") {
    return (Answer = {
      status: false,
      message: ` ${FieldName} is required `,
    });
  } else if (Language === "en") {
    if (EnglishFieldValidation(GivenValue) === true) {
      return (Answer = {
        status: true,
        message: `${FieldName} is validated`,
      });
    } else {
      return (Answer = {
        status: false,
        message: `${FieldName} Should Have Only English Letter`,
      });
    }
  } else if (Language === "ar") {
    if (ArabicLanguageVerification(GivenValue) === true) {
      return (Answer = {
        status: true,
        message: `${FieldName} is validated`,
      });
    } else {
      return (Answer = {
        status: false,
        message: `${FieldName} Should Have Only Arabic Letter`,
      });
    }
  }
};
export default TextInputValidation;
const EnglishFieldValidation = (Value) => {
  if (
    /^[a-zA-Z0-9$-@!%*?&#^_.+]+$/.test(Value) ||
    /^[a-zA-Z0-9$-@!%*?&#^_. +]+$/.test(Value)
  ) {
    return true;
  } else {
    return false;
  }
};
const ArabicLanguageVerification = (Value) => {
  if (
    /^[\u0621-\u064A\u0660-\u0669\da-zA-Z$-@$!%*?&#^-_.+ ]+$/.test(Value) ||
    /^[\u0621-\u064A\u0660-\u0669\da-zA-Z$-@$!%*?&#^-_.+]+$/.test(Value) ||
    /^[a-zA-Z\d$-@$!%*?&#^-_.+\u0621-\u064A\u0660-\u0669]+$/.test(Value)
  ) {
    return true;
  } else {
    return false;
  }
};
