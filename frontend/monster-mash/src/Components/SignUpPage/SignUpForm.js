import React from 'react';

import FormField from '../Utility/FormField';


export default class SignUpForm extends React.Component{
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
          {FormField("Signup-form-field ", "Signup-form-field-label", "Email", this.state.Email, this.handleChange, "Signup-form-field-input")}
        </div>
    )
  }
}
