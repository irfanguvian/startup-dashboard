import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CFormInput, CFormTextarea, CFormSelect, CRow, CFormLabel } from "@coreui/react";
import { Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import FormikTemplate from "../Components/FormikTemplate";
import DocumentForm from "./DocumentForm";
import FieldFormik from "../Components/input/FieldFormik";
import PropTypes from "prop-types";

export default function index({ diHash }) {
  const [form, setForm] = useState({});
  const history = diHash.useHistory();

  const onClickHandler = async (data, e) => {
    e.preventDefault();
    const body = data;
    console.log(body);
    const argHash = { body, history };
    await diHash.apiAdapter.postProduct(argHash);
  };

  const Schema = Yup.object().shape({
    name: Yup.string().required(),
    type: Yup.string().required(),
    discount: Yup.number().required(),
    event: Yup.string().required(),
    originalPrice: Yup.number().required(),
    description: Yup.string(),
    display: Yup.mixed(),
    productZip: Yup.mixed(),
  });
  return <div>
    <FormikTemplate validationSchema={Schema}
      initialValues={
        {
          name: "",
          type: "",
          discount: "",
          event: "",
          originalPrice: "",
          description: "",
          display: null,
          productZip: null,
        }
      }
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form>
          <CCol md="8" sm="12">
            <CCard>
              <CCardHeader className="mb-1">
              Product
              </CCardHeader>
              <CCardBody>
                <FieldFormik errors={errors} touched={touched} variabelName='name' label='Name'
                  coreUiComponent={CFormInput}
                  colInput='8'
                  colLabel='4'
                  function={{
                    onChange: (e) => {
                      setFieldValue("name", e.target.value);
                      setForm({
                        ...form,
                        name: e.target.value,
                      });
                    },
                  }}
                />

                <FieldFormik errors={errors} touched={touched} variabelName='type' label='Type'
                  coreUiComponent={CFormSelect}
                  colInput='8'
                  colLabel='4'
                  function={{
                    onChange: (e) => {
                      setFieldValue("type", e.target.value);
                      setForm({
                        ...form,
                        type: e.target.value,
                      });
                    },
                  }}
                >
                  <option>Select Type</option>
                  <option value={"company_profile"}>COMPANY PROFILE</option>
                </FieldFormik>

                <FieldFormik errors={errors} touched={touched} variabelName='discount' label='discount'
                  coreUiComponent={CFormInput}
                  colInput='8'
                  colLabel='4'
                  function={{
                    onChange: (e) => {
                      setFieldValue("discount", e.target.value);
                      setForm({
                        ...form,
                        discount: e.target.value,
                      });
                    },
                  }}
                />

                <FieldFormik errors={errors} touched={touched} variabelName='event' label='event'
                  coreUiComponent={CFormInput}
                  colInput='8'
                  colLabel='4'
                  function={{
                    onChange: (e) => {
                      setFieldValue("event", e.target.value);
                      setForm({
                        ...form,
                        event: e.target.value,
                      });
                    },
                  }}
                />

                <FieldFormik errors={errors} touched={touched} variabelName='originalPrice' label='originalPrice'
                  coreUiComponent={CFormInput}
                  colInput='8'
                  colLabel='4'
                  function={{
                    onChange: (e) => {
                      setFieldValue("originalPrice", e.target.value);
                      setForm({
                        ...form,
                        originalPrice: e.target.value,
                      });
                    },
                  }}
                />

                <FieldFormik errors={errors} touched={touched} variabelName='description' label='description'
                  coreUiComponent={CFormTextarea}
                  colInput='8'
                  colLabel='4'
                  function={{
                    onChange: (e) => {
                      setFieldValue("description", e.target.value);
                      setForm({
                        ...form,
                        description: e.target.value,
                      });
                    },
                  }}
                />
                <CRow className="mb-3">
                  <CCol md="4">
                    <CFormLabel htmlFor="productZip">Product</CFormLabel>
                  </CCol>
                  <CCol md="8">
                    <CFormInput type="file" id="productZip" name="productZip"
                      onChange={(event) => {
                        setFieldValue(
                          `productZip`,
                          event.currentTarget.files[0],
                        );
                        setForm({
                          ...form,
                          productZip: event.currentTarget.files[0],
                        });
                      }} />
                  </CCol>
                </CRow>
                <DocumentForm state={{ form, setForm }} />
              </CCardBody>
              <CCardFooter>
                <div className="d-flex justify-content-between">
                  <CButton color="primary" className="px-5" onClick={(e) => onClickHandler(form, e)}>
                    Save
                  </CButton>
                  <CButton
                    color="warning"
                    className="px-5"
                    onClick={() => alert("test")}
                  >
                    Cancel
                  </CButton>
                </div>
              </CCardFooter>

            </CCard>
          </CCol>
        </Form>
      )}
    </FormikTemplate>
  </div>;
}

index.propTypes = {
  diHash: PropTypes.any,
};
