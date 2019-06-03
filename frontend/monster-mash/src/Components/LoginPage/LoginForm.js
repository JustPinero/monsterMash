import React from 'react';
import LoginField from './LoginField';
import Button from './Button';

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
      debugger
      return(
        <div>
          <form>
            {LoginField("Username", this.state.Username, this.handleChange)}
            {LoginField("Password", this.state.Password, this.handleChange)}
          </form>
            {Button("LoginButton", this.handleSubmit, "LOGIN")}
            {Button("LoginButton", this.handleSubmit, "SIGN UP")}
        </div>
    )
  }
}
