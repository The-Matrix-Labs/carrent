import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import StaticPage from './StaticPage';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Static Page Management';

export default async function action({ store }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        const adminPrivileges = store.getState().account.privileges && store.getState().account.privileges.privileges;
        const privileges = store.getState().listSettings && store.getState().listSettings.privileges;
    
        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }
    
        // Admin restriction
        if (!restrictUrls('/siteadmin/staticpage/management', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }
        return {
            title,
            component: <AdminLayout><StaticPage title={title} /></AdminLayout>,
        };
    };
