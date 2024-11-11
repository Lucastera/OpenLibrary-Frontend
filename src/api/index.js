import request from './request';

export const getCodeReviewHistory = (params) => {
    return request({
        url: '/review/history',
        method: 'get',
        params
    });
};


export const getCodeReview = (params) => {
    return request({
        url: '/review',
        method: 'get',
        params
    });
};