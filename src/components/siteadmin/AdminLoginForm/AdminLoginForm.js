import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

import {
  Button,
  FormGroup,
  FormControl,
  Grid,
  Row
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminLoginForm.css';
import cp from '../../../components/commonStyle.css';

//Translations
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

//Images
import adminLoginImage from '../../../../public/AdminIcons/LoginPageVector.svg';
import AdminLogo from '../../../../public/AdminIcons/RentALL-logo.png';

class AdminLoginForm extends Component {

  static propTypes = {
  };

  renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <label className={cx(s.labelTextNew, s.loginLabel)}>{label}</label>
        <FormControl {...input} placeholder={label} type={type} className={cx(cp.formControlInput, s.loginInput)} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, siteSettingsData } = this.props;
    const { formatMessage } = this.props.intl;
    const title = (
      <h2>{formatMessage(messages.adminlogInLabel)}</h2>
    );
    let adminLogo = siteSettingsData && siteSettingsData.Logo ? `/images/logo/${siteSettingsData.Logo}` : AdminLogo;

    return (
      <div className={cx('loginpage', 'adminstyle')}>
        <Grid fluid>
          <Row>
            <div className={s.loginMainBg}>
              <div className={s.loginBg} style={{ backgroundImage: `url(${adminLoginImage})` }} />
              <div className={s.formSection}>
                <div className={s.formInner}>
                  <div className={s.loginTitleScetion}>
                    <img src={adminLogo} />
                    <p className={s.loginTitle}>{formatMessage(messages.welcomeAdminLabel)}</p>
                  </div>
                  <form onSubmit={handleSubmit(submit)}>
                    {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                    <FormGroup className={s.space3}>
                      <Field
                        name="email"
                        type="text"
                        component={this.renderField}
                        label={formatMessage(messages.email)}
                      />
                    </FormGroup>
                    <FormGroup className={s.space3}>
                      <Field
                        name="password"
                        type="password"
                        component={this.renderField}
                        label={formatMessage(messages.password)}
                      />
                    </FormGroup>
                    <div className={cx(s.space2, s.spaceTop5)}>
                      <Button className={cx(cp.btnPrimary, cp.fullWidth, s.loginbtn)} type="submit" disabled={submitting}>
                        <FormattedMessage {...messages.logInLabel} />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Row>
        </Grid>
      </div>
    )
  }

}
const mapState = (state) => ({
  siteSettingsData: state.siteSettings.data
});

const mapDispatch = {};

AdminLoginForm = reduxForm({
  form: 'AdminLoginForm', // a unique name for this form
  validate
})(AdminLoginForm);

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(AdminLoginForm)));