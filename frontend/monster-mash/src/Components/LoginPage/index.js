import React, { Component } from 'react';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    }

  render(){
    return(
      <div>
        <LoginHeader/>
          <img className='Login-Img' src={process.env.PUBLIC_URL + '/SplashPage.jpg'} />
        <LoginForm/>
      </div>
    )
  }




}
