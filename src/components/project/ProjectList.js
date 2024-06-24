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
    const [allProjects, setAllProjects] = useState([]); // 전체 프로젝트 목록 상태 추가
    const [status, setStatus] = useState(1);
    const [editProject, setEditProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // 페이징 처리
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [currentSet, setCurrentSet] = useState(1); // 현재 페이지 세트
    const projectsPerPage = 5; // 한 페이지당 프로젝트 수
    const pagesPerSet = 10; // 한 세트당 페이지 수

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
            setAllProjects(response.data); // 전체 프로젝트 목록 업데이트
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
            setStatus(status + 1);
            setProjectTitle('');
            setInvitedUsers([]);
            setuserUids([]);
            closeModal();
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
            // status 상태변수를 업데이트하여 컴포넌트를 다시 렌더링 시킴
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
            navigate(`/project/kanban?proNo=${proNo}`);
        } catch (error) {
            console.error('칸반보드 이동:', error);
        }
    };
    // 모달창 열기
    const openModal = () => {
        setIsModalOpen(true);
    };
    // 모달창 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setProjectTitle('');
        setInvitedUsers([]);
        setuserUids([]);
    };
    // 프로젝트 제목 변경 핸들러
    const handleProjectTitleChange = (e) => {
        setProjectTitle(e.target.value);
    };
    // 협력자 초대 핸들러
    const handleInviteUser = (e) => {
        const selectdata = e.target.value.split('?');
        const selectedUser = selectdata[0];
        const selectUids = selectdata[1];

        if (selectedUser && !invitedUsers.some((user) => user.uid === selectUids)) {
            setInvitedUsers([...invitedUsers, { name: selectedUser, uid: selectUids }]);
            setuserUids([...userUids, selectUids]);
        }
    };
    // 프로젝트 생성 버튼 핸들러
    const handleCreateProject = (e) => {
        createProject(e);
        closeModal();
    };
    // 프로젝트 검색 상태 업데이트
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    // 프로젝트 검색 핸들러
    const handleSearch = () => {
        // 검색 기능 구현
        const filteredProjects = allProjects.filter((project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProjects(filteredProjects);
        setCurrentPage(1); // 검색 결과로 첫 페이지로 이동
        setCurrentSet(1); // 검색 결과로 첫 페이지 세트로 이동
    };
    // 협력자 초대 목록에 필터링
    const getFilteredUsers = () => {
        return users.filter((user) => !userUids.includes(user.uid) && user.uid !== authSlice.uid);
    };
    // 프로젝트 수정 모달창 열기
    const openEditModal = (project) => {
        setEditProject(project);
        setProjectTitle(project.title);
        setIsEditModalOpen(true);
    };
    // 프로젝트 수정 모달창 닫기
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditProject(null);
        setProjectTitle('');
    };

    // 페이지를 클릭하여 이동할 때 호출되는 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 다음 페이지 세트로 이동할 때 호출되는 함수
    const handleNextSet = () => {
        setCurrentSet(currentSet + 1);
        setCurrentPage(currentSet * pagesPerSet + 1);
    };

    // 이전 페이지 세트로 이동할 때 호출되는 함수
    const handlePrevSet = () => {
        setCurrentSet(currentSet - 1);
        setCurrentPage((currentSet - 2) * pagesPerSet + 1);
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const totalSets = Math.ceil(totalPages / pagesPerSet);

    useEffect(() => {
        console.log("321:", currentProjects);
    }, [currentProjects]);

    return (
        <>
            <div className="project-list-container">
                <div className="project-list">
                    <h2>프로젝트 목록</h2>
                    <div className="search-and-create">
                        <input
                            type="text"
                            placeholder="프로젝트 검색"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="search-button" onClick={handleSearch}>
                            검색
                        </button>
                        <button className="create-button" onClick={openModal}>
                            새 프로젝트
                        </button>
                    </div>
                    {currentProjects && currentProjects.length > 0 ? (
                        currentProjects.map((project, index) => (
                            <div className="project-card" key={index}>
                                <p onClick={() => viewKanban(project.proNo)}>
                                    {project.status === 1 && '🍊 '}
                                    {project.title}
                                </p>
                                <div className="project-meta">
                                    <span className="date">
                                        {moment(project.rdate.join('-'), 'YYYY-M-D-H-m-s').format('YY.MM.DD')}
                                    </span>
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
                <div className="pagination">
                    {currentSet > 1 && <button onClick={handlePrevSet}>이전</button>}
                    {[...Array(pagesPerSet).keys()]
                        .map((num) => num + 1 + (currentSet - 1) * pagesPerSet)
                        .filter((page) => page <= totalPages)
                        .map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={currentPage === pageNumber ? 'active' : ''}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    {currentSet < totalSets && <button onClick={handleNextSet}>다음</button>}
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
                                <span className="projectUser" key={index}>
                                    {user.name}
                                    {' | '}
                                </span>
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
