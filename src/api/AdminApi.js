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
        console.error('error:', error);
        alert('에러에러에러');

        throw error;
    }
};
