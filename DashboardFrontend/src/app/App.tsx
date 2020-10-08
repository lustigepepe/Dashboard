import React, { Component } from 'react';
import {
  Route,
  Switch, Redirect, RouteComponentProps
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Metrics from '../metrics/Metrics';
import Admin from '../adminRights/AdminRights';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import { login } from '../util/APIUtils';

interface AppState {
  authenticated: boolean,
  currentUser: string,
  loading: boolean
}
interface Props extends RouteComponentProps<any> {
  /* Parent component's props*/
}
class App extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  state: AppState = {
    authenticated: false,
    currentUser: '',
    loading: false,
  }

  componentDidUpdate() {

  }

  login(loginRequest: object): Promise<any> {

    return login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        this.getUser();
        Alert.success("You're successfully logged in!");
      });
  }

  loadCurrentlyLoggedInUser() {
    console.log('loadCurrentlyLoggedInUser: ');
    this.setState({ loading: true });
    this.getUser();
  }

  getUser() {
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false
        });
        console.log('response: ', response);
      }).catch(error => {
        this.setState({
          loading: false
        });
        console.warn(error);
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />
    }
    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <Redirect exact from="/" to="login" />
            <PrivateRoute exact path="/metrics"  /* data={[5,10,1,3]} size={[500,500]} */ authenticated={this.state.authenticated} component={Metrics}></PrivateRoute>
            <PrivateRoute path="/admin" authenticated={this.state.authenticated} component={Admin} {...this.props} ></PrivateRoute>
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Profile}></PrivateRoute>
            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} login={this.login.bind(this)} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert stack={{ limit: 3 }}
          timeout={3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default App;
