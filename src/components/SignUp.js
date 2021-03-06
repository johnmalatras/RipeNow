/**
 * Created by alextulenko on 11/11/16.
 */
import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;

import { browserHistory } from 'react-router';

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "Please enter an email.";

    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = "Please enter a password.";
    }

    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = "Please enter a password confirmation.";
    }

    if (values.password !== values.passwordConfirmation ) {
        errors.password = 'Passwords do not match';
    }

    if(!values.businessName){
        errors.businessName = "Please enter Business Name";
    }

    if(!values.address){
        errors.address = "Please enter Address";
    }

    if(!values.city){
        errors.city = "Please enter City";
    }
    if(!values.state){
        errors.state = "Please enter State";
    }
    if(!values.phoneNumber){
        errors.phoneNumber = "Please enter Phone Number";
    }
    if(!values.ownerName){
        errors.ownerName = "Please enter Contact Name";
    }
    if(values.accessCode!='123456'){
        errors.accessCode = "Incorrect Access Code";
    }

    return errors;
};

class SignUp extends React.Component {
    constructor(props) {
        super();
        this.handleFormSubmit= this.handleFormSubmit.bind(this);
        this.TermsOfUse= this.TermsOfUse.bind(this);
    }
    renderAuthenticationError() {
        if (this.props.authenticationError) {
            return <div className="alert alert-danger">{ this.props.authenticationError }</div>;
        }
        return <div></div>;
    }

    handleFormSubmit(values){
        if(values.isRestaurant == undefined)
        {
            values.isRestaurant = true;
        }
        {this.props.onSignUp(values)}
    };

    TermsOfUse(){
        browserHistory.push('/terms');
    };

    renderField({input, label, type, meta: {touched, error}}){
        return(
            <fieldset className="form-group">
                <label>{label}</label>
                <div>
                    <input {...input} placeholder={label} className="form-control" type={type} />
                    {touched && error && <span style={{color: '#ff0000'}}>{error}</span>}
                </div>
            </fieldset>
        )
    };

    render() {
        return(
            <div className="container">
                <div className="col-md-6">
                    { this.renderAuthenticationError() }
                    <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                        <Field name="email" type="text" component={this.renderField} label="Email" />
                        <Field name="password" type="password" component={this.renderField} label="Password" />
                        <Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation" />
                        <Field name="ownerName" type="text" component={this.renderField} label="Business Contact Name" />
                        <Field name="businessName" type="text" component={this.renderField} label="Business Name" />
                        <Field name="address" type="text" component={this.renderField} label="Business Address" />
                        <Field name="city" type="text" component={this.renderField} label="City" />
                        <Field name="state" type="text" component={this.renderField} label="State" />
                        <Field name="phoneNumber" type="text" component={this.renderField} label="Business Contact Phone Number" />
                        <Field name="accessCode" type="text" component={this.renderField} label="Access Code" />
                        <fieldset className="form-group">
                            <label>Select Restaurant or Farm</label>
                            <div>
                                <Field name="isRestaurant" component="select">
                                    <option value={true}>Restaurant</option>
                                    <option value={false}>Farm</option>
                                </Field>
                            </div>
                        </fieldset>
                        <Field name="agrees" type="checkbox" component={this.renderField} label="I have read and agreed to the terms of service." />
                        <button action="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

SignUp.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    onSignUp: PropTypes.func.isRequired,
    authenticationError: PropTypes.string
}

export default(reduxForm({
    form: 'signUpPage',
    validate
})(SignUp));