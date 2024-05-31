import React from 'react';
import { AdminDefaultLayout } from '../../layouts/AdminDefaultLayout';
import Container from '../../components/admin/article/view/Container';

const AdminArticleView = () => {
    return (
        <AdminDefaultLayout>
            <Container />
        </AdminDefaultLayout>
    );
};

export default AdminArticleView;

// view 주소 설정하고
// ano에 맞는 글 가져와야하고
// 삭제, 수정, 목록 버튼 만들어야하고
// 서버단에서 메소드 작성해야하고
