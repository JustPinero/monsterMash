import React from 'react';


export default class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Username:"",
      Password:"",
      PasswordConfirmation:"",
      Bio:"",
      Ethnicity: "",
      Sex:"",
      Sign:""

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
      return(
        <div>
          
        </div>
    )
  }
}
