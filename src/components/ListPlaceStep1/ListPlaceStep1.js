// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Redux Form
import { formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Internal Helpers
import submit from './submit';
import update from './update';
import updateStep2 from './updateStep2';
import updateStep3 from './updateStep3';

// Translation
import { injectIntl } from 'react-intl';

// Step #1
import Page1 from './Page1';
import ExistingPage1 from './ExistingPage1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Page6 from './Page6';
import Page7 from './Page7';
import Page8 from './Page8';

// Step #2
import Photos from './Photos';
import PhotoCover from './PhotoCover';
import Title from './Title';
import Description from './Description';

// Step #3
import GuestRequirements from './GuestRequirements';
import HouseRules from './HouseRules';
import ReviewGuestBook from './ReviewGuestBook';
import AdvanceNotice from './AdvanceNotice';
import MaxDaysNotice from './MaxDaysNotice';
import MinMaxNights from './MinMaxNights';
import Calendar from './Calendar';
import Pricing from './Pricing';
import Discount from './Discount';
import Booking from './Booking';
import LocalLaws from './LocalLaws';

// Tab Bar
import TabBarStep1 from './TabBarStep1';
import TabBarStep2 from './TabBarStep2';
import TabBarStep3 from './TabBarStep3';

import history from '../../core/history';

class ListPlaceStep1 extends Component {

  static propTypes = {
    listData: PropTypes.object,
    existingList: PropTypes.bool,
    listingSteps: PropTypes.object,
    listId: PropTypes.number,
    formBaseURI: PropTypes.string,
    mode: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 'index',
      step1: null,
      step2: null,
      step3: null,
      formValues: {},
    };
  }

  UNSAFE_componentWillMount() {
    const { existingList, listingSteps } = this.props;
    if (existingList && listingSteps != undefined) {
      this.setState({
        step1: listingSteps.step1,
        step2: listingSteps.step2,
        step3: listingSteps.step3,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { existingList, listingSteps } = nextProps;
    if (existingList && listingSteps != undefined) {
      this.setState({
        step1: listingSteps.step1,
        step2: listingSteps.step2,
        step3: listingSteps.step3,
      });
    } else {
      this.setState({
        step1: null,
        step2: null,
        step3: null,
      });

    }
  }

  nextPage(formPage) {
    const { listId, existingList, formBaseURI } = this.props;
    let pathName = formBaseURI + formPage;
    if (existingList === true) {
      pathName = formBaseURI + listId + "/" + formPage;
    }
    history.push(pathName);
    this.setState({ page: formPage })
  }

  previousPage(formPage) {
    const { listId, existingList, formBaseURI } = this.props;
    let pathName = formBaseURI + formPage;
    if (existingList === true) {
      pathName = formBaseURI + listId + "/" + formPage;
    }
    history.push(pathName);
    this.setState({ page: formPage })
  }

  renderTabBar(currentPage) {
    const { step1, step2, step3 } = this.state;
    const { photosCount, formPage } = this.props;

    const step1Pages = [
      "car", "bedrooms", "bathrooms", "location", "map", "amenities", "features"
    ];
    const step2Pages = [
      "photos", "cover-photo", "description", "title"
    ];
    const step3Pages = [
      "renter-requirements", "car-rules", "review-how-renters-book", "booking-window", "min-max-days", "calendar",
      "pricing", "discount", "booking-scenarios", "local-laws"
    ];

    if (step1Pages.indexOf(currentPage) > -1 && step1 === "completed") {
      return <TabBarStep1 nextPage={this.nextPage} currentPage={currentPage} formPage={formPage}  />
    }

    if (step2Pages.indexOf(currentPage) > -1 && step2 === "completed") {
      return <TabBarStep2 nextPage={this.nextPage} currentPage={currentPage} formPage={formPage}  photosCount={photosCount} />
    }

    if (step3Pages.indexOf(currentPage) > -1 && step3 === "completed") {
      return <TabBarStep3 nextPage={this.nextPage} currentPage={currentPage} formPage={formPage}  />
    }
  }

  render() {
    const { page, formValues, step1 } = this.state;
    const { formPage, listingSteps, photosCount, mode, existingList, listId, baseCurrency } = this.props;
    let currentPage = page;
    if (mode != undefined && mode === "new") {
      currentPage = 'index';
    } else if (formPage != undefined) {
      currentPage = formPage;
    }
    return (
      <div className={'inputFocusColor'}>
        {this.renderTabBar(currentPage)}
        {currentPage === "index" && <Page1 nextPage={this.nextPage} />}
        {currentPage === "home" && <ExistingPage1 nextPage={this.nextPage} photosCount={photosCount} />}
        {currentPage === "car" && <Page2 nextPage={this.nextPage} previousPage={this.previousPage} />}
        {currentPage === "bedrooms" && <Page3 nextPage={this.nextPage} previousPage={this.previousPage} />}
        {currentPage === "bathrooms" && <Page4 nextPage={this.nextPage} previousPage={this.previousPage} />}
        {currentPage === "location" && <Page5
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          onSubmit={existingList ? update : submit}
        />}
        {currentPage === "map" && <Page6 nextPage={this.nextPage} previousPage={this.previousPage} />}
        {currentPage === "amenities" && <Page7 nextPage={this.nextPage} previousPage={this.previousPage} />}
        {currentPage === "features" && <Page8 previousPage={this.previousPage} onSubmit={update} />}

        {currentPage === "photos" && <Photos previousPage={this.previousPage} listId={listId} nextPage={this.nextPage} />}
        {currentPage === "cover-photo" && <PhotoCover previousPage={this.previousPage} listId={listId} nextPage={this.nextPage} />}
        {currentPage === "description" && <Description previousPage={this.previousPage} nextPage={this.nextPage} />}
        {currentPage === "title" && <Title previousPage={this.previousPage} nextPage={this.nextPage} onSubmit={updateStep2} />}

        {currentPage === "renter-requirements" && <GuestRequirements previousPage={this.previousPage} nextPage={this.nextPage} />}
        {currentPage === "car-rules" && <HouseRules previousPage={this.previousPage} nextPage={this.nextPage} />}
        {currentPage === "review-how-renters-book" && <ReviewGuestBook previousPage={this.previousPage} nextPage={this.nextPage} />}
        {currentPage === "booking-window" && <MaxDaysNotice listId={listId} previousPage={this.previousPage} nextPage={this.nextPage} />}
        {currentPage === "min-max-days" && <MinMaxNights previousPage={this.previousPage} nextPage={this.nextPage} />}
        {currentPage === "pricing" && <Pricing 
          previousPage={this.previousPage} 
          nextPage={this.nextPage} 
        />}
        {currentPage === "calendar" && <Calendar
          listId={listId}
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          baseCurrency={baseCurrency}
        />}
        {currentPage === "discount" && <Discount previousPage={this.previousPage} nextPage={this.nextPage} />}
        {currentPage === "booking-scenarios" && <Booking previousPage={this.previousPage} nextPage={this.nextPage} />}
        {currentPage === "local-laws" && <LocalLaws previousPage={this.previousPage} onSubmit={updateStep3} />}
      </div>
    );
  }

}

//const selector = formValueSelector('ListPlaceStep1'); // <-- same as form name

const mapState = (state) => ({
  existingList: state.location.isExistingList,
  //listId: selector(state, 'id'),
  listingSteps: state.location.listingSteps,
  photosCount: state.location.photosCount,
});

const mapDispatch = {
};

export default injectIntl(connect(mapState, mapDispatch)(ListPlaceStep1));
