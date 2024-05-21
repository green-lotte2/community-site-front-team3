import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';

// 라우터 생성
const root = createBrowserRouter([{ path: '/', element: <MainPage /> }]);

// 라우터 내보내기
export default root;
