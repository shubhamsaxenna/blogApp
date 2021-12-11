import './scss/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import SignIn from './auth components/signin';
import SignUp from './auth components/signup';
import Profile from './main components/profile';
import Timeline from './main components/timeline';
import Header from "./share component/header";
import reducer from './redux/reducer';

function App() {
  const initState = {
    user : {}
  }

  const create_Store = createStore(reducer, initState)

  return (
    <div >
      <Provider store={create_Store}>
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route exact path="/" component={Timeline}></Route>
        </Switch>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
