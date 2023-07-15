
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LocationSearchForm.css';

import { Field, reduxForm } from 'redux-form';

import {
  Button,
  Row, 
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import ReactGoogleMapLoader from "react-google-maps-loader";

// History
import history from '../../../core/history';

// Components
import PlaceGeoSuggest from '../PlaceGeoSuggest';

// Redux Action
import { getSpecificSettings } from '../../../actions/getSpecificSettings';
import { setPersonalizedValues } from '../../../actions/personalized';

// Helper
import detectMobileBrowsers from '../../../helpers/detectMobileBrowsers';

// Locale
import messages from '../../../locale/messages';

// Config
import { googleMapAPI } from '../../../config';

//Images
import steering from './steering.svg'


class LocationSearchForm extends React.Component {
  static propTypes = {
    setPersonalizedValues: PropTypes.any.isRequired,
    getSpecificSettings: PropTypes.any.isRequired,
    personalized: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      chosen: PropTypes.number,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      personCapacity: PropTypes.number,
      formatMessage: PropTypes.any,
    }),
    settingsData: PropTypes.shape({
      listSettings: PropTypes.array.isRequired
    }).isRequired
  };

  static defaultProps = {
    listingFields: []
  };


  static defaultProps = {
    personalized: {
      location: null,
      lat: null,
      lng: null,
      startDate: null,
      endDate: null,
      personCapacity: null,
      chosen: null
    },
    settingsData: {
      listSettings: []
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      mobileDevice: false,
      personCapacity: []

    },
      this.handleClick = this.handleClick.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity
      });
    }
  }

  UNSAFE_componentWillMount() {
    const { getSpecificSettings, listingFields } = this.props;
    // Get PersonCapacity Settings Data
    //getSpecificSettings(2);
    if (detectMobileBrowsers.isMobile() === true) {
      this.setState({ mobileDevice: true });
    }
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity
      });
    }

  }


  handleClick() {
    const { personalized, setPersonalizedValues } = this.props;
    let updatedURI, uri = '/s?';

    if (personalized.chosen != null) {
      uri = uri + '&address=' + personalized.location + '&chosen=' + personalized.chosen;
    } else {
      if (personalized.location != null) {
        uri = uri + '&address=' + personalized.location;
      }
    }

    updatedURI = encodeURI(uri);
    history.push(updatedURI);
  }

  render() {

    const { location, dates, settingsData, setPersonalizedValues, personalized, listingFields } = this.props;
    const { formatMessage } = this.props.intl;
    const { personCapacity } = this.state;
    let rows = []; const isBrowser = typeof window !== 'undefined';

    const smallDevice = isBrowser ? window.matchMedia('(max-width: 640px)').matches : undefined;

    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <form>
              <div className={cx(s.searchFormContainer, 'homeSearchForm', 'homeLocationSearchForm')}>
                <div className={s.searchForm}>
                  <div className={cx(s.displayTable)}>
                    <div className={cx(s.displayTableRow)}>
                      <div className={cx(s.displayTableCell, s.locationSection)}>
                        <div className={cx(s.displayTable)}>
                          <div className={cx(s.displayTableRow)}>
                            <div className={cx(s.searchIconContainer, s.displayTableCell, 'steering', 'searchIconContainerRTL')}>
                              <svg className={s.steeringImage}>
                                <use xlinkHref={steering + '#Layer_3'}></use>
                              </svg>
                            </div>
                            <div className={cx(s.locationTableCell, s.displayTableCell, s.paddingLeft)}>
                              <ReactGoogleMapLoader
                                params={{
                                  key: googleMapAPI, // Define your api key here
                                  libraries: "places", // To request multiple libraries, separate them with a comma
                                }}
                                render={googleMaps =>
                                  googleMaps && (
                                    <PlaceGeoSuggest
                                      label={formatMessage(messages.homeWhere)}
                                      className={cx(s.formControlInput, s.input)}
                                      containerClassName={s.geoSuggestContainer}
                                    />)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx(s.searchBtnContainer, 'searchBtnContainerRTL')}>
                        <Button className={cx(s.btn, s.btnPrimary, s.btnBlock, s.btnLarge)} onClick={this.handleClick}>
                          <span className={cx('hidden-lg hidden-md')}><FontAwesome.FaSearch /></span>
                          <span className={cx('hidden-sm hidden-xs')}>
                            <FormattedMessage {...messages.search} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

LocationSearchForm = reduxForm({
  form: 'SearchForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(LocationSearchForm);

const mapState = (state) => ({
  personalized: state.personalized,
  settingsData: state.viewListing.settingsData,
  listingFields: state.listingFields.data,
});

const mapDispatch = {
  getSpecificSettings,
  setPersonalizedValues
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(LocationSearchForm)));
