import request from './request';
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

export const getCodeExplanationGenerate_report = (params) => {
    return request({
        url: '/file-explain/getFileReport',
        method: 'get',
        params
    });
};

export const getCodeTranslation = (data) => {
    return request({
        url: '/translation/getTranslation',
        method: 'post',
        data
    });
};

export const CodeCompletion = (data) => {
    return request({
        url: '/completion/complete',
        method: 'post',
        data
    });
};
