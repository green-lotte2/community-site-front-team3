import React from "react";
import AdminCsListHeader from "../../components/admin/cs/csList/AdminCsListHeader";
import AdminCsList from "../../components/admin/cs/csList/AdminCsList";
import { AdminDefaultLayout } from "layouts/AdminDefaultLayout";
const AdminCsListPage = () => {
  return (
    <div>
      <AdminDefaultLayout>
        <AdminCsListHeader />
        <AdminCsList />
      </AdminDefaultLayout>
    </div>
  );
};

export default AdminCsListPage;
