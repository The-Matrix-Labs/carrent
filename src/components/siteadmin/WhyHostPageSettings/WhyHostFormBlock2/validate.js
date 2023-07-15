import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.earnBlockTitle1) {
    errors.earnBlockTitle1 = messages.required;
  } else if (values.earnBlockTitle1.trim() == "") {
    errors.earnBlockTitle1 = messages.required;
  } else if (values.earnBlockTitle1 && values.earnBlockTitle1.length > 200) {
    errors.earnBlockTitle1 = messages.exceedLimit;
  }

  if (!values.earnBlockContent1) {
    errors.earnBlockContent1 = messages.required;
  } else if (values.earnBlockContent1.trim() == "") {
    errors.earnBlockContent1 = messages.required;
  } else if (values.earnBlockContent1 && values.earnBlockContent1.length > 400) {
    errors.earnBlockContent1 = messages.exceedLimit;
  }

  if (!values.earnBlockContent2) {
    errors.earnBlockContent2 = messages.required;
  } else if (values.earnBlockContent2.trim() == "") {
    errors.earnBlockContent2 = messages.required;
  } else if (values.earnBlockContent2 && values.earnBlockContent2.length > 400) {
    errors.earnBlockContent2 = messages.exceedLimit;
  }

  return errors
}

export default validate;