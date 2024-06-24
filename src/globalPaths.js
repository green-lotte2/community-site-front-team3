<<<<<<< HEAD
//const serverHost = '127.0.0.1';
const serverHost = '3.34.204.24';
=======
const serverHost = "127.0.0.1";
//const serverHost = '3.34.204.24';
>>>>>>> 38311ef4b0b1b9b872ee09f8d719079aa19214cc

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
