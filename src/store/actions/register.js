import {
  SUCCESS,
  ERROR,
  PENDING,
  REGISTER_MOBILE_NUMBER,
  USER_ROLE_CHECK,
  OTP_RESEND_MESSAGE,
  UPDATE_MOBILE_NUMBER,
  MOBILE_VERIFICATION_SUCCESS,
  MOBILE_VERIFICATION_ERROR,
  MOBILE_VERIFICATION_PENDING,
  OTP_VERIFICATION_PENDING,
  OTP_VERIFICATION_ERROR,
  OTP_VERIFICATION_SUCCESS,
  OTP_VERIFICATION_CONFIRM,
  CREATE_ROLE_ERROR,
  CREATE_ROLE_PENDING,
  CREATE_ROLE_SUCCESS,
} from '../types';
// import { BASE_URL } from '../api/constants';
import axios from 'axios';
import axiosauth from '../../api/axios-auth';
import {
  REGISTER_NEW_USER,
  PHONE_VERIFY
  } from '../../api/urls'

// import { isLoading, isError, errorMessage } from './utils';
// import * as Api from '../api';

function getHeader(){
  let token = localStorage.getItem('accesstoken')
  return {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
}


  export function successData(data) {
    return {
      type: SUCCESS,
      product: data,
    };
  }
 
  export function pendingData(data) {
    return {
      type: PENDING,
      product: data,
    };
  }

  export function errorData(data) {
    return {
      type: ERROR,
      product: data,
    };
  }

  // otp Actions

  export function otpPending(data) {
    // console.log(data,"hello abcd")
    return {
      type: OTP_VERIFICATION_PENDING,
      payload: data,
    };
  }


  export function otpSuccess(data) {
    return {
      type: OTP_VERIFICATION_SUCCESS,
      payload: data,
    };
  }

  export function otpResendMessage(data) {
    return {
      type: OTP_RESEND_MESSAGE,
      payload: data,
    };
  }


  export function otpError(data) {
    return {
      type: OTP_VERIFICATION_ERROR,
      payload: data,
    };
  }

  export function otpConfirm(data) {
    return {
      type: OTP_VERIFICATION_CONFIRM,
      payload: data,
    };
  }

  export function registerMobileNumber(data) {
    return {
      type: REGISTER_MOBILE_NUMBER,
      payload: data,
    };
  }


  export function userRoleCheck(data) {
    return {
      type: USER_ROLE_CHECK,
      payload: data,
    };
  }



  export function updateMobileMessage(data) {
    return {
      type: UPDATE_MOBILE_NUMBER,
      payload: data,
    };
  }

 
// New Register user
export const register = (data) => {
  return async(dispatch) => {
    dispatch(pendingData(true))
      // console.log(REGISTER_NEW_USER,data)
          try {
            axiosauth.post(REGISTER_NEW_USER, data).then(response => {
              // console.log("runagaun",response.data);
              let res = JSON.parse(response.data)
              // console.log(res,"i am not error section")
              if (res.statusCode === 200) {  
                dispatch(pendingData(false))
                dispatch(successData(true))   
                dispatch(otpSuccess(true))       
              }
              else {
                // console.log(res,"**************")
                dispatch(errorData(res.data.error))
                dispatch(pendingData(false))
              }
          }).catch((error) => {
            let msg;
            if (error.response) {
              const parseRes = JSON.parse(error.response.data)
              msg=parseRes.error
            } else if (error.request) {
              msg = "Server not responding please try later"
            } else {
              msg = "Server not responding please try later"
            } 
            // console.log(msg,"&&&&&&&&&")
            dispatch(errorData(msg))
            dispatch(pendingData(false))
            // console.log(msg.message,"**************")
          }).then(() => {
            dispatch(pendingData(false))
              // console.log("-----always executes");
          })
        
          } catch(e) {
            // console.log(e,"I am catch statement")
             dispatch(pendingData(false))
          }
  }
}

// Otp Verification
export const otpVerification = (data) => {
  return async(dispatch) => {
    dispatch(otpPending(true))
    dispatch(otpError(null))
    // console.log("active action ",data)
    try {
      axiosauth.put(PHONE_VERIFY, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {  
          dispatch(otpPending(false))
          dispatch(otpConfirm(true))
          dispatch(otpSuccess(false))
          
        }
        else {
          // console.log(res.message)
          dispatch(otpPending(false))
          dispatch(otpError(res.message))
          dispatch(otpSuccess(true))
        }
    }).catch((error) => {
        error = JSON.parse(error?.response?.data);
        dispatch(otpPending(false))
        dispatch(otpError(error.message))
        dispatch(otpSuccess(true))
    }).then(() => {
      dispatch(otpPending(false))
        // console.log("-----always executes");
    })
  
    } catch(e) {

    }
  }
}

