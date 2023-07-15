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
import { doRemoveLogo } from '../../../../actions/siteadmin/manageLogo';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../../locale/messages';

// Asset
import defaultPic from '../../../../../public/AdminIcons/default.svg';
import DeleteIcon from '../../../../../public/AdminIcons/dlt.png';


class Uploader extends React.Component {

  static propTypes = {
    logoUploaderLoading: PropTypes.bool,
    doRemoveLogo: PropTypes.any.isRequired,
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
    logoUploaderLoading: false
  };

  render() {
    const { getLogoData: { loading, getLogo }, doRemoveLogo, logoUploaderLoading } = this.props;
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Loader
            show={logoUploaderLoading}
            type={"page"}
          >
            <div className={cp.picContainerMain}>
              <div className={cp.picContainer}>
                <div className={cp.profilePic}>
                {
                  loading && <div><FormattedMessage {...messages.loadingLabel} /></div>
                }
                {
                  !loading && getLogo != null && <div 
                  style={{ backgroundImage: `url(/images/logo/${getLogo.value})` }}
                  className={cp.profileImageBg}
                  />
                }
                {
                  !loading && getLogo === null && <div
                  style={{ backgroundImage: `url(${defaultPic})` }}
                  className={cp.profileImageBg}
                  /> 
                }
              </div>
              {
                !loading && getLogo != null && <a href="javascript:void(0);" onClick={() => doRemoveLogo(getLogo.value)}  className={cx(cp.trashIconNew, 'trashIconRTL')}>
                   <img src={DeleteIcon} alt='Delete' />
                </a>
              }
            </div>
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.fullWidth, cp.btnPrimaryBorder, cp.btnlarge, s.noPadding, 'adminUploader')}>
            <DropZone data={getLogo} />
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  logoUploaderLoading: state.siteSettings.logoUploaderLoading
});

const mapDispatch = {
  doRemoveLogo
};

export default compose(
  withStyles(s, cp),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getLogo{
        getLogo {
          id
          title
          name
          value
          type
        }
      }
    `, {
      name: 'getLogoData',
      options: {
        ssr: false
      }
    }),
)(Uploader);