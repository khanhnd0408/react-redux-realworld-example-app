import { Link } from 'react-router-dom'
import ListErrors from './ListErrors'
import React from 'react'
import agent from '../agent'
import { connect } from 'react-redux'
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes'

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password)
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
})

class Register extends React.PureComponent {
  constructor() {
    super()
    this.changeEmail = ev => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      this.props.onChangeEmail(ev.target.value)
    }
    this.changePassword = ev => {
      const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$"
      this.emailInstruction[0].display = false;
      this.props.onChangePassword(ev.target.value)
    }
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value)
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault()
      this.props.onSubmit(username, email, password)
    }
    this.onEmailInputForcus = ev => {
      this.displayEmailInstruction = true;
      this.forceUpdate();
    }
    this.onPasswordInputForcus = ev => {
      console.log("ola ola");
    }
    this.displayEmailInstruction = false;
    this.displayPasswordInstruction = false;
    this.emailInstruction = [
      {
        content: "Should input an emails, eg: exmaple@host.com",
        type: "email",
        color: "#FF0000",
        display: true,
      },
      {
        content: "Should contains at least 1 cap character.",
        type: "cap",
        color: "#FF0000",
        display: true,
      },
      {
        content: "Should contains at least 1 number",
        type: "number",
        color: "#FF0000",
        display: true,
      },
      {
        content: "Should contains at least 1 special key",
        type: "special",
        color: "#FF0000",
        display: true,
      }
    ];
    this.passwordInstruction = [];
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    const email = this.props.email
    const password = this.props.password
    const username = this.props.username
    const listEmailItems = this.emailInstruction.map((item) => <li style={{ color: item.color }}>{item.content}</li>)
    const listPasswordItems = this.emailInstruction.map((item) => <li key={item.type}>{item.content}</li>)
    return (
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>

            <div className='col-md-6 offset-md-3 col-xs-12'>
              <h1 className='text-xs-center'>Sign Up</h1>
              <p className='text-xs-center'>
                <Link to='/login'>
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>


                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      placeholder='Username'
                      value={this.props.username || ''}
                      onChange={this.changeUsername} />
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='email'
                      autoComplete='username'
                      placeholder='Email'
                      value={this.props.email || ''}
                      onChange={this.changeEmail}
                      onFocus={this.onEmailInputForcus} />
                    <ul style={{ display: this.displayEmailInstruction ? 'block' : 'none' }}>
                      {listEmailItems}
                    </ul>
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='password'
                      autoComplete='current-password'
                      placeholder='Password'
                      value={this.props.password || ''}
                      onChange={this.changePassword}
                      onFocus={this.onPasswordInputForcus} />
                  </fieldset>

                  <button
                    className='btn btn-lg btn-primary pull-xs-right'
                    type='submit'
                    disabled={this.props.inProgress}>
                    Sign up
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
