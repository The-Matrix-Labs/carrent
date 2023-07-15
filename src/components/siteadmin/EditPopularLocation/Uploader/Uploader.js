import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Uploader.css';
import cp from '../../../../components/commonStyle.css';

// Redux
import { connect } from 'react-redux';
import { doRemoveLocation } from '../../../../actions/siteadmin/manageLocationImage';

// Component
import DropZone from './DropZone';
import Avatar from '../../../Avatar';
import Loader from '../../../Loader';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../../locale/messages';

// Asset
import defaultPic from '../../../../../public/AdminIcons/default.svg';

class Uploader extends React.Component {

  static propTypes = {
    values: PropTypes.any,
    locationUploaderLoading: PropTypes.bool,
    loading: PropTypes.bool,
    doRemoveLocation: PropTypes.any.isRequired,
  };

  static defaultProps = {
    locationUploaderLoading: false,
  };

  render() {
    const { doRemoveLocation, locationUploaderLoading, values } = this.props;
    let loading = true;
    if (values) {
      loading = false;
    }
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Loader show={locationUploaderLoading} type={"page"}>
            <div className={cp.picContainerMain}>
              <div className={cp.picContainer}>
                {
                  loading && <div><FormattedMessage {...messages.loadingLabel} /></div>
                }
                {
                  !loading && values.image != null && <div
                    style={{ backgroundImage: `url(/images/popularLocation/medium_${values.image})` }}
                    className={s.bannerImageBg}
                  />
                }
                {
                  !loading && values.image === null && <div
                    style={{ backgroundImage: `url(${defaultPic})` }}
                    className={cp.profileImageBg}
                  />
                }

              </div>
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.fullWidth, cp.btnPrimaryBorder, cp.btnlarge, s.noPadding, 'adminUploader')}>
            <DropZone data={values} />
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  locationUploaderLoading: state.popularLocation.locationUploaderLoading,
});

const mapDispatch = {
  doRemoveLocation
};

export default compose(withStyles(s, cp), connect(mapState, mapDispatch))(Uploader);