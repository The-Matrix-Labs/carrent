import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.peaceTitleHeading) {
    errors.peaceTitleHeading = messages.required;
  } else if (values.peaceTitleHeading.trim() == "") {
    errors.peaceTitleHeading = messages.required;
  } else if (values.peaceTitleHeading && values.peaceTitleHeading.length > 200) {
    errors.peaceTitleHeading = messages.exceedLimit;
  }

  if (!values.peaceTitle1) {
    errors.peaceTitle1 = messages.required;
  } else if (values.peaceTitle1.trim() == "") {
    errors.peaceTitle1 = messages.required;
  } else if (values.peaceTitle1 && values.peaceTitle1.length > 200) {
    errors.peaceTitle1 = messages.exceedLimit;
  }

  if (!values.peaceTitle2) {
    errors.peaceTitle2 = messages.required;
  } else if (values.peaceTitle2.trim() == "") {
    errors.peaceTitle2 = messages.required;
  } else if (values.peaceTitle2 && values.peaceTitle2.length > 200) {
    errors.peaceTitle2 = messages.exceedLimit;
  }

  if (!values.peaceTitle3) {
    errors.peaceTitle3 = messages.required;
  } else if (values.peaceTitle3.trim() == "") {
    errors.peaceTitle3 = messages.required;
  } else if (values.peaceTitle3 && values.peaceTitle3.length > 200) {
    errors.peaceTitle3 = messages.exceedLimit;
  }

  if (!values.peaceContent1) {
    errors.peaceContent1 = messages.required;
  } else if (values.peaceContent1.trim() == "") {
    errors.peaceContent1 = messages.required;
  } else if (values.peaceContent1 && values.peaceContent1.length > 400) {
    errors.peaceContent1 = messages.exceedLimit;
  }

  if (!values.peaceContent2) {
    errors.peaceContent2 = messages.required;
  } else if (values.peaceContent2.trim() == "") {
    errors.peaceContent2 = messages.required;
  } else if (values.peaceContent2 && values.peaceContent2.length > 400) {
    errors.peaceContent2 = messages.exceedLimit;
  }

  if (!values.peaceContent3) {
    errors.peaceContent3 = messages.required;
  } else if (values.peaceContent3.trim() == "") {
    errors.peaceContent3 = messages.required;
  } else if (values.peaceContent3 && values.peaceContent3.length > 400) {
    errors.peaceContent3 = messages.exceedLimit;
  }

  return errors
}

export default validate;