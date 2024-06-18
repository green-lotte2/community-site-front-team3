import React from 'react';
import { AdminDefaultLayout } from '../../layouts/AdminDefaultLayout';
import MemberPlan from '../../components/admin/member/MemberPlan';

const AdminMemberPlan = () => {
    return (
        <AdminDefaultLayout>
            <MemberPlan />
        </AdminDefaultLayout>
    );
};

export default AdminMemberPlan;
