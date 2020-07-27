import {
    BLOGS_REQUEST,
    BLOGS_SUCCESS,
    BLOGS_FAILED,
    BLOG_DETAIL_REQUEST,
    BLOG_DETAIL_SUCCESS,
    BLOG_DETAIL_FAILED
  } from '../actions/blogs';
  
  const initialState = {
    blogs: [],
    blogDetails:{},
    loading: false,
    message: null,
    blogsError:'We are unable fetch topics. Please try again!'
  };
  
  const blogs = (state = initialState, action) => {
    switch (action.type) {
      case BLOGS_REQUEST:
        return { ...state, loading: true, message: null };
      case BLOGS_SUCCESS:
        return {
          ...state,
          blogs:action.payload,
          loading: false
        };
      case BLOGS_FAILED:
        return { ...state, loading: false, 
                message: action.message ?  action.message : initialState.message
              };
      case BLOG_DETAIL_REQUEST:
        return { ...state, loading: true, message: null };
      case BLOG_DETAIL_SUCCESS:
        return {
          ...state,
          blogDetails:action.payload,
          loading: false
        };
      case BLOG_DETAIL_FAILED:
        return { ...state, loading: false, 
                message: action.message ?  action.message : initialState.message
              };
      default:
        return state;
    }
};

export default blogs;