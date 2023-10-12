import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/actions/login";
import { errorMessage } from "../../store/actions/utils";
import * as Yup from "yup";
import Spinner from "react-bootstrap/Spinner";
import axiosauth from "../../api/axios-auth";
import { Redirect } from "react-router-dom";

// import { useToasts } from 'react-toast-notifications'

const SigninSchema = Yup.object().shape({
  username: Yup.number()
    // .number()
    .required("Phone Number is required"),
  password: Yup.string().required("Please Enter your password"),
});

const redirect = () => {
  return <Redirect to="/dashboard" />;
};

const redirectVendor = () => {
  return <Redirect to="/vendor" />;
};


const maxLengthCheck = (object) => {
  if (object.target.value.length > object.target.maxLength) {
    object.target.value = object.target.value.slice(
      0,
      object.target.maxLength
    );
  }
};

const LoginForm = (props) => {
  const {
    setsignUpContentModal,
    signUpContentModal,
    setsignInModal,
    signInModal,
  } = props;
  const dispatch = useDispatch();
  // const { addToast } = useToasts();
  const state = useSelector((state) => state);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [sendLink, setSendLink] = useState(false);
  const [resetpassword, setResetpassword] = useState(false);
  const [resetpasswordMsg, setResetpasswordMsg] = useState("");
  const [resetPasswordOTP, setResetPasswordOTP] = useState(false);
  const [sendEmail, setSendEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const loginPending = useSelector((state) => state.LOGIN_PENDING);
  const [userType, setUserType] = useState(2);
  const [phone, setPhone] = useState({
    phone: ""
  });

const handleChange = (e) => {
  setPhone({...phone, [e.target.name]: e.target.value });
};
const handlePasswordOTP = (e) => {
  setResetPasswordOTP({...resetPasswordOTP, [e.target.name]: e.target.value });
};

const handlePasswordNew = (e) => {
  setNewPassword({...newPassword, [e.target.name]: e.target.value });
};

const changeUserType=(e)=>{
  setUserType(e)
  setEmailError(null)
  dispatch(errorMessage(null))
  console.log("*************")
}


const changePassword = (e) => {
  if(newPassword==null){
    setNewPasswordErrorMsg("Enter your password")
    return false
  }
  if(newPassword.Password.length<6){
    setNewPasswordErrorMsg("Password too short")
    return false
  }
  if(resetPasswordOTP==false){
    setNewPasswordErrorMsg("Enter you  OTP")
    return false
  }
  
  setNewPasswordErrorMsg(null) // message empty
  setLoading(true); // loader visible
  let obj = {
    newPassword: newPassword.Password,
    resetpasswordOTP:resetPasswordOTP.otp
  };

  axiosauth
  .put("/api/v1/user/passwordchange", obj)
  .then((response) => {
    if(response.status===200){
      const res = JSON.parse(response.data);
      setSendLink(true)
      setResetpassword(false)
      setLoading(false);
      setTimeout(() => {
        setsignInModal(!signInModal)
      }, 5000);
    }
  })
  .catch((error) => {
    error = JSON.parse(error?.response?.data);
    setNewPasswordErrorMsg(error.message) //show message
    setLoading(false);
  });
}


  const submitPhone = (e) => {
    e.preventDefault();
    if(phone.phone.length !=10){
      setEmailError("Invalid Phone Number");
      return false
    }
    setEmailError(null) // message state empty
    setLoading(true); //loader visible
    let obj = {
      phone: phone.phone,
      roleId:userType,
    };
    axiosauth
      .put("/api/v1/user/forgotpassword", obj)
      .then((response) => {
        console.log(response,"********")
        if(response.status===200){
          setSendLink(true);
          setResetpassword(true)
          setLoading(false); //loader hide
        }
        /*if (res.message === "email sent") {
          setEmailError(null);
          setSendLink(true);
          setLoading(false);

          setTimeout(() => {
            setSendLink(false);
            setForgotPassword(false);
          }, 5000);
        } else {
          console.log(res.message);
          setEmailError(res.message);
          setLoading(false);
        }*/
      })
      .catch((error) => {
        setLoading(false);  //loader hide
        error = JSON.parse(error?.response?.data);
        setEmailError(error.message); //show message
        // setLoading(false);
      });
  };

  return (
    <>
      {state.loginSuccess === "Login Successful" && state.authenticated === true
        ? redirect()
        : null}
      {state.loginSuccess === "Login Successful" &&
      state.vendorAuthenticated === true
        ? redirectVendor()
        : null}

      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0">
          <div className="modal-body py-0">
            <div className="row px-3">
              {!forgotPassword ? (
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                    passwordShow: false,
                  }}
                  validationSchema={SigninSchema}
                  onSubmit={(fields) => {
                    dispatch(userLogin(fields, userType));
                  }}
                  render={({
                    errors,
                    values,
                    status,
                    onChange,
                    touched,
                    setFieldValue,
                  }) => (
                    <Form
                      onChange={() => {
                        dispatch(errorMessage(null));
                      }}
                    >
                      <div className="modal-body-right-content pb-lg-4 my-1 px-sm-4 pb-sm-4 px-3 pb-3">
                        <div className="row">
                          <div className="col-12">
                            <button
                              type="button"
                              className="close"
                              onClick={() => setsignInModal(!signInModal)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                            <h6 className="mb-2 modal-title text-center text-uppercase text-nowrap font-weight-bold">
                              Sign In{" "}
                            </h6>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-12">
                            <div className="d-flex justify-content-between mr-5">
                              <div
                                className="mb-4"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button                                                                  
                                  onClick={() => changeUserType(2)}
                                  type="button"
                                  className={`btn px-1 ${
                                    userType === 2
                                      ? "btn-line-deep-primary"
                                      : ""
                                  } pb-1 pt-0`}
                                >
                                  Customer
                                </button>
                                <button
                                  onClick={() => changeUserType(3)}
                                  type="button"
                                  className={`btn px-1 ${
                                    userType === 3
                                      ? "btn-line-deep-primary"
                                      : ""
                                  } pb-1 pt-0`}
                                >
                                  Space Provider
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 form-group form-group-lg mb-3">
                            <label htmlFor="spaceprovideremailid">
                              Phone Number<sup className="text-danger">*</sup>
                            </label>

                            <Field
                              name="username"
                              placeholder="Type Here"
                              type="number"
                              className={
                                "form-control" +
                                (errors.username && touched.username
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="col-sm-12 form-group form-group-lg mb-3">
                            <label htmlFor="spaceproviderpassword">
                              Password<sup className="text-danger">*</sup>
                            </label>

                            <div className="input-group mb-2 mr-sm-2">
                              {/* <input type="text" id="spaceproviderpassword" required={true} onChange={(e) => this.setState({ password: e.target.value})} className="form-control form-control-lg" placeholder="Type here" /> */}
                              <Field
                                name="password"
                                placeholder="Type Here"
                                type={values.passwordShow ? "text" : "password"}
                                className={
                                  "form-control" +
                                  (errors.password && touched.password
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                              {errors.password && touched.password ? null : (
                                <div
                                  className="input-group-prepend"
                                  style={{ height: "33px" }}
                                >
                                  <div className="input-group-text bg-white">
                                    {values.passwordShow ? (
                                      <i
                                        onClick={() => {
                                          setFieldValue(
                                            "passwordShow",
                                            !values.passwordShow
                                          );
                                        }}
                                        className="fa fa-eye"
                                        style={{
                                          color: "#00295F",
                                          fontSize: "22px",
                                          cursor: "pointer",
                                        }}
                                      ></i>
                                    ) : (
                                      <i
                                        onClick={() => {
                                          setFieldValue(
                                            "passwordShow",
                                            !values.passwordShow
                                          );
                                        }}
                                        className="fa fa-eye-slash"
                                        style={{
                                          color: "#00295F",
                                          fontSize: "22px",
                                          cursor: "pointer",
                                        }}
                                      ></i>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="errorMessage ml-3">
                            {state.errorMessage}
                          </p>
                          <div className="ml-auto col-auto d-inline-block">
                            <a
                              onClick={() => {
                                setForgotPassword(true);
                              }}
                              href="#forgot-password-modal"
                              data-toggle="modal"
                              data-dismiss="modal"
                              className="btn btn-link text-gray px-0"
                            >
                              Forgot Password?
                            </a>
                            {/* <Link to="#" className="btn btn-link text-gray px-0">Forgot Password</Link> */}
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            disabled={loginPending}
                            className="btn btn-deep-primary position-relative my-3 col-6 mx-auto text-nowrap"
                          >
                            {userType === 2
                              ? "Customer Sign In"
                              : "Space Provider Sign In"}
                            {loginPending ? (
                              <Spinner animation="border" />
                            ) : null}
                          </button>
                          {/* {this.props.loginSuccess.type === 'LOGIN_PENDING' ? <CircularProgress color="secondary" /> : <span></span>} */}
                          <p className="mb-0">
                            Don't have an Account?
                            <button
                              style={{ all: "unset", cursor: "pointer" }}
                              className="btn p-0"
                              onClick={(e) => {
                                e.preventDefault();
                                setsignUpContentModal(!signUpContentModal);
                                setsignInModal(!signInModal);
                              }}
                            >
                              {" "}
                              &nbsp;{" "} 
                              <span className="btn-line-deep-primary py-1">
                                Sign Up
                              </span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </Form>
                  )}
                />
              ) : (
                <>
                  {!sendLink ? (
                    <div className="col-12 py-lg-4 my-1 p-sm-4 p-3">                      
                      <div className="row">
                      <h5 className="mb-4 modal-title text-center text-uppercase mt-4">
                              Forgot password 
                            </h5>
                        <div className="col-12">
                          <button
                            type="button"
                            className="close"
                            onClick={() => setsignInModal(!signInModal)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <ul
                            className="nav nav-pills common-tabs mb-2"
                            id="signin-tab"
                            role="tablist"
                            data-getelement="#modal-body-left-content"
                            >
                              <li className="nav-item">
                                <button
                                onClick={() => changeUserType(2)}
                                className={`nav-link text-black px-2 py-0 ${
                                userType === 2 ? "customer-active" : ""
                                }`}
                                >
                                customer
                                </button>
                              </li>
                              <li className="nav-item">
                                <button
                                onClick={() => changeUserType(3)}
                                className={`nav-link text-black px-2 py-0 ${
                                userType !== 2 ? "customer-active" : ""
                                }`}
                                >
                                Space provider
                                </button>
                              </li>
                           </ul>
                          <div>                            
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12 form-group form-group-lg mb-3 py-4">
                        <div className="disabled-true inputs">
                        <div className="input-group d-flex phone-group rounded-0">
                          <div className="input-group-prepend">
                            <span className="input-group-text p-0 bg-none" id="mobile-number-group">
                              <select className="form-control custom-select border-0 rounded-0" name="countryCode" >
                                <option data-countrycode="IN" value="91">+91</option>
                              </select>
                            </span>
                          </div>
                          <input
                          name="phone"
                          type="number"
                          onChange={handleChange}
                          placeholder="Mobile Number" 
                          className='form-control' 
                          maxLength="10"
                          onInput={maxLengthCheck}
                           />                          
                          </div>                          
                        </div>                          
                          <p className="errorMessage">{emailError}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={submitPhone}
                          disabled={loading}
                          type="button"
                          data-dismiss="modal"
                          data-target="#sent-mail-status-modal"
                          data-toggle="modal"
                          className="btn btn-deep-primary my-3 mx-auto"
                        >
                          Send Reset Link
                          {loading ? <Spinner animation="border" /> : null}
                        </button>
                      </div>
                    </div>
                  ) : (resetpassword?(<div className="col-12 py-lg-4 my-1 p-sm-4 p-3">
                      <div className="row">
                          <div className="col-12">
                            <button
                              type="button"
                              className="close"
                              onClick={() => setsignInModal(!signInModal)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                            <h6 className="mb-2 modal-title text-center text-uppercase text-nowrap font-weight-bold">
                              Reset your password{" "}
                            </h6>
                          </div>
                          <div className="row">
                            <div className="col-sm-12 form-group form-group-lg mb-3">
                              <label htmlFor="spaceprovideremailid">
                                New Password new
                                <sup className="text-danger">*</sup>
                              </label>
                              <input
                                name="Password"
                                placeholder="Type Here"
                                type="password"
                                onChange={handlePasswordNew}
                                className="form-control"
                              />                              
                            </div>
                            <div className="col-sm-12 form-group form-group-lg mb-3">
                              <label htmlFor="spaceprovideremailid">
                                Enter OTP
                                <sup className="text-danger">*</sup>
                              </label>
                              <input
                              name="otp"
                              placeholder="Type Here"
                              type="number"
                              onChange={handlePasswordOTP}
                              className="form-control"
                              />
                            </div>
                            <div className="text-center">
                              <p className="errorMessage">{newPasswordErrorMsg}</p>
                              <button
                              onClick={changePassword}
                              disabled={loading}
                              type="button"
                              data-dismiss="modal"
                              data-target="#sent-mail-status-modal"
                              data-toggle="modal"
                              className="btn btn-deep-primary my-3 mx-auto"
                              >
                                Change Password
                                {loading ? <Spinner animation="border" /> : null}
                              </button> 
                              
                            </div>
                          </div>
                      </div>
                    </div>):
                    (
                    <div className="row">
                      <div className="col-12">
                        <button
                        type="button"
                        className="close"
                        onClick={() => setsignInModal(!signInModal)}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <span className="text-success">
                         <i class="fas fa-check h1 text-success"></i>
                          Password has been changed
                        </span>
                      </div>
                    </div>                    
                    )
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
