import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.easyHostTitle1) {
    errors.easyHostTitle1 = messages.required;
  } else if (values.easyHostTitle1.trim() == "") {
    errors.easyHostTitle1 = messages.required;
  } else if (values.easyHostTitle1 && values.easyHostTitle1.length > 200) {
    errors.easyHostTitle1 = messages.exceedLimit;
  }

  if (!values.easyHostContent1) {
    errors.easyHostContent1 = messages.required;
  } else if (values.easyHostContent1.trim() == "") {
    errors.easyHostContent1 = messages.required;
  } else if (values.easyHostContent1 && values.easyHostContent1.length > 400) {
    errors.easyHostContent1 = messages.exceedLimit;
  }

  if (!values.easyHostContent2) {
    errors.easyHostContent2 = messages.required;
  } else if (values.easyHostContent2.trim() == "") {
    errors.easyHostContent2 = messages.required;
  } else if (values.easyHostContent2 && values.easyHostContent2.length > 400) {
    errors.easyHostContent2 = messages.exceedLimit;
  }

  return errors
}

export default validate;