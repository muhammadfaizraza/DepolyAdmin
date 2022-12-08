const Validate = async (Language, GivenValue, FieldName) => {
  const ArabicRegex = /[\u0600-\u06FF]/gm;
  const EnglishRegex = /[a-z0-9.\-]/gim;

  if (GivenValue === " ") {
    return `${FieldName} Is Empty`;
  } else if (Language === "en") {
    if (EnglishRegex.test(GivenValue.trim()) === true) {
      return true 
    } else {
      return `${FieldName} Should Have Only English Letter`;
    }
  } else if (Language === "ar") {
    if (ArabicRegex.test(GivenValue.trim()) === true) {
      return true
    } else {
      return `${FieldName} Should Have Only Arabic Letter`;
    }
  }
};
