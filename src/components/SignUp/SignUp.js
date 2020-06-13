import React, { useState, useEffect } from 'react';
import './SignUp.css'
import { ValidateMessage } from '../Validation/Validation';
import { messages } from '../../utils/error-message';

const passwordRegX = /[^A-Za-z0-9]+/g;
const emailRegX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const nameRegX = /^([^0-9]*)$/;

export const LoginForm = () => {

  const [formVal, setFormVal] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isFormVisible: true,
    errors: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    },
  })
  const [userData, setUserData] = useState({})

  useEffect(() => {

  }, [])

  const handleChange = (e) => {

    e.preventDefault();
    const { name, value } = e.target;
    let errors = { ...formVal.errors };

    switch (name) {
      case 'firstName':
        errors.firstName = nameRegX.test(value) ? false : true;
        break;
      case 'lastName':
        errors.lastName = nameRegX.test(value) ? false : true;
        break;
      case 'email':
        errors.email = emailRegX.test(value) ? false : true
        break;
      case 'password':
        errors.password =
          value.length < 8 || passwordRegX.test(value) ? true : false;
        break;
      default:
        break;
    }

    setFormVal(prevState => ({
      ...prevState,
      errors,
      [name]: value
    }))
  }

  const handleSingup = (e) => {
    e.preventDefault();

    let errorVal = Object.values(formVal.errors);

    let isDirty = formVal.firstName === '' || formVal.lastName === '' || formVal.email === '' || formVal.password === '';
    console.log(isDirty)
    if (isDirty || errorVal.includes(true)) {
      alert('Form is invalid')
    } else {

      //Below is how I would have done with the real backend API

      // let data = {
      //   firstName: formVal.firstName,
      //   lastName: formVal.lastName,
      //   email: formVal.email
      // }
      //  fetch('api path', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8'
      //   },
      //   body: JSON.stringify(data)
      // })
      // .then(response => response.json())
      // .then(data => setState(data));
      fetch('./mockData.json')
        .then(response => response.json())
        .then(data => alert(data.message));

      fetch('./userData.json')
        .then(response => response.json())
        .then(data => setUserData(data));

      setFormVal({ ...formVal, isFormVisible: false })
    }
  }

  return (
    <div>
      {formVal.isFormVisible && <form className="main-form" onSubmit={handleSingup} autoComplete="off" noValidate>
        <div className="form-heading">
          <h3 className="form-title">Get started today!</h3>
        </div>
        <div className="form-container">
          <div className="row">
            <div className="column">
              <label className="form-label">First name</label>
              <input type="text" className="text-field" value={formVal.firstName} name="firstName" onChange={handleChange} />
              {formVal.errors.firstName && <ValidateMessage isValid={formVal.errors.firstName} message={messages.firstName} />}
            </div>
            <div className="column">
              <label className="form-label">Last name</label>
              <input type="text" className="text-field" value={formVal.lastName} name="lastName" onChange={handleChange} />
              {formVal.errors.lastName && <ValidateMessage isValid={formVal.errors.lastName} message={messages.lastName} />}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label className="form-label">Email address</label>
              <input type="email" className="text-field" value={formVal.email} name="email" onChange={handleChange} />
              {formVal.errors.email && <ValidateMessage isValid={formVal.errors.email} message={messages.email} />}
            </div>
            <div className="column">
              <label className="form-label">Password</label>
              <input type="password" className="text-field" value={formVal.password} name="password" onChange={handleChange} />
              {formVal.errors.password && <ValidateMessage isValid={formVal.errors.password} message={messages.password} />}
            </div>
          </div>

          <div className="row">
            <button className="trail-button">Claim Your Free Trail &nbsp;<i className="fa fa-play"></i></button>
          </div>

          <div className="row">
            <p className="terms">You are agreeing to our <a href="https://github.com/" className="terms-conditions">Terms and Services</a></p>
          </div>
        </div>
      </form>}
      {!formVal.isFormVisible && <div className="user-details-container">
        <div className="row">
          <p className="form-title-user">User Details</p>
        </div>
        <div className="row">
          <div>
            <div className="user-details">
              <label className="form-label">First name:</label>
              <p className="user-value">{userData.firstName}</p>
            </div>
            <div className="user-details">
              <label className="form-label">Last name:</label>
              <p className="user-value">{userData.lastName}</p>
            </div>
            <div className="user-details">
              <label className="form-label">Email:</label>
              <p className="user-value">{userData.email}</p>
            </div>
          </div>
          <div className="user-box-right">
            <div className="user-details">
              <label className="form-label">Address 1:</label>
              <p className="user-value">{userData.address1}</p>
            </div>
            <div className="user-details">
              <label className="form-label">Address 2:</label>
              <p className="user-value">{userData.address2}</p>
            </div>
            <div className="user-details">
              <label className="form-label">Pincode:</label>
              <p className="user-value">{userData.pincode}</p>
            </div>
            <div className="user-details">
              <label className="form-label">State:</label>
              <p className="user-value">{userData.state}</p>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}
