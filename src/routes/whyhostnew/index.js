import React from 'react';
import Layout from '../../components/Layout';
import WhyHostNew from './WhyHostNew';

const title = 'Why list your car';

export default async function action() {
  return {
    title,
    component: <Layout><WhyHostNew title={title} /></Layout>,
  };
};
