import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import Home from './pages/home'
import Blogs from './pages/blogs'
import BlogDetails from './pages/blogDetails'
//Authenticated routes
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    window.localStorage.getItem("authTokenArticleApp") && window.localStorage.getItem("authTokenArticleApp")!=="undefined"?
  <Component {...props} />
    :<Redirect to='/' />
  )} />
)
class App extends Component {
   
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blogs" exact component={Blogs} />
          <Route path="/blog/:_id" exact component={BlogDetails}/>
        </Switch>
      </Router>
    );
  } 
}
export default App;
