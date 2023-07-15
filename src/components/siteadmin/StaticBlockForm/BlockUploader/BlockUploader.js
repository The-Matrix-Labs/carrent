import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BlockUploader.css';
import cp from '../../../../components/commonStyle.css';
import { formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';
import { doRemoveStaticImage } from '../../../../actions/siteadmin/manageStaticBlock';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../../locale/messages';

// Asset
import defaultPic from '../../../../../public/AdminIcons/default.svg';
import DeleteIcon from '../../../../../public/AdminIcons/dlt.png';

class BlockUploader extends React.Component {

  static propTypes = {
    staticImageLoading: PropTypes.bool,
    doRemoveStaticImage: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    staticImageLoading: false
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    const { change } = this.props;
    await change('StaticBlockForm', 'carTripImage1', null);
  }

  render() {
    const { getLogoData: { loading, getStaticInfo }, image, doRemoveStaticImage, staticImageLoading } = this.props;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Loader show={staticImageLoading} type={"page"}>
            <div className={cp.picContainerMain}>
              <div className={cp.picContainer}>
                <div className={cp.profilePic}>
                  {
                    loading && <div><FormattedMessage {...messages.loadingLabel} /></div>
                  }
                  {
                    !loading && getStaticInfo && getStaticInfo[0].value && <div
                      style={{ backgroundImage: `url(/images/home/${getStaticInfo[0].value})` }}
                      className={s.bannerImageBg}
                    />
                  }
                  {
                    !loading && getStaticInfo && !getStaticInfo[0].value && <div
                      style={{ backgroundImage: `url(${defaultPic})` }}
                      className={cp.profileImageBg}
                    />
                  }
                  {
                    !loading && getStaticInfo && getStaticInfo[0].value && <a href="javascript:void(0);" onClick={() => doRemoveStaticImage(getStaticInfo[0].image, 'carTripImage1')} className={cx(cp.trashIconNew, 'trashIconRTL')}>
                      <img src={DeleteIcon} />
                    </a>
                  }
                </div>
              </div>
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.fullWidth, cp.btnPrimaryBorder, cp.btnlarge, s.noPadding, 'adminUploader')}>
            <DropZone data={getStaticInfo} />
          </Col>
        </Col>
      </Row>
    );
  }
}
const selector = formValueSelector('StaticBlockForm');

const mapState = (state) => ({
  staticImageLoading: state.homeBannerImages.staticImageLoading,
  // image: selector(state, 'blockImage1')
});

const mapDispatch = {
  doRemoveStaticImage
};

export default compose(
  withStyles(s, cp),
  connect(mapState, mapDispatch),
  graphql(gql`
  query ($name: String) {
    getStaticInfo(name: $name) {
      name
      value
    }
  }
    `, {
      name: 'getLogoData',
      options: {
        ssr: false,
        variables: {
          name: 'carTripImage1'
        },
      }
    }),
)(BlockUploader);