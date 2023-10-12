import React,{useEffect, useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {otpVerification, otpSuccess, pendingData,updateMobileNumber, resendOtp} from './../../store/actions/register';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from "react-bootstrap/Spinner";
import $ from "jquery"

const OtpVerify = ({mobileNumber,verifyOtpModal,setverifyOtpModal,successModal, setsuccessModal,checkuserrole }) => {
  
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const loginPending = useSelector((state) => state.LOGIN_PENDING);
  const loading = useSelector((state) => state.OTP_VERIFICATION_PENDING);
  const [oldNumber, setOldNumber] = useState(null);
  console.log(state)
  const [otpJson, setOtpJson] = useState({
    "phone":"",
    "otp1":"",
    "otp2":"",
    "otp3":"",
    "otp4":"",
    "type":"phone"
  })

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  useEffect(()=>{
    // console.log(state.loading,"All state printed action",pendingData)
    if(state.otpVerified?.registerMobile){

      setOldNumber(state.otpVerified?.registerMobile)

      setOtpJson({
        "phone":state.otpVerified?.registerMobile,
        "otp1":"",
        "otp2":"",
        "otp3":"",
        "otp4":"",
        "type":"phone"
      })

    }
  },[state.otpVerified])

  useEffect(() => {
    // alert(checkuserrole)
    function loadJs(){
      // Digit Group

      $('.digit-group').find('input').each(function() {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function(e) {
            var parent = $($(this).parent());
        
            if(e.keyCode === 8 || e.keyCode === 37) {
                var prev = parent.find('input#' + $(this).data('previous'));
            
                if(prev.length) {
                    $(prev).select();
                }
            } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                var next = parent.find('input#' + $(this).data('next'));
            
                if(next.length) {
                    $(next).select();
                } 
            }
        });
    });


// Phone number editable
      $(function () {
        $('.edit-details').on('click',function(){
            var $qty=$(this).closest('.inputs').find('.form-control');
            $qty.prop("disabled", false);
            $(this).css("display", "none");
            $(this).closest(".inputs").find(".save-details").css("display", "block");
            $(this).closest(".inputs").find(".personal-details").removeClass("disabled");
            $(".disabled-true .cancel").css("display", "block");
        });
        $('.save-details').on('click',function(){
            var $qty=$(this).closest('.inputs').find('.form-control');
            $qty.prop("disabled", true);
            $(this).css("display", "none");
            $(this).closest(".inputs").find(".save-details").css("display", "none");
            $(this).closest(".inputs").find(".edit-details").css("display", "block");
            $(".disabled-true .cancel").css("display", "none");
        });
        $('.cancel').on('click',function(){
            var $qty=$(this).closest('.inputs').find('.form-control');
            $qty.prop("disabled", true);
            $(this).css("display", "none");
            $(this).closest(".inputs").find(".save-details").css("display", "none");
            $(this).closest(".inputs").find(".edit-details").css("display", "block");
            $(".disabled-true .cancel").css("display", "none");
        });
        var $qty=$('.inputs.disabled-true').find('.form-control');
        $qty.prop("disabled", true);
        $(".edit-details").css("display", "none");
        $(".disabled-true .save-details").css("display", "none");
        $(".disabled-true .edit-details").css("display", "block");
        $(".disabled-true .cancel").css("display", "none");
    });

    }

    loadJs()
  }, [])
  
const saveButton = (newNumber) =>{
  // alert("Hello")

  dispatch(updateMobileNumber(
    {
      "phone": oldNumber,
      "newPhone":newNumber,
      "roleId":checkuserrole
    }
  ))
}
 
function inputfocus(elmnt){
  // let currentValue=Number(elmnt.key)
  if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
    const next = elmnt.target.tabIndex - 2;
    if (next > -1) {
      elmnt.target.form.elements[next].focus()
    }
    setOtpJson({
        ...otpJson,
        [elmnt.target.name]: ""
      });
  }else{
    if( isNaN(elmnt.key)==false){    
      setOtpJson({
        ...otpJson,
        [elmnt.target.name]: elmnt.key
      });
      const next = elmnt.target.tabIndex;
      if (next < 4) {
        elmnt.target.form.elements[next].focus()
      }      
    }
  }
}

