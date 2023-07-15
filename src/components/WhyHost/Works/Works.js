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
  Image,
  FieldGroup,
  Panel,
  Label,
} from 'react-bootstrap';
import car from './car.png';
import shield from './shield.png';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Works.css';
import { FormattedMessage } from 'react-intl';
import Link from '../../Link';
import messages from '../../../locale/messages';



class Works extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { data } = this.props
    return (

      <div className={s.bcgblack}>
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h3 className={cx(s.heading, s.center, s.marginbottom20)}>
                {data && data.workTitleHeading}
              </h3>
              <Col xs={12} sm={6} md={6} lg={6} className={cx(s.whyblock, s.margin200)}>

                <div className={s.carImage}>
                  <Image src={shield} />
                </div>
                <h4 className={s.common}>
                  {data && data.workTitle1}
                </h4>

                <p className={s.common}>
                  {data && data.workContent1}
                  {/* <div className={s.margintop20}> <Button className={s.tryButton}> Learn More</Button></div> */}
                </p>
              </Col>

              <Col xs={12} sm={6} md={6} lg={6} className={cx(s.whyblock, s.margin200)}>

                <div className={s.carImage}>
                  <Image src={car} />
                </div>

                <h4 className={s.common}>
                  {data && data.workTitle2}
                </h4>

                <p className={s.common}>
                  {data && data.workContent2}
                </p>
              </Col>

            </Col>
          </Row>
          {/* <h3 className={cx(s.center, s.marginbottom20)}>
            <div> IT’S TOTALLY FREE TO LIST YOUR CAR ON RentALL. </div>

            <div className={s.margintop10}>   NO MONTHLY FEES, NO BUY-IN. </div>
          </h3> */}

        </div>
      </div>


    );
  }
}



export default withStyles(s)(Works);
