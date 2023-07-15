// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


// Helpers
import validate from './validate';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Component
import ListPlaceTips from '../ListPlaceTips';

import update from './update';

class Page2 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      carType: [],
      year: [],
      make: [],
      odometer: [],
      isModelValue: [],
    },
      this.changeModelType = this.changeModelType.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { listingFields, makeName } = this.props;


    if (listingFields != undefined) {
      this.setState({
        carType: listingFields.carType,
        year: listingFields.year,
        make: listingFields.make,
        odometer: listingFields.odometer,
      });
    }
  }

  componentDidMount() {
    const { valid, listingFields, makeName } = this.props;
    let ModelValues = listingFields && listingFields.model && listingFields.model.filter(o => o.makeType == makeName);

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }

    if (listingFields != undefined) {
      this.setState({
        isModelValue: ModelValues,
      })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { valid, listingFields, makeName } = nextProps;
    let ModelValues = listingFields && listingFields.model && listingFields.model.filter(o => o.makeType == makeName);

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }


    if (listingFields != undefined) {
      this.setState({
        carType: listingFields.carType,
        year: listingFields.year,
        make: listingFields.make,
        odometer: listingFields.odometer,
        isModelValue: ModelValues,
      });
    }
  }

  changeModelType(e) {
    const { model, carType, year, make } = this.state;
    const { change, listingFields } = this.props;
    let newValue = e.target.value;
    let ModelValue = listingFields.model && listingFields.model.filter(o => o.makeType == newValue);
    this.setState({
      isModelValue: ModelValue,
      makeValue: newValue,
      isTrimValue: []
    })

    if (ModelValue && ModelValue.length > 0) {
      change('model', ModelValue && ModelValue[0].id)
    } else {
      change('model', "")
    }


  }

  renderSelectField = ({ input, label, meta: { touched, error }, children }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <select
          {...input}
        >
          {children}
        </select>
        {touched && error && <span>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.requiredMessage}>{formatMessage(error)}</span>}
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }

  render() {
    const { handleSubmit, submitting, pristine, valid, previousPage, nextPage, existingList, makeName } = this.props;
    const { isDisabled, houseType, roomType, buildingSize, carType, make, isModelValue, year, odometer } = this.state;
    const { formatMessage } = this.props.intl;
    let path = "index";
    if (existingList) {
      path = "home";
    }
    return (
      <div>

        <Grid fluid>
          <Row className={cx(s.landingContainer, 'arrowPosition')}>
            <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
              <div>
                <h3 className={s.landingContentTitle}><FormattedMessage {...messages.whatKindOfPlaceListing} /></h3>
                <form onSubmit={handleSubmit}>
                  <div className={s.landingMainContent}>
                    <FormGroup className={s.formGroup}>
                      <ControlLabel className={s.landingLabel}>
                        <FormattedMessage {...messages.whatGuestHave} />
                      </ControlLabel>
                      <Field
                        name="carType"
                        component={this.renderFormControlSelect}
                        className={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                      >

                        {
                          carType.map((value, key) => {
                            return (
                              value.isEnable == 1 && <option
                                value={value.id}
                                key={key}
                              >
                                {value.itemName}
                              </option>
                            )
                          })
                        }
                      </Field>
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                      <ControlLabel className={s.landingLabel}>
                        <FormattedMessage {...messages.whatTypeOfProperty} /><span className={cx(s.errorMessage, s.requiredSection)}>*</span>
                      </ControlLabel>
                      <Field
                        name="make"
                        component={this.renderFormControlSelect}
                        className={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                        onChange={this.changeModelType}
                      >
                        <option value="">
                          {formatMessage(messages.selectLabel)}
                        </option>
                        {
                          make.map((value, key) => {
                            return (
                              value.isEnable == 1 && <option
                                value={value.id}
                                key={key}
                              >
                                {value.itemName}
                              </option>
                            )
                          })
                        }
                      </Field>
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                      <ControlLabel className={s.landingLabel}>
                        <FormattedMessage {...messages.modelLabel} /><span className={cx(s.errorMessage, s.requiredSection)}>*</span>
                      </ControlLabel>
                      <Field
                        name="model"
                        component={this.renderFormControlSelect}
                        className={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                      // onChange={this.changeTrimType}
                      >
                        <option value="">
                          {formatMessage(messages.selectLabel)}
                        </option>

                        {
                          isModelValue.map((value, key) => {
                            return (
                              value.isEnable == 1 && <option
                                value={value.id}
                                key={key}
                              >
                                {value.itemName}
                              </option>
                            )
                          })
                        }
                      </Field>
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                      <ControlLabel className={s.landingLabel}>
                        <FormattedMessage {...messages.year} />
                      </ControlLabel>
                      <Field
                        name="year"
                        component={this.renderFormControlSelect}
                        className={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                      >
                        {
                          year.map((value, key) => {
                            return (
                              value.isEnable == 1 && <option value={value.id} key={key}>{value.itemName}</option>
                            )
                          })
                        }
                      </Field>
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                      <ControlLabel className={s.landingLabel}>
                        <FormattedMessage {...messages.isPersonalHome} />
                      </ControlLabel>
                      <Field
                        name="transmission"
                        component={this.renderFormControlSelect}
                        className={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                      >
                         <option value="1">
                          {formatMessage(messages.Automatic)}
                        </option>
                        <option value="2">
                          {formatMessage(messages.Manuall)}
                        </option>
                      </Field>
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                      <ControlLabel className={s.landingLabel}>
                        <FormattedMessage {...messages.odometer} />
                      </ControlLabel>
                      <Field
                        name="odometer"
                        component={this.renderFormControlSelect}
                        className={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                      >
                        {
                          odometer.map((value, key) => {
                            return (
                              value.isEnable == 1 && <option value={value.id} key={key}>
                                {value.itemName}
                              </option>
                            )
                          })
                        }
                      </Field>
                    </FormGroup>
                  </div>
                  <div className={s.nextPosition}>
                    <div className={s.nextBackButton}>
                      <hr className={s.horizontalLineThrough} />
                      <FormGroup className={s.formGroup}>
                        <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                          <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft, 'floatRightRTL')} onClick={() => previousPage(path)}>
                            <FormattedMessage {...messages.back} />
                          </Button>
                          <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight, 'floatLeftRTL')} disabled={isDisabled} onClick={() => nextPage("location")}>
                            <FormattedMessage {...messages.next} />
                          </Button>
                        </Col>
                      </FormGroup>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
            <ListPlaceTips />
          </Row>
        </Grid>
      </div>
    )
  }
}

Page2 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page2);

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep1'); // <-- same as form name

const mapState = (state) => ({
  existingList: state.location.isExistingList,
  listingFields: state.listingFields.data,
  makeName: selector(state, 'make'),
  modelValue: selector(state, 'model'),
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Page2)));
