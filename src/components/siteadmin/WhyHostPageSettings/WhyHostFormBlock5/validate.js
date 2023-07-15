import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.workTitleHeading) {
    errors.workTitleHeading = messages.required;
  } else if (values.workTitleHeading.trim() == "") {
    errors.workTitleHeading = messages.required;
  } else if (values.workTitleHeading && values.workTitleHeading.length > 200) {
    errors.workTitleHeading = messages.exceedLimit;
  }

  if (!values.workTitle1) {
    errors.workTitle1 = messages.required;
  } else if (values.workTitle1.trim() == "") {
    errors.workTitle1 = messages.required;
  } else if (values.workTitle1 && values.workTitle1.length > 200) {
    errors.workTitle1 = messages.exceedLimit;
  }

  if (!values.workTitle2) {
    errors.workTitle2 = messages.required;
  } else if (values.workTitle2.trim() == "") {
    errors.workTitle2 = messages.required;
  } else if (values.workTitle2 && values.workTitle2.length > 200) {
    errors.workTitle2 = messages.exceedLimit;
  }

  if (!values.workContent1) {
    errors.workContent1 = messages.required;
  } else if (values.workContent1.trim() == "") {
    errors.workContent1 = messages.required;
  } else if (values.workContent1 && values.workContent1.length > 400) {
    errors.workContent1 = messages.exceedLimit;
  }

  if (!values.workContent2) {
    errors.workContent2 = messages.required;
  } else if (values.workContent2.trim() == "") {
    errors.workContent2 = messages.required;
  } else if (values.workContent2 && values.workContent2.length > 400) {
    errors.workContent2 = messages.exceedLimit;
  }


  return errors
}

export default validate;