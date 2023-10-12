import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { newWarehouseSchema } from "../../validation";
import {
  createNewWarehouse,
  fetchWarehouseById,
  changeWarehouseStatus,
  isError,
} from "../../../store/actions/vendor/warehouseList";
import { categoryByPage } from "../../../store/actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import FormSuccess from "../../helper/FormSuccess";
import { useHistory } from "react-router-dom";
import { typeByPage } from "../../../store/actions/whyAction";

const CreateNewWarehouse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WAREHOUSELIST);
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const category = useSelector((state) => state.CATEGORY_INFO.categoryList);
  const typeWh = useSelector((state) => state.WHY_INFO);
  const history = useHistory();

  const reLoad = () => {
    dispatch(changeWarehouseStatus());
    dispatch(fetchWarehouseById(data.addNewResponse.data.id));
    history.replace(`/vendor/update-warehouse/${data.addNewResponse.data.id}`);
  };

 function afterDisplayMsg(){
  setTimeout(() => {
    dispatch(isError(''));
  }, 5000)
 }

  useEffect(() => {
    dispatch(typeByPage());
    dispatch(categoryByPage());
  }, [dispatch]);

  return (
    <>    
    {data.isError?(afterDisplayMsg()):null}      

      {data.addNewResponse.statusCode === 200 ? (
        reLoad()
       ) : null}

      <div className="row align-items-center px-3 mx-0">
        <div className="w-100">
          <Formik
            initialValues={{
              warehouseName: "",
              category: "",
              type: "",
              gstCertificate: "",
              location: "",
              totalArea: 0,
              structureType: "",
              workingHour: "",
              pallet: 0,
            }}
            validationSchema={newWarehouseSchema}
            onSubmit={(fields) => {
              dispatch(createNewWarehouse(fields));
              console.log("---->", fields);
            }}
            render={({
              errors,
              values,
              setFieldValue,
              status,
              onChange,
              touched,
            }) => (
              <Form>
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="form-group form-inline col-4 mb-3">
                    <label htmlFor="warehouseName" className="mb-2 mr-3">
                      Warehouse Display Name
                    </label>
                    <Field
                      disabled={read}
                      name="warehouseName"
                      className={
                        "form-control form-control-md bg-white px-4 w-300px" +
                        (errors.warehouseName && touched.warehouseName
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="Enter Display Name"
                      id="warehouseName"
                    />
                    <ErrorMessage
                      name="warehouseName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group col-4 mb-3 ">
                    <label htmlFor="category" className="mb-2 mr-3">
                      Select Warehouse Category
                    </label>

                    <Field
                      onChange={(e) =>
                        {
                          if(e?.target.value !=""){
                            setFieldValue("category", parseInt(e.target.value))
                          }
                        }
                      }
                      disabled={read}
                      name="category"
                      as="select"
                      className={
                        "form-control custom-select bg-white px-4 common-select-deep-blue w-100" +
                        (errors.category && touched.category
                          ? " is-invalid"
                          : "")
                      }
                      id="category"
                    >
                      <option value="">Select Category</option>

                      {category && category.length > 0
                        ? category
                            .filter((item) => item.categoryStatus === true)
                            .map((item, index) => {
                              return (
                                <option
                                  value={item.id}
                                  key={index}
                                  className="text-capitalize"
                                >
                                  {item.categoryName}
                                </option>
                              );
                            })
                        : null}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group col-4 mb-3 ">
                    <label htmlFor="category" className="mb-2 mr-3">
                     Select Warehouse Type
                    </label>

                    <Field
                      onChange={ (e) =>{
                          if(e?.target.value !=""){
                            setFieldValue("type", parseInt(e.target.value))
                          }
                        }
                      }
                      disabled={read}
                      name="type"
                      as="select"
                      className={
                        "form-control custom-select bg-white px-4 common-select-deep-blue w-100" +
                        (errors.type && touched.type
                          ? " is-invalid"
                          : "")
                      }
                      id="category"
                    >
                      <option value="">Select Warehouse Type</option>
                      {typeWh?.typeList?.data &&
                      typeWh?.typeList?.data.length > 0
                        ? typeWh?.typeList?.data.map((item, index) => {
                            return (
                                <option
                                  value={item.id}
                                  key={index}
                                  className="text-capitalize"
                                >
                                  {item.type}
                                </option>
                              );
                            })
                        : null}
                    </Field>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className={`col-12 ${!read ? "" : "d-none"}`}>
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        <button
                          type="submit"
                          // disabled={data.isPending}
                          className="btn btn-deep-primary px-5"
                        >
                          Save
                          {data.isPending ? (
                            <Spinner animation="border" />
                            // console.log("Data is loading")
                          ) : null}
                        </button>
                      </div>
                    </div>
                      {data.isError?(<span className="errorMsg">{data.isError}</span>):null}
                  </div>
              </div>
              </Form>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default CreateNewWarehouse;
