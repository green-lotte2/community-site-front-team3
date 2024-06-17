import React, { useState } from "react";
import AdminCsListHeader from "../../components/admin/cs/csList/AdminCsListHeader";
import AdminCsList from "../../components/admin/cs/csList/AdminCsList";
import { AdminDefaultLayout } from "layouts/AdminDefaultLayout";
const AdminCsListPage = () => {
  const [view, setView] = useState("list");

  return (
    <div>
      <AdminDefaultLayout>
        <AdminCsListHeader view={view} />
        <AdminCsList view={view} setView={setView} />
      </AdminDefaultLayout>
    </div>
  );
};

export default AdminCsListPage;
