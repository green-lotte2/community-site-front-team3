import axios from 'axios';

const url = 'http://localhost:8080/orangenode/article';

// 글 목록
export const getList = async (params1) => {
    
    const response = await axios.get(`${url}/list?cno=${params1}`);
  
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
