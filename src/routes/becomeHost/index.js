import React from 'react';
import Layout from '../../components/Layout';
import ListLayout from '../../components/Layout/ListLayout';
import BecomeHost from './BecomeHost';
import fetch from '../../core/fetch';
import FooterLessLayout from '../../components/Layout/FooterLessLayout';


// Redux Action
import { getListingSteps, resetListingSteps } from '../../actions/getListingSteps';
import { getListingFields } from '../../actions/getListingFields';
import { getListingFieldsValues } from '../../actions/getListingFieldsValues';
import { getListingStepTwo } from '../../actions/Listing/getListingStepTwo';
import NewListLayout from '../../components/Layout/NewListLayout';
import { restrictUrls } from '../../helpers/adminPrivileges';

const title = 'Become a Owner';


export default async function action({ store, query, params }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    const listingFields = store.getState().listingFields.data;
    const listingSteps = store.getState().location.listingSteps;
    const isExistingList = store.getState().location.isExistingList;
    const initialValuesLoaded = store.getState().location.initialValuesLoaded;
    const baseCurrency = store.getState().currency.base;
    let adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
    let privileges = store.getState().listSettings && store.getState().listSettings.privileges;

    // From URI
    const listId = params.listId;
    const formPage = params.formPage;
    const formBaseURI = "/become-a-owner/";
    const className = 'hiddenFooterMobile';

    let mode;

    if ("mode" in query) {
      if (query.mode === "new") {
        mode = query.mode;
      }
    }

    if (!isAuthenticated && !isAdminAuthenticated) {
      return { redirect: '/login' };
    }

    // Admin restriction
    if (isAdminAuthenticated && !restrictUrls('/become-a-owner/', adminPrivileges, privileges)) {
      return { redirect: '/siteadmin' };
    }


    // Fetch all settings fields 
    if (listingFields === undefined) {
      store.dispatch(getListingFields());
    }

    if (listId != undefined && !isNaN(listId)) {
      // Fetch All steps status
      if (listingSteps === undefined) {
        store.dispatch(getListingSteps(listId));
      } else {
        // Fetch All steps status for another list
        if (listingSteps.listId != listId) {
          store.dispatch(getListingSteps(listId));
        } else if (formPage && formPage == 'home') {
          store.dispatch(getListingSteps(listId));
        }
      }
      store.dispatch(getListingStepTwo(listId));

    } else {
      if (initialValuesLoaded != true || (mode && mode == 'new')) {
        await store.dispatch(resetListingSteps());
        await store.dispatch(getListingSteps());
      }
    }

    if (listId != undefined && !isNaN(listId)) {
      let step;
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

      if (step1Pages.indexOf(formPage) > -1) {
        step = 1;
      } else if (step2Pages.indexOf(formPage) > -1) {
        step = 2;
      } else if (step3Pages.indexOf(formPage) > -1) {
        step = 3;
      }
      if (step != undefined) {
        return {
          title,
          component: <ListLayout step={step} formPage={formPage}>
            <BecomeHost
              listId={Number(listId)}
              title={title}
              formPage={formPage}
              formBaseURI={formBaseURI}
              mode={mode}
              baseCurrency={baseCurrency}
            />
          </ListLayout>,
        };
      }
    }

    return {
      title,
      component: <NewListLayout>
        <BecomeHost
          listId={Number(listId)}
          title={title}
          formPage={formPage}
          formBaseURI={formBaseURI}
          mode={mode}
          baseCurrency={baseCurrency}
        />
      </NewListLayout>
    };
  };
