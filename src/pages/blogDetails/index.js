import React from 'react'
import Wrapper from '../wrapper'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {blogDetailsRequest} from '../../redux/actions/blogs'
import { LoaderComponent } from '../../components/loader-component';
import config from '../../config'
import './styles.scss'

class BlogDetails extends React.Component{
    componentDidMount(){
        let _id=this.props.match.params._id
        this.props.blogDetailsRequest(_id);
    }
    createMarkup(html) {
        return {
           __html: html  };
     }; 
    render(){
        return(
            <Wrapper>
                <div className="container">
                <h2 className="head" onClick={()=>this.props.history.push('/blogs')}><i className="fa fa-arrow-left"></i>Back to blogs</h2>
                    <div className="row">
                    
                    <div className="col-md-2"></div>
                    <div className="col-md-8 col-sm-12" style={{background:"#fff"}}>
                        {!this.props.blog.title && <LoaderComponent/>}
                        {this.props.blog && 
                            <div key={this.props.blog._id} className="blog-details-container" >
                                {this.props.blog.image && <img src={config.apiEndpoint+this.props.blog.image} alt="blog image" />}
                            
                                <h2>{this.props.blog.title}</h2>
                                <div dangerouslySetInnerHTML={this.createMarkup(this.props.blog.content)}>
                                </div>
                                <div className="tag-wrapper">
                                    {this.props.blog.tags && this.props.blog.tags.length > 0 && 
                                        this.props.blog.tags.map((tag)=>{
                                            return <span className="tag">{tag !="" ? '#'+tag+" " : ""}</span>
                                        })
                                    }
                                </div>
                            </div>
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
        blog:state.blogs.blogDetails
    }
  }
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    blogDetailsRequest:(data)=>blogDetailsRequest(data)
  }, dispatch)
};

export default withRouter(
      connect(
        mapStateToProps, mapDispatchToProps
      )(BlogDetails)
);