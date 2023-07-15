import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, formValueSelector, reset, change } from 'redux-form';

import { graphql, gql, compose } from 'react-apollo';

import {
  Row, FormGroup,
  Col,
  FormControl
} from 'react-bootstrap';

import {
  injectStripe,
  CardElement,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from 'react-stripe-elements';
import { toastr } from 'react-redux-toastr';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';

// Helpers
import validate from './validate';

// Component
import HouseRules from './HouseRules';
import Loader from '../../Loader';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

import DriverInfo from './DriverInfo';

import { makePayment } from '../../../actions/booking/makePayment'
import { processCardAction } from '../../../actions/PaymentIntent/processCardAction'
import { COMMON_TEXT_COLOR } from '../../../constants/index';
import imageOne from '../../../../public/SiteIcons/payment-icons.png';
import imageTwo from '../../../../public/SiteIcons/stripe-connect.png';


const createOptions = () => {
  return {
    style: {
      base: {
        color: COMMON_TEXT_COLOR,
        fontWeight: 400,
        fontFamily: 'inherit',
        fontSize: '14px',
        fontSmoothing: 'antialiased',
        ':focus': {
          color: COMMON_TEXT_COLOR,
        },

        '::placeholder': {
          color: '#aaa',
        },

        ':focus::placeholder': {
          color: '#aaa',
        },
      },
      invalid: {
        color: '#303238',
        ':focus': {
          color: COMMON_TEXT_COLOR,
        },
        '::placeholder': {
          color: '#aaa',
        },
      },
    }
  }
};

class PaymentForm extends Component {
  static propTypes = {
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired
      })
    })),
    hostDisplayName: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    initialValues: PropTypes.shape({
      listId: PropTypes.number.isRequired,
      listTitle: PropTypes.string.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      checkIn: PropTypes.object.isRequired,
      checkOut: PropTypes.object.isRequired,
      guests: PropTypes.number.isRequired,
      basePrice: PropTypes.number.isRequired,
      delivery: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      weeklyDiscount: PropTypes.number,
      monthlyDiscount: PropTypes.number,
      paymentType: PropTypes.number
    }).isRequired,
    paymentCurrencyList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired
    })),
    paymentLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    paymentCurrencyList: [],
    paymentLoading: false
  };

  constructor(props) {
    super(props);
    this.state = {
      paymentStatus: 2,
      load: true
    }
    this.renderpaymentCurrencies = this.renderpaymentCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;

    if (locale !== prevLocale) {
      this.setState({ load: false });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => this.setState({ load: true }), 1);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { getAllPayments: { getPaymentMethods }, change } = nextProps;
    if (getPaymentMethods && getPaymentMethods.length == 1) {
      this.setState({
        paymentStatus: getPaymentMethods[0].id
      });
      change('paymentType', getPaymentMethods[0].id)
    }
  }

  renderFormControl = ({ input, label, type, placeholder, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={'inputFocusColorNone'}>
        <FormControl {...input} placeholder={placeholder} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className, disabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl disabled={disabled} componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>

        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  renderGuests(personCapacity) {
    let rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? 'guests' : 'guest'}</option>);
    }
    return rows;
  }

  renderpaymentCurrencies() {
    const { paymentCurrencyList } = this.props;
    let rows = [];

    if (paymentCurrencyList != null && paymentCurrencyList.length > 0) {
      paymentCurrencyList.map((item, index) => {
        if (item.isEnable && item.isPayment) {
          rows.push(<option key={index} value={item.symbol}>{item.symbol}</option>);
        }
      })
    }
    return rows;
  }

  handleClick() {
    const { dispatch } = this.props;
    dispatch(reset('BookingForm'));
  }

  async handleSubmit(values, dispatch) {
    const { stripe, processCardAction } = this.props;

    let paymentType = values.paymentType, paymentCurrency, month;
    let monthValue, dateValue, dateOfBirth;
    let today, birthDate, age, monthDifference, dobDate;
    let dateOfMonth = Number(values.month) + 1;

    dobDate = values.year + '/' + dateOfMonth + '/' + values.day
    paymentCurrency = values.paymentType == 1 ? values.paymentCurrency : null;
    month = values.month ? Number(values.month) + 1 : null;
    monthValue = Number(values.month) > 8 ? Number(month) : '0' + month;
    dateValue = values.day > 9 ? values.day : '0' + values.day;
    dateOfBirth = monthValue + "-" + dateValue + "-" + values.year;
    today = new Date();
    birthDate = new Date(dobDate);
    age = today.getFullYear() - birthDate.getFullYear();
    monthDifference = today.getMonth() - birthDate.getMonth();

    if (values.year) {
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) age--;
      if (age < 18) {
        toastr.error("Update Profile Failed", "Sorry, you must be 18 years old");
        return false;
      }
    }

    let query = `query checkReservation ($checkIn: String,$checkOut: String,$listId: Int ){
      checkReservation(checkIn: $checkIn, checkOut:$checkOut, listId:$listId ){
        id
        listId
        hostId
        guestId
        checkIn
        checkOut
        status
      }
    }`;


    const params = {
      listId: values.listId,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
    };

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: params,
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.checkReservation && data.checkReservation.status == "200") {

      let msg = '', paymentMethodId, createPaymentMethod;

      if (paymentType == 2) {
        createPaymentMethod = await stripe.createPaymentMethod('card', {
          card: <CardElement />,
          billing_details: {
            address: {
              postal_code: values.zipcode
            }
          }
        })

        if (createPaymentMethod && createPaymentMethod.paymentMethod) {
          paymentMethodId = createPaymentMethod.paymentMethod.id
        }
      }

      if (createPaymentMethod && createPaymentMethod.error && createPaymentMethod.error.message && paymentType == 2) {
        msg = createPaymentMethod.error.message
        toastr.error("Oops!", msg);
      } else {

        if (Number(values.paymentType) == 2 && !values.zipcode) {
          toastr.error("Oops!", 'Your Zip code is incomplete.');
          return;
        }

        const { status, paymentIntentSecret, reservationId } = await dispatch(makePayment(
          values.listId,
          values.listTitle,
          values.hostId,
          values.guestId,
          values.checkIn,
          values.checkOut,
          values.guests,
          values.message,
          values.basePrice,
          values.delivery,
          values.currency,
          values.discount,
          values.discountType,
          values.guestServiceFee,
          values.hostServiceFee,
          values.total,
          values.bookingType,
          paymentCurrency,
          paymentType,
          values.guestEmail,
          values.bookingSpecialPricing,
          values.isSpecialPriceAssigned,
          values.isSpecialPriceAverage,
          values.dayDifference,
          values.startTime,
          values.endTime,
          values.licenseNumber,
          values.firstName,
          values.middleName,
          values.lastName,
          dateOfBirth,
          values.country,
          paymentMethodId,
          values.securityDeposit
        )
        );

        if (status == 400 && paymentType == 2) {
          const cardAction = await stripe.handleCardAction(
            paymentIntentSecret,
          );
          let amount = values.total + values.guestServiceFee;
          let confirmPaymentIntentId;

          if (cardAction && cardAction.paymentIntent && cardAction.paymentIntent.id) {
            confirmPaymentIntentId = cardAction.paymentIntent.id;
            const { handleCardActionStatus, errorMessage } = await processCardAction(
              reservationId,
              values.listId,
              values.hostId,
              values.guestId,
              values.listTitle,
              values.guestEmail,
              amount,
              values.currency,
              confirmPaymentIntentId
            );
          } else {
            if (cardAction && cardAction.error && cardAction.error.message) {
              msg = cardAction.error.message;
              toastr.error("Oops!", msg);
            }
          }
        }

      }
    } else {
      toastr.error("Oops!", "Those dates are not available.");
    }
  }

  handlePayment(e) {
    let paymentType = e.target.value;

    if (paymentType == 2) {
      this.setState({ paymentStatus: 2 })
    } else {
      this.setState({ paymentStatus: 1 })
    }

  }

  render() {
    const { hostDisplayName, houseRules, allowedPersonCapacity, paymentLoading } = this.props;
    const { handleSubmit, submitting, error, pristine, paymentType } = this.props;
    const { listId } = this.props;
    const { paymentStatus, load } = this.state;
    const { formatMessage } = this.props.intl;
    const { data: { getCountries } } = this.props;
    const { getAllPayments: { getPaymentMethods } } = this.props;

    return (
      <div className={cx(s.bookItPanel, s.spaceTop2, 'inputFocusColor')}>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <h3 className={s.h3}>
            1.{' '}<FormattedMessage {...messages.liscenseInfo} />
          </h3>
          <div >
            <span className={s.content}><FormattedMessage {...messages.aboutLiscenseContent} />:</span>
          </div>
          <Row>
            <div>
              <DriverInfo />
            </div>
            <Col md={10} lg={9} xs={12} sm={12} className={cx(s.textLeft, s.positionRelative, 'textAlignRightRTL')}>
              <div className={cx(s.h3, s.spaceTop3)}>
                2.{' '}<FormattedMessage {...messages.aboutYourTrip} />
              </div>
              <div>
                <span className={s.content}><FormattedMessage {...messages.sayHello} />:</span>
              </div>
              <div>
                <Field
                  className={s.textArea}
                  name="message"
                  component={this.renderFormControlTextArea}
                  label={formatMessage(messages.descriptionInfo)}
                />
              </div>
              {
                houseRules.length > 0 && <div className={s.space4}>
                  <HouseRules
                    hostDisplayName={hostDisplayName}
                    houseRules={houseRules}
                  />
                </div>
              }
            </Col>
            <Col md={10} lg={9} xs={12} sm={12} className={cx(s.textLeft)}>
              <h3 className={cx(s.pullLeft, s.h3, 'floatRightRTL')}>3.{' '}<FormattedMessage {...messages.payment} /></h3>
              {getPaymentMethods && getPaymentMethods.length > 1 &&
                <Col md={12} lg={12} xs={12} sm={12} className={cx(s.noPadding, s.spaceTop2, s.space2, 'paymenySelectRTL', 'textAlignRightRTL')}>
                  <Field
                    name="paymentType"
                    type="text"
                    className={cx(s.formControlSelect, s.fullWithSelect, s.paymentFormSelect)}
                    component={this.renderFormControlSelect}
                    onChange={(e) => this.handlePayment(e)}
                  >
                    <option value={2}>{formatMessage(messages.creditCard)}</option>
                    <option value={1}>{formatMessage(messages.payPal)}</option>
                  </Field>
                </Col>
              }
              {
                getPaymentMethods && getPaymentMethods.length == 1 &&
                <Col md={12} lg={12} xs={12} sm={12} className={cx(s.noPadding, s.spaceTop2, s.space2)}>
                  <h3 className='textAlignRightRTL'>{paymentStatus == 2 ? formatMessage(messages.stripeContent) : formatMessage(messages.paypal)}</h3>
                </Col>

              }

              {
                paymentStatus == 2 ? (!load ? <Loader /> :
                  <Row className={cx(s.space4, s.spaceTop2, s.responsivecardSection)}>
                    <Col lg={10} md={11} sm={8} xs={12} className={cx(s.spaceTop2, s.cardSection)}>
                      <div className={'placeHolderFont'}>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <label className={cx(s.labelText, 'paymentLabelRTL')}>
                            <FormattedMessage {...messages.paymentCardNumber} />
                          </label>
                          <CardNumberElement
                            {...createOptions()}
                            placeholder="4242 4242 4242 4242"
                            className={cx(s.cardNumber, s.cardNumberSection, s.cardNumberSectionOne, 'cardNumberRtl')}
                          />
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={6}>
                          <label className={cx(s.labelText, 'paymentLabelRTL')}>
                            <FormattedMessage {...messages.cardExpires} />
                          </label>
                          <CardExpiryElement
                            placeholder="MM / YY"
                            {...createOptions()}
                            className={cx(s.cardNumber, s.cardNumberSectionTwo, s.cardNumberSection, 'cardNumberRtl')}
                          />
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={6}>
                          <label className={cx(s.labelText, 'paymentLabelRTL')}>
                            <FormattedMessage {...messages.cvv} />
                          </label>
                          <CardCvcElement
                            placeholder="_ _ _"
                            {...createOptions()}
                            className={cx(s.cardNumber, s.cardNumberSectionThree, s.cardNumberSection, 'cardNumberRtl')}
                          />
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={12}>
                          <label className={cx(s.labelText, 'paymentLabelRTL')}>
                            <FormattedMessage {...messages.zipcode} />
                          </label>
                          <Field
                            name="zipcode"
                            component={this.renderFormControl}
                            className={cx(s.cardInput, s.cardNumber, s.noBoxShadow, s.cardNumberSection, s.cardNumberSectionFour, 'cardNumberRtlTwo')}
                            placeholder={formatMessage(messages.zipcode)}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={5} xs={7}>
                          <img src={imageOne} className={cx(s.fullWidth, s.stripeImg)} />
                        </Col>
                        <Col lg={5} md={5} sm={4} xs={5} className={cx(s.textRight, 'floatLeftRTL', 'textAlignLeftRTL')}>
                          <img src={imageTwo} className={cx(s.fullWidth, s.stripeImg)} />
                        </Col>
                      </div>
                    </Col>
                  </Row>
                ) : <span></span>
              }
              {
                paymentStatus == 1 &&
                <Row className={s.space4}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={cx(s.countryName, 'paymenySelectRTL', 'textAlignRightRTL')}>
                      <Field name="paymentCurrency" disabled={paymentType == 2} component={this.renderFormControlSelect} className={cx(s.formControlSelect, s.paymentFormSelect)} >
                        <option value="">{formatMessage(messages.chooseCurrency)}</option>
                        {
                          this.renderpaymentCurrencies()
                        }
                      </Field>
                    </div>
                    <span className={cx(s.textLight, s.spaceTop1)}>
                      <FormattedMessage {...messages.loginInfo} />
                    </span>
                  </Col>
                </Row>
              }
              <Row className={cx(s.space4, 'textAlignRightRTL')}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className={s.cancelBtn}>
                    <Loader
                      type={"button"}
                      buttonType={"submit"}
                      className={cx(s.button, s.btnPrimary, s.btnlarge, s.fontWeight)}
                      disabled={pristine || submitting || error}
                      show={paymentLoading}
                      label={formatMessage(messages.payNow)}
                    />
                  </div>
                  {
                    !paymentLoading && <div className={s.spaceTop1}>
                      <Link
                        to={"/cars/" + listId}
                        className={cx(s.cancelLinkText)}
                        onClick={this.handleClick}
                      >
                        <FormattedMessage {...messages.cancel} />
                      </Link>
                    </div>
                  }
                  {
                    paymentLoading && <div className={s.spaceTop1}>
                      <a
                        href="javascript:void(0)"
                        className={cx(s.cancelLinkText)}
                      >
                        <FormattedMessage {...messages.cancel} />
                      </a>
                    </div>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

PaymentForm = reduxForm({
  form: 'PaymentForm', // a unique name for this form
  validate
})(PaymentForm);

// Decorate with connect to read form values
const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = (state) => ({
  paymentCurrencyList: state.currency.availableCurrencies,
  paymentLoading: state.book.paymentLoading,
  paymentType: selector(state, 'paymentType')
});

const mapDispatch = {
  processCardAction,
  change
};

export default injectStripe(compose(
  injectIntl,
  withStyles(s),
  (connect(mapState, mapDispatch)),
  graphql(gql`
    query getCountries {
        getCountries{
            id
            countryCode
            countryName
            isEnable
            dialCode
        }
    }
`, { options: { ssr: false } }),
  graphql(gql`
  query getPaymentMethods {
    getPaymentMethods {
      id
      name
      isEnable
      paymentType
      paymentName
      status
    }
  }
  `,
    { name: 'getAllPayments' },
    { options: { ssr: false } }
  )
)(PaymentForm))


