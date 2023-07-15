// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import update from './update';
import validate from './validate';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';
import { deleteListSettings } from '../../../actions/siteadmin/deleteListSettings';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListSettingsForm.css';
import cp from '../../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  Col,
  Row,
  FormControl
} from 'react-bootstrap';

class EditListSettingsForm extends Component {

  static propTypes = {
    isEnable: PropTypes.string,
    id: PropTypes.number,
    typeId: PropTypes.number,
    fieldType: PropTypes.string,
    deleteListSettings: PropTypes.any,
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
        <label className={cp.labelTextNew}>{label}</label>
        <div>
          <FormControl {...input} type={type} className={cx(className, cp.formControlInput)} />
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </div>
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className, disabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <label className={cp.labelTextNew} >{label}</label>
        <div className={s.select}>
          <FormControl
            {...input}
            disabled={disabled}
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
            rows='4'
          >
            {children}
          </FormControl>
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </div>
      </FormGroup>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    const { id, typeId, deleteListSettings, listSettingsData, carModelListSettingsData } = this.props;
    const { fieldType } = this.state;
    let isListingData = listSettingsData && listSettingsData.listSettings;
    let isCarModelDetails = carModelListSettingsData && carModelListSettingsData.listSettings;

    return (
      <div className={cx('maxwidthcenter', 'adminRadioBtn')}>
        <form onSubmit={handleSubmit(update)}>
          {error && <strong>{formatMessage(error)}</strong>}
          {
            typeId && (typeId == 3) && <FormGroup className={s.space3}>
              {/* <p className={cx(s.captionTitle, s.textBold)}>
                <FormattedMessage {...messages.makeLabel} />:
              </p> */}
              <Field
                name="makeType"
                disabled={true}
                type="text"
                component={this.renderFormControlSelect}
                label={formatMessage(messages.makeLabel)}
              >
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
          {
            fieldType != "numberType" && <div>
              <FormGroup className={s.space3}>
                <span className={s.displayInline}>
                <label className={cx(cp.labelTextNew, cp.btnUPdate, cp.curserPointer, s.displayTable)}>
                  <span className={cx(s.displayTableCell, s.radioCss, 'radioBtnMakeRTL')}><Field name="isEnable" component="input" type="radio" value="1" /></span>
                  <span className={cx(cp.radioBtnn, s.displayTableCell)}>{formatMessage(messages.enableLabel)}
                  </span>
                </label>
                </span>
                <span className={s.displayInline}>
                <label className={cx(cp.labelTextNew, cp.btnModalDelete, cp.curserPointer, 'btnModalDeleteRTL', s.displayTable)}>
                  <span className={cx(s.displayTableCell, s.radioCss, 'radioBtnMakeRTL')}><Field name="isEnable" component="input" type="radio" value="0" /></span>
                  <span className={cx(cp.radioBtnn, s.displayTableCell)}>{formatMessage(messages.disableLabel)}</span>
                </label>
                </span>
              </FormGroup>
              <FormGroup className={cx(s.space1, s.formSection)}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                    <div className={cp.btnUPdate}>
                      <Button className={cx(cp.btnPrimary, cp.btnlarge, cp.fullWidth)} type="submit" disabled={submitting}>
                        {formatMessage(messages.update)}
                      </Button>
                    </div>
                    <div className={cx(cp.btnModalDelete, 'btnModalDeleteRTL')}>
                      <Button className={cx(cp.btnPrimaryBorder, cp.btnlarge, cp.fullWidth)} onClick={() => deleteListSettings(id, typeId)} disabled={submitting}>
                        {formatMessage(messages.delete)}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </div>
          }
          {
            fieldType === "numberType" && <FormGroup className={s.space1}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                  <Button className={cx(cp.btnPrimary, cp.btnlarge)}  type="submit" disabled={submitting}>
                    {formatMessage(messages.update)}
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          }
        </form>
      </div>
    )
  }
}

EditListSettingsForm = reduxForm({
  form: "EditListSettingsForm", // a unique name for this form
  validate
})(EditListSettingsForm);

// Decorate with connect to read form values
const selector = formValueSelector("EditListSettingsForm"); // <-- same as form name

const mapState = (state) => ({
  isEnable: selector(state, 'isEnable'),
  id: selector(state, 'id'),
  typeId: selector(state, 'typeId'),
  listSettingsData: state.adminListSettingsData.isCarDetails,
  carModelListSettingsData: state.adminListSettingsData.isCarModelDetails
});

const mapDispatch = {
  deleteListSettings
};

export default injectIntl(withStyles(s, cp)(connect(mapState, mapDispatch)(EditListSettingsForm)));