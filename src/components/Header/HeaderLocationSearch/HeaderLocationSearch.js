import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { change, submit as submitForm } from 'redux-form';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Google Places Suggest Component
//import GoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMapLoader from "react-google-maps-loader";

// Constants
import { googleMapAPI } from '../../../config';

import Geosuggest from 'react-geosuggest';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';
import c from './HeaderLocationSearch.css';
import cx from 'classnames';

// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';

// Locale
import messages from '../../../locale/messages';

// History
import history from '../../../core/history';

//Images 

import steering from './steering.svg'

class HeaderLocationSearch extends Component {

    static propTypes = {
        label: PropTypes.string,
        className: PropTypes.string,
        containerClassName: PropTypes.string,
        setPersonalizedValues: PropTypes.any,
        googleMaps: PropTypes.object,
        personalized: PropTypes.shape({
            location: PropTypes.string,
            lat: PropTypes.number,
            lng: PropTypes.number,
            geography: PropTypes.string
        })
    };

    static defaultProps = {
        personalized: {
            location: ''
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            locationValue: ''
        };
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const { personalized, personalized: { location } } = this.props;
        if (personalized && location) {
            this.setState({
                locationValue: location
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { personalized, personalized: { location } } = nextProps;
        if (personalized) {
            this.setState({
                locationValue: location
            });
        }
    }

    onSuggestSelect(data) {
        const { setPersonalizedValues } = this.props;
        let locationData = {};
        let updatedURI, uri = '/s?';
        let types = [], geoType;
        if (data && data.gmaps) {
            types = data.gmaps.types;
            data.gmaps.address_components.map((item, key) => {
                if (item.types[0] == "administrative_area_level_1") {
                    locationData["administrative_area_level_1_short"] = item.short_name;
                    locationData["administrative_area_level_1_long"] = item.long_name;
                } else if (item.types[0] == "country") {
                    locationData[item.types[0]] = item.short_name;
                } else {
                    locationData[item.types[0]] = item.long_name;
                }
            });

            if (types && types.length > 0) {
                if (types.indexOf("country") > -1) {
                    geoType = "country";
                } else if (types.indexOf("administrative_area_level_1") > -1) {
                    geoType = "state";
                } else if (types.indexOf("street_address") > -1 || types.indexOf("route") > -1) {
                    geoType = "street";
                } else {
                    geoType = null;
                }
            }
            setPersonalizedValues({ name: 'geography', value: JSON.stringify(locationData) });
            setPersonalizedValues({ name: 'geoType', value: geoType });
            setPersonalizedValues({ name: 'location', value: data.label });
            setPersonalizedValues({ name: 'lat', value: data.location.lat });
            setPersonalizedValues({ name: 'lng', value: data.location.lng });
            setPersonalizedValues({ name: 'chosen', value: 1 });
            //setPersonalizedValues({ name: 'showMap', value: true });
            uri = uri + '&address=' + data.label + '&chosen=' + 1;

            updatedURI = encodeURI(uri);
            history.push(updatedURI);
        }
    }

    onChange(value) {
        const { setPersonalizedValues, change, submitForm } = this.props;
        let location;
        let updatedURI, uri = '/s';
        if (history.location) {
            location = history.location.pathname;
        }
        setPersonalizedValues({ name: 'location', value });
        setPersonalizedValues({ name: 'geoType', value: null });
        setPersonalizedValues({ name: 'chosen', value: null });
        setPersonalizedValues({ name: 'geography', value: null });
        setPersonalizedValues({ name: 'lat', value: null });
        setPersonalizedValues({ name: 'lng', value: null });
        //setPersonalizedValues({ name: 'showMap', value: true });

        if (location == '/s' && !value) {
            setPersonalizedValues({ name: 'location', value: "" });
            change('SearchForm', 'geography', null);
            change('SearchForm', 'geoType', null);
            change('SearchForm', 'lat', null);
            change('SearchForm', 'lng', null);
            change('SearchForm', 'lat', null);
            change('SearchForm', 'searchByMap', false);

            // submitForm('SearchForm');
            updatedURI = encodeURI(uri);
            history.push(updatedURI);

        }
    }

    render() {
        const { className, containerClassName, personalized } = this.props;
        const { formatMessage } = this.props.intl;
        const { locationValue } = this.state;

        return (
            <div className={'headerSearch'}>
                <div className={cx(c.displayTable, c.searchContainer)}>
                    <div className={cx(c.displayTableCell, c.searchIconContainer, 'steering', 'searchIconContainerRTL')}>
                        <svg className={c.steeringImage}>
                            <use xlinkHref={steering + '#Layer_3'}></use>
                        </svg>
                    </div>
                    <div className={c.displayTableCell}>
                        <ReactGoogleMapLoader
                            params={{
                                key: googleMapAPI, // Define your api key here
                                libraries: "places", // To request multiple libraries, separate them with a comma
                            }}
                            render={googleMaps =>
                                googleMaps && (
                                    <Geosuggest
                                        ref={el => this._geoSuggest = el}
                                        placeholder={formatMessage(messages.homeWhere)}
                                        inputClassName={className}
                                        className={containerClassName}
                                        initialValue={locationValue}
                                        onChange={this.onChange}
                                        onSuggestSelect={this.onSuggestSelect}
                                    />
                                )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    personalized: state.personalized
});

const mapDispatch = {
    setPersonalizedValues,
    change,
    submitForm
};

// export default GoogleMapLoader(injectIntl(withStyles(s, c)(connect(mapState, mapDispatch)(HeaderLocationSearch))), {
//   libraries: ["places"],
//   region: "US",
//   language: "en",
//   key: googleMapAPI,
// });

export default injectIntl(withStyles(s, c)(connect(mapState, mapDispatch)(HeaderLocationSearch)));