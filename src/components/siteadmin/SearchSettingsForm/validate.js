import messages from '../../../locale/messages';

const validate = values => {

    const errors = {}

    if (!values.minPrice) {
        errors.minPrice =  messages.required;
    }

    if(isNaN(values.minPrice) || (parseInt(values.minPrice, 10) < 0)){
	    errors.minPrice = messages.onlyNumericKey;
	}

  	if(isNaN(values.maxPrice) || (parseInt(values.maxPrice, 10) < 0)){
    	errors.maxPrice = messages.onlyNumericKey;
  	}

    if (!values.maxPrice) {
        errors.maxPrice =  messages.required;
    }

    return errors
}

export default validate;