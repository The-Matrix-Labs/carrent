import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import {
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import logoUrl from './logo-small.jpg';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Locale
import messages from '../../../locale/messages';
import Faq from './question.svg'

class PaymentDetails extends Component {
  static propTypes = {
    basePrice: PropTypes.number.isRequired,
    delivery: PropTypes.number,
    currency: PropTypes.string.isRequired,
    dayDifference: PropTypes.number.isRequired,
    discount: PropTypes.number,
    discountType: PropTypes.string,
    priceForDays: PropTypes.number.isRequired,
    serviceFees: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    formatMessage: PropTypes.any,
    bookingSpecialPricing: PropTypes.array,
    isSpecialPriceAssigned: PropTypes.bool,
  };

  static defaultProps = {
    bookingSpecialPricing: [],
    isSpecialPriceAssigned: false,
  };


  render() {
    const { basePrice, delivery, currency, dayDifference, securityDeposit } = this.props;
    const { priceForDays, serviceFees, discount, discountType, total } = this.props;
    const { formatMessage } = this.props.intl;
    const { bookingSpecialPricing, isSpecialPriceAssigned, isAverage } = this.props;

    function LinkWithTooltip({ id, children, href, tooltip }) {
      return (
        <OverlayTrigger
          overlay={<Tooltip className={s.tooltip} id={id}>{tooltip}</Tooltip>}
          placement="top"
          delayShow={300}
          delayHide={150}
        >
          {children}
        </OverlayTrigger>
      );
    }

    return (
      <div>
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <table className={cx('table')}>
                <tbody>
                  <tr className={s.tableText}>
                    <td className={cx(s.noBorder)}>
                      <div className={s.specialPriceIcon}>
                        {
                          isSpecialPriceAssigned &&
                          <span className={s.iconSection}>
                            <img src={Faq} className={cx(s.faqImage, 'faqImageRTL')} />
                          </span>
                        }
                        <div className={cx(s.tltip, s.relativeSection, 'relativeSectionRTL')}>
                          <FormattedMessage {...messages.averageRate} />
                        </div>
                      </div>
                      <div className={cx(s.specialPriceText, 'directionLtr')}>
                        <CurrencyConverter
                          //amount={basePrice}
                          amount={isAverage}
                          from={currency}
                        />
                        {' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                      </div>
                    </td>
                    <td className={cx(s.noBorder, 'text-right', 'textAlignLeftRTL')}>
                      <span>
                        <CurrencyConverter
                          amount={priceForDays}
                          from={currency}
                        />
                      </span>
                    </td>
                  </tr>
                  {
                    delivery > 0 && <tr className={s.tableText}>
                      <td className={cx(s.noBorder)}><FormattedMessage {...messages.cleaningFee} /></td>
                      <td className={cx(s.noBorder, 'text-right', 'textAlignLeftRTL')}>
                        <span>
                          <CurrencyConverter
                            amount={delivery}
                            from={currency}
                          />
                        </span>
                      </td>
                    </tr>
                  }
                  {
                    serviceFees > 0 && <tr className={s.tableText}>
                      <td className={cx(s.noBorder)}><FormattedMessage {...messages.serviceFee} /></td>
                      <td className={cx(s.noBorder, 'text-right', 'textAlignLeftRTL')}>
                        <span>
                          <CurrencyConverter
                            amount={serviceFees}
                            from={currency}
                          />
                        </span>
                      </td>
                    </tr>
                  }
                  {
                    securityDeposit > 0 && <tr className={s.tableText}>
                      <td className={cx(s.noBorder)}><FormattedMessage {...messages.securityDeposit} /></td>
                      <td className={cx(s.noBorder, 'text-right', 'textAlignLeftRTL')}>
                        <span>
                          <CurrencyConverter
                            amount={securityDeposit}
                            from={currency}
                          />
                        </span>
                      </td>
                    </tr>
                  }
                  {
                    discount > 0 && <tr className={s.tableText}>
                      <td className={cx(s.noBorder)}>{discountType}</td>
                      <td className={cx(s.noBorder, 'text-right', 'textAlignLeftRTL')}>
                        - <span>
                          <CurrencyConverter
                            amount={discount}
                            from={currency}
                          />
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
        <div className={cx(s.totalValue, s.space2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.smPadding}>
            <table className={cx('table')}>
              <tbody>
                <tr className={s.totalText}>
                  <td className={cx(s.noBorder)}><FormattedMessage {...messages.total} /></td>
                  <td className={cx(s.noBorder, 'text-right', 'textAlignLeftRTL')}>
                    <span>
                      <CurrencyConverter
                        amount={total}
                        from={currency}
                        superSymbol
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(PaymentDetails));
