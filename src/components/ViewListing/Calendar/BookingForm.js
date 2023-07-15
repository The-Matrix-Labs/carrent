import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';
// Redux action
import { bookingProcess } from '../../../actions/booking/bookingProcess';
// Component
import DateRange from '../DateRange';
import CurrencyConverter from '../../CurrencyConverter';
import BillDetails from './BillDetails';
import BookingButton from './BookingButton';
import moment from 'moment'
import TimeField from '../TimeField';
import { formattingTime, generateTimes } from '../../../helpers/formatting';
import CustomCheckbox from '../../CustomCheckbox';

class BookingForm extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    personCapacity: PropTypes.number.isRequired,
    basePrice: PropTypes.number.isRequired,
    delivery: PropTypes.number,
    currency: PropTypes.string,
    monthlyDiscount: PropTypes.number,
    weeklyDiscount: PropTypes.number,
    minDay: PropTypes.number,
    maxDay: PropTypes.number,
    maxDaysNotice: PropTypes.string,
    loading: PropTypes.bool,
    availability: PropTypes.bool,
    maximumStay: PropTypes.bool,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    blockedDates: PropTypes.array,
    isHost: PropTypes.bool.isRequired,
    guests: PropTypes.number,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    bookingType: PropTypes.string.isRequired,
    bookingLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
    account: PropTypes.shape({
      userBanStatus: PropTypes.number,
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      includeDelivery: false
    }

    this.handleCheckBox = this.handleCheckBox.bind(this)
    // this.handleChange = this.handleChange.bind(this);
  }

  static defaultProps = {
    blockedDates: [],
    availability: true,
    maximumStay: false,
    startDate: null,
    endDate: null,
    guests: 1,
    personCapacity: 0,
  };

  componentDidMount() {
    const { URLRoomType, roomType, change } = this.props;
    this.setState({ includeDelivery: URLRoomType == "true" ? true : false })
    change('roomType', URLRoomType == "true" ? true : false)
  }


  renderFormControlSelect({ input, label, meta: { touched, error }, children, className }) {
    return (
      <div className={'inputFocusColor viewListSelectRTL'}>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    );
  }

  renderGuests(personCapacity) {
    const { formatMessage } = this.props.intl;
    const rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? formatMessage(messages.guests) : formatMessage(messages.guest)}</option>);
    }
    return rows;
  }

  handleCheckBox(event) {
    const { change } = this.props;
    const { includeDelivery } = this.state;
    this.setState({ includeDelivery: !includeDelivery });
    change('roomType', event);
  }
  checkboxHorizontalGroup = ({ label, name, options, input }) => {
    const { formatMessage } = this.props.intl;
    const { delivery, currency, roomType } = this.props

    return (
      <div className={cx(s.displayTable)}>
        <div className={cx(s.displayTableRow)}>
          <div className={cx(s.displayTableCell, s.padding4, s.checkboxSection, s.NHtype)}>
            <CustomCheckbox
              className={'icheckbox_square-green'}
              onChange={event => {
                this.handleCheckBox(event);
              }}
              checked={roomType}
              value={true}
            />
          </div>
          <div className={cx(s.displayTableCell, s.captionTitle, s.padding4, s.NhName, 'NhNameRTL')}>
            <span className={s.text}>{formatMessage(messages.doorstepDelivery)}</span>
            <span className={s.deliveryFee}>({formatMessage(messages.deliveryCharges)}{' '}-{' '}{<CurrencyConverter amount={delivery} from={currency} />})</span>
          </div>
        </div>
      </div>
    )
  };


  render() {
    const { includeDelivery } = this.state;
    const { formatMessage } = this.props.intl;
    const { id, personCapacity, basePrice, delivery, currency, isHost, bookingType } = this.props;
    const { monthlyDiscount, weeklyDiscount, minDay, maxDay, maxDaysNotice, securityDeposit } = this.props;
    const { isLoading, availability, maximumStay, guests, startDate, endDate, account, blockedDates } = this.props;
    const { bookingProcess, serviceFees, base, rates, bookingLoading, initialValues, startTime, endTime } = this.props;
    const { roomType, URLRoomType } = this.props;
    const isDateChosen = startDate != null && endDate != null || false;
    let userBanStatusValue, deliveryFee, deliveryStatus;;

    if (account) {
      const { account: { userBanStatus } } = this.props;
      userBanStatusValue = userBanStatus;
    }

    if (includeDelivery) {
      deliveryFee = delivery
      deliveryStatus = 'include'
    } else {
      deliveryFee = 0
      deliveryStatus = 'exclude'
    }


    let isDisabled = false;
    let isValue = true;
    let momentStartDate, momentEndDate, dayDifference;
    momentStartDate = moment(startDate);
    momentEndDate = moment(endDate);
    dayDifference = momentEndDate.diff(momentStartDate, 'days');


    let isTimeChosen = startTime && endTime ? true : false;
    // const isSameTime = (startTime >= endTime) || false;
    let isSameTime = startTime && endTime ? true : false;

    if ((startTime >= endTime) && dayDifference == 0) {
      isValue = false;
      isDisabled = true;
    }
    if (!isTimeChosen) {
      isDisabled = true;
    } else if (!isDateChosen) {
      isDisabled = true;
    }


    let isToday = false;

    let startTimeLookup = generateTimes(360, 1410, isToday);
    let endTimeLookup = generateTimes(390, 360);

    if (momentStartDate) {
      isToday = moment(moment(momentStartDate)).isSame(moment(), 'day');
      startTimeLookup = generateTimes(360, 1410, isToday);
    }

    if (momentEndDate) {
      isToday = moment(moment(momentEndDate)).isSame(moment(), 'day');
      endTimeLookup = generateTimes(390, 360, isToday);
    }

    return (
      <Form>
        <FormGroup className={s.formGroup}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <label className={s.text}>
                <span><FormattedMessage {...messages.dates} /></span>
              </label>
              <span className={cx('viewListingDate')}>
                <DateRange
                  listId={id}
                  minimumNights={minDay}
                  maximumNights={maxDay}
                  blockedDates={blockedDates}
                  formName={'BookingForm'}
                  maxDaysNotice={maxDaysNotice}
                  startTime={startTime}
                  endTime={endTime}
                />
              </span>

              <FormGroup className={cx(s.formGroup, s.noMargin)}>
                <Row className={s.tripMargin}>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <label className={s.text}><span>{formatMessage(messages.startLabel)}</span></label>
                    <TimeField
                      name={"startTime"}
                      className={cx(s.formControlSelect)}
                      TimeLookup={startTimeLookup}
                      formName={"BookingForm"}
                      label={formatMessage(messages.tripStart)}
                      listId={id}
                      startDate={startDate}
                      endDate={endDate}
                      startTime={startTime}
                      endTime={endTime}
                      maximumNights={maxDay}
                      value={startTime}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    {/* <label className={s.text}><span>{formatMessage(messages.endLabel)}</span></label> */}
                    <TimeField
                      name={"endTime"}
                      className={cx(s.formControlSelect, s.tripMarginTop)}
                      TimeLookup={endTimeLookup}
                      formName={"BookingForm"}
                      label={formatMessage(messages.tripEnd)}
                      listId={id}
                      startDate={startDate}
                      endDate={endDate}
                      startTime={startTime}
                      endTime={endTime}
                      maximumNights={maxDay}
                      value={endTime}
                    />
                  </Col>
                </Row>
              </FormGroup>
              {/* {
                delivery && 
                <div>
                  <FormGroup className={s.formGroup}>
                    <Row className={s.tripMargin}>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Checkbox onClick={this.handleCheckBox}>
                          <label className={s.text}><span>{formatMessage(messages.doorstepDelivery)}</span></label>
                        </Checkbox>
                      </Col>
                    </Row>
                  </FormGroup>
                </div>
              } */}
              {
                (delivery != null || delivery != undefined) && Number(delivery) > 0 &&
                <div>
                  <FormGroup className={cx(s.formGroup, s.noMargin)}>
                    <Field
                      name="roomType"
                      component={this.checkboxHorizontalGroup}
                    />
                  </FormGroup>
                </div>
              }

            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          {/* <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <ControlLabel className={s.text}><FormattedMessage {...messages.guest} /></ControlLabel>
              <Field 
                name="guests" 
                component={this.renderFormControlSelect} 
                className={s.formControlSelect} 
              >
                {this.renderGuests(personCapacity)}
              </Field>
            </Col>
          </Row> */}
        </FormGroup>
        <FormGroup>
          {
            !isLoading && maximumStay && isDateChosen && !userBanStatusValue && <div className={cx(s.bookItMessage, s.spaceTop1)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}>
                <FormattedMessage {...messages.maximumStay} /> {maxDay} {maxDay > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
              </p>
            </div>
          }
          {
            !isLoading && !availability && isDateChosen && !userBanStatusValue && <div className={cx(s.bookItMessage, s.spaceTop1)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}>
                <FormattedMessage {...messages.hostErrorMessage2} />
              </p>
            </div>
          }
          {/* {
            isTimeChosen && isSameTime && <div className={cx(s.bookItMessage, s.spaceTop1)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}>You must choose different end time</p>
            </div>
          } */}
          {
            isTimeChosen && !isValue && <div className={cx(s.bookItMessage, s.spaceTop1)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}><FormattedMessage {...messages.youMustChooseTime} /></p>
            </div>
          }
        </FormGroup>

        {
          !maximumStay && availability && isDateChosen && !userBanStatusValue && isTimeChosen && isValue && <BillDetails
            basePrice={basePrice}
            delivery={deliveryFee}
            currency={currency}
            monthlyDiscount={monthlyDiscount}
            weeklyDiscount={weeklyDiscount}
            startDate={startDate}
            endDate={endDate}
            serviceFees={serviceFees}
            base={base}
            rates={rates}
            securityDeposit={securityDeposit}
          />
        }
        <BookingButton
          listId={id}
          startDate={startDate}
          endDate={endDate}
          guests={!isNaN(guests) ? guests : 1}
          bookingProcess={bookingProcess}
          availability={availability}
          isDateChosen={isDateChosen}
          userBanStatus={userBanStatusValue}
          basePrice={basePrice}
          isHost={isHost}
          bookingType={bookingType}
          bookingLoading={bookingLoading}
          maximumStay={maximumStay}
          isDisabled={isDisabled}
          startTime={startTime}
          endTime={endTime}
          deliveryStatus={deliveryStatus}
          roomType={roomType}
        />
      </Form>
    );
  }
}
BookingForm = reduxForm({
  form: 'BookingForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(BookingForm);
// Decorate with connect to read form values
const selector = formValueSelector('BookingForm'); // <-- same as form name

const mapState = state => ({
  isLoading: state.viewListing.isLoading,
  availability: state.viewListing.availability,
  maximumStay: state.viewListing.maximumStay,
  startDate: selector(state, 'startDate'),
  endDate: selector(state, 'endDate'),
  guests: Number(selector(state, 'guests')),
  account: state.account.data,
  serviceFees: state.book.serviceFees,
  base: state.currency.base,
  rates: state.currency.rates,
  bookingLoading: state.book.bookingLoading,
  startTime: Number(selector(state, 'startTime')),
  endTime: Number(selector(state, 'endTime')),
  roomType: selector(state, 'roomType')
});
const mapDispatch = {
  bookingProcess,
};
export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(BookingForm)));
