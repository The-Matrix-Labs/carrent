import messages from '../../locale/messages';


const validate = values => {

  const errors = {}

  if (!values.make) {
    errors.make = messages.required;
  }

  if (!values.model) {
    errors.model = messages.required;
  }

  if (!values.year) {
    errors.year = messages.required;
  }

  if (!values.carType) {
    errors.carType = messages.required;
  }

  if (!values.odometer) {
    errors.odometer = messages.required;
  }

  if (!values.transmission) {
    errors.transmission = messages.required;
  }

  if (!values.country) {
    errors.country = messages.required;
  }

  if (!values.state) {
    errors.state = messages.required;
  }

  if (!values.city) {
    errors.city = messages.required;
  }

  if (!values.street) {
    errors.street = messages.required;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.required;
  }

  return errors
}

export default validate
