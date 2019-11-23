import React from 'react';
import FormField from '../Utility/FormField';
import Button from '../Utility/Button';
import {Link} from "react-router-dom";
import './Login.css';

export default class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    handleChange(event, field) {
      this.setState({[field]: event.target.value});
    }
    handleButtonClick(destination){
      if(this.history){
        this.history.push(destination)
      };
    }
      handleSubmit(event) {
      }
    render(){
      const signUp = this.handleButtonClick("/signup")
      debugger
      return(
        <div className="Login-form">
          <form>
            {FormField("Login-field", "Login-field-label", "Username", this.state.Username, this.handleChange, "Login-field-input")}
            {FormField("Login-field", "Login-field-label", "Password", this.state.Password, this.handleChange, "Login-field-input")}
          </form>
          <div className= "Login-button-box">
            <Link to="/home">Login</Link>
            {Button("Login-button", signUp, "SIGN UP", "Login-button-label")}
          </div>
        </div>
    )
  }
}
