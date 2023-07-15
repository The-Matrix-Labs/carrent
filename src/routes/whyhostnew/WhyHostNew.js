import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostNew.css';
import { graphql, gql, compose } from 'react-apollo';
import Scroll from 'react-scroll'; // Imports all Mixins

import EarnBlock from '../../components/WhyHost/EarnBlock/EarnBlock';
import EasyHost from '../../components/WhyHost/EasyHost/EasyHost';
import Peace from '../../components/WhyHost/Peace/Peace';
import Works from '../../components/WhyHost/Works/Works';
import WhyHostBanner from './WhyHostBanner';
import WhyBlock from '../../components/WhyHost/WhyBlock';
import getWhyHostPageSettings from './getWhyHostPageSettings.graphql';
import Loader from '../../components/Loader'

let Link = Scroll.Link;
let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;

class EditProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { data: { loading, getWhyHostPage }, title } = this.props
    let settingsCollection = {}

    if(loading){

      return <Loader type={"text"} />;

  } else {

      getWhyHostPage.map((item, key) => {
          settingsCollection[item.name] = item.value
      });

      return (
        <div className="whyhost-content">
          <WhyHostBanner data={settingsCollection} />
          <Element name="test1" className="element">
            <EarnBlock data={settingsCollection} />
            <WhyBlock data={settingsCollection} />
            <EasyHost data={settingsCollection} />
            <Works data={settingsCollection} />
            <Peace data={settingsCollection} />
          </Element>
        </div>
      );
  }
    
  }

}


export default compose(
  withStyles(s),
  graphql(getWhyHostPageSettings, {
      options: {
          fetchPolicy: 'network-only',
          ssr: false
      }
  }),
)(EditProfile);
