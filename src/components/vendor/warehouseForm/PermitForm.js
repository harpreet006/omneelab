import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updatePermit, changeWarehouseStatus } from '../../../store/actions/vendor/warehouseList';
import FormSuccess from '../../helper/FormSuccess';
import { readableDate } from '../../validation'
import Spinner from 'react-bootstrap/Spinner';
import { FormErrorCard } from '../../helper/ErrorCard';
import axiosauth from '../../../api/axios-auth'
import {useRef} from 'react';
const PermitForm = ({ viewMood, warehouseId ,accordionAutoClick }) => {
  const [errors, setErrors] = useState({});
  const inputRef = useRef('');
  const inputRefse = useRef('');
  // const evtHtml = useRef('');
  const [formSub, setFormSub] = useState(false)
  const pdata = useSelector((state) => state.WAREHOUSELIST);
  // console.log("pdata===>", pdata.singleFormData.buildingTradeRelatedPermitInfo)
  const dispatch = useDispatch();

  const [yesForm, setYesForm] = useState({
    landlordYes: false,
    ownershipYes: false,
    cluYes: false,
    completionYes: false,
    occupancyYes: false,
    buildingInsuranceYes: false,
    buildingStabilityYes: false,
    FireNOCYes: false,
    floorLoadYes: false,
    approvedBuildingYes: false,
    gstRegistrationYes: false,
    panchayatNOCYes: false,
    panCardYes: false,
    electricityBillYes: false,
    shopCertificateYes: false,
    tradeLicenseYes: false,
    laborLicenseYes: false,
    factoryLicenseYes: false,
    fssaiLicenseYes: false,
    pollutionPollutionYes: false,
  })

  const {
    landlordYes,
    ownershipYes,
    cluYes,
    completionYes,
    occupancyYes,
    buildingInsuranceYes,
    buildingStabilityYes,
    FireNOCYes,
    floorLoadYes,
    approvedBuildingYes,
    gstRegistrationYes,
    panchayatNOCYes,
    panCardYes,
    electricityBillYes,
    shopCertificateYes,
    tradeLicenseYes,
    laborLicenseYes,
    factoryLicenseYes,
    fssaiLicenseYes,
    pollutionPollutionYes,
  } = yesForm;

  const yesHandle = (e) => {
    setYesForm({ ...yesForm, [e.target.name]: e.target.value === "true" })
  }



  // Set Form State

  const [permitForm, setPermitForm] = useState({
    landlordFrom: "",
    landlordTill: "",
    landlordFile: "",
    landlordFileLink: "",
    ownershipFile: "",
    ownershipFileLink: "",
    cluFile: "",
    cluFileLink: "",
    completionFile: "",
    completionFileLink: "",
    occupancyFile: "",
    occupancyFileLink: "",

    buildingInsuranceFrom: "",
    buildingInsuranceTill: "",
    buildingInsuranceFile: "",
    buildingInsuranceFileLink: "",

    buildingStabilityFrom: "",
    buildingStabilityTill: "",
    buildingStabilityFile: "",
    buildingStabilityFileLink: "",

    FireNOCFrom: "",
    FireNOCTill: "",
    FireNOCFile: "",
    FireNOCFileLink: "",

    floorLoadFrom: "",
    floorLoadTill: "",
    floorLoadFile: "",
    floorLoadFileLink: "",

    approvedBuildingFile: "",
    approvedBuildingFileLink: "",

    photoFile: "",
    photoFileLink: "",

    profileFile: "",
    profileFileLink: "",

    gstRegistrationFile: "",
    gstRegistrationFileLink: "",

    panchayatNOCFrom: "",
    panchayatNOCTill: "",
    panchayatNOCFile: "",
    panchayatNOCFileLink: "",

    panCardFile: "",
    panCardFileLink: "",

    electricityBillFile: "",
    electricityBillFileLink: "",

    shopCertificateFile: "",
    shopCertificateFileLink: "",

    tradeLicenseFrom: "",
    tradeLicenseTill: "",
    tradeLicenseFile: "",
    tradeLicenseFileLink: "",

    laborLicenseFrom: "",
    laborLicenseTill: "",
    laborLicenseFile: "",
    laborLicenseFileLink: "",

    factoryLicenseFrom: "",
    factoryLicenseTill: "",
    factoryLicenseFile: "",
    factoryLicenseFileLink: "",

    fssaiLicenseFrom: "",
    fssaiLicenseTill: "",
    fssaiLicenseFile: "",
    fssaiLicenseFileLink: "",

    pollutionPollutionFrom: "",
    pollutionPollutionTill: "",
    pollutionPollutionFile: "",
    pollutionPollutionFileLink: ""

  })
  const {
    landlordFrom,
    landlordTill,
    landlordFileLink,
    ownershipFileLink,
    cluFileLink,
    completionFileLink,
    occupancyFileLink,

    buildingInsuranceFrom,
    buildingInsuranceTill,
    buildingInsuranceFileLink,

    buildingStabilityFrom,
    buildingStabilityTill,
    buildingStabilityFileLink,

    FireNOCFrom,
    FireNOCTill,
    FireNOCFileLink,

    floorLoadFrom,
    floorLoadTill,
    floorLoadFileLink,

    approvedBuildingFileLink,

    photoFileLink,

    profileFileLink,

    gstRegistrationFileLink,

    panchayatNOCFrom,
    panchayatNOCTill,
    panchayatNOCFileLink,

    panCardFileLink,

    electricityBillFileLink,

    shopCertificateFileLink,

    tradeLicenseFrom,
    tradeLicenseTill,
    tradeLicenseFileLink,

    laborLicenseFrom,
    laborLicenseTill,
    laborLicenseFileLink,

    factoryLicenseFrom,
    factoryLicenseTill,
    factoryLicenseFileLink,

    fssaiLicenseFrom,
    fssaiLicenseTill,
    fssaiLicenseFileLink,

    pollutionPollutionFrom,
    pollutionPollutionTill,
    pollutionPollutionFileLink
  } = permitForm;





  const handleChange = (e) => {

    if (e.target.name === "landlordFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value


      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])

      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);

          if (res.statusCode === 200) {

            setPermitForm({ ...permitForm, "landlordFile": val, "landlordFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "ownershipFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value


      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])

      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);

          if (res.statusCode === 200) {

            setPermitForm({ ...permitForm, "ownershipFile": val, "ownershipFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "cluFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value


      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])

      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            setPermitForm({ ...permitForm, "cluFile": val, "cluFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "completionFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            setPermitForm({ ...permitForm, "completionFile": val, "completionFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "occupancyFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "occupancyFile": val, "occupancyFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "buildingInsuranceFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "buildingInsuranceFile": val, "buildingInsuranceFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }

    if (e.target.name === "buildingStabilityFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "buildingStabilityFile": val, "buildingStabilityFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "FireNOCFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "FireNOCFile": val, "FireNOCFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "floorLoadFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "floorLoadFile": val, "floorLoadFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "approvedBuildingFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "approvedBuildingFile": val, "approvedBuildingFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "photoFile") {
      // alert("Hek")
       setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "photoFile": val, "photoFileLink": res.data });

          } else {
            alert("File not uploaded")
          }
        })
        .catch((error) => {
          inputRef.current.value = "";
          inputRef.current.type = "text";
          inputRef.current.type = "file";
          inputRef.current.innerHTML="File not uploaded";
          inputRef.current.style.color = 'red';
          setTimeout(function(){
            inputRef.current.innerHTML="Choose a file";
            inputRef.current.style.color = 'black';
          }, 3000);
          // console.log(evtHtml.outerText="";
          // console.log(evtHtml.current.innerHTML,"ddddddddd",evtHtml)

          // console.log(inputRef.current,"^^^^^^^^^^^^")
          // console.log("here", error)
        })
    }
    if (e.target.name === "profileFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "profileFile": val, "profileFileLink": res.data });

          } else {   
            inputRefse.current.value = "";
            inputRefse.current.type = "text";
            inputRefse.current.type = "file";
            inputRefse.current.innerHTML="File not uploaded";
            inputRefse.current.style.color = 'red';
            setTimeout(function(){
              inputRefse.current.innerHTML="Choose a file";
              inputRefse.current.style.color = 'black';
            }, 3000);            
          }
        })
        .catch((error) => {
            inputRefse.current.value = "";
            inputRefse.current.type = "text";
            inputRefse.current.type = "file";
            inputRefse.current.innerHTML="File not uploaded";
            inputRefse.current.style.color = 'red';
            setTimeout(function(){
              inputRefse.current.innerHTML="Choose a file";
              inputRefse.current.style.color = 'black';
            }, 3000);
        })
    }
    if (e.target.name === "gstRegistrationFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "gstRegistrationFile": val, "gstRegistrationFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "panchayatNOCFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "panchayatNOCFile": val, "panchayatNOCFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "panCardFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "panCardFile": val, "panCardFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "electricityBillFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "electricityBillFile": val, "electricityBillFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "shopCertificateFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "shopCertificateFile": val, "shopCertificateFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "tradeLicenseFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "tradeLicenseFile": val, "tradeLicenseFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "laborLicenseFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "laborLicenseFile": val, "laborLicenseFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "factoryLicenseFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "factoryLicenseFile": val, "factoryLicenseFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "fssaiLicenseFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "fssaiLicenseFile": val, "fssaiLicenseFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    if (e.target.name === "pollutionPollutionFile") {
      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });
      let val = e.target.value
      console.log("permitForm===>", e.currentTarget.files[0])

      let formData = new FormData();
      formData.append("file", e.currentTarget.files[0])
      console.log("rohanjha", formData, e.currentTarget.files[0])
      axiosauth
        .post("/api/v1/buildingtraderelated/fileupload", formData)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("dsssss", res)
          if (res.statusCode === 200) {
            console.log("dsssss", res)
            setPermitForm({ ...permitForm, "pollutionPollutionFile": val, "pollutionPollutionFileLink": res.data });

          } else {

          }
        })
        .catch((error) => {
          console.log("here", error)
        })


    }
    else {
      console.log("permitForm===>", e.target.name)

      setPermitForm({ ...permitForm, [e.target.name]: e.target.value });

    }

    // }

    console.log("permitForm===>", permitForm)
    if (formSub) {
      formVaidation()
    }
  }


  const formVaidation = () => {
    let errors = {};
    let isValid = true;

    if (landlordYes && permitForm.landlordFrom === "") {
      isValid = false;
      errors['landlordFrom'] = "Required";
    }
    if (landlordYes && permitForm.landlordTill === "") {
      isValid = false;
      errors['landlordTill'] = "Required";
    }
    console.log("dfjjfd", landlordYes && new Date(permitForm.landlordTill) < new Date(permitForm.landlordFrom))
    if (landlordYes && permitForm.landlordTill < permitForm.landlordFrom) {
      isValid = false;
      errors['landlordTill'] = "Valid Till Date Invalid";
    }
    if (landlordYes && permitForm.landlordFile === "") {
      isValid = false;
      errors['landlordFile'] = "Required";
    }
    if (ownershipYes && permitForm.ownershipFile === "") {
      isValid = false;
      errors['ownershipFile'] = "Required";
    }
    if (cluYes && permitForm.cluFile === "") {
      isValid = false;
      errors['cluFile'] = "Required";
    }
    if (completionYes && permitForm.completionFile === "") {
      isValid = false;
      errors['completionFile'] = "Required";
    }
    if (occupancyYes && permitForm.occupancyFile === "") {
      isValid = false;
      errors['occupancyFile'] = "Required";
    }
    if (buildingInsuranceYes && permitForm.buildingInsuranceFrom === "") {
      isValid = false;
      errors['buildingInsuranceFrom'] = "Required";
    }
    if (buildingInsuranceYes && permitForm.buildingInsuranceTill === "") {
      isValid = false;
      errors['buildingInsuranceTill'] = "Required";
    }
    if (buildingInsuranceYes && new Date(permitForm.buildingInsuranceTill) < new Date(permitForm.buildingInsuranceFrom)) {
      isValid = false;
      errors['buildingInsuranceTill'] = "Valid Till Date Invalid";
    }
    if (buildingInsuranceYes && permitForm.buildingInsuranceFile === "") {
      isValid = false;
      errors['buildingInsuranceFile'] = "Required";
    }
    if (buildingStabilityYes && permitForm.buildingStabilityFrom === "") {
      isValid = false;
      errors['buildingStabilityFrom'] = "Required";
    }
    if (buildingStabilityYes && permitForm.buildingStabilityTill === "") {
      isValid = false;
      errors['buildingStabilityTill'] = "Required";
    }
    if (buildingStabilityYes && new Date(permitForm.buildingStabilityTill) < new Date(permitForm.buildingStabilityFrom)) {
      isValid = false;
      errors['buildingStabilityTill'] = "Valid Till Date Invalid";
    }
    if (buildingStabilityYes && permitForm.buildingStabilityFile === "") {
      isValid = false;
      errors['buildingStabilityFile'] = "Required";
    }
    if (FireNOCYes && permitForm.FireNOCFrom === "") {
      isValid = false;
      errors['FireNOCFrom'] = "Required";
    }
    if (FireNOCYes && permitForm.FireNOCTill === "") {
      isValid = false;
      errors['FireNOCTill'] = "Required";
    }
    if (FireNOCYes && new Date(permitForm.FireNOCTill) < new Date(permitForm.FireNOCFrom)) {
      isValid = false;
      errors['FireNOCTill'] = "Valid Till Date Invalid";
    }
    if (FireNOCYes && permitForm.FireNOCFile === "") {
      isValid = false;
      errors['FireNOCFile'] = "Required";
    }
    if (floorLoadYes && permitForm.floorLoadFrom === "") {
      isValid = false;
      errors['floorLoadFrom'] = "Required";
    }
    if (floorLoadYes && permitForm.floorLoadTill === "") {
      isValid = false;
      errors['floorLoadTill'] = "Required";
    }
    if (floorLoadYes && new Date(permitForm.floorLoadTill) < new Date(permitForm.floorLoadFrom)) {
      isValid = false;
      errors['floorLoadTill'] = "Valid Till Date Invalid";
    }
    if (floorLoadYes && permitForm.floorLoadFile === "") {
      isValid = false;
      errors['floorLoadFile'] = "Required";
    }
    if (approvedBuildingYes && permitForm.approvedBuildingFile === "") {
      isValid = false;
      errors['approvedBuildingFile'] = "Required";
    }
    if (permitForm.photoFile === "") {
      isValid = false;
      errors['photoFile'] = "Required";
    }
    if (permitForm.profileFile === "") {
      isValid = false;
      errors['profileFile'] = "Required";
    }
    if (gstRegistrationYes && permitForm.gstRegistrationFile === "") {
      isValid = false;
      errors['gstRegistrationFile'] = "Required";
    }
    if (panchayatNOCYes && permitForm.panchayatNOCFrom === "") {
      isValid = false;
      errors['panchayatNOCFrom'] = "Required";
    }
    if (panchayatNOCYes && permitForm.panchayatNOCTill === "") {
      isValid = false;
      errors['panchayatNOCTill'] = "Required";
    }
    if (panchayatNOCYes && new Date(permitForm.panchayatNOCTill) < new Date(permitForm.panchayatNOCFrom)) {
      isValid = false;
      errors['panchayatNOCTill'] = "Valid Till Date Invalid";
    }
    if (panchayatNOCYes && permitForm.panchayatNOCFile === "") {
      isValid = false;
      errors['panchayatNOCFile'] = "Required";
    }
    if (panCardYes && permitForm.panCardFile === "") {
      isValid = false;
      errors['panCardFile'] = "Required";
    }
    if (electricityBillYes && permitForm.electricityBillFile === "") {
      isValid = false;
      errors['electricityBillFile'] = "Required";
    }
    if (shopCertificateYes && permitForm.shopCertificateFile === "") {
      isValid = false;
      errors['shopCertificateFile'] = "Required";
    }
    if (tradeLicenseYes && permitForm.tradeLicenseFrom === "") {
      isValid = false;
      errors['tradeLicenseFrom'] = "Required";
    }
    if (tradeLicenseYes && permitForm.tradeLicenseTill === "") {
      isValid = false;
      errors['tradeLicenseTill'] = "Required";
    }
    if (tradeLicenseYes && new Date(permitForm.tradeLicenseTill) < new Date(permitForm.tradeLicenseFrom)) {
      isValid = false;
      errors['tradeLicenseTill'] = "Valid Till Date Invalid";
    }
    if (tradeLicenseYes && permitForm.tradeLicenseFile === "") {
      isValid = false;
      errors['tradeLicenseFile'] = "Required";
    }
    if (laborLicenseYes && permitForm.laborLicenseFrom === "") {
      isValid = false;
      errors['laborLicenseFrom'] = "Required";
    }
    if (laborLicenseYes && permitForm.laborLicenseTill === "") {
      isValid = false;
      errors['laborLicenseTill'] = "Required";
    }
    if (laborLicenseYes && new Date(permitForm.laborLicenseTill) < new Date(permitForm.laborLicenseFrom)) {
      isValid = false;
      errors['laborLicenseTill'] = "Valid Till Date Invalid";
    }
    if (laborLicenseYes && permitForm.laborLicenseFile === "") {
      isValid = false;
      errors['laborLicenseFile'] = "Required";
    }
    if (factoryLicenseYes && permitForm.factoryLicenseFrom === "") {
      isValid = false;
      errors['factoryLicenseFrom'] = "Required";
    } if (factoryLicenseYes && permitForm.factoryLicenseTill === "") {
      isValid = false;
      errors['factoryLicenseTill'] = "Required";
    }
    if (factoryLicenseYes && new Date(permitForm.factoryLicenseTill) < new Date(permitForm.factoryLicenseFrom)) {
      isValid = false;
      errors['factoryLicenseTill'] = "Valid Till Date Invalid";
    }
    if (factoryLicenseYes && permitForm.factoryLicenseFile === "") {
      isValid = false;
      errors['factoryLicenseFile'] = "Required";
    }
    if (fssaiLicenseYes && permitForm.fssaiLicenseFrom === "") {
      isValid = false;
      errors['fssaiLicenseFrom'] = "Required";
    }
    if (fssaiLicenseYes && permitForm.fssaiLicenseTill === "") {
      isValid = false;
      errors['fssaiLicenseTill'] = "Required";
    }
    if (fssaiLicenseYes && new Date(permitForm.fssaiLicenseTill) < new Date(permitForm.fssaiLicenseFrom)) {
      isValid = false;
      errors['fssaiLicenseTill'] = "Valid Till Date Invalid";
    }
    if (fssaiLicenseYes && permitForm.fssaiLicenseFile === "") {
      isValid = false;
      errors['fssaiLicenseFile'] = "Required";
    }
    if (pollutionPollutionYes && permitForm.pollutionPollutionFrom === "") {
      isValid = false;
      errors['pollutionPollutionFrom'] = "Required";
    }
    if (pollutionPollutionYes && permitForm.pollutionPollutionTill === "") {
      isValid = false;
      errors['pollutionPollutionTill'] = "Required";
    }
    if (pollutionPollutionYes && new Date(permitForm.pollutionPollutionTill) < new Date(permitForm.pollutionPollutionFrom)) {
      isValid = false;
      errors['pollutionPollutionTill'] = "Valid Till Date Invalid";
    }
    if (pollutionPollutionYes && permitForm.pollutionPollutionFile === "") {
      isValid = false;
      errors['pollutionPollutionFile'] = "Required";
    }
    setErrors(errors)
    return isValid;
  }



  useEffect(() => {

    if (pdata.singleFormData.buildingTradeRelatedPermitInfo !== null && pdata.singleFormData.buildingTradeRelatedPermitInfo !== undefined) {

      let building = pdata.singleFormData.buildingTradeRelatedPermitInfo.buildingRelatedPermit
      let trade = pdata.singleFormData.buildingTradeRelatedPermitInfo.tradeRelatedPermit

      console.log("Building====>", building)
      console.log("trade====>", trade)
      // let building =buildigInfo.buildingRelatedPermitInfo
      // let trade = tradeInfo.tradeRelatedPermitInfo;

      let landlord = building.buildingRelatedPermitInfo.find(o => o.type === 'copyOfLeaseAgreement');
      let bi = building.buildingRelatedPermitInfo.find(o => o.type === 'buildingInsurance');
      let bs = building.buildingRelatedPermitInfo.find(o => o.type === 'buildingStabilityCertificate');
      let firenoc = building.buildingRelatedPermitInfo.find(o => o.type === 'fireNoc');
      let floor = building.buildingRelatedPermitInfo.find(o => o.type === 'floorLoadBearingCapacityCertificate');

      let panch = trade.tradeRelatedPermitInfo.find(o => o.type === 'panchayatMunicipalNOC');
      let labor = trade.tradeRelatedPermitInfo.find(o => o.type === 'laborLicense');
      let trad = trade.tradeRelatedPermitInfo.find(o => o.type === 'tradeLicense');
      let fact = trade.tradeRelatedPermitInfo.find(o => o.type === 'factoryLicense');
      let fsli = trade.tradeRelatedPermitInfo.find(o => o.type === 'fssaiLicense');
      let puc = trade.tradeRelatedPermitInfo.find(o => o.type === 'puc');

      setPermitForm({
        landlordFrom: landlord ? landlord.validForm : "",
        landlordTill: landlord ? landlord.validTill : "",
        landlordFile: landlord ? landlord.filePath : "",
        landlordFileLink: landlord ? landlord.filePath : "",

        ownershipFile: building ? building.ownershipDocument : "",
        ownershipFileLink: building ? building.ownershipDocument : "",

        cluFile: building ? building.cluCommercialWarehousing : "",
        cluFileLink: building ? building.cluCommercialWarehousing : "",

        completionFile: building ? building.completionCertificate : "",
        completionFileLink: building ? building.completionCertificate : "",

        occupancyFile: building ? building.occupancyCertificate : "",
        occupancyFileLink: building ? building.occupancyCertificate : "",

        buildingInsuranceFrom: bi ? bi.validForm : "",
        buildingInsuranceTill: bi ? bi.validTill : "",
        buildingInsuranceFile: bi ? bi.filePath : "",
        buildingInsuranceFileLink: bi ? bi.filePath : "",

        buildingStabilityFrom: bs ? bs.validForm : "",
        buildingStabilityTill: bs ? bs.validTill : "",
        buildingStabilityFile: bs ? bs.filePath : "",
        buildingStabilityFileLink: bs ? bs.filePath : "",

        FireNOCFrom: firenoc ? firenoc.validForm : "",
        FireNOCTill: firenoc ? firenoc.validTill : "",
        FireNOCFile: firenoc ? firenoc.filePath : "",
        FireNOCFileLink: firenoc ? firenoc.filePath : "",

        floorLoadFrom: floor ? floor.validForm : "",
        floorLoadTill: floor ? floor.validTill : "",
        floorLoadFile: floor ? floor.filePath : "",
        floorLoadFileLink: floor ? floor.filePath : "",

        approvedBuildingFile: building ? building.approvedBuildingLayout : "",
        approvedBuildingFileLink: building ? building.approvedBuildingLayout : "",

        photoFile: building ? building.warehousePhotoGallery : "",
        photoFileLink: building ? building.warehousePhotoGallery : "",

        profileFile: building ? building.warehouseProfilePic : "",
        profileFileLink: building ? building.warehouseProfilePic : "",

        gstRegistrationFile: trade ? trade.gstRegistrationCertificate : "",
        gstRegistrationFileLink: trade ? trade.gstRegistrationCertificate : "",

        panchayatNOCFrom: panch ? panch.validForm : "",
        panchayatNOCTill: panch ? panch.validTill : "",
        panchayatNOCFile: panch ? panch.filePath : "",
        panchayatNOCFileLink: panch ? panch.filePath : "",

        panCardFile: trade ? trade.panCardOfCompany : "",
        panCardFileLink: trade ? trade.panCardOfCompany : "",

        electricityBillFile: trade ? trade.electricityBill : "",
        electricityBillFileLink: trade ? trade.electricityBill : "",

        shopCertificateFile: trade ? trade.shopAndEstablishmentCertificate : "",
        shopCertificateFileLink: trade ? trade.shopAndEstablishmentCertificate : "",

        tradeLicenseFrom: trad ? trad.validForm : "",
        tradeLicenseTill: trad ? trad.validTill : "",
        tradeLicenseFile: trad ? trad.filePath : "",
        tradeLicenseFileLink: trad ? trad.filePath : "",

        laborLicenseFrom: labor ? labor.validForm : "",
        laborLicenseTill: labor ? labor.validTill : "",
        laborLicenseFile: labor ? labor.filePath : "",
        laborLicenseFileLink: labor ? labor.filePath : "",

        factoryLicenseFrom: fact ? fact.validForm : "",
        factoryLicenseTill: fact ? fact.validTill : "",
        factoryLicenseFile: fact ? fact.filePath : "",
        factoryLicenseFileLink: fact ? fact.filePath : "",

        fssaiLicenseFrom: fsli ? fsli.validForm : "",
        fssaiLicenseTill: fsli ? fsli.validTill : "",
        fssaiLicenseFile: fsli ? fsli.filePath : "",
        fssaiLicenseFileLink: fsli ? fsli.filePath : "",

        pollutionPollutionFrom: puc ? puc.validForm : "",
        pollutionPollutionTill: puc ? puc.validTill : "",
        pollutionPollutionFile: puc ? puc.filePath : "",
        pollutionPollutionFileLink: puc ? puc.filePath : "",

      })

      setYesForm({
        landlordYes: landlord.validForm ? true : false,
        ownershipYes: building.ownershipDocument ? true : false,
        cluYes: building.cluCommercialWarehousing ? true : false,
        completionYes: building.completionCertificate ? true : false,
        occupancyYes: building.occupancyCertificate ? true : false,
        buildingInsuranceYes: bs.validForm ? true : false,
        buildingStabilityYes: bi.validForm ? true : false,
        FireNOCYes: firenoc.validForm ? true : false,
        floorLoadYes: floor.validForm ? true : false,
        approvedBuildingYes: building.approvedBuildingLayout ? true : false,
        gstRegistrationYes: trade.gstRegistrationCertificate ? true : false,
        panchayatNOCYes: panch.validForm ? true : false,
        panCardYes: trade.panCardOfCompany ? true : false,
        electricityBillYes: trade.electricityBill ? true : false,
        shopCertificateYes: trade.shopAndEstablishmentCertificate ? true : false,
        tradeLicenseYes: trad.validForm ? true : false,
        laborLicenseYes: labor.validForm ? true : false,
        factoryLicenseYes: fact.validForm ? true : false,
        fssaiLicenseYes: fsli.validForm ? true : false,
        pollutionPollutionYes: puc.validForm ? true : false,
      })

    }

  }, [pdata.singleFormData.buildingTradeRelatedPermitInfo])



  const formSubmit = (e) => {
    e.preventDefault();
    setFormSub(true)
    console.log(
      "erjjjjjj", permitForm
    )
    if (formVaidation()) {

      let permitData = {
        // ===================

        "buildingRelatedPermit": {
          "ownershipDocument": ownershipYes ? ownershipFileLink : "",
          "cluCommercialWarehousing": cluYes ? cluFileLink : "",
          "completionCertificate": completionYes ? completionFileLink : "",
          "occupancyCertificate": occupancyYes ? occupancyFileLink : "",
          // "buildingInsurance": buildingInsuranceYes ? buildingInsuranceFileLink : "",
          "buildingRelatedPermitInfo": [
            {
              "type": "buildingInsurance",
              "validForm": buildingInsuranceYes ? buildingInsuranceFrom : "",
              "validTill": buildingInsuranceYes ? buildingInsuranceTill : "",
              "filePath": buildingInsuranceYes ? buildingInsuranceFileLink : ""
            },
            {
              "type": "copyOfLeaseAgreement",
              "validForm": landlordYes ? landlordFrom : "",
              "validTill": landlordYes ? landlordTill : "",
              "filePath": landlordYes ? landlordFileLink : ""
            },
            {
              "type": "buildingInsurance",
              "validForm": buildingInsuranceYes ? buildingInsuranceFrom : "",
              "validTill": buildingInsuranceYes ? buildingInsuranceTill : "",
              "filePath": buildingInsuranceYes ? buildingInsuranceFileLink : "",
            },
            {
              "type": "buildingStabilityCertificate",
              "validForm": buildingStabilityYes ? buildingStabilityFrom : "",
              "validTill": buildingStabilityYes ? buildingStabilityTill : "",
              "filePath": buildingStabilityYes ? buildingStabilityFileLink : "",
            },
            {
              "type": "fireNoc",
              "validForm": FireNOCYes ? FireNOCFrom : "",
              "validTill": FireNOCYes ? FireNOCTill : "",
              "filePath": FireNOCYes ? FireNOCFileLink : "",
            },
            {
              "type": "floorLoadBearingCapacityCertificate",
              "validForm": floorLoadYes ? floorLoadFrom : "",
              "validTill": floorLoadYes ? floorLoadTill : "",
              "filePath": floorLoadYes ? floorLoadFileLink : "",
            }],
          "approvedBuildingLayout": approvedBuildingYes ? approvedBuildingFileLink : "",
          "warehousePhotoGallery": photoFileLink,
          "warehouseProfilePic": profileFileLink,
        },


        "tradeRelated": {
          "gstRegistrationCertificate": gstRegistrationYes ? gstRegistrationFileLink : "",
          "panCardOfCompany": panCardYes ? panCardFileLink : "",
          "electricityBill": electricityBillYes ? electricityBillFileLink : "",
          "shopAndEstablishmentCertificate": shopCertificateYes ? shopCertificateFileLink : "",
          "tradeRelatedPermitInfo": [
            {
              "type": "panchayatMunicipalNOC",
              "validForm": panchayatNOCYes ? panchayatNOCFrom : "",
              "validTill": panchayatNOCYes ? panchayatNOCTill : "",
              "filePath": panchayatNOCYes ? panchayatNOCFileLink : "",
            },
            {
              "type": "laborLicense",
              "validForm": laborLicenseYes ? laborLicenseFrom : "",
              "validTill": laborLicenseYes ? laborLicenseTill : "",
              "filePath": laborLicenseYes ? laborLicenseFileLink : "",
            },
            {
              "type": "tradeLicense",
              "validForm": tradeLicenseYes ? tradeLicenseFrom : "",
              "validTill": tradeLicenseYes ? tradeLicenseTill : "",
              "filePath": tradeLicenseYes ? tradeLicenseFileLink : "",
            }, {
              "type": "factoryLicense",
              "validForm": factoryLicenseYes ? factoryLicenseFrom : "",
              "validTill": factoryLicenseYes ? factoryLicenseTill : "",
              "filePath": factoryLicenseYes ? factoryLicenseFileLink : "",
            }, {
              "type": "fssaiLicense",
              "validForm": fssaiLicenseYes ? fssaiLicenseFrom : "",
              "validTill": fssaiLicenseYes ? fssaiLicenseTill : "",
              "filePath": fssaiLicenseYes ? fssaiLicenseFileLink : "",
            }, {
              "type": "puc",
              "validForm": pollutionPollutionYes ? pollutionPollutionFrom : "",
              "validTill": pollutionPollutionYes ? pollutionPollutionTill : "",
              "filePath": pollutionPollutionYes ? pollutionPollutionFileLink : "",
            }
          ]

        },

        "warehouse": parseInt(warehouseId)

        // ========================
      }


      dispatch(updatePermit(permitData))
      console.log("permitForm buildingData:===>", permitData)
    } else {
      console.log("Form Validation Fail")
    }
  }

  const getImgName = (thePath) => {
    if (thePath !== "") {
      return thePath.split(`\\`).pop()
    }
    return "Choose a file"
  }

  return (
    <>
      {
        pdata.addNewResponse.statusCode === 200 ?
          <FormSuccess onClick={() =>
          {
            dispatch(changeWarehouseStatus())
            accordionAutoClick()
          }
         } message={pdata.addNewResponse.message} />
          : null
      }

      <div className="row align-items-center pb-3 mx-0 overflow-auto">
        <div className="col-12">
          <form onSubmit={formSubmit}>
            <div className="row bg-white pb-5 rounded mx-0 col-xxxl-11">
              <div className="col-12">
                <h5 className="pb-3 mb-3 border-bottom">Building Related</h5>
              </div>
              <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                <table className="table customTable">
                  <tbody>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0 pb-1">Copy Of Lease Agreement With Landlord:</p>
                      </td>
                      <td className="col-auto form-inline-block form-group py-4 mt-3 mb-0 border-0 d-flex">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="landlordYes" onChange={(e) => yesHandle(e)} checked={landlordYes} className="common-radio-deep-blue-input" type="radio" id="landlordYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="landlordYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="landlordYes" onChange={(e) => yesHandle(e)} checked={!landlordYes} className="common-radio-deep-blue-input" type="radio" id="landlordYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="landlordYes1">No</label>
                        </div>
                      </td>
                      <td className="py-1">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="landlordFrom" type="date" readOnly={viewMood} onChange={(e) => handleChange(e)} value={readableDate(landlordFrom ? landlordFrom : "")} disabled={!landlordYes} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-0">{!landlordYes ? null : errors["landlordFrom"]}</p>
                      </td>
                      <td className="py-1">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="landlordTill" type="date" readOnly={viewMood} onChange={(e) => handleChange(e)} value={readableDate(landlordTill ? landlordTill : "")} disabled={!landlordYes} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-0">{!landlordYes ? null : errors["landlordTill"]}</p>
                      </td>
                      <td className="py-1 vertical-top">
                        <div className="custom-file">
                          {/* name of file chosen  */}
                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.landlordFile)}</span>
                          {/* actual upload which is hidden  */}
                          <input name="landlordFile" onChange={(e) => handleChange(e)} disabled={!landlordYes || viewMood} type="file" id="landlordFile" className="custom-file-input" hidden />
                          {/* our custom upload button  */}

                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="landlordFile">
                            Upload File
                          </label>
                        </div>

                        <p className="errorMsg usable my-1">{!landlordYes && permitForm.landlordFileLink.length > 0 ? null : errors["landlordFile"]}</p>
                      </td>

                      {permitForm.landlordFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.landlordFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}

                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0 pb-1">Ownership Document Copy:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="ownershipYes" onChange={(e) => yesHandle(e)} checked={ownershipYes} className="common-radio-deep-blue-input" type="radio" id="ownershipYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="ownershipYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="ownershipYes" onChange={(e) => yesHandle(e)} checked={!ownershipYes} className="common-radio-deep-blue-input" type="radio" id="ownershipYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="ownershipYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          {/* name of file chosen  */}
                          {/* actual upload which is hidden  */}
                          <input name="ownershipFile" onChange={(e) => handleChange(e)} disabled={!ownershipYes || viewMood} type="file" id="ownershipFile" className="custom-file-input" hidden />
                          {/* our custom upload button  */}
                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.ownershipFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="ownershipFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!ownershipYes ? null : errors["ownershipFile"]}</p>
                      </td>
                      {permitForm.ownershipFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.ownershipFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0 pb-1">CLU - Commercial / Warehousing:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="cluYes" onChange={(e) => yesHandle(e)} checked={cluYes} className="common-radio-deep-blue-input" type="radio" id="cluYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="cluYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="cluYes" onChange={(e) => yesHandle(e)} checked={!cluYes} className="common-radio-deep-blue-input" type="radio" id="cluYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="cluYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className="vertical-top">
                        <div className="custom-file">
                          {/* name of file chosen  */}
                          {/* actual upload which is hidden  */}
                          <input name="cluFile" onChange={(e) => handleChange(e)} disabled={!cluYes || viewMood} type="file" id="cluFile" className="custom-file-input" hidden />
                          {/* our custom upload button  */}
                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.cluFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="cluFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!cluYes ? null : errors["cluFile"]}</p>
                      </td>
                      {permitForm.cluFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.cluFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0">Completion Certificate:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="completionYes" onChange={(e) => yesHandle(e)} checked={completionYes} className="common-radio-deep-blue-input" type="radio" id="completionYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="completionYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="completionYes" onChange={(e) => yesHandle(e)} checked={!completionYes} className="common-radio-deep-blue-input" type="radio" id="completionYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="completionYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className="vertical-top">
                        <div className="custom-file">
                          {/* name of file chosen  */}
                          {/* actual upload which is hidden  */}
                          <input name="completionFile" onChange={(e) => handleChange(e)} disabled={!completionYes || viewMood} type="file" id="completionFile" className="custom-file-input" hidden />
                          {/* our custom upload button  */}
                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.completionFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="completionFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!completionYes ? null : errors["completionFile"]}</p>
                      </td>
                      {permitForm.completionFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.completionFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0 pb-1">Occupancy Certificate:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="occupancyYes" onChange={(e) => yesHandle(e)} checked={occupancyYes} className="common-radio-deep-blue-input" type="radio" id="occupancyYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="occupancyYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="occupancyYes" onChange={(e) => yesHandle(e)} checked={!occupancyYes} className="common-radio-deep-blue-input" type="radio" id="occupancyYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="occupancyYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">

                          <input name="occupancyFile" onChange={(e) => handleChange(e)} disabled={!occupancyYes || viewMood} type="file" id="occupancyFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.occupancyFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="occupancyFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!occupancyYes ? null : errors["occupancyFile"]}</p>
                      </td>
                      {permitForm.occupancyFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.occupancyFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className="border">
                      <td className="mw-200px">
                        <p className="mb-0 ">Building Insurance:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="buildingInsuranceYes" onChange={(e) => yesHandle(e)} checked={buildingInsuranceYes} className="common-radio-deep-blue-input" type="radio" id="buildingInsuranceYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="buildingInsuranceYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="buildingInsuranceYes" onChange={(e) => yesHandle(e)} checked={!buildingInsuranceYes} className="common-radio-deep-blue-input" type="radio" id="buildingInsuranceYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="buildingInsuranceYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="buildingInsuranceFrom" onChange={(e) => handleChange(e)} value={readableDate(buildingInsuranceFrom ? buildingInsuranceFrom : "")} disabled={!buildingInsuranceYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-0">{!buildingInsuranceYes ? null : errors["buildingInsuranceFrom"]}</p>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="buildingInsuranceTill" onChange={(e) => handleChange(e)} value={readableDate(buildingInsuranceTill ? buildingInsuranceTill : "")} disabled={!buildingInsuranceYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-0">{!buildingInsuranceYes ? null : errors["buildingInsuranceTill"]}</p>
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="buildingInsuranceFile" onChange={(e) => handleChange(e)} disabled={!buildingInsuranceYes || viewMood} type="file" id="buildingInsuranceFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.buildingInsuranceFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="buildingInsuranceFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!buildingInsuranceYes ? null : errors["buildingInsuranceFile"]}</p>
                      </td>
                      {permitForm.buildingInsuranceFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.buildingInsuranceFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0">Building Stability Certificate:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="buildingStabilityYes" onChange={(e) => yesHandle(e)} checked={buildingStabilityYes} className="common-radio-deep-blue-input" type="radio" id="buildingStabilityYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="buildingStabilityYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="buildingStabilityYes" onChange={(e) => yesHandle(e)} checked={!buildingStabilityYes} className="common-radio-deep-blue-input" type="radio" id="buildingStabilityYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="buildingStabilityYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="buildingStabilityFrom" onChange={(e) => handleChange(e)} value={readableDate(buildingStabilityFrom ? buildingStabilityFrom : "")} disabled={!buildingStabilityYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!buildingStabilityYes ? null : errors["buildingStabilityFrom"]}</p>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="buildingStabilityTill" onChange={(e) => handleChange(e)} value={readableDate(buildingStabilityTill ? buildingStabilityTill : "")} disabled={!buildingStabilityYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!buildingStabilityYes ? null : errors["buildingStabilityTill"]}</p>
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="buildingStabilityFile" onChange={(e) => handleChange(e)} disabled={!buildingStabilityYes || viewMood} type="file" id="buildingStabilityFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.buildingStabilityFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="buildingStabilityFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!buildingStabilityYes ? null : errors["buildingStabilityFile"]}</p>
                      </td>
                      {permitForm.buildingStabilityFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.buildingStabilityFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0">Fire NOC:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="FireNOCYes" onChange={(e) => yesHandle(e)} checked={FireNOCYes} className="common-radio-deep-blue-input" type="radio" id="FireNOCYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="FireNOCYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="FireNOCYes" onChange={(e) => yesHandle(e)} checked={!FireNOCYes} className="common-radio-deep-blue-input" type="radio" id="FireNOCYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="FireNOCYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="FireNOCFrom" onChange={(e) => handleChange(e)} value={readableDate(FireNOCFrom ? FireNOCFrom : "")} disabled={!FireNOCYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!FireNOCYes ? null : errors["FireNOCFrom"]}</p>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="FireNOCTill" onChange={(e) => handleChange(e)} value={readableDate(FireNOCTill ? FireNOCTill : "")} disabled={!FireNOCYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!FireNOCYes ? null : errors["FireNOCTill"]}</p>
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="FireNOCFile" onChange={(e) => handleChange(e)} disabled={!FireNOCYes || viewMood} type="file" id="FireNOCFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.FireNOCFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="FireNOCFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!FireNOCYes ? null : errors["FireNOCFile"]}</p>
                      </td>
                      {permitForm.FireNOCFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.FireNOCFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className="border">
                      <td className="mw-200px">
                        <p className="mb-0">Floor Load Bearing Capacity Certificate:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="floorLoadYes" onChange={(e) => yesHandle(e)} checked={floorLoadYes} className="common-radio-deep-blue-input" type="radio" id="floorLoadYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="floorLoadYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="floorLoadYes" onChange={(e) => yesHandle(e)} checked={!floorLoadYes} className="common-radio-deep-blue-input" type="radio" id="floorLoadYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="floorLoadYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="floorLoadFrom" onChange={(e) => handleChange(e)} value={readableDate(floorLoadFrom ? floorLoadFrom : "")} disabled={!floorLoadYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!floorLoadYes ? null : errors["floorLoadFrom"]}</p>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="floorLoadTill" onChange={(e) => handleChange(e)} value={readableDate(floorLoadTill ? floorLoadTill : "")} disabled={!floorLoadYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!floorLoadYes ? null : errors["floorLoadTill"]}</p>
                      </td>
                      <td className="vertical-top">
                        <div className="custom-file">
                          <input name="floorLoadFile" onChange={(e) => handleChange(e)} disabled={!floorLoadYes || viewMood} type="file" id="floorLoadFile" className="custom-file-input" hidden />
                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.floorLoadFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="floorLoadFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!floorLoadYes ? null : errors["floorLoadFile"]}</p>
                      </td>
                      {permitForm.floorLoadFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.floorLoadFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0 pb-1">Approved Building Layout Copy:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="approvedBuildingYes" onChange={(e) => yesHandle(e)} checked={approvedBuildingYes} className="common-radio-deep-blue-input" type="radio" id="approvedBuildingYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="approvedBuildingYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="approvedBuildingYes" onChange={(e) => yesHandle(e)} checked={!approvedBuildingYes} className="common-radio-deep-blue-input" type="radio" id="approvedBuildingYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="approvedBuildingYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="approvedBuildingFile" onChange={(e) => handleChange(e)} disabled={!approvedBuildingYes || viewMood} type="file" id="approvedBuildingFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.approvedBuildingFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="approvedBuildingFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!approvedBuildingYes ? null : errors["approvedBuildingFile"]}</p>
                      </td>
                      {permitForm.approvedBuildingFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.approvedBuildingFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0">Warehouse Photo Gallery:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-2 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="photoFile" ref={inputRef}  onChange={(e) => handleChange(e)} type="file" id="photoFile" className="custom-file-input" hidden disabled={viewMood} />
                          <span id="custom-file-name" ref={inputRef} className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.photoFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="photoFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{errors["photoFile"]}</p>
                      </td>
                      {permitForm.photoFileLink !== "" ? (<td className="text-center text-nowrape d-flex">
                        <div className="btn btn-group px-0 py-1">
                          <a href={permitForm.photoFileLink} className="btn px-3 mt-3 btn-deep-primary py-1" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className="border">
                      <td className="mw-200px">
                        <p className="mb-0">Warehouse Profile Pic:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-2 mb-0 border">
                        <div className="form-check common-radio-deep-blue mx-3">
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className=" vertical-top ">
                        <div className="custom-file">
                          <input name="profileFile" ref={inputRefse}  onChange={(e) => handleChange(e)} type="file" id="profileFile" className="custom-file-input" hidden disabled={viewMood} />

                          <span id="custom-file-name" ref={inputRefse} className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.profileFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="profileFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{errors["profileFile"]}</p>
                      </td>
                      {permitForm.profileFileLink !== "" ? (<td className="text-center text-nowrape d-flex">
                        <div className="btn btn-group px-0 mt-1 py-0">
                          <a href={permitForm.profileFileLink} className="btn px-3 py-1 mt-3 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                  </tbody>

                </table>
              </div>

            </div>
            <div className="row bg-white pb-3 rounded mx-0 col-xxxl-11">
              <div className="col-12">
                <h5 className="py-2 mb-2 border-bottom">Trade Related</h5>
              </div>
              <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                <table className="table customTable">
                  <tbody>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0">GST Registration Certificate:</p>
                      </td>
                      <td className="col-auto form-inline-block form-group py-4 mt-3 mb-0 d-flex border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="gstRegistrationYes" onChange={(e) => yesHandle(e)} checked={gstRegistrationYes} className="common-radio-deep-blue-input" type="radio" id="gstRegistrationYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="gstRegistrationYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="gstRegistrationYes" onChange={(e) => yesHandle(e)} checked={!gstRegistrationYes} className="common-radio-deep-blue-input" type="radio" id="gstRegistrationYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="gstRegistrationYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="gstRegistrationFile" onChange={(e) => handleChange(e)} disabled={!gstRegistrationYes || viewMood} type="file" id="gstRegistrationFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.gstRegistrationFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="gstRegistrationFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!gstRegistrationYes ? null : errors["gstRegistrationFile"]}</p>
                      </td>
                      {permitForm.gstRegistrationFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.gstRegistrationFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0">Panchayat / Municipal NOC:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="panchayatNOCYes" onChange={(e) => yesHandle(e)} checked={panchayatNOCYes} className="common-radio-deep-blue-input" type="radio" id="panchayatNOCYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="panchayatNOCYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="panchayatNOCYes" onChange={(e) => yesHandle(e)} checked={!panchayatNOCYes} className="common-radio-deep-blue-input" type="radio" id="panchayatNOCYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="panchayatNOCYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="panchayatNOCFrom" onChange={(e) => handleChange(e)} value={readableDate(panchayatNOCFrom ? panchayatNOCFrom : "")} disabled={!panchayatNOCYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!panchayatNOCYes ? null : errors["panchayatNOCFrom"]}</p>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="panchayatNOCTill" onChange={(e) => handleChange(e)} value={readableDate(panchayatNOCTill ? panchayatNOCTill : "")} disabled={!panchayatNOCYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!panchayatNOCYes ? null : errors["panchayatNOCTill"]}</p>
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="panchayatNOCFile" onChange={(e) => handleChange(e)} disabled={!panchayatNOCYes || viewMood} type="file" id="panchayatNOCFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.panchayatNOCFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="panchayatNOCFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!panchayatNOCYes ? null : errors["panchayatNOCFile"]}</p>
                      </td>
                      {permitForm.panchayatNOCFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.panchayatNOCFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0">PAN Card copy of Company:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0 ">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="panCardYes" onChange={(e) => yesHandle(e)} checked={panCardYes} className="common-radio-deep-blue-input" type="radio" id="panCardYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="panCardYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="panCardYes" onChange={(e) => yesHandle(e)} checked={!panCardYes} className="common-radio-deep-blue-input" type="radio" id="panCardYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="panCardYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="panCardFile" onChange={(e) => handleChange(e)} disabled={!panCardYes || viewMood} type="file" id="panCardFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.panCardFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="panCardFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!panCardYes ? null : errors["panCardFile"]}</p>
                      </td>
                      {permitForm.panCardFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.panCardFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="my-0">Electricity Bill Copy:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="electricityBillYes" onChange={(e) => yesHandle(e)} checked={electricityBillYes} className="common-radio-deep-blue-input" type="radio" id="electricityBillYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="electricityBillYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="electricityBillYes" onChange={(e) => yesHandle(e)} checked={!electricityBillYes} className="common-radio-deep-blue-input" type="radio" id="electricityBillYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="electricityBillYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="electricityBillFile" onChange={(e) => handleChange(e)} disabled={!electricityBillYes || viewMood} type="file" id="electricityBillFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.electricityBillFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="electricityBillFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!electricityBillYes ? null : errors["electricityBillFile"]}</p>
                      </td>
                      {permitForm.electricityBillFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.electricityBillFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0 pb-1">Shop & Establishment Certificate:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="shopCertificateYes" onChange={(e) => yesHandle(e)} checked={shopCertificateYes} className="common-radio-deep-blue-input" type="radio" id="shopCertificateYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="shopCertificateYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="shopCertificateYes" onChange={(e) => yesHandle(e)} checked={!shopCertificateYes} className="common-radio-deep-blue-input" type="radio" id="shopCertificateYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="shopCertificateYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                      </td>
                      <td className="">
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="shopCertificateFile" onChange={(e) => handleChange(e)} disabled={!shopCertificateYes || viewMood} type="file" id="shopCertificateFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.shopCertificateFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="shopCertificateFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable my-1">{!shopCertificateYes ? null : errors["shopCertificateFile"]}</p>
                      </td>
                      {permitForm.shopCertificateFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.shopCertificateFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0">Trade License:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="tradeLicenseYes" onChange={(e) => yesHandle(e)} checked={tradeLicenseYes} className="common-radio-deep-blue-input" type="radio" id="tradeLicenseYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="tradeLicenseYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="tradeLicenseYes" onChange={(e) => yesHandle(e)} checked={!tradeLicenseYes} className="common-radio-deep-blue-input" type="radio" id="tradeLicenseYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="tradeLicenseYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="tradeLicenseFrom" onChange={(e) => handleChange(e)} value={readableDate(tradeLicenseFrom ? tradeLicenseFrom : "")} disabled={!tradeLicenseYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4 mb-2" placeholder="" />
                        <p className="errorMsg usable my-1">{!tradeLicenseYes ? null : errors["tradeLicenseFrom"]}</p>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="tradeLicenseTill" onChange={(e) => handleChange(e)} value={readableDate(tradeLicenseTill ? tradeLicenseTill : "")} disabled={!tradeLicenseYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4 mb-2" placeholder="" />
                        <p className="errorMsg usable my-1">{!tradeLicenseYes ? null : errors["tradeLicenseTill"]}</p>
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="tradeLicenseFile" onChange={(e) => handleChange(e)} disabled={!tradeLicenseYes || viewMood} type="file" id="tradeLicenseFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.tradeLicenseFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="tradeLicenseFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable">{!tradeLicenseYes ? null : errors["tradeLicenseFile"]}</p>
                      </td>
                      {permitForm.tradeLicenseFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.tradeLicenseFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0 pb-1">Labor License:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-isabled={viewMood}3 mb-0 border-none">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="laborLicenseYes" onChange={(e) => yesHandle(e)} checked={laborLicenseYes} className="common-radio-deep-blue-input" type="radio" id="laborLicenseYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="laborLicenseYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="laborLicenseYes" onChange={(e) => yesHandle(e)} checked={!laborLicenseYes} className="common-radio-deep-blue-input" type="radio" id="laborLicenseYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="laborLicenseYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="laborLicenseFrom" onChange={(e) => handleChange(e)} value={readableDate(laborLicenseFrom ? laborLicenseFrom : "")} disabled={!laborLicenseYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!laborLicenseYes ? null : errors["laborLicenseFrom"]}</p>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="laborLicenseTill" onChange={(e) => handleChange(e)} value={readableDate(laborLicenseTill ? laborLicenseTill : "")} disabled={!laborLicenseYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4 " placeholder="" />
                        <p className="errorMsg usable my-1">{!laborLicenseYes ? null : errors["laborLicenseTill"]}</p>
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="laborLicenseFile" onChange={(e) => handleChange(e)} disabled={!laborLicenseYes || viewMood} type="file" id="laborLicenseFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.laborLicenseFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="laborLicenseFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable">{!laborLicenseYes ? null : errors["laborLicenseFile"]}</p>
                      </td>
                      {permitForm.laborLicenseFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.laborLicenseFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0 pb-1">Factory License (htmlFor VAS activities):</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="factoryLicenseYes" onChange={(e) => yesHandle(e)} checked={factoryLicenseYes} className="common-radio-deep-blue-input" type="radio" id="factoryLicenseYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="factoryLicenseYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="factoryLicenseYes" onChange={(e) => yesHandle(e)} checked={!factoryLicenseYes} className="common-radio-deep-blue-input" type="radio" id="factoryLicenseYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="factoryLicenseYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="factoryLicenseFrom" onChange={(e) => handleChange(e)} value={readableDate(factoryLicenseFrom ? factoryLicenseFrom : "")} disabled={!factoryLicenseYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4 " placeholder="" />
                        <p className="errorMsg usable my-1">{!factoryLicenseYes ? null : errors["factoryLicenseFrom"]}</p>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="factoryLicenseTill" onChange={(e) => handleChange(e)} value={readableDate(factoryLicenseTill ? factoryLicenseTill : "")} disabled={!factoryLicenseYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!factoryLicenseYes ? null : errors["factoryLicenseTill"]}</p>
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="factoryLicenseFile" onChange={(e) => handleChange(e)} disabled={!factoryLicenseYes || viewMood} type="file" id="factoryLicenseFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.factoryLicenseFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="factoryLicenseFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable">{!factoryLicenseYes ? null : errors["factoryLicenseFile"]}</p>
                      </td>
                      {permitForm.factoryLicenseFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.factoryLicenseFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className='border'>
                      <td className="mw-200px">
                        <p className="mb-0 pb-1">FSSAI License:</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="fssaiLicenseYes" onChange={(e) => yesHandle(e)} checked={fssaiLicenseYes} className="common-radio-deep-blue-input" type="radio" id="fssaiLicenseYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="fssaiLicenseYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="fssaiLicenseYes" onChange={(e) => yesHandle(e)} checked={!fssaiLicenseYes} className="common-radio-deep-blue-input" type="radio" id="fssaiLicenseYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="fssaiLicenseYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="fssaiLicenseFrom" onChange={(e) => handleChange(e)} value={readableDate(fssaiLicenseFrom ? fssaiLicenseFrom : "")} disabled={!fssaiLicenseYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!fssaiLicenseYes ? null : errors["fssaiLicenseFrom"]}</p>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="fssaiLicenseTill" onChange={(e) => handleChange(e)} value={readableDate(fssaiLicenseTill ? fssaiLicenseTill : "")} disabled={!fssaiLicenseYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4 " placeholder="" />
                        <p className="errorMsg usable my-1">{!fssaiLicenseYes ? null : errors["fssaiLicenseTill"]}</p>
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="fssaiLicenseFile" onChange={(e) => handleChange(e)} disabled={!fssaiLicenseYes || viewMood} type="file" id="fssaiLicenseFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.fssaiLicenseFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="fssaiLicenseFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable">{!fssaiLicenseYes ? null : errors["fssaiLicenseFile"]}</p>
                      </td>
                      {permitForm.fssaiLicenseFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.fssaiLicenseFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                    <tr className="border">
                      <td className="mw-200px">
                        <p className="mb-0 pb-1">Pollution Under Control(PUC):</p>
                      </td>
                      <td className="col-auto form-inline form-group py-4 mt-3 mb-0 border-0">
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="pollutionPollutionYes" onChange={(e) => yesHandle(e)} checked={pollutionPollutionYes} className="common-radio-deep-blue-input" type="radio" id="pollutionPollutionYes" value={true} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="pollutionPollutionYes">Yes</label>
                        </div>
                        <div className="form-check common-radio-deep-blue mx-3">
                          <input name="pollutionPollutionYes" onChange={(e) => yesHandle(e)} checked={!pollutionPollutionYes} className="common-radio-deep-blue-input" type="radio" id="pollutionPollutionYes1" value={false} hidden disabled={viewMood} />
                          <label className="common-radio-deep-blue-label pl-4" htmlFor="pollutionPollutionYes1">No</label>
                        </div>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                        <input name="pollutionPollutionFrom" onChange={(e) => handleChange(e)} value={readableDate(pollutionPollutionFrom ? pollutionPollutionFrom : "")} disabled={!pollutionPollutionYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!pollutionPollutionYes ? null : errors["pollutionPollutionFrom"]}</p>
                      </td>
                      <td className="">
                        <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                        <input name="pollutionPollutionTill" onChange={(e) => handleChange(e)} value={readableDate(pollutionPollutionTill ? pollutionPollutionTill : "")} disabled={!pollutionPollutionYes} type="date" readOnly={viewMood} className="form-control form-control-sm bg-white px-4" placeholder="" />
                        <p className="errorMsg usable my-1">{!pollutionPollutionYes ? null : errors["pollutionPollutionTill"]}</p>
                      </td>
                      <td className=" vertical-top">
                        <div className="custom-file">
                          <input name="pollutionPollutionFile" onChange={(e) => handleChange(e)} disabled={!pollutionPollutionYes || viewMood} type="file" id="pollutionPollutionFile" className="custom-file-input" hidden />

                          <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText">{getImgName(permitForm.pollutionPollutionFile)}</span>
                          <label className="custom-file-upload-label py-1 btn-deep-primary btn text-nowrap px-3" htmlFor="pollutionPollutionFile">
                            Upload File
                          </label>
                        </div>
                        <p className="errorMsg usable">{!pollutionPollutionYes ? null : errors["pollutionPollutionFile"]}</p>
                      </td>
                      {permitForm.pollutionPollutionFileLink !== "" ? (<td className="text-center text-nowrape mt-4 d-flex">
                        <div className="btn btn-group px-0 mt-1">
                          <a href={permitForm.pollutionPollutionFileLink} className="btn px-3 py-2 btn-deep-primary" target="_blank" rel="noopener noreferrer" download=""><i className="fas fa-eye"></i></a>

                        </div>
                      </td>) : null}
                    </tr>
                  </tbody>

                </table>
              </div>

              <div className={`col-12 mt-1 ${viewMood ? 'd-none' : ''}`}>
                <div className="row justify-content-end">
                  {/* <div className="col-auto"> */}
                  {/* <button type="button" className="btn btn-outline-deep-blue add-class remove-class" data-add-target=".steps7" data-add-target-class="d-none" data-remove-target=".steps6" data-remove-target-class="d-none">Back</button> */}
                  {/* </div> */}

                  {Object.keys(errors).length !== 0 ? <FormErrorCard message="Fill All Required Fields" /> : null}
                  {pdata.isError !== "" ? <FormErrorCard message={pdata.isError} /> : null}

                  <div className="col-auto">
                    <button type="submit"  className="btn btn-deep-primary add-class remove-class px-5">Save
                      {pdata.isPending ? <Spinner animation="border" /> : null}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default PermitForm
