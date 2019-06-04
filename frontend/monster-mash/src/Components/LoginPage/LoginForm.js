import React from 'react';
import FormField from '../Utility/FormField';
import Button from '../Utility/Button';
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
    }
      handleChange(event, field) {
        this.setState({[field]: event.target.value});
    }
      handleSubmit(event) {

    }
    render(){
      const signUp = () => this.history.push('/signup')  
      debugger
      return(
        <div className="Login-form">
          <form>
            {FormField("Login-field", "Login-field-label", "Username", this.state.Username, this.handleChange, "Login-field-input")}
            {FormField("Login-field", "Login-field-label", "Password", this.state.Password, this.handleChange, "Login-field-input")}
          </form>
          <div className= "Login-button-box">
            {Button("Login-button", this.handleSubmit, "LOGIN", "Login-button-label")}
            {Button("Login-button", signUp, "SIGN UP", "Login-button-label")}
          </div>
        </div>
    )
  }
}
