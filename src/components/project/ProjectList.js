import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const ProjectList = () => {
    const authSlice = useSelector((state) => state.authSlice);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [userUids, setuserUids] = useState([]);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (authSlice && authSlice.uid && authSlice.company) {
            fetchUsersByCompany(authSlice.company);
            selectProjectList();
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
    // 프로젝트 리스트 출력 //
    const selectProjectList = async () => {
        try {
            const response = await axios.get(`/project/list?uid=${authSlice.uid}`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    // 프로젝트 생성 //
    const createProject = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(`/project/create`, {
                uid: authSlice.uid,
                title: projectTitle,
                uids: userUids,
            });
            console.log('Project created:', response.data.proNo);
        } catch (error) {
            console.error('Error creating project:', error);
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
        const selectdata = e.target.value.split('?');
        const selectedUser = selectdata[0];

        const selectUids = selectdata[1];

        if (selectedUser && !invitedUsers.includes(selectedUser)) {
            setInvitedUsers([...invitedUsers, selectedUser]);
        }
        if (selectUids && !selectUids.includes(selectedUser)) {
            setuserUids([...userUids, selectUids]);
        }
    };

    const handleCreateProject = (e) => {
        createProject(e);
        closeModal();
    };

    const getFilteredUsers = () => {
        return users.filter((user) => !invitedUsers.includes(user.uid));
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
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <div className="project-card" key={index}>
                                <p>{project.title}</p>
                                <div className="project-meta">
                                    <span className="date">{moment(projects.rdate).format('YY.MM.DD')}</span>
                                    <span className="actions">
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No projects found</p>
                    )}
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
                            {getFilteredUsers().map((user, index) => (
                                <option key={index} value={user.name + '?' + user.uid}>
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
