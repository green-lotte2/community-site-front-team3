import axios from 'axios';
import { globalPath } from 'globalPaths';

const url = globalPath.path;

//admin article list
export const adminArticleList = async () => {
    try {
        const response = await axios.get(`${url}/admin/article`);
        console.log(response); // 디버깅 목적
        return response.data;
    } catch (error) {
        console.error('Error fetching admin articles:', error);
        alert('Failed to fetch admin articles. Please try again later.');
        // 필요에 따라 에러를 다시 throw 할 수도 있습니다.
        throw error;
    }
};
