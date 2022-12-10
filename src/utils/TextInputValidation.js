const TextInputValidation = (Language, GivenValue, FieldName) => {
  const ArabicRegex = /[\u0600-\u06FF]/gm;
  const EnglishRegex = /[a-z0-9.\-s]/gim;
  let Answer = {
    status: false,
    message: "",
  };
  if (GivenValue === " ") {
    return (Answer = {
      status: false,
      message: `${FieldName} Is Empty`,
    });
  } else if (Language === "en") {
    if (EnglishRegex.test(GivenValue.trim()) === true) {
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
    if (ArabicRegex.test(GivenValue.trim()) === true) {
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
