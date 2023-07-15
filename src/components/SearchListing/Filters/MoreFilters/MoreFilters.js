
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MoreFilters.css';
import {
  Row,
  Col,
  Button,
  Modal
} from 'react-bootstrap';
import cx from 'classnames';

// Redux Form
import {reduxForm, formValueSelector, change, submit as submitForm, getFormValues } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../locale/messages';

// Submit
import submit from '../../SearchForm/submit';

// Internal Components
import CheckboxListItems from './CheckboxListItems';
import HomeType from './HomeType/HomeType';
import Price from './Price';
import InstantBook from './InstantBook';
import VehicleMakes from './VehicleMakes';
import Transmission from './Transmission';

class MoreFilters extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      roomType: [],
      carFeatures: [],
      spaces: [],
      carRules: [],
      make: []
    },
    homeType: []
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setBtnWrapperRef = this.setBtnWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    const { isExpand } = this.props;
    document.addEventListener('mousedown', this.handleClickOutside);
    if (isExpand) {
      document.querySelector('body').setAttribute('style', 'overflow: hidden');
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.querySelector('body').removeAttribute('style');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isExpand } = nextProps;
    if (isExpand) {
      document.querySelector('body').setAttribute('style', 'overflow: hidden');
    } else {
      document.querySelector('body').removeAttribute('style');
    }
  }

  async handleSubmit() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    await change('currentPage', 1);
    submitForm('SearchForm');
    handleTabToggle('moreFilters', !isExpand)
  }

  handleReset() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    handleTabToggle('moreFilters', !isExpand)
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setBtnWrapperRef(node) {
    this.btnWrapperRef = node;
  }

  handleClickOutside(event) {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;

    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      change('currentPage', 1);
      submitForm('SearchForm');
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle('moreFilters', !isExpand);
      }
    }
  }
 
  render() {
    const { className, handleTabToggle, isExpand, formValues, searchSettings } = this.props;
    const { fieldsSettingsData: { carFeatures, make, carRules } } = this.props;
    const { formatMessage } = this.props.intl;

    let isActive = false;

    if (formValues && (formValues.make || formValues.transmission == "Automatic" || formValues.bathrooms
      || (formValues.amenities && formValues.amenities.length) || (formValues.spaces && formValues.spaces.length)
      || (formValues.carRules && formValues.carRules.length))) {
      isActive = true;
    }
   

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx({ [s.btnSecondary]: (isExpand === true || isActive == true) }, s.btn, s.btnFontsize)}
            onClick={() => { handleTabToggle('moreFilters', !isExpand) }}>
            <span className={cx('hidden-md hidden-lg')}>
              <FormattedMessage {...messages.filter} />
            </span>
            <span className={cx('hidden-xs hidden-sm')}>
              <FormattedMessage {...messages.moreFilters} />
            </span>
          </Button>
        </div>
        <Modal show={isExpand} animation={false} onHide={() => { handleTabToggle('moreFilters', !isExpand) }} className={'moreFilterModal'}>
          <Modal.Header closeButton>
            <FormattedMessage {...messages.moreFilters} />
          </Modal.Header>
          <Modal.Body>
        <div className={s.filterSection} ref={this.setWrapperRef}>
          {/* <div> */}
            {/* <div className={cx(s.searchFilterPopoverContent, s.padding6)}>
              <div className={cx('visible-xs', s.searchFilterPopoverHeader, s.showTabletSection)}>
                <div className={cx(s.displayTable)}>
                  <div className={cx('text-left', s.displayTableCell, s.searchFilterCloseIcon)}>
                    <span onClick={this.handleSubmit}>
                      <MdClear />
                    </span>
                  </div>
                </div>
              </div> */}

              <HomeType 
                className={cx(s.filters, 'visible-xs',  s.space4, s.showTabletSection)}
              />
             
              <Price
                className={cx(s.filters, 'visible-xs', s.space4, s.showTabletSection)}
                searchSettings={searchSettings}
              />
              <InstantBook
                className={cx(s.filters, 'visible-xs', s.space4, s.showTabletSection)}
              />
              {/* <RoomsBeds 
                className={s.filters} 
              /> */}
              <Row className={cx(s.filters,s.transmissionBottom,s.marginNone)}>
              <Col lg={4} md={4} sm={4} xs={12} className={s.paddingNone}>
              <VehicleMakes
                options={make}
              />
              </Col>
              <Col lg={8} md={8} sm={8} xs={12} className={cx(s.marginTop20,s.paddingNone)}>
              <Transmission />
              </Col>
              </Row>
              <CheckboxListItems
                className={s.filters}
                fieldName={'amenities'}
                options={carFeatures}
                captionTitle={formatMessage(messages.aminities)}
                showLabel={formatMessage(messages.showCarFeatures)}
                hideLabel={formatMessage(messages.closeCarFeatures)}
                isActive={formValues && formValues.amenities && formValues.amenities.length > 0}
              />
              {/* <CheckboxListItems
                className={s.filters}
                fieldName={'spaces'}
                options={spaces}
                captionTitle={formatMessage(messages.facilities)}
                showLabel={formatMessage(messages.showAllFacilities)}
                hideLabel={formatMessage(messages.closeFacilities)}
                isActive={formValues && formValues.spaces && formValues.spaces.length > 0}
              /> */}
              <div className={s.houseMobile}>
                <CheckboxListItems
                  className={s.filters}
                  fieldName={'houseRules'}
                  options={carRules}
                  captionTitle={formatMessage(messages.houseRules)}
                  showLabel={formatMessage(messages.showAllHouseRules)}
                  hideLabel={formatMessage(messages.closeHouseRules)}
                  isActive={formValues && formValues.carRules && formValues.carRules.length > 0}
                />
              </div>
              </div>
              <div className={cx(s.filtersFooter)}>    
              <Row>
                  <Col
                    lg={12} 
                    md={12}
                    sm={12} smOffset={0}
                    xs={12} xsOffset={0} className={s.paddingZero}>
                    <Col lg={6} md={6} sm={6} xs={6} className={s.spaceTop1}>
                      <Button
                        bsStyle="link"
                        className={cx(s.btnLink)}
                        onClick={this.handleReset}>
                        <FormattedMessage {...messages.cancel} />
                      </Button>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6} className={cx(s.applyTextRight, 'textAlignLeftRTL')}>
                      <Button
                        className={cx(s.btn, s.btnSecondary, s.fullWidth)}
                        onClick={this.handleSubmit}>
                        <FormattedMessage {...messages.applyFilters} />
                      </Button>
                    </Col>
                  </Col>
                </Row>
              </div>
              </Modal.Body>
             </Modal>
      </div>
    );
  }
}

MoreFilters = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(MoreFilters);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  homeType: selector(state, 'roomType'),
  formValues: getFormValues('SearchForm')(state),
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MoreFilters)));