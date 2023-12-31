import React from 'react';

const FormSuccess = ({onClick}) => {
  
  return <div className="form-modal">
      <div className="modal-success">
        <h5 className="text-capitalize px-2">Form Created Successfully</h5>
        <button onClick={onClick}>OK</button>
      </div>
    </div>
  
}

export default FormSuccess;
