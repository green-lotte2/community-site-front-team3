import { globalPath } from 'globalPaths';
const path = globalPath.path;

/* 관리자 */
export const ADMIN_ARTICLE_LIST_PATH = path + '/admin/article';

/* 회원 */
export const MAIN_PATH = path + '/main';
export const USER_PATH = path + '/user/register';
export const LOGIN_PATH = path + '/user/login';
export const TERMS_PATH = path + '/user/terms';

export const FINDID_PATH = path + '/user/uid';
export const CHANGEPASS_PATH = path + '/user/new-pass';
export const CHECKPASS_PATH = path + '/user/verify/pass';

export const UPDATE_GRADE_PATH = path + '/user/grade';
export const UPDATE_USER_PATH = path + '/user/info';

export const CHECK_EMAIL_CODE_PATH = path + '/user/verify/email-code';
export const SEND_EMAIL_CODE_PATH = path + '/user/email-code';
export const SEND_FINDID_EMAIL_CODE_PATH = path + '/user/email-code-id';

/* 프로젝트 */
export const PROJECT_KANBAN_PATH = path + '/kanban';
export const PROJECT_SELECT_PATH = path + '/user/company?company';
export const PROJECT_LIST_PATH = path + '/project/list?uid';
export const PROJECT_CREATE_PATH = path + '/project/create';
export const PROJECT_UPDATE_PATH = path + '/project/update';
export const PROJECT_DELETE_PATH = path + '/project/delete?proNo';
