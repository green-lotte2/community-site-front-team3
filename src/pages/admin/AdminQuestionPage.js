import React from "react";
import { AdminDefaultLayout } from "../../layouts/AdminDefaultLayout";
import AdminQuestionList from "../../components/admin/cs/questionList/AdminQuestionList";

const AdminQuestionPage = () => {
  return (
    <div>
      <AdminDefaultLayout>
        <AdminQuestionList />
      </AdminDefaultLayout>
    </div>
  );
};

export default AdminQuestionPage;
