import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  }

  // Initialize state and dispatch to reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // LOAD USER
  const loadUser = () => {
    console.log('loadUser');
  }

  // REGISTER USER
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  
    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  }

  // LOGIN USER
  const login = () => {
    console.log('login');
  }

  // LOGOUT
  const logout = () => {
    console.log('logout');
  }


  // CLEAR ERRORS
  const clearErrors = () => {
    console.log('clearErrors');
  }
  
  
  return (
    <AuthContext.Provider
     value={{
       token: state.token,
       isAuthenticated: state.isAuthenticated,
       loading: state.loading,
       user: state.user,
       error: state.error,
       register,
       loadUser,
       login,
       logout,
       clearErrors
     }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthState;