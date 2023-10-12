import React from 'react';
import { BsArrowClockwise } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner';
const ErrorCard = ({message, retryGetData}) => {  
  return (
    <div class="card errorCard w-25 d-flex ml-auto mr-auto border-0 shadow">
        <div class="card-body text-center text-danger font-weight-bold">
        {message=="Request failed with status code 404"?("server could not find a client-requested"):message}
        </div>
        <button type="button" className="btn btn-deep-blue add-className remove-className"  onClick={()=>retryGetData()}> Retry <BsArrowClockwise />
        { /*<Spinner animation="border" /> */}
        </button>
    </div>
  );
}

export const FormErrorCard = ({message}) => {
  return (
    <div class="formErrorCard d-flex ml-auto mr-auto border-0 shadow">
        <div class="text-center font-weight-bold px-3 pt-1 text-danger">
        {message}
        </div>
    </div>
  );
}
  

export default ErrorCard;
