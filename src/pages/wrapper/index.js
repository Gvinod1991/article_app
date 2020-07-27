import React from 'react'
import { withRouter,Link } from "react-router-dom";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import logo from '../../assets/images/logo.png'
import './styles.scss'
import {validateEmail,logout} from '../../services/utils'
import {loginRequest,signupRequest} from '../../redux/actions/auth'
class Wrapper extends React.Component{
    state={
        showLogin:false,
        showSignUp:false,
        loginDetails:{
            email:"",
            password:""
        },
        signupDetails:{
            name:"",
            email:"",
            password:""
        }
    }
    componentDidMount(){
        let username=window.localStorage.getItem("username");
        this.setState({username})
    }
    openLoginModal=() =>{
        document.getElementsByTagName('body')[0].classList.add('modal-open');
        this.setState({showSignUp:false,showLogin:true,errMessage:"",succMessage:""})
    }
    closeLoginModal=()=>{
        document.getElementsByTagName('body')[0].classList.remove('modal-open');
        this.setState({showLogin:false})
    }
    openSignupModal=() =>{
        document.getElementsByTagName('body')[0].classList.add('modal-open');
        this.setState({showLogin:false,showSignUp:true,errMessage:"",succMessage:""})
    }
    closeSignupModal=()=>{
        document.getElementsByTagName('body')[0].classList.remove('modal-open');
        this.setState({showSignUp:false})
    }
    //Handle change event 
    handleChange=(name,value,type)=>{
        type === 'signup' ? 
        this.setState(
            prevState=>({
            signupDetails:{
                ...prevState.signupDetails,
                [name]:value
                }
            })
        ) : 
        this.setState(
            prevState=>({
            loginDetails:{
                ...prevState.loginDetails,
                [name]:value
                }
            })
        )
    }
    signupSubmit =() =>{
        this.setState({nameErr:"",emailErr:"",passwordErr:""});
        let name= this.state.signupDetails.name!==null ? this.state.signupDetails.name : false;
        let email= validateEmail(this.state.signupDetails.email) ? this.state.signupDetails.email : false;
        let password= this.state.signupDetails.password !==null ?  this.state.signupDetails.password : false;
        if(!name){
            this.setState({nameErr:"Invalid name"})
        }else{
            this.setState({nameErr:""})
        }
        if(!email){
            this.setState({emailErr:"Invalid email id"})
        }else{
            this.setState({emailErr:""})
        }
        if(!password){
            this.setState({passwordErr:"Invalid password"})
        }else{
            this.setState({passwordErr:""})
        }
        if(name && email && password){
            //sign up
            this.props.signupRequest(this.state.signupDetails).then((response)=>{
               if(response.status===200){
                   this.setState({succMessage:"Sign up successful,Login with your email and password",errMessage:""});

               }else{
                this.setState({errMessage:"Sign up failed,Try again",succMessage:""});  
               }
            }).catch((e)=>{
                this.setState({errMessage:"Sign up failed, Due to "+e.toLowerCase()+" Try to login",succMessage:""}); 
            })
        }
    }
    loginSubmit =() =>{
        this.setState({emailErr:"",passwordErr:""});
        let email= validateEmail(this.state.loginDetails.email) ? this.state.loginDetails.email : false;
        let password= this.state.loginDetails.password !==null ?  this.state.loginDetails.password : false;
        
        if(!email){
            this.setState({emailErr:"Invalid email id"})
        }else{
            this.setState({emailErr:""})
        }
        if(!password){
            this.setState({passwordErr:"Invalid password"})
        }else{
            this.setState({passwordErr:""})
        }
        if(email && password){
            //sign up
            this.props.loginRequest(this.state.loginDetails).then((response)=>{
               if(response.status===200){
                   window.localStorage.setItem("authTokenBlogApp",response.data.token)
                   window.localStorage.setItem("username",response.data.name)
                   this.setState({succMessage:"Login successful",errMessage:""});
                   window.location.reload();
               }else{
                this.setState({errMessage:"Login failed,Try again",succMessage:""});  
               }
            }).catch((e)=>{
                console.log(e);
                this.setState({errMessage:"Invalid credentials",succMessage:""}); 
            })
        }
    }
    render(){
        let {showLogin,showSignUp,loginDetails,signupDetails,nameErr,
            emailErr,passwordErr,succMessage,errMessage,username
        }=this.state;
        return(
        <div>
         {this.props.type && <div id="bg"></div>}
            <header className={this.props.type ? '' :'header'}>
                <a href="/"><img src={logo} alt="logo"/></a>
                    <ul className="social-media">
                    {!username && <li onClick={()=>this.openLoginModal()}><a href="#">Log in</a></li>}
                    {username && <li><a href="#">{username.split(" ")[0]}</a></li>}
                    {username && <li onClick={()=>logout()}><a href="#"><i className="fa fa-sign-out"></i></a></li>}
                    <li><a href="https://www.linkedin.com/in/godti-vinod-37bb46a9/"><i className="fa fa-linkedin"></i></a></li>
                    <li><a href="https://twitter.com/GodtiVinod"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="https://www.facebook.com/godti.vinod"><i className="fa fa-facebook"></i></a></li>                
                </ul>
            </header>
            {this.props.children}
            <div className="login-sign-up-wrapper">
            {showLogin && <div id="exampleModalLive" className="modal fade show" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style={{display: "block",paddingRight:15}}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLiveLabel">Login</h5>
                  <button onClick={()=>this.closeLoginModal()} type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Email Id</label>
                    <input type="text" value={loginDetails.email} onChange={(e)=>this.handleChange('email',e.target.value,'login')} className="form-control" />
                    <p className="text-danger">{emailErr}</p>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={loginDetails.password} onChange={(e)=>this.handleChange('password',e.target.value,'login')} className="form-control" />
                    <p className="text-danger">{passwordErr}</p>
                  </div>
                </div>
                <div className="modal-footer">
                    <div className="text-success">{succMessage}</div>
                    <div className="text-danger">{errMessage}</div>
                  <button type="button" onClick={()=>this.loginSubmit()} className="btn btn-primary">Login</button>
                  <p>Not a registered yet? <span onClick={()=>this.openSignupModal()} className="signup-link">Signup</span></p>
                </div>
              </div>
            </div>
          </div>
            }
            {showSignUp && <div id="exampleModalLive" className="modal fade show" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style={{display: "block",paddingRight:15}}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLiveLabel">Sign Up</h5>
                  <button onClick={()=>this.closeSignupModal()} type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={signupDetails.name} onChange={(e)=>this.handleChange('name',e.target.value,'signup')} className="form-control" />
                        <p className="text-danger">{nameErr}</p>
                    </div>
                    <div className="form-group">
                        <label>Email Id</label>
                        <input type="text" value={signupDetails.email} onChange={(e)=>this.handleChange('email',e.target.value,'signup')} className="form-control" />
                        <p className="text-danger">{emailErr}</p>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={signupDetails.password}  onChange={(e)=>this.handleChange('password',e.target.value,'signup')} className="form-control" />
                        <p className="text-danger">{passwordErr}</p>
                    </div>
                </div>
                <div className="modal-footer">
                   <div className="text-success">{succMessage}</div>
                   <div className="text-danger">{errMessage}</div>
                  <button type="button" className="btn btn-primary" onClick={()=>this.signupSubmit()}>Signup</button>
                  <p>Already have account? <span onClick={()=>this.openLoginModal()}className="signup-link">Login</span></p>
                </div>
              </div>
            </div>
          </div>
            }
        </div>
        </div>
      )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        signupRequest,
        loginRequest
    }, dispatch)
  };
  
export default withRouter(
    connect(
        null, mapDispatchToProps
    )(Wrapper)
);