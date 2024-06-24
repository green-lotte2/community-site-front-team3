import React, { useState } from "react";
import AdminCsListHeader from "../../components/admin/cs/csList/AdminCsListHeader";
import AdminCsList from "../../components/admin/cs/csList/AdminCsList";
import { AdminDefaultLayout } from "layouts/AdminDefaultLayout";
const AdminCsListPage = () => {
  /**화면 컴포넌트 렌더링 변경 관리 State */
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
