// Redux Form
import { SubmissionError } from 'redux-form';

import { FormattedMessage, injectIntl } from 'react-intl';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';

// Redux Action
import { getListingData } from '../../actions/getListing';
import { getListingDataStep3 } from '../../actions/getListingDataStep3';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

// For Redirect
import history from '../../core/history';

async function updateStep3(values, dispatch) {

  let weeklyDiscount = values.weeklyDiscount != '' ? values.weeklyDiscount : 0;
  let monthlyDiscount = values.monthlyDiscount != '' ? values.monthlyDiscount : 0;
  let delivery = values.delivery != '' ? values.delivery : 0;
  let variables = Object.assign({}, values, { weeklyDiscount, monthlyDiscount, delivery, securityDeposit: Number(values.securityDeposit) });

  dispatch(setLoaderStart('updateListing'));
  const query = `query (
  	$id: Int,
    $carRules: [Int],
    $bookingNoticeTime:String,
    $checkInStart:String,
    $checkInEnd:String,
    $maxDaysNotice:String,
    $minDay:Int,
    $maxDay:Int,
    $basePrice:Float,
    $delivery:Float,
    $currency:String,
    $weeklyDiscount:Float,
    $monthlyDiscount:Float,
    $blockedDates: [String],
    $bookingType: String!,
    $cancellationPolicy: Int,
    $securityDeposit: Float
  ) {
      updateListingStep3 (
        id: $id,
        carRules: $carRules,
        bookingNoticeTime:$bookingNoticeTime,
        checkInStart:$checkInStart,
        checkInEnd:$checkInEnd,
        maxDaysNotice:$maxDaysNotice,
        minDay:$minDay,
        maxDay:$maxDay,
        basePrice:$basePrice,
        delivery:$delivery,
        currency:$currency,
        weeklyDiscount:$weeklyDiscount,
        monthlyDiscount:$monthlyDiscount,
        blockedDates: $blockedDates,
        bookingType: $bookingType,
        cancellationPolicy: $cancellationPolicy,
        securityDeposit: $securityDeposit
      ) {
        status
      }
    }`;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if (data && data.updateListingStep3 != undefined) {
    if (data.updateListingStep3.status == "success") {

      await dispatch(getListingDataStep3(values.id));
      await dispatch(manageListingSteps(values.id, 3));
      await dispatch(setLoaderComplete('updateListing'));
      history.push('/become-a-owner/' + values.id + '/home');
    } else if (data.updateListingStep3.status == "notLoggedIn") {
      dispatch(setLoaderComplete('updateListing'));
      throw new SubmissionError({ _error: messages.notLoggedIn });
    } else {
      dispatch(setLoaderComplete('updateListing'));
      throw new SubmissionError({ _error: messages.somethingWentWrong });
    }
  } else {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default updateStep3;
