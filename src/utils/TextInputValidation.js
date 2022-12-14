const TextInputValidation = (Language, GivenValue, FieldName) => {
  const ArabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
  const EnglishRegex = /^[A-Za-z\s]*$/;
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
    if (EnglishRegex.test(GivenValue) === true) {
      return (Answer = {
        status: true,
        message: '',
      });
    } else {
      return (Answer = {
        status: false,
        message: `${FieldName} Should Have Only English Letter`,
      });

    }
  } else if (Language === "ar") {
    if (ArabicRegex.test(GivenValue) === true) {
      return (Answer = {
        status: true,
        message: '',
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
