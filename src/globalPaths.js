//const serverHost = "127.0.0.1";
const serverHost = '3.34.204.24';

export const globalPath = {
    serverHost,
    path: `http://${serverHost}:8080`,

    /* 회원 */
    mainPath: '/main',
    user: '/user',
    regitserPath: '/member/register',
    terms: '/member/terms',
    checkEmailCode: '/member/checkEmailCode',
    sendEmailCode: '/member/checkUser/email',

    /* 프로젝트 */
    projectList: '/project/list',
    projectKanBan: '/project/kanban',
};
