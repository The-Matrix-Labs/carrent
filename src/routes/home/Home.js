import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, gql } from 'react-apollo';
import { FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import cx from 'classnames';
import Home from '../../components/Home';
import { FormattedMessage } from 'react-intl';

//Components
import BannerCaption from '../../components/Home/BannerCaption';
import HomeSlider from '../../components/Home/HomeSlider';
import PopularLocationSlider from '../../components/Home/PopularLocationSlider';
import NewsBox from '../../components/Home/NewsBox';
import SearchForm from '../../components/Home/SearchForm';
import Loader from '../../components/Loader';
import SeeAll from '../../components/Home/SeeAll';
import SliderAnimation from '../../components/Home/SliderAnimation';
import SpaceFree from '../../components/Home/SpaceFree';
import HomeKindofTrip from '../../components/Home/HomeKindofTrip';

import PopularLocationGrid from '../../components/Home/PopularLocationGrid';
//  import CalendarBig from '../../components/CalendarBig';

//import ReadyToEarn from '../../components/Home/ReadyToEarn';

// Graphql
import getRecommendQuery from './getRecommend.graphql';
import getImageBannerQuery from './getImageBanner.graphql';
import getMostViewedListingQuery from './getMostViewedListing.graphql';
import getPopularLocationQuery from './getPopularLocation.graphql';
import getStaticInfo from './getStaticInfo.graphql'

import { getListingFieldsValues } from '../../actions/getListingFieldsValues';

// Locale
import messages from '../../locale/messages';
import { readFile } from 'fs';
import PerfectCarBlock from '../../components/Home/PerfectCarBlock/PerfectCarBlock';
import CarCounter from '../../components/Home/CarCounter/CarCounter';


class Homepage extends React.Component {
  static propTypes = {
    getRecommendData: PropTypes.shape({
      loading: PropTypes.bool,
      getRecommendData: PropTypes.array
    }),
    getImageBannerData: PropTypes.shape({
      loading: PropTypes.bool,
      getImageBanner: PropTypes.object
    }),
    getMostViewedListingData: PropTypes.shape({
      loading: PropTypes.bool,
      GetMostViewedListing: PropTypes.array
    }),
    getPopularLocationData: PropTypes.shape({
      loading: PropTypes.bool,
      GetMostViewedListing: PropTypes.array
    }),
    formatMessage: PropTypes.func,
  };

  static defaultProps = {
    getRecommendData: {
      loading: true
    },
    getImageBannerData: {
      loading: true
    },
    getMostViewedListingData: {
      loading: true
    },
    getPopularLocationData: {
      loading: true
    }
  }

  render() {
    const { getRecommendData, getImageBannerData, getMostViewedListingData, getBannerData, getPopularLocationData, layoutType } = this.props;
    const { getStaticInfoData: { loading: getStaticInfoLoading, getStaticInfo } } = this.props;

    let staticInfoCollection = {}

    getStaticInfo && getStaticInfo.length > 0 && getStaticInfo.map((item, key) => {
      staticInfoCollection[item.name] = item.value
    });

    
    return (
      <div className={s.root}>
        {layoutType && (layoutType == 1 || layoutType == 3) && <SliderAnimation layoutType={layoutType} data={getBannerData} />}

        <div className={s.container}>
          {
            layoutType && layoutType == 2 && <div className={s.pageContainer}>
              <BannerCaption data={getBannerData} />
            </div>
          }
          {
            layoutType && layoutType == 2 && <div className={s.pageContainer}>
              <SearchForm />
            </div>
          }
          {
            getRecommendData.loading && getImageBannerData.loading && getMostViewedListingData.loading && <div>
              <Loader type="text" />
            </div>
          }
          {
            !getRecommendData.loading && !getImageBannerData.loading && !getMostViewedListingData.loading && <div className={s.pageContainer}>
              {
                getRecommendData && getRecommendData.getRecommend.length > 0 && <div >
                  <h3 className={s.containerTitle}>
                    <FormattedMessage {...messages.recommended} />

                  </h3>
                  <HomeSlider data={getRecommendData.getRecommend} />
                  <SeeAll />
                </div>
              }

              {
                getMostViewedListingData && getMostViewedListingData.GetMostViewedListing.length > 0 && <div className={s.pageContainer}>
                  <h3 className={s.containerTitle}>
                    <FormattedMessage {...messages.mostViewed} />

                  </h3>
                  <HomeSlider data={getMostViewedListingData.GetMostViewedListing} />

                  <SeeAll />
                </div>
              }

              {/* {
                getPopularLocationData.getPopularLocation  && getPopularLocationData.getPopularLocation.length > 0 && <div className={s.pageContainer}>
                  <h3 className={cx (s.containerTitle, s.marginLeft)}>
                    <FormattedMessage {...messages.popularLocation} />
                  </h3>  
                  <PopularLocationSlider data={getPopularLocationData.getPopularLocation}/>
                </div>
              }    */}

              {/* {
                getPopularLocationData.getPopularLocationAdmin && getPopularLocationData.getPopularLocationAdmin.length > 0 && <div className={s.pageContainer}>
                  <h3 className={cx(s.containerTitle, s.marginLeft)}>
                    <FormattedMessage {...messages.popularLocation} />
                  </h3>
                  <PopularLocationSlider data={getPopularLocationData.getPopularLocationAdmin} />
                </div>
              } */}





              {/* {
            getPopularLocationData.getPopularLocationAdmin && getPopularLocationData.getPopularLocationAdmin.length > 0 && <div className={s.pageContainer}>
               <h3 className={cx(s.containerTitle, s.marginLeft)}>
                    <FormattedMessage {...messages.popularLocation} />
                  </h3>
              <PopularLocationGrid data={getPopularLocationData.getPopularLocationAdmin}/>
            </div>
          } */}


              {/* {
                getImageBannerData.getImageBanner != null && <div className={s.pageContainer}>
                  <NewsBox data={getImageBannerData.getImageBanner} />
                </div>
              } */}
            </div>
          }
        </div>
        {
          !getStaticInfoLoading && <div>
          <CarCounter staticInfo={staticInfoCollection} />
          <PerfectCarBlock staticInfo={staticInfoCollection} />
        </div>
        }
        
        
        <div className={s.container}>
          {

            getPopularLocationData.getPopularLocationAdmin && getPopularLocationData.getPopularLocationAdmin.length > 0 && <div className={s.pageContainer}>
              <h3 className={cx(s.containerTitle)}>
                <FormattedMessage {...messages.popularLocation} />
              </h3>
              <PopularLocationSlider data={getPopularLocationData.getPopularLocationAdmin} />
            </div>

          }
          {
            getImageBannerData.getImageBanner != null && <div className={s.pageContainer}>
              <NewsBox data={getImageBannerData.getImageBanner} />
            </div>
          }

          {/* <SpaceFree /> */}
          {
            !getRecommendData.loading && !getStaticInfoLoading && <div className="hidden-xs">
              <HomeKindofTrip staticInfo={staticInfoCollection}/>
            </div>
          }


          {/* {
          <div className={s.pageContainer}>
              <CalendarBig />
            </div>
          } */}



        </div>
        {/* <ReadyToEarn /> */}
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(gql`
        query getBanner{
          getBanner {
            id
            title
            content
            image
          }
        }
      `, {
      name: 'getBannerData',
      options: {
        ssr: true
      }
    }),
  graphql(getRecommendQuery, {
    name: 'getRecommendData',
    options: {
      //ssr: false
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }),
  graphql(getMostViewedListingQuery, {
    name: 'getMostViewedListingData',
    options: {
      //ssr: false
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }),
  graphql(getImageBannerQuery, {
    name: 'getImageBannerData',
    options: {
      //ssr: false
      ssr: true
    }
  }),
  graphql(getPopularLocationQuery, {
    name: 'getPopularLocationData',
    options: {
      //ssr: false
      ssr: true
    }
  }),
  graphql(getStaticInfo, {
    name: 'getStaticInfoData',
    options: {
      //ssr: false
      ssr: true
    }
  }),
)(Homepage);
