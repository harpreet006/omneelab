import React, { useEffect } from 'react';
import '../../../style/vendorCertificate.css';
import VendorLayout from '../../../layout/VendorLayout';
import { useParams, useHistory } from 'react-router-dom';
import MenuDrawer from '../../../components/vendor/MenuDrawer';
import { customerSpaceCertificate } from '../../../store/actions/customer/documentAction';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Terms and Conditions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          A Terms and Conditions agreement is the agreement that includes the terms, the rules and the guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app.
        </p>

        <p>
          A Terms and Conditions agreement is the agreement that includes the terms, the rules and the guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app.
        </p>

        <p>
          A Terms and Conditions agreement is the agreement that includes the terms, the rules and the guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app.
        </p>

        <p>
          A Terms and Conditions agreement is the agreement that includes the terms, the rules and the guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app.
        </p>

        <p>
          A Terms and Conditions agreement is the agreement that includes the terms, the rules and the guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app.
        </p>

        <p>
          A Terms and Conditions agreement is the agreement that includes the terms, the rules and the guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app.
        </p>
        <p>
          A Terms and Conditions agreement is the agreement that includes the terms, the rules and the guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app.
        </p>


        <p>
          A Terms and Conditions agreement is the agreement that includes the terms, the rules and the guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app.
        </p>
      </Modal.Body>
    </Modal>
  );
}


const VendorSpaceCertificate = () => {
  const { certificateId } = useParams();
  const history = useHistory();
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_DOCUMENT);

  useEffect(() => {
    dispatch(customerSpaceCertificate(certificateId))
  }, [dispatch, certificateId]);

  return (
    <VendorLayout>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div className="content-admin px-5">
        <div className="row justify-content-end align-items-center sticky-top py-2 px-3 bg-lighter-warning">
          <MenuDrawer />
        </div>

        <div className="col-12 px-0">
          <h5 className="text-dark-warning"><i onClick={() => history.goBack()} className="fas fa-chevron-left mr-2 cursorPointer"></i> Space Certificate</h5>
        </div>

        <div className="row p-3">
          <div className="col-xl-10 col-lg-11 col-12">
            <div className="space-certficate-holder">
              <div className="space-certificate warning shadow">
                <div className="space-certificate-design top-left"></div>
                <div className="space-certificate-design top-right"></div>
                <div className="space-certificate-design bottom-right"></div>
                <div className="space-certificate-design bottom-left"></div>
                <div className="px-2 space-certificate-inner py-5 px-4">
                  <div className="inner-border top-left"></div>
                  <div className="inner-border top-right"></div>
                  <div className="inner-border bottom-right"></div>
                  <div className="inner-border bottom-left"></div>
                  <div className="img-holder w-200px mx-auto mt-3">
                    <img src="../assets/images/logo.png" alt="" />
                  </div>
                  <div className="px-sm-4">
                    <h2 className="text-center mt-4 text-uppercase">Space Certificate</h2>
                    <div className="heading-design">
                      <span className="line left">
                        <span className="dots"></span>
                        <span className="dots"></span>
                        <span className="dots"></span>
                        <span className="dots"></span>
                      </span>
                      <span className="line right">
                        <span className="dots"></span>
                        <span className="dots"></span>
                        <span className="dots"></span>
                        <span className="dots"></span>
                      </span>
                    </div>
                    <div className="px-md-4">
                      <h5 className="text-center mt-4">This is to certify that space certficate is issued between :-</h5>
                      <table className="table table-borderless mt-4">
                        <thead>
                          <tr>
                            <th className="left">Headers</th>
                            <th>Warehousity</th>
                            <th>Space Provider</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="left">Warehouse ID</td>
                            <td>{data.documentDetail?.warehouse?.warehouseId}</td>
                            <td>{data.documentDetail?.warehouse?.warehouseId}</td>
                          </tr>
                          <tr>
                            <td className="left">Warehouse Name</td>
                            <td>{data.documentDetail?.warehouse?.warehouseName}</td>
                            <td>{data.documentDetail?.warehouse?.warehouseName}</td>
                          </tr>
                          <tr>
                            <td className="left">Warehouse Address</td>
                            <td>{data.documentDetail?.warehouse?.warehouseContactDetailInfo?.address?.district},{data.documentDetail?.warehouse?.warehouseContactDetailInfo?.address?.state}</td>
                            <td>{data.documentDetail?.warehouse?.warehouseContactDetailInfo?.address?.district},{data.documentDetail?.warehouse?.warehouseContactDetailInfo?.address?.state}</td>
                          </tr>
                          <tr>
                            <td className="left">Booked Space</td>
                            <td>{data.documentDetail?.customerRfq?.warehouseSpaceRequired}</td>
                            <td>{data.documentDetail?.customerRfq?.warehouseSpaceRequired}</td>
                          </tr>
                          <tr>
                            <td className="left">Booked Duration</td>
                            <td>Text</td>
                            <td>Text</td>
                          </tr>
                          <tr>
                            <td className="left">Agreed Services</td>
                            <td>Text</td>
                            <td>Text</td>
                          </tr>
                          <tr>
                            <td className="left">Contact Person</td>
                            <td>Warehousity</td>
                            <td>{(data.documentDetail?.warehouse?.users && data.documentDetail?.warehouse?.users?.length > 0 ? data.documentDetail?.warehouse?.users[0].firstName + " " + data.documentDetail?.warehouse?.users[0].lastName : null)}</td>
                          </tr>
                          <tr>
                            <td className="left">Space certificate validity</td>
                            <td>Text</td>
                            <td>Text</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="px-sm-4">
                      <div className="row mx-0 mb-3">
                        <div className="col-12 font-weight-bold">Cancellation <button onClick={() => setModalShow(true)} className="btn btn-link" data-toggle="modal">terms & Conditions</button></div>
                      </div>
                      <div className="row mx-0 mb-3">
                        <div className="col-12 font-weight-bold">Acknowledgement & Declaration</div>
                        <div className="col-6"><span className="btn btn-block px-2 border-bottom rounded-0"> Warehousity</span></div>
                        <div className="col-6"><span className="btn btn-block px-2 border-bottom rounded-0"> {(data.documentDetail?.warehouse?.users && data.documentDetail?.warehouse?.users?.length > 0 ? data.documentDetail?.warehouse?.users[0].firstName + " " + data.documentDetail?.warehouse?.users[0].lastName : null)}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}

export default VendorSpaceCertificate;
