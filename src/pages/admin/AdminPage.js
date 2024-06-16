import React from 'react';
import { AdminDefaultLayout } from '../../layouts/AdminDefaultLayout';
import AdminMain from '../../components/admin/main/AdminMain';

const AdminPage = () => {
    return (
        <AdminDefaultLayout>
            <AdminMain />
        </AdminDefaultLayout>
    );
};

export default AdminPage;