const resend = () =>{
  // alert("&&&&&&&&&&&&")
  console.log(state,"All state printed")
  if(state.otpVerified?.registerMobile){
    dispatch(resendOtp({
      "countryCode":"+91",
       "phone":state.otpVerified?.registerMobile,
       "roleId":checkuserrole
    }))
  }
}
// state.otpVerified?.registerMobile

  return (
        <>
          <Formik
                  initialValues={otpJson}
                  enableReinitialize={true}
                  validationSchema={Yup.object().shape({
                    phone: Yup.string()
                      .required('Phone is required')
                      .matches(new RegExp('[0-9]{10}'),"number must be 10 digit"),
                    otp1: Yup.string()
                      .required(" "),
                      otp2: Yup.string()
                      .required(" "),
                      otp3: Yup.string()
                      .required(" "),
                      otp4: Yup.string()
                      .required(" "),
                  })}
                  onSubmit={fields => {
                    // dispatch(pendingData(true) )                   
                    console.log("fields= OTP==>",fields)                   
                    let data ={
                      "phone":fields.phone.toString(),
                      "otp":"".concat(fields.otp1,fields.otp2,fields.otp3,fields.otp4),
                      "roleId":checkuserrole
                    }
                    // console.log(data,"data printed by dev")
                    dispatch(otpVerification(data))
                    // same shape as initial values
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    //  onSubmit={(e) => this.signUp(e)}
                    setverifyOtpModal(!verifyOtpModal)
                    setsuccessModal(!successModal);
                  }}
                  render={ ({ errors, values, status, touched }) => ( 
                    // console.log("i am reload action two times")  
                    <Form>                     
                      <div className="px-0" id="verify-otp-modal" tabIndex="-1" role="dialog" aria-labelledby="verify-otp-modalLabel" aria-hidden="true">

                          {/* <button type="button" className="close mr-4 mt-2">
                            <span onCl+ick={()=>dispatch(otpSuccess(false))}>&times;</span>
                          </button> */}
                        <div className="row px-3">
                          <div className="col-12 py-lg-4 mb-3 p-sm-5 p-3">
                           
                            <div className="row">
                              <div className="col-12">
                                
                                <div>
                                  <div className="img-holder text-center">
                                    <img className="img-fluid" src={"/assets/images/logo.png"} alt="logo"/>
                                  </div>
                                </div>
                              </div>
                            </div>          
                              <div className="row mt-4">
                                <div className="form-group col-12 mt-2 mb-0">
                                  <h5 className="text-center">Verify OTP </h5>
                                  <label htmlFor="mobilenumber" className="font-heading text-center mb-3">We have sent a verification code on our registered 
                                    mobile number</label>
                                  <div className="disabled-true inputs">
                                    <div className="input-group d-flex phone-group rounded-0">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text p-0 bg-none" id="mobile-number-group">
                                          <select className="form-control custom-select border-0 rounded-0" name="countryCode" >
                                            <option data-countrycode="IN" value="91">+91</option>
                                          </select>
                                        </span>
                                      </div>
                                      {/* <input type="text" id="mobilenumber" className="form-control" placeholder="Mobile Number" aria-describedby="mobile-number-group"/> */}
                                      <Field
                                      name="phone"
                                      type="number"
                                      placeholder="Mobile Number" 
                                      className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} 
                                      maxLength="10"
                                      onInput={maxLengthCheck}
                                      required={true}
                                      onKeyDown={(e) =>
                                        /[+\-.,]$/.test(e.key) && e.preventDefault()}
                                      />
                                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />                            
                                    </div>
                                    <div className="text-right d-flex justify-content-end">
                                      <button type="button" className="btn px-2 edit-details">Edit Number</button>
                                      <button type="button" className="btn px-2 cancel text-danger">Cancel</button>
                                      {values.phone && values.phone.toString() && values.phone.toString().length === 10 ?
                                      <button onClick={()=>saveButton(values.phone.toString())} type="button" className="btn px-2 save-details text-green">Save</button>
                                      :
                                      <span className="btn px-2 text-green">Save</span>
                                      }                                  
                                    </div>

                                    <span className="text-success">{state.otpVerified?.updateMobileMessage?.message}</span>
                                  </div>
                                </div>    
                              </div> 
                            <form method="get" className="digit-group" data-group-name="digits" data-autosubmit="false" autoComplete="off">
                              <div className="form-group col-12 p-0 m-0">
                                <div className="d-flex justify-content-between mb-1">
                                  <input
                                  name="otp1"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={otpJson.otp1}
                                  // onChange={handleChange}
                                  tabIndex="1" maxLength="1" onKeyUp={inputfocus}

                                  />
                                  <input
                                  name="otp2"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={otpJson.otp2}
                                  // onChange={handleChange}
                                  tabIndex="2" maxLength="1" onKeyUp={inputfocus}

                                  />
                                  <input
                                  name="otp3"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={otpJson.otp3}
                                  // onChange={handleChange}
                                  tabIndex="3" maxLength="1" onKeyUp={inputfocus}

                                  />
                                  <input
                                  name="otp4"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={otpJson.otp4}
                                  // onChange={handleChange}
                                  tabIndex="4" maxLength="1" onKeyUp={inputfocus}
                                  />
                                </div>
                              </div>
                              <div className="row justify-content-between">
                                <div className="col-auto mb-2">
                                  <button onClick={resend} type="button" className="btn px-2" id="starttimeragain" data-dismiss="modal">Resend</button>
                                </div>
                                <div className="col-auto mb-2">
                                  <div id="timer" className="btn px-2" data-timer="02:00"></div>
                                </div>
                              </div>
                              <span className="text-success">{state.otpVerified?.otpResendMessage?.message}</span>
                              <p className="errorMessage">{state.otpVerified.error}</p>
                              <button type="submit" className="btn btn-deep-primary btn-block rounded-0">
                                Continue 
                              </button>
                            </form>
                          </div> 
                        </div>                    
                      </div>
                    </Form>
                  )} />

        </>
    )
}

export default OtpVerify
