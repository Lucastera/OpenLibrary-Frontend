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
        params,
        data
    });
};

export const getReviewDetailHistory = (reviewId) => {
    return request({
      url: `/review/detail`, //???? review/detail
      method: 'get',
      data
    });
  };

