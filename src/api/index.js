import request from './request';
import axios from 'axios';
export const getCodeReviewHistory = (params) => {
    return request({
        url: '/review/history',
        method: 'get',
        params
    });
};

export const submitCodeReview = (data) => {
    return request({
        url: '/review/submit',
        method: 'post',
        data
    });
};

export const getReviewDetailHistory = (historyID) => {
    return request({
      url: `/review/detail?history_id=${historyID}`, // Passing reviewId as a query parameter
      method: 'get'
    });
  };
  export const getCodeExplanationUpload = (params) => {
    return request({
        url: '/file_blueprint/uploadfile',
        method: 'get',
        params
    });
};


export const getCodeExplanationHistory = (params) => {
    return request({
        url: '/user-token/history_files',
        method: 'get',
        params
    });
};

export const getCodeExplanationGenerate_explanation = (params) => {
    return request({
        url: '/file-explain/getFileExplain',
        method: 'get',
        params
    });
};

export const getCodeExplanationGenerate_report= (params) => {
    return request({
        url: '/file-explain/getFileReport',
        method: 'get',
        params
    });
};
const getCodeTranslation = async (data) => {
    try {
        const response = await axios.post('http://120.25.76.18/api_1_0/translation/getTranslation', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; // 返回响应数据
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Translation API failed.');
    }
};
export const CodeCompletion = (data) => {
    return request({
        url: '/completion/complete',
        method: 'post',
        data
    });
};

export default getCodeTranslation;
