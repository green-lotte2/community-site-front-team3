import axios from 'axios';
import { globalPath } from 'globalPaths';

const url = globalPath.path;

/** 글 목록 조회 */ 
export const getList = async (params1) => {
  console.log(url);
    
    const response = await axios.get(`${url}/articles?cno=${params1}`);
    alert(response.data);
  
    return response.data;
};

// 글 보기 
export const getView = async (params1) => {
    
  const response = await axios.get(`${url}/view?ano=${params1}`);

  return response.data;
};

// 글 쓰기 - json으로 보내야함
export const postArticle = async ( {props} ) => {
    
  const response = await axios({
    url: "http://localhost:3000/article/post/",
    method: "post",
    data: {
      uid: props.uid,
      title: props.title,
      content: props.content,
    },
  });

  return response.data;
};
