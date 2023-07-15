import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
 } from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EarnBlock.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';




class EarnBlock extends Component {
  

  render() {
    const { data } = this.props
    return (
      <Grid className={s.centerBlock}>
        <div className={s.mainBlock}>
          <h2 className={s.heading}>
            {data && data.earnBlockTitle1}
          </h2>
          <h3 className={s.estimate}>
            {data && data.earnBlockContent1}
          </h3>
          <p className={s.desc}>
            {data && data.earnBlockContent2}
          </p>
          {/* <Button className={s.tryButton}>
          <FormattedMessage {...messages.whyhostmaisectionButton} />
               </Button> */}

        </div>
      </Grid>
    );
  }
}



export default withStyles(s)(EarnBlock);
