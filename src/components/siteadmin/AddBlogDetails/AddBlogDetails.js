import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddBlogDetails.css';
import cp from '../../../components/commonStyle.css';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { graphql, gql, compose } from 'react-apollo';
// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import { url } from '../../../config.js';
import { formatURL } from '../../../helpers/formatURL';
import fetch from '../../../core/fetch';
import Link from '../../Link';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class AddBlogDetails extends React.Component {

  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill');
      this.Quill = require('quill');
    }
    this.state = { editorHtml: '' } // You can also pass a Quill Delta here
    this.handlePageTitle = this.handlePageTitle.bind(this);
  }


  async handlePageTitle(e) {
    const { change } = this.props;
    if (e.target.value) {
      await change('pageUrl', formatURL(e.target.value));
    } else {
      await change('pageUrl', '');
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
    })),
  };

  static defaultProps = {
    data: []
  };

  renderFormControl = ({ input, label, placeholder, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <FormControl {...input} placeholder={placeholder} type={type} className={cx(className, cp.formControlInput)} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderFormControlPageUrl = ({ input, label, placeholder, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={'staticPageUrl'}>
              <InputGroup >
                <InputGroup.Addon>{url}{formatMessage(messages.pageLabel)}</InputGroup.Addon>
                <FormControl {...input} placeholder={placeholder} type={type} className={cx(className, cp.formControlInput, s.addonInputRadius)} />
              </InputGroup>
              {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={s.select}>
              <FormControl componentClass="select" {...input} className={cx(className, cp.formControlSelect)} >
                {children}
              </FormControl>
            </div>
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    )
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={cp.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <FormControl
              {...input}
              className={className}
              componentClass={"textarea"}
              rows='4'
            />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    )
  }


  renderQuill = ({ input, label, type, meta: { touched, error }, className }) => {
    const ReactQuill = this.ReactQuill;
    const Quill = this.Quill;
    const { formatMessage } = this.props.intl;
    let modules = {
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        // ['link', 'image'],
      ],
      clipboard: {
        matchVisual: false,
      }
    };

    let formats = [
      'header', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link'
      // 'link', 'image'
    ];
    return (
      <div>
        <ReactQuill
          {...input}
          onChange={(newValue, delta, source) => {
            if (source === 'user') {
              input.onChange(newValue);
            }
          }}
          onBlur={(range, source, quill) => {
            if (quill.getHTML() == '<p><br></p>') {
              input.onBlur('');
            }
            else {
              input.onBlur(quill.getHTML());
            }

          }}
          placeholder="write something......."
          modules={modules}
          formats={formats}
          theme="snow"
        />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    );
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title, siteName } = this.props;
    const ReactQuill = this.ReactQuill;
    const Quill = this.Quill;
    const { formatMessage } = this.props.intl;
    const gobackcss = { padding: '10px' };
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL')}>
          <div>
            <h1 className={s.headerTitle}><FormattedMessage {...messages.addPageDetails} /></h1>
            <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
              <div className={cx(cp.textAlignRight, s.space4, 'textAlignLeftRTL')}>
                <Link to={"/siteadmin/content-management"} className={cx(cp.btnPrimaryBorder, cp.btnlarge)}>
                  <FormattedMessage {...messages.goBack} />
                </Link>
              </div>
              <div className={s.panelHeader}>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <Field name="metaTitle" type="text" component={this.renderFormControl} label={formatMessage(messages.metaTitleLabel)} />
                  <Field name="metaDescription" className={s.textareaInput} component={this.renderFormControlTextArea} label={formatMessage(messages.metaDescriptionLabel)} />
                  <Field name="pageTitle" type="text" component={this.renderFormControl} label={formatMessage(messages.pageTitleLabel)} onChange={(event) => this.handlePageTitle(event)} />
                  <Field name="pageUrl" type="text" component={this.renderFormControlPageUrl} label={formatMessage(messages.pageUrl)} />
                  <Field name="footerCategory" component={this.renderFormControlSelect} label={formatMessage(messages.footerCategoryLabel)}>
                    <option value="">{formatMessage(messages.ChooseFooterCategory)}</option>
                    <option value={siteName}>{siteName}</option>
                    <option value="discover">{formatMessage(messages.discover)}</option>
                    <option value="hosting">{formatMessage(messages.hosting)}</option>
                  </Field>
                  <FormGroup className={s.space3}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field name="content" component={this.renderQuill} />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className={s.noMargin}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                        <Button className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting} ><FormattedMessage {...messages.save} /></Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </form>
              </div>
            </Col>
          </div>
        </div>
      );
    } else {
      return <textarea />;
    }
  }

}

AddBlogDetails = reduxForm({
  form: 'BlogDetails', // a unique name for this form
  validate
})(AddBlogDetails);



const blogFormSelector = formValueSelector('BlogDetails');

const mapState = (state) => ({
  pageTitle: blogFormSelector(state, 'pageTitle'),
  pageURL: blogFormSelector(state, 'pageUrl'),
  siteName: state.siteSettings.data.siteName,
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(AddBlogDetails)));