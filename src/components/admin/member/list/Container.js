import React from 'react';
import { Link } from 'react-router-dom';
import MemberList from './MemberList';

const Container = () => {
    return (
        <>
            <div class="container">
                <h2>회원 관리</h2>
                <p>Manage your content and projects efficiently</p>
                <div class="table-actions">
                    <button>Action</button>
                    <input type="text" placeholder="Search Invoice" />
                    <button>Create Invoice</button>
                </div>
                <MemberList />
                <div class="pagination">
                    <Link to="#">1</Link>
                    <Link to="#">2</Link>
                    <Link to="#">3</Link>
                    <Link to="#">4</Link>
                    <Link to="#">5</Link>
                </div>
            </div>
        </>
    );
};

export default Container;
