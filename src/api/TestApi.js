import axios from 'axios';

const url = 'http://localhost:8080/test';

// 연결 테스트
export const getTest = async (params1) => {
    
    const response = await axios.get(`${url}/test?param=${params1}`);
  
    return response.data;
};

