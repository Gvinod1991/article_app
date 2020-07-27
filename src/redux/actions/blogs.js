
import {api} from '../../services/api'
export const BLOGS_REQUEST='BLOGS_REQUEST';
export const BLOGS_SUCCESS='BLOGS_SUCCESS';
export const BLOGS_FAILED='BLOGS_FAILED';
export const BLOG_DETAIL_REQUEST='BLOG_DETAIL_REQUEST';
export const BLOG_DETAIL_SUCCESS='BLOG_DETAIL_SUCCESS';
export const BLOG_DETAIL_FAILED='BLOG_DETAIL_FAILED';

export const openBlogsRequest = (body) => (dispatch, getState) => {
    let token=window.localStorage.getItem('authTokenBlogApp');
    return new Promise((resolve, reject) => {
        dispatch({ type: BLOGS_REQUEST})
        api({api: token ? 'web/api/v1/articles' : 'web/v1/articles',
        method: 'get'}).then((response) => {
            dispatch({ type: BLOGS_SUCCESS,
              message:response.message,payload:response.data.articles })
              resolve(true)
        }).catch(({ err }) => {
          dispatch({ type: BLOGS_FAILED,
            message:err })
            reject(true)
        })
    })
}


export const blogDetailsRequest = (_id) => (dispatch, getState) => {
  let token=window.localStorage.getItem('authTokenBlogApp');
  return new Promise((resolve, reject) => {
      dispatch({ type: BLOG_DETAIL_REQUEST})
      api({api: token ? 'web/api/v1/article/'+_id : 'web/v1/article/'+_id ,
      method: 'get'}).then((response) => {
          dispatch({ type: BLOG_DETAIL_SUCCESS,
            message:response.message,payload:response.data.article })
            resolve(true)
      }).catch(({ err }) => {
        dispatch({ type: BLOG_DETAIL_FAILED,
          message:err })
          reject(true)
      })
  })
}


export const searchBlogRequest = (searchText) => (dispatch, getState) => {
  let token=window.localStorage.getItem('authTokenBlogApp');
  return new Promise((resolve, reject) => {
      api({api: token ? 'web/api/v1/articles-by-tag-name?tagName='+searchText:'web/v1/articles-by-tag-name?tagName='+searchText,
      method: 'get'}).then((response) => {
          resolve(response)
      }).catch((err) => {
          reject(true)
      })
  })
}


