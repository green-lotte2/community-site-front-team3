import { globalPath } from 'globalPaths';
const path = globalPath.path;

/* 관리자 */
export const ADMIN_ARTICLE_LIST_PATH = path + '/admin/article';

/* 회원 */
export const MAIN_PATH = path + '/main';
export const USER_PATH = path + '/user';
export const LOGIN_PATH = path + '/user/login';
export const REGISTER_PATH = path + '/member/register';
export const TERMS_PATH = path + '/user/terms';
export const UPDATE_GRADE_PATH = path + '/user/updateGrade';
//export const CHECK_EMAIL_CODE_PATH = path + '/member/checkEmailCode';
//export const SEND_EMAIL_CODE_PATH = path + '/member/checkUser/email';
export const CHECK_EMAIL_CODE_PATH = path + '/member/checkEmailCode';
export const SEND_EMAIL_CODE_PATH = path + '/member/sendEmailCode';
export const FINDID_PATH = path + '/member/findUserId';
export const CHANGEPASS_PATH = path + '/member/changePass';
export const SEND_FINDID_EMAIL_CODE_PATH = path + '/member/sendEmailCodeForFindId';

/* 프로젝트 */
export const PROJECT_KANBAN_PATH = path + '/project/kanban';
export const PROJECT_SELECT_PATH = path + '/user/company?company';
export const PROJECT_LIST_PATH = path + '/project/list?uid';
export const PROJECT_CREATE_PATH = path + '/project/create';
export const PROJECT_UPDATE_PATH = path + '/project/update';
export const PROJECT_DELETE_PATH = path + '/project/delete?proNo';
