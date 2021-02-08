import './sass/main.scss';
import "./App.scss";

import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import Header from './components/Header/Header.component';
import Footer from './components/Footer/Footer.component';
import HomePage from './pages/HomePage/HomePage.component';
import SignIn from './pages/SignIn/SignIn.component';
import SignUp from './pages/SignUp/SignUp.component';
import AboutPage from './pages/AboutPage/AboutPage.component';
import ProgramPage from './pages/ProgramPage/ProgramPage.component';


import React, { Component } from 'react';
import { setCurrentUser } from './redux/user/user.actions';

import { app } from './firebase';
import firebase from "firebase";
import { connect } from 'react-redux';
import UserPage from './pages/UserPage/UserPage.component';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResourcesPage from './pages/ResourcesPage/ResourcesPage.component';
import VolunteerPage from './pages/VolunteerPage/VolunteerPage.component';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.component';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class App extends Component {
  state = {
    user: {},
    open: false
  }
  //unsubscribeFromAuth = null;

  onOpenModal = () => this.setState({open: true});
  onCloseModal = () => this.setState({open: false});

  componentDidMount() {
    const { setCurrentUser,  } = this.props;

    // this.unsubscribeFromAuth = app.auth().onAuthStateChanged((user) => {
    app.auth().onAuthStateChanged((user) => {
      console.log("user state changed", user);
      if(user){
        firebase.database().ref(`benefactors/${user.uid}`).on('value' , (data)=>{
          if(data.toJSON()){
            console.log("user info fetched", data.toJSON());
            setCurrentUser(data.toJSON());
          }else{
            firebase.database().ref(`volunteers/${user.uid}`).on('value' , (data)=>{
              if(data.toJSON()){
                console.log("user info fetched", data.toJSON());
                setCurrentUser(data.toJSON());
              }
            })
          }
        })
      }else{
        setCurrentUser(null);
      }
    })

    // window.onscroll = () => {
    //   if(window.pageYOffset === 0) {
    //     alert('I AM AT THE TOP');
    //   }
    // };
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    window.onscroll = null;
  }

  render() {
    const { currentUser } = this.props
    let usersFirstName = null;
    let usersLastName = null;
    let usersImageUrl = "";
    if (currentUser) {
      usersFirstName = currentUser.firstName
      usersLastName = currentUser.lastName
      usersImageUrl = currentUser.profilePic ? currentUser.profilePic : ""
    }
    return (
      <div className="app">
        {this.state.open && <div className="Modal">
          <div className="OptionsContainer">
            <div>
              <div className="Option DonateHighlight">
                <i className="fas fa-hand-holding-heart"></i>
                <a href="https://www.canadahelps.org/en/dn/t/32254" target="_blank" className="basketDonateButton">
                  Donate
                </a>
              </div>
              <div className="Option">
                <i class="fas fa-home"></i>
                <NavLink exact to="/" className="Link" activeClassName="ActiveLink">Home</NavLink>
              </div>
              <div className="Option">
                <i class="fas fa-file-alt"></i>
                <NavLink to="/about" className="Link" activeClassName="ActiveLink">About</NavLink>
              </div>
              <div className="Option">
                <i class="fas fa-home"></i>
                <NavLink to="/resources" className="Link" activeClassName="ActiveLink">Resources</NavLink>
              </div>
              <div className="Option">
                <i class="fas fa-file-alt"></i>
                <NavLink to="/program" className="Link" activeClassName="ActiveLink">Programs</NavLink>
              </div>
              <div className="Option">
                <i class="fas fa-home"></i>
                <NavLink to="/volunteer" className="Link" activeClassName="ActiveLink">Volunteer</NavLink>
              </div>
            </div>
            {currentUser ?
              <NavLink to="dashboard" className="Option OptionUser" activeClassName="ActiveLink">
                {usersImageUrl ? 
                  <img src={usersImageUrl} alt="" /> :
                  <div className="thumbnail">
                    <p className="text">{`${usersFirstName[0]}${usersLastName[0]}`}</p>
                  </div>
                }
                <p>{usersFirstName ? usersFirstName : "Hello"}</p>
              </NavLink> :
              <NavLink to="sign-in" className="Option" activeClassName="ActiveLink">
                <i class="fas fa-sign-in-alt"></i>
                <p>Log In</p>
              </NavLink>
            }
          </div>
          <div className="Backdrop" onClick={this.onCloseModal}>
          </div>
        </div>}
        <ToastContainer/>
        <Header onOpenModal={this.onOpenModal}/>
        <div className="app__content">
          <Switch >
            <Route exact path='/' component={HomePage} />
            <Route exact path='/volunteer' component={VolunteerPage} />
            <Route exact path='/resources' component={ResourcesPage}  />
            <Route exact path='/sign-in'
              render={() => currentUser ? <Redirect to='/' /> : <SignIn />}
            />
            <Route exact path='/sign-up'
              render={() => currentUser ? <Redirect to='/' /> : <SignUp />}
            />
            <Route exact path='/dashboard'
              render={() => !currentUser ? <Redirect to='/' /> : <UserPage />}
            />
            <Route exact path='/forgot-password'
            render={() => currentUser ? <Redirect to='/' /> : <ForgotPassword />}
            />
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/program' component={ProgramPage} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({user : {currentUser : currentUser}}) => ({
  currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
