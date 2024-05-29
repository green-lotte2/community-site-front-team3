import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProjectList = () => {
    const authSlice = useSelector((state) => state.authSlice);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [userCompany, setUserCompany] = useState('');

    useEffect(() => {
        if (authSlice && authSlice.user && authSlice.company) {
            console.log(authSlice.company);

            const data = fetchUsersByCompany(authSlice.company);
            console.log(data);
        }
    }, [authSlice]);

    // 같은 회사인 유저 조회 //
    const fetchUsersByCompany = async (company) => {
        try {
            const response = await axios.get(`/user/company?company=${company}`);
            console.log('Response:', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleProjectTitleChange = (e) => {
        setProjectTitle(e.target.value);
    };

    const handleInviteUser = (e) => {
        const selectedUser = e.target.value;
        setInvitedUsers([...invitedUsers, selectedUser]);
    };

    const handleCreateProject = () => {
        console.log('Project created:', projectTitle, invitedUsers);
        closeModal();
    };

    return (
        <>
            <div className="project-list-container">
                <div className="project-list">
                    <h2>Project List</h2>
                    <div className="search-and-create">
                        <input type="text" placeholder="Search" />
                        <button className="create-button" onClick={openModal}>
                            New Project
                        </button>
                    </div>
                    <div className="project-card">
                        <p>프로젝트 제목</p>
                        <div className="project-meta">
                            <span className="date">프로젝트 생성일</span>
                            <span className="actions">
                                <button>Edit</button>
                                <button>Delete</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* 모달 */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={closeModal}>
                            x
                        </button>
                        <h2>Create New Project</h2>
                        <label htmlFor="projectTitle">Project Title:</label>
                        <input type="text" id="projectTitle" value={projectTitle} onChange={handleProjectTitleChange} />
                        <label htmlFor="inviteUser">Invite User:</label>
                        <select id="inviteUser" onChange={handleInviteUser}>
                            <option value="">Select User</option>
                            {/* 사용자 정보 출력 */}
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <div className="selected-users">
                            <p>Invited Users:</p>
                            {invitedUsers.map((user, index) => (
                                <span key={index}>{user}</span>
                            ))}
                        </div>
                        <button onClick={handleCreateProject}>Create Project</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectList;
