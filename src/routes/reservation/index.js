import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import ReservationContainer from './ReservationContainer';

const title = 'Reservation';

export default async function action({ store, params }) {

  	// From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const type = params.type;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    return {
      title,
      component: <UserLayout><ReservationContainer userType={"owner"} type={type} /></UserLayout>,
    };
  };
