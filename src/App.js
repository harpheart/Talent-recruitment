import React, { Component } from 'react';
import { Link,BrowserRouter as Router,Route,Switch  } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <div>
    home
    <Link to='/car'> asdasd</Link>
      </div>
    );
  }
}
class Car extends Component {

  render() {
    const {history}=this.props
    return (
      <div>
        <hr/>
        <hr/>
    <button onClick={()=>{history.push('/home')}}>back</button>
      </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
           <Link to='/home'>h</Link>
           <Link to='/blog'>b</Link>
           
           <Switch>
           <Route path='/home' exact component={Home}></Route>
           <Route path='/blog' render={()=>(<div>blog</div>)}></Route>
           <Route path='/car' component={Car}></Route>
           <Route  render={()=>(<div>404</div>)}></Route>
           </Switch>


          </div>
        </Router>
      </div>
    );
  }
}

export default App;