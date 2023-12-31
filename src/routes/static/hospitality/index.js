import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';

export default async function action({ store }) {
  const data = await new Promise((resolve) => {
    require.ensure([], (require) => {
      resolve(require('./hospitality.md'));
    }, 'hospitality');
  });

  return {
    title: data.title,
    chunk: 'hospitality',
    component: <Layout><Page {...data} /></Layout>,
  };
};
