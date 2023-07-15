import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddPopularLocationManagement.css';
import cp from '../../../components/commonStyle.css';
import { Field, reduxForm, change } from 'redux-form';
import submit from './submit';
import validate from './validate';
import Link from '../../Link';

// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import Uploader from './Uploader';
import PlaceGeoSuggest from './PlaceGeoSuggest';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class AddPopularLocationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    data: []
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <FormControl {...input}  type={type} className={cx(className, cp.formControlInput)} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderPlacesSuggest = ({ input, label, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space2}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <PlaceGeoSuggest
              {...input}
              label={label}
              className={className}
              formName={'AddPopularLocation'}
            />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    )
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { data } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'addpopular-autocomplete', 'pagecontentWrapperRTL')}>
        <div>
            <h1 className={s.headerTitle}><FormattedMessage {...messages.addPopularLocation} /></h1>
            <Col xs={12} sm={12} md={8} lg={7} className={s.blockcenter}>
              <div className={cx(s.space4, cp.textAlignRight)}>
                <Link to={'/siteadmin/popularlocation'} className={cx(cp.btnPrimaryBorder, cp.btnlarge)}>
                  <FormattedMessage {...messages.goBack} />
                </Link>
              </div>
              <div className={s.panelHeader}>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <FormGroup className={s.space3}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.imageLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Uploader />
                      </Col>
                    </Row>
                  </FormGroup>
                  <Field name="location" type="text" component={this.renderFormControl} label={formatMessage(messages.location)} />
                 <Field name="locationAddress" type="text" component={this.renderPlacesSuggest} label={formatMessage(messages.locationAddress)} />
                  <FormGroup className={s.noMargin}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={cp.textAlignRight}>
                        <Button className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting} >
                            <FormattedMessage {...messages.save} />
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </form>
              </div>
            </Col>
        </div>
      </div>
    );
  }

}

AddPopularLocationManagement = reduxForm({
  form: 'AddPopularLocation', // a unique name for this form
  validate
})(AddPopularLocationManagement);

const mapState = (state) => ({
});

const mapDispatch = {

};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(AddPopularLocationManagement)));