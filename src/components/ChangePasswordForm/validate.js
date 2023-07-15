import messages from '../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.oldPassword && values.registeredType === 'email') {
    errors.oldPassword = messages.required;
  }

  if (!values.newPassword) {
    errors.newPassword = messages.required;
  } else if (values.newPassword.length < 8) {
    errors.newPassword = messages.required;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = messages.required;
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = messages.required;
  }

  return errors
}

export default validate