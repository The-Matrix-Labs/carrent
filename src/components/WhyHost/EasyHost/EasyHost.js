import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EasyHost.css';
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import Link from '../../Link';



class EasyHost extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { data } = this.props
    return (
      <div className={s.easyImage} style={{ backgroundImage: `url(/images/home/${data && data.workImage1})` }}>
        <div className={s.padding5}>
          <h2 className={s.heading}>
            {data && data.easyHostTitle1}
          </h2>
          <div>
            <Row className={s.centerFlex}>
              <Col xs={12} sm={7} md={7} lg={7} className={s.margintop20}>
                <p className={s.desc}>
                  {data && data.easyHostContent1}
                </p>
              </Col>
            </Row>
            <Row className={s.centerFlex}>
              <Col xs={12} sm={7} md={7} lg={7} className={s.margintop20}>
                <p className={s.desc}>
                  {data && data.easyHostContent2}
                </p>
              </Col>
            </Row>
          </div>
          {/* <Button className={s.tryButton}>
          <FormattedMessage {...messages.whyhostButton} />
              </Button> */}
        </div>
      </div>
    );
  }
}



export default withStyles(s)(EasyHost);