// Resend Otp Verification
export const resendOtp = (data) => {
  return async(dispatch) => {
    dispatch(otpPending(true))
    dispatch(otpError(null))

    try {
      axiosauth.post(`/api/v1/auth/resend`, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
          dispatch(otpResendMessage(res)) 
          dispatch(otpPending(false)) 
          setTimeout(()=>{
            dispatch(otpResendMessage(null)) 
          }, 5000)
        }
        else {
          // console.log(res.message)
          dispatch(otpPending(false))
          dispatch(otpError(res.message))
        }
    }).catch((error) => {
        // console.log(error);
        dispatch(otpPending(false))
        dispatch(otpResendMessage(null)) 
        dispatch(otpError(error.message))
    }).then(() => {
      dispatch(otpPending(false))
        // console.log("-----always executes");
    })
    } catch(e) {

    }
  }
}


// update mobile number
export const updateMobileNumber = (data) => {
  return async(dispatch) => {
    dispatch(otpPending(true))
    dispatch(otpError(null))

    // console.log("data======>", data)

    try {
      axiosauth.put(`/api/v1/user/updatemobilewithnumber`, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          // console.log("update mobile number===>", res)
          dispatch(registerMobileNumber(data.newPhone))
          dispatch(updateMobileMessage(res))
          dispatch(otpPending(false)) 
          setTimeout(()=>{
            dispatch(updateMobileMessage(null))
          }, 5000)
        }else{
          // console.log(res.message)
          dispatch(otpPending(false))
          dispatch(otpError(res.message))
        }
      }).catch((error) => {
        let msg;
        if (error.response) {
          const parseRes = JSON.parse(error.response.data)
          msg=parseRes.error
        } else if (error.request) {
          msg = "Server not responding please try later"
        } else {
          msg = "Server not responding please try later"
        }
        dispatch(otpPending(false))
        dispatch(updateMobileMessage(null))
        dispatch(otpError(msg))
        setTimeout(()=>{
          dispatch(otpError(null))
        }, 5000)
      }).then(() => {
        dispatch(otpPending(false))
        // console.log("-----always executes");
      })
    } catch(e) {}
  }
}




export const unRegisterUser = (data, callback) => {
  return async(dispatch) => {
    dispatch({
        type: MOBILE_VERIFICATION_PENDING,
        error: null
    })
    try {
        const response = await axios.post('http://127.0.0.1:8080/api/unregisteruser', data);
        if(response.data.statusCode !== 200){
          dispatch({
            type: MOBILE_VERIFICATION_ERROR,
            error: response.data.message,
          })
        } else {
          dispatch({
            type: MOBILE_VERIFICATION_SUCCESS,
            // user: response.message
          })
          callback();
        }
    } catch (error) {
        dispatch({
            type: MOBILE_VERIFICATION_ERROR,
            error: 'error contact',
        })
    }
  }
}

export const verifyUnRegisterUser = (data, callback) => {
  return async(dispatch) => {
    dispatch({
        type: OTP_VERIFICATION_PENDING,
        error: null
    })
    try {
        const response = await axios.post('http://127.0.0.1:8080/api/unregisteruser/verifyotp', data);
        if(response.data.statusCode !== 200){
          dispatch({
            type: OTP_VERIFICATION_ERROR,
            error: response.data.message,
         })
        } else {
          dispatch({
            type: OTP_VERIFICATION_SUCCESS,
            // user: response.message
          })
          callback();
        }
    } catch (error) {
        dispatch({
            type: OTP_VERIFICATION_ERROR,
            error: error,
        })
    }
  }
}

export const createSubUserRole = (data, callback) => {
  return async(dispatch) => {
    dispatch({
        type: CREATE_ROLE_PENDING,
        error: null
    })
    try {
        const response = await axios.post('http://127.0.0.1:8080/api/roles/createRole', data, getHeader());
        if(response.data.statusCode !== 200){
          dispatch({
            type: CREATE_ROLE_ERROR,
            error: response.data.message,
         })
        } else {
          dispatch({
            type: CREATE_ROLE_SUCCESS,
            // user: response.message
          })
          callback();
        }
    } catch (error) {
        dispatch({
            type: CREATE_ROLE_ERROR,
            error: error,
        })
    }
  }
}

export const createSubUser = (data, callback) => {
  
}

