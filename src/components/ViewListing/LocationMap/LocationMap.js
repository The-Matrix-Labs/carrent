import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LocationMap.css';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Redux
import { connect } from 'react-redux';

// Google Places Map Component
//import GoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMapLoader from "react-google-maps-loader";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from "react-google-maps";

// Constants
import { googleMapAPI } from '../../../config';
import { COMMON_COLOR } from '../../../constants/index';

// Assets
import mapPinIcon from './map-pin.png';

// Locale
import messages from '../../../locale/messages';

// Redux Actions
import { setStickyBottom } from '../../../actions/Sticky/StrickyActions';

const GoogleMapPlace =
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      center={props.center}
      defaultOptions={{
      backgroundColor: '',
      scrollwheel: false,
      maxZoom: 16,
      minZoom: 11,
      streetViewControl: false,
      zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
      },
      mapTypeControl: false,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ]
      
      }}
    >
      <Circle
        center={props.center}
        radius={800}
        options={{
        fillColor: COMMON_COLOR,
        strokeColor: COMMON_COLOR,
        }}
      />
      {/* <Marker
      position={props.markers.position}
      draggable={false}
      icon={{
        url: mapPinIcon
      }}
    /> */}
    </GoogleMap>
  ));


class LocationMap extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: {},
      markers: null,
    }
  }

  UNSAFE_componentWillMount() {
    const { data } = this.props;
    let lat = data.lat;
    let lng = data.lng;
    this.setState({
      center: {
        lat: Number(lat),
        lng: Number(lng),
      },
      smallDevice: false
    });
    // this.handleResize = this.handleResize.bind(this);

  }

  // componentDidMount () {

  //   const { setStickyBottom } = this.props;
  //   const { smallDevice } = this.state;
  //   let sticky = document.querySelector('[data-sticky-bottom]'), stickyBottom = 1615; //2474;
  //   stickyBottom = (sticky.getBoundingClientRect().top);
  //   let bottomElementHeight = 1527;
  //   let windowHeight = document.documentElement.getBoundingClientRect().height || 3000;
  //   let isBrowser = typeof window !== 'undefined';
  //   if (isBrowser) {
  //       this.handleResize();
  //       window.addEventListener('resize', this.handleResize);
  //   }
  //   if (!smallDevice) {
  //       document.addEventListener('scroll', () => {
  //           windowHeight = document.documentElement.getBoundingClientRect().height;
  //           if ((windowHeight - bottomElementHeight) > stickyBottom) {
  //               stickyBottom = windowHeight - bottomElementHeight;
  //               setStickyBottom(stickyBottom + 20);
  //           }
  //       });
  //   }
  //   else {
  //       document.addEventListener('scroll', () => {
  //           windowHeight = document.documentElement.getBoundingClientRect().height;

  //           if ((windowHeight - bottomElementHeight) > stickyBottom) {
  //               stickyBottom = windowHeight - bottomElementHeight;
  //               setMobileStickyBottom(stickyBottom + 20);
  //           }
  //       });
  //   }

  //   stickyBottom = (sticky.getBoundingClientRect().top > stickyBottom) ? sticky.getBoundingClientRect().top : stickyBottom;

  //   setStickyBottom(stickyBottom);

  // }

  // componentWillUnmount() {
  //   let isBrowser = typeof window !== 'undefined';
  //   if (isBrowser) {
  //       window.removeEventListener('resize', this.handleResize);
  //   }
  // }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   const { setStickyBottom } = this.props;
  //   let sticky = document.querySelector('[data-sticky-bottom]'), stickyBottom = 1615; //2474;
  //   stickyBottom = (sticky.getBoundingClientRect().top);
  //   setStickyBottom(stickyBottom);;
  // }

  //   handleResize(e) {
  //     let isBrowser = typeof window !== 'undefined';
  //     let smallDevice = isBrowser ? window.matchMedia('(max-width: 768px)').matches : false;
  //     this.setState({ smallDevice });
  // }

  render() {
    const { center } = this.state;
    const { data } = this.props;

    let displayName = data.user.profile.displayName;
    let city = data.city;
    let country = data.country;

    return (
      <Row className={cx(s.pageContent)} >
      
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.newListingDesign, 'viewListingMap')}>
          <h1 className={cx(s.sectionTitleText, s.space2)}><FormattedMessage {...messages.neighborhood} /></h1>
        {/* </Col>
        <Col xs={12} sm={12} md={8} lg={8} className={cx(s.space2)}> */}
          <p><span className={cx(s.text)}>{displayName}{' '}<FormattedMessage {...messages.propertyLocated} />{' '}{city}, {country}</span></p>
          <div style={{ height: 350 }}>
            <ReactGoogleMapLoader
              params={{
                key: googleMapAPI, // Define your api key here
                libraries: "places,geometry"// To request multiple libraries, separate them with a comma
              }}
              render={googleMaps =>
                googleMaps && (
                  <GoogleMapPlace
                    containerElement={
                      <div style={{ width: '100%', height: `100%` }} />
                    }
                    mapElement={
                      <div style={{ width: '100%', height: `100%` }} />
                    }
                    center={center}
                    markers={{
                      position: new google.maps.LatLng(center.lat, center.lng)
                    }}
                  />
                )}
            />
          </div>
          <p className={s.spaceTop1}>
            <span className={cx(s.text)}><FormattedMessage {...messages.neighborhoodInfo} /></span>
          </p>
        </Col>
       
      </Row>
    );
  }
}

//export default withStyles(s)(LocationMap);

const mapState = (state) => ({

});

const mapDispatch = {
  // setStickyBottom
};

// export default GoogleMapLoader(withStyles(s)(connect(mapState, mapDispatch)(LocationMap)), {
//   libraries: ["places", "geometry"],
//   region: "US",
//   language: "en",
//   key: googleMapAPI,
// });

export default withStyles(s)(connect(mapState, mapDispatch)(LocationMap));
