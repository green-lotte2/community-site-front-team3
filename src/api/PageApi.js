// PageApi.js

import axios from 'axios';
import { globalPath } from 'globalPaths';
import { PROJECT_SELECT_PATH } from 'requestPath';

const url = globalPath.path;

/** 페이지 조회 */
export const getPageData = async (pageNo) => {
  try {
    const response = await axios.get(`${url}/page?pageNo=${pageNo}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching page data: ", error);
    throw error;
  }
};

/** 협력자 조회 */
export const getPartners = async (pageNo) => {
  try {
    const response = await axios.get(`${url}/partners?pageNo=${pageNo}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching partners: ", error);
    throw error;
  }
};

/** 같은 회사인 유저 조회 */
export const getUsersByCompany = async (company) => {
  try {
    const response = await axios.get(`${PROJECT_SELECT_PATH}=${company}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company users: ", error);
    throw error;
  }
};

/** 페이지 저장 */
export const savePage = async (pageData) => {
  try {
    const response = await axios.post(`${url}/savepage`, pageData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving page: ", error);
    throw error;
  }
};

/** 협력자 초대 */
export const addPartners = async (partnerData) => {
  try {
    const response = await axios.post(`${url}/partners`, partnerData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error inviting partners: ", error);
    throw error;
  }
};

/** 협력자 삭제 */
export const removePartner = async (partnerDTO) => {
  try {
    const response = await axios.post(`${url}/partner`, partnerDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing partner: ", error);
    throw error;
  }
};

/** 페이지 삭제 */
export const deletePage = async (pageNo) => {
  try {
    const response = await axios.delete(`${url}/page?pageNo=${pageNo}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting page: ", error);
    throw error;
  }
};

/** 파일 업로드 */
export const uploadFile = async (file) => {
  const body = new FormData();
  body.append("file", file);

  try {
    const response = await axios.post(`${url}/page/upload`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const sName = response.data; // 서버가 반환한 이미지 URL
    console.log("파일 전송 성공 sName : ", sName);
    const src = `${url}/uploads/${sName}`;
    console.log("file 경로 : ", src);
    return src;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
