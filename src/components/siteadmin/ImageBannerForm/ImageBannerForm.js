import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageBannerForm.css';
import cp from '../../../components/commonStyle.css';

// Component
import DropZone from './DropZone';
import Loader from '../../Loader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class ImageBannerForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    bannerUploaderLoading: PropTypes.bool
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

  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title, image, bannerUploaderLoading } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.homepageBanner} /></h1>
          <Col xs={12} sm={12} md={8} lg={7} className={s.blockcenter}>
            <div className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={cp.labelTextNew} ><FormattedMessage {...messages.adminBannerImage} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} className={cp.textAlignCenter}>
                      <DropZone data={image} placeholder={formatMessage(messages.photosPlaceholder)} />
                      <Loader
                        show={bannerUploaderLoading}
                        type={"page"}
                      >
                        {
                          image != null && <div
                          style={{ backgroundImage: `url(/images/banner/${image})` }}
                          className={s.bannerImageBg}
                        />
                        }
                      </Loader>
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="title" type="text" component={this.renderFormControl} label={formatMessage(messages.adminTitleLabel)} />
                <Field name="description" type="text" component={this.renderFormControl} label={formatMessage(messages.adminDescriptionLabel)} />
                <Field name="buttonLabel" type="text" component={this.renderFormControl} label={formatMessage(messages.buttonLabel)} />
                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                      <Button bsSize="small" className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting} >
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

ImageBannerForm = reduxForm({
  form: 'ImageBannerForm', // a unique name for this form
  validate
})(ImageBannerForm);

const mapState = (state) => ({
  bannerUploaderLoading: state.siteSettings.bannerUploaderLoading
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(ImageBannerForm)));