import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/clientActions';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
import AdminUserRoute from './components/common/AdminUserRoute';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/layout/Dashboard';
import CreateClientProfile from './components/clients/CreateClientProfile';
import Client from './components/clients/singleClients/Client';
import EditClient from './components/clients/EditClient';
import SocialRender from './components/socialRender/SocialRenderComponent';
import EditSocialRender from './components/socialRender/Edit-SocialRenderComponent';
import ContentCalendar from './components/socialRender/Calendar/Calendar';
import ClientContentCalendar from './components/socialRender/Calendar/ClientContentCalendar';
import './styles/styles.css';
import ManageUsers from './components/Auth/Users/ManageUsers';
import UserItem from './components/Auth/Users/UserItem';
import RegisterClientUser from './components/Auth/Users/RegisterClientUser';

// Check For Token
const token = localStorage.jwtToken;
if (token) {
  setAuthToken(token); // Set Auth Token Header Auth
  const decoded = jwt_decode(token); // Decode Token and Get User Info
  store.dispatch(setCurrentUser(decoded)); // Set User and is Authenticated
  // Check For Expired Token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser()); // Logout User
    store.dispatch(clearCurrentProfile()); // Clear Current Profile
    window.location.href = '/login'; // Redirect to login
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container-fluid">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <AdminRoute exact path="/users/manage" component={ManageUsers} />
                <AdminRoute exact path="/users/manage/:id" component={UserItem} />
                <AdminRoute
                  exact
                  path="/users/manage/e/register-client"
                  component={RegisterClientUser}
                />
                <AdminUserRoute exact path="/social-render" component={SocialRender} />
                <AdminUserRoute
                  exact
                  path="/social-render/:id/edit-content"
                  component={EditSocialRender}
                />
                <AdminUserRoute exact path="/content-calendar" component={ContentCalendar} />
                <AdminUserRoute exact path="/content-calendar/:m/:y" component={ContentCalendar} />
                <PrivateRoute
                  exact
                  path="/content-calendar/:clientName"
                  component={ClientContentCalendar}
                />
                <PrivateRoute
                  exact
                  path="/content-calendar/:clientName/:m/:y"
                  component={ClientContentCalendar}
                />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/clients/:handle" component={Client} />
                <AdminUserRoute exact path="/create-client" component={CreateClientProfile} />
                <AdminUserRoute exact path="/clients/:handle/edit-client" component={EditClient} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
