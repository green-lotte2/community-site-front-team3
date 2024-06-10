import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import {
    PROJECT_CREATE_PATH,
    PROJECT_DELETE_PATH,
    PROJECT_LIST_PATH,
    PROJECT_SELECT_PATH,
    PROJECT_UPDATE_PATH,
} from 'requestPath';

const ProjectList = () => {
    const navigate = useNavigate();
    const authSlice = useSelector((state) => state.authSlice);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [userUids, setuserUids] = useState([]);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState(1);
    const [editProject, setEditProject] = useState(null);

    useEffect(() => {
        if (authSlice && authSlice.uid && authSlice.company) {
            fetchUsersByCompany(authSlice.company);
            selectProjectList();
        }
    }, [authSlice, status]);

    // 같은 회사인 유저 조회 //
    const fetchUsersByCompany = async (company) => {
        try {
            const response = await axios.get(`${PROJECT_SELECT_PATH}=${company}`);
            console.log('Response:', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('프로젝트 조회 에러:', error);
        }
    };
    // 프로젝트 리스트 출력 //
    const selectProjectList = async () => {
        try {
            const response = await axios.get(`${PROJECT_LIST_PATH}=${authSlice.uid}`);
            setProjects(response.data);
            console.log('proejct111:', response.data);
        } catch (error) {
            console.error('프로젝트 출력 에러:', error);
        }
    };

    // 프로젝트 생성 //
    const createProject = async (e) => {
        try {
            e.preventDefault();

            if (projectTitle.trim() === '' || userUids.length === 0) {
                alert('프로젝트 제목과 협업자를 추가해주세요.');
                return;
            }

            const response = await axios.post(`${PROJECT_CREATE_PATH}`, {
                uid: authSlice.uid,
                title: projectTitle,
                uids: userUids,
            });
            alert('프로젝트 생성완료!');
            selectProjectList();
            console.log('프로젝트 생성:', response.data.proNo);
        } catch (error) {
            console.error('프로젝트 생성 에러:', error);
        }
    };
    // 프로젝트 삭제 //
    const deleteProject = async (proNo) => {
        try {
            const response = await axios.delete(`${PROJECT_DELETE_PATH}=${proNo}`);
            console.log(response.data);
            setStatus(status + 1);
            alert('삭제완료');
            selectProjectList();
        } catch (error) {
            console.error('프로젝트 삭제 에러:', error);
        }
    };
    // 프로젝트 수정 //
    const updateProject = async (e) => {
        try {
            e.preventDefault();
            if (projectTitle.trim() === '') {
                alert('제목을 설정해주세요.');
                return;
            }
            const response = await axios.put(`${PROJECT_UPDATE_PATH}`, {
                proNo: editProject.proNo,
                title: projectTitle,
                status: editProject.status,
            });
            alert('프로젝트 수정완료!');
            selectProjectList();
            closeEditModal();
            console.log('프로젝트 업데이트:', response.data);
        } catch (error) {
            console.error('업데이트 에러:', error);
        }
    };
    // 프로젝트 칸반보드 이동 //
    const viewKanban = async (proNo) => {
        try {
<<<<<<< HEAD
            navigate(`/project/kanban?proNo=${proNo}`);
=======
            const response = await axios.get(`/project/kanban`, {
                params: {
                    proNo: proNo,
                },
            });
            navigate(`/project/kanban?proNo=${proNo}`);
            console.log('PROD', proNo);
>>>>>>> 0b67355af4493e9767baab1ba9b997de5749de11
        } catch (error) {
            console.error('칸반보드 이동:', error);
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
    const openEditModal = (project) => {
        setEditProject(project);
        setProjectTitle(project.title);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditProject(null);
        setProjectTitle('');
    };
    return (
        <>
            <div className="project-list-container">
                <div className="project-list">
                    <h2>프로젝트 목록</h2>
                    <div className="search-and-create">
                        <input type="text" placeholder=" 프로젝트 검색" />
                        <button className="create-button" onClick={openModal}>
                            새 프로젝트
                        </button>
                    </div>
                    {projects && projects.length > 0 ? (
                        projects.map((project, index) => (
                            <div className="project-card" key={index}>
                                <p onClick={() => viewKanban(project.proNo)}>{project.title}</p>
                                <div className="project-meta">
                                    <span className="date">{moment(projects.rdate).format('YY.MM.DD')}</span>
                                    <span className="actions">
                                        <button onClick={() => openEditModal(project)}>수정</button>
                                        <button onClick={() => deleteProject(project.proNo)}>삭제</button>
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>생성된 프로젝트가 없습니다</p>
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
                        <h2>새 프로젝트 생성</h2>
                        <label htmlFor="projectTitle">프로젝트 제목</label>
                        <input type="text" id="projectTitle" value={projectTitle} onChange={handleProjectTitleChange} />
                        <label htmlFor="inviteUser">초대 가능한 사용자</label>
                        <select id="inviteUser" onChange={handleInviteUser}>
                            <option value="">사용자를 선택하세요</option>
                            {/* 사용자 정보 출력 */}
                            {getFilteredUsers().map((user, index) => (
                                <option key={index} value={user.name + '?' + user.uid}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <div className="selected-users">
                            <p>초대된 사용자</p>
                            {invitedUsers.map((user, index) => (
                                <span className='projectUser' key={index} > {user}</span>
                            ))}
                        </div>
                        <button onClick={handleCreateProject}>프로젝트 생성</button>
                    </div>
                </div>
            )}
            {/* Edit 모달 */}
            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={closeEditModal}>
                            x
                        </button>
                        <h2>프로젝트 수정</h2>
                        <label htmlFor="editProjectTitle">프로젝트 제목</label>
                        <input
                            type="text"
                            id="editProjectTitle"
                            value={projectTitle}
                            onChange={handleProjectTitleChange}
                        />
                        <label htmlFor="editProjectStatus">프로젝트 상태</label>
                        <select
                            id="editProjectStatus"
                            value={editProject.status}
                            onChange={(e) => setEditProject({ ...editProject, status: e.target.value })}
                        >
                            <option value="1">완료</option>
                            <option value="0">진행중</option>
                        </select>
                        <button onClick={updateProject}>수정 완료</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectList;
