import React from 'react';
import Layout from '../../components/Layout';
import Cancel from './Cancel';
import NotFound from '../notFound/NotFound';

const title = 'Cancel';

export default async function action({ store, params }) {

  	// From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;

    // From URL
    const reservationId = params.reservationId;
    const userType = params.type;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if(reservationId === undefined || isNaN(reservationId) || (userType != 'owner' && userType != 'renter')) {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404,
      };
    }

    return {
      title,
      component: <Layout><Cancel reservationId={Number(reservationId)} userType={userType} /></Layout>,
    };
  };