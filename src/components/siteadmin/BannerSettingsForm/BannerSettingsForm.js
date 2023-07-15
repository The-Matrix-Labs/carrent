import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';

// Style
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BannerSettingsForm.css';
import cp from '../../../components/commonStyle.css';

import DropZone from './DropZone';
import Loader from '../../Loader';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

class BannerSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          rows='4'
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={cx(className, cp.formControlInput)} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title, bannerUploaderLoading, image, id } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.bannerSettings} /></h1>
          <Col xs={12} sm={12} md={8} lg={7} className={s.blockcenter}>
            <div className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.homeBannerImage} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} className={cp.textAlignCenter}>
                      <DropZone data={image} id={id} placeholder={formatMessage(messages.photosPlaceholder)} />
                      <Loader
                        show={bannerUploaderLoading}
                        type={"page"}
                      >
                        {
                          image != null && <div
                            style={{ backgroundImage: `url(/images/home/${image})` }}
                            className={s.bannerImageBg}
                          />
                        }
                      </Loader>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.titleAdminLabel} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field name="title" type="text" component={this.renderFormControl} />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} >
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field name="content" component={this.renderFormControlTextArea} />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
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

BannerSettingsForm = reduxForm({
  form: 'BannerSettingsForm', // a unique name for this form
  validate
})(BannerSettingsForm);

const mapState = (state) => ({
  bannerUploaderLoading: state.siteSettings.bannerUploaderLoading
});

const mapDispatch = {
};

export default compose(
  injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch)
)(BannerSettingsForm);