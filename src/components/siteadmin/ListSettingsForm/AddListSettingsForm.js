// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListSettingsForm.css';
import cp from '../../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  FormControl,
  Col,
  Row,
} from 'react-bootstrap';

class AddListSettingsForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldType: null
    }
  }

  UNSAFE_componentWillMount() {
    const { fieldType } = this.props;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { fieldType } = nextProps;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <label className={cp.labelTextNew} >{label}</label>
        <div>
          <FormControl {...input} type={type} className={cx(className, cp.formControlInput)} />
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </div>
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <label className={cp.labelTextNew} >{label}</label>
        <div className={s.select}>
          <FormControl
            {...input}
            className={cx(className, cp.formControlSelect)}
            componentClass="select">
            {children}
          </FormControl>
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </div>
      </FormGroup>
    )
  }


  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <label className={cp.labelTextNew} >{label}</label>
        <div>
          <FormControl
            {...input}
            className={className}
            componentClass="textarea"
            rows='4'>
            {children}
          </FormControl>
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </div>
      </FormGroup>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, typeId, initialValues } = this.props;
    const { listSettingsData, carModelListSettingsData } = this.props;
    const { formatMessage } = this.props.intl;
    const { fieldType } = this.state;
    let isListingData = listSettingsData && listSettingsData.listSettings;
    let isCarModelDetails = carModelListSettingsData && carModelListSettingsData.listSettings;
    let isChangeValue = isCarModelDetails && isCarModelDetails.filter(o => o.makeType == makeName);

    return (
      <div className={cx('maxwidthcenter')}>
        <form onSubmit={handleSubmit(submit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          {
            typeId && (typeId == 3) && <FormGroup className={s.space3}>
              {/* <p className={cx(s.captionTitle, s.textBold)}>
                <FormattedMessage {...messages.makeLabel} />:
              </p> */}
              <Field
                name="makeType"
                type="text"
                component={this.renderFormControlSelect}
                label={formatMessage(messages.makeLabel)}
              >
                <option value="">Select</option>
                {
                  isListingData && isListingData.length > 0 && isListingData.map((item, key) => {
                    if (item.isEnable == 1) {
                      return <option key={key} value={item.id}>{item.itemName}</option>
                    }
                  })
                }
              </Field>
            </FormGroup>
          }
          <FormGroup className={s.space3}>
            <Field
              name="itemName"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.addNew)}
            />
          </FormGroup>
          {
            typeId && (typeId == 1) && <FormGroup className={s.space3}>
              <Field
                name="itemDescription"
                component={this.renderFormControlTextArea}
                label={formatMessage(messages.addNewDescription)}
              />
            </FormGroup>
          }

          {
            fieldType == "numberType" && <div>
              <FormGroup className={s.space3}>
                <Field
                  name="otherItemName"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.addOtherItem)}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <Field
                  name="startValue"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.startValue)}
                />
              </FormGroup>

              <FormGroup className={s.space3}>
                <Field
                  name="endValue"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.endValue)}
                />
              </FormGroup>
            </div>
          }
          <FormGroup className={s.space1}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                <Button className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting}>
                  {formatMessage(messages.addLabel)}
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </div>
    )
  }

}

AddListSettingsForm = reduxForm({
  form: "AddListSettingsForm", // a unique name for this form
  validate,
})(AddListSettingsForm);

// Decorate with connect to read form values
const selector = formValueSelector("AddListSettingsForm"); // <-- same as form name

const mapState = (state) => ({
  typeId: selector(state, 'typeId'),
  listSettingsData: state.adminListSettingsData.isCarDetails,
  carModelListSettingsData: state.adminListSettingsData.isCarModelDetails,
  makeName: selector(state, 'makeType'),
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(AddListSettingsForm)));