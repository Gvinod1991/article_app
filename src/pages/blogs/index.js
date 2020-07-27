import React from 'react'
import Wrapper from '../wrapper'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {withRouter, Link} from 'react-router-dom'
import {openBlogsRequest,searchBlogRequest} from '../../redux/actions/blogs'
import { LoaderComponent } from '../../components/loader-component';
import config from '../../config'
import './styles.scss'

class Blogs extends React.Component{
    state={
        searchedProduct:[]
    }
    componentDidMount(){
        this.props.openBlogsRequest();
    }
    openBlog=(_id)=>{
        this.props.history.push('/blog/'+_id)
    }
    
    searchFilter =(value) =>{

        this.setState({searchText:value},
            ()=>{
                if(value.length > 2){this.callSearchApi(value)}
            },
        );
    }
    callSearchApi=(searchText)=>{
        this.props.searchBlogRequest(searchText).then((response)=>{
            if(response.status===200){
                this.setState({searchedProduct:response.data.articles})
            }
            
        }).catch((e)=>{
            console.log(e)
        })
    }
    render(){
        let {searchedProduct}=this.state;
        let {loading}=this.props;
        return(
            <Wrapper>
                <div className="container">
                    <h2 className="head">Our Blogs</h2>
                    <div className="row">
                    <div className="col-md-2"></div>
                    
                    <div className="col-md-8">
                    <div className="search-wrapper">
                            <label>Search</label>
                            <div className="search-input-wrapper">
                                <input type="text" className="form-control" onChange={(e)=>this.searchFilter(e.target.value)}  />
                                {searchedProduct && searchedProduct.length > 0 && <div className="search-result">
                                    <ul className="search-list">
                                        {
                                            searchedProduct.map((article)=>{
                                                return <li key={article._id}><i className="fa fa-search"> </i><Link to={"blog/"+article._id}>{article.title}</Link><hr/></li>
                                            })
                                        }
                                    </ul>
                                </div>
                                }   
                            </div>
                        
                    </div>
                    <br/>
                        {loading && <LoaderComponent/>}
                        {!loading && this.props.blogsList && this.props.blogsList.length === 0 && <p>No blogs found</p>}
                        {this.props.blogsList 
                        && this.props.blogsList.length > 0 && 
                        this.props.blogsList.map((blog)=>{
                            return <div onClick={()=>this.openBlog(blog._id)} key={blog._id} className="blog-container">
                                <div>
                                    <h2>{blog.title}</h2>
                                    <div>
                                        {blog.tags && blog.tags.length > 0 && 
                                            blog.tags.map((tag,index)=>{
                                                return <span key={index} className="tag">{tag !="" ? '#'+tag+" " : ""}</span>
                                            })
                                        }
                                    </div>
                                </div>
                                    <img src={config.apiEndpoint+blog.image} alt="blog image" />
                            </div>
                        })
                        }
                    </div>
                    <div className="col-md-2">    
                    </div>
                    </div>
                </div>
            </Wrapper>
        )
    }
}

const mapStateToProps =(state)=>{
    return {
        loading: state.blogs.loading,
        message: state.blogs.message,
        blogsList:state.blogs.blogs
    }
  }
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    openBlogsRequest,
    searchBlogRequest
  }, dispatch)
};

export default withRouter(
      connect(
        mapStateToProps, mapDispatchToProps
      )(Blogs)
);