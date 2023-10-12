import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { newWarehouseSchema } from '../../validation';
import { updateWarehouse, changeWarehouseStatus } from '../../../store/actions/vendor/warehouseList';
import { categoryByPage } from '../../../store/actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import FormSuccess from '../../helper/FormSuccess';
import ErrorCard, { FormErrorCard } from '../../helper/ErrorCard';
import { CardLoader } from '../../helper/CustomLoader';
import { typeByPage } from '../../../store/actions/whyAction';

const UpdateWarehouse = ({ viewMood ,accordionAutoClick }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.WAREHOUSELIST);
  const category = useSelector((state) => state.CATEGORY_INFO.categoryList);
  const typeWh = useSelector((state) => state.WHY_INFO);


  useEffect(() => {
    // alert("Hello")
    dispatch(typeByPage())
    dispatch(categoryByPage())
  }, [dispatch])

  return (
    <>
      {/* Loader */}

      {data.isLoading ? <CardLoader /> : (data.isError !== "" ?
        <ErrorCard message={data.isError} />
        :
        <>
          {
            data.addNewResponse.statusCode === 200 ?
              <FormSuccess onClick={() => 
                {
                 dispatch(changeWarehouseStatus())
                 accordionAutoClick()
                }
              } message={data.addNewResponse.message} />
              : null
          }

          <div className="row align-items-center pb-3  mx-0">
            <div className="col-12">

              <Formik
                enableReinitialize={true}
                initialValues={{
                  warehouseName: data.warehouseDetail.warehouseName,
                  category: data.warehouseDetail.category?.id,
                  type: data.warehouseDetail.type?.id,
                  gstCertificate: ''
                }}
                validationSchema={newWarehouseSchema}
                onSubmit={fields => {
                  dispatch(updateWarehouse(data.warehouseDetail.id, fields));
                  console.log("---->", fields)
                }}
                render={({ values, errors, status, onChange, setFieldValue, touched }) => (
                  <Form>
                    <div className="row bg-white rounded mx-0 col-xxxl-11">
                      <div className="form-group form-inline col-4 mb-3">
                        <label htmlFor="warehouseName" className="mb-2 mr-3">Warehouse Display Name</label>
                        <Field name="warehouseName" className={'form-control bg-white px-4 w-300px' + (errors.warehouseName && touched.warehouseName ? ' is-invalid' : '')} placeholder="Enter Display Name" id="warehouseName" readOnly={viewMood} />
                        <ErrorMessage name="warehouseName" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group col-4 mb-3">
                        <label htmlFor="category" className="mb-2 mr-3">Select Warehouse Category</label>

                        <Field name="category" as="select" className={'form-control custom-select bg-white px-4 common-select-deep-blue w-100' + (errors.category && touched.category ? ' is-invalid' : '')} id="category" disabled={viewMood}>

                          {category && category.length > 0 ?
                            category.filter(item => item.categoryStatus === true).map((item, index) => {
                              return (
                                <option value={item.id} key={index} className="text-capitalize">{item.categoryName}</option>
                              )
                            })
                            : null}
                        </Field>
                        <ErrorMessage name="category" component="div" className="invalid-feedback" />
                      </div>
                      <div className="col-4 form-group mb-3">
                         <label htmlFor="category" className="mb-2 mr-3">Select Warehouse Type</label>

                        <Field name="type" as="select" className={'form-control custom-select bg-white px-4 common-select-deep-blue w-100' + (errors.type && touched.type ? ' is-invalid' : '')} id="category" disabled={viewMood}> 
                           {typeWh?.typeList?.data && typeWh?.typeList?.data.length > 0 ?
                            typeWh?.typeList?.data.map((item, index) => {
                              return (
                                <option value={item.id} key={index} className="text-capitalize">{item.type}</option>
                              )
                            })
                            : null}
                        </Field>
                        <ErrorMessage name="type" component="div" className="invalid-feedback" />
                      </div>
                      
                      <div className={`col-12 ${viewMood ? "d-none" : ""}`}>
                        <div className="row justify-content-end">
                          {Object.keys(errors).length !== 0 ? <FormErrorCard message="Fill All Required Fields" /> : null}
                          {data.isError !== "" ? <FormErrorCard message={data.isError} /> : null}
                          <div className="col-auto">
                            <button type="submit" disabled={data.isPending} className="btn btn-deep-primary px-5">Save
                              {data.isPending ? <Spinner animation="border" /> : null}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}

              />
            </div>
          </div>

        </>)
      }

    </>
  );
}

export default UpdateWarehouse;
