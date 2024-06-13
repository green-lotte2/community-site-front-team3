import React from "react";
import { AdminDefaultLayout } from "../../layouts/AdminDefaultLayout";
import AdminCs from "../../components/admin/cs/csList/AdminCsList";

const AdminCsPage = () => {
  return (
    <div>
      <AdminDefaultLayout>
        <AdminCs />
      </AdminDefaultLayout>
    </div>
  );
};

export default AdminCs;
