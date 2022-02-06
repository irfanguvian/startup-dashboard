import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { Formik } from "formik";
import { CCard, CCardBody, CCardHeader, CCol } from "@coreui/react";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";

export default function DocumentForm({ state, view, edit }) {
  const [documentForm, setDocumentForm] = useState({});
  const data = [
    {
      doctype: "product image 1",
      mandatory: true,
      key: "product_image_1",
      isUpload: !!state.form.product_image_1,
    },
    {
      doctype: "product image 2",
      mandatory: true,
      key: "product_image_2",
      isUpload: !!state.form.product_image_2,
    },
    {
      doctype: "product image 3",
      mandatory: true,
      key: "product_image_3",
      isUpload: !!state.form.product_image_3,
    },
  ];

  useEffect(() => {
    state.setForm({
      ...state.form,
      ...documentForm,
    });
  }, [documentForm]);

  const documentSchema = Yup.object().shape({
    product_image_1: Yup.mixed(),
    product_image_2: Yup.mixed(),
    product_image_3: Yup.mixed(),
  });

  if (view) {
    return (
      <CCol md="12">
        <CCard>
          <CCardHeader className="mb-1 form-header">Documents</CCardHeader>
          <CCardBody>
            <DataTable
              data={data}
              columns={[
                {
                  name: "Document Type",
                  selector: row => row.doctype,
                },
                {
                  name: "Mandatory",
                  selector: row => {
                    return <td className="text-center">{row.mandatory ? "Yes" : "No"}</td>;
                  },
                },
                {
                  name: "Upload",
                  selector: row => {
                    return <td className="text-center">

                      {row.isUpload
                        ? "Uploaded"
                        : data[row.key]
                          ? "Uploaded"
                          : "Not Uploaded"}

                    </td>;
                  },
                },
                {
                  name: "Action",
                  selector: row => {
                    return <td className="text-center">
                      <input
                        id={row.key}
                        name={row.key}
                        type="file"
                        disabled
                      />
                    </td>;
                  },
                },
              ]}
              hover
            />
          </CCardBody>
        </CCard>
      </CCol>
    );
  }

  if (edit) {
    return (
      <Formik
        enableReinitialize
        initialValues={{
          product_image_1: state.form.product_image_1 || "",
          product_image_2: state.form.product_image_2 || "",
          product_image_3: state.form.product_image_3 || "",
          edited: false,
        }}
        validationSchema={documentSchema}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <CCol md="12" className="mb-3">
            {values.product_image_1
            && values.product_image_2
            && values.product_image_3
            && setDocumentForm(values)}
            <CCard>
              <CCardHeader className="mb-1 form-header">
                  Documents
              </CCardHeader>
              <CCardBody>
                <DataTable
                  onChange={() => {
                    if (values.product_image_1
                    && values.product_image_2
                    && values.product_image_3) {
                      setFieldValue("uploaded", true);
                    }
                  }}
                  data={data}
                  columns={[
                    {
                      name: "Document Type",
                      selector: row => row.doctype,
                    },
                    {
                      name: "Mandatory",
                      selector: row => {
                        return <td className="text-center">{row.mandatory ? "Yes" : "No"}</td>;
                      },
                    },
                    {
                      name: "Upload",
                      selector: row => {
                        return <td className="text-center">

                          {row.isUpload
                            ? "Uploaded"
                            : values[row.key]
                              ? "Uploaded"
                              : "Not Uploaded"}

                        </td>;
                      },
                    },
                    {
                      name: "Action",
                      selector: row => {
                        return <td className="text-center">
                          <input
                            id={row.key}
                            name={row.key}
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                `${row.key}`,
                                event.currentTarget.files[0],
                              );
                            }} />
                        </td>;
                      },
                    },
                  ]}
                />
              </CCardBody>
            </CCard>
          </CCol>
        )}
      </Formik>
    );
  }
  return (
    <Formik
      initialValues={{
        product_image_1: null,
        product_image_2: null,
        product_image_3: null,
        uploaded: false,
      }}
      validationSchema={documentSchema}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <CCol md="12" className="mb-3">
          <CCard>
            <CCardHeader className="mb-1 form-header">Documents</CCardHeader>
            <CCardBody>
              <DataTable
                onChange={() => {
                  if (values.product_image_1
                    && values.product_image_2
                    && values.product_image_3) {
                    setDocumentForm(values);
                    setFieldValue("uploaded", true);
                  }
                }}

                data={data}
                columns={[
                  {
                    name: "Document Type",
                    selector: row => row.doctype,
                  },
                  {
                    name: "Mandatory",
                    selector: row => {
                      return row.mandatory ? "Yes" : "No";
                    },
                  },
                  {
                    name: "Upload",
                    selector: row => {
                      return row.isUpload
                        ? "Uploaded"
                        : values[row.key]
                          ? "Uploaded"
                          : "Not Uploaded";
                    },
                  },
                  {
                    name: "Action",
                    selector: row => {
                      return <input
                        id={row.key}
                        name={row.key}
                        type="file"
                        onChange={(event) => {
                          setFieldValue(
                            `${row.key}`,
                            event.currentTarget.files[0],
                          );
                          setDocumentForm({
                            ...documentForm,
                            [row.key]: event.currentTarget.files[0],
                          });
                          if (documentForm.product_image_1
                            && documentForm.product_image_2
                            && documentForm.product_image_3) {
                            setFieldValue("uploaded", true);
                          }
                        }} />;
                    },
                  },
                ]}
                hover
              />
            </CCardBody>
          </CCard>
        </CCol>
      )}
    </Formik>
  );
}

DocumentForm.propTypes = {
  edit: PropTypes.bool,
  state: PropTypes.object.isRequired,
  view: PropTypes.bool,
};
