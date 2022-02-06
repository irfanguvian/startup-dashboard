import React from "react";
import { Field } from "formik";
import PropTypes from "prop-types";
import Error from "../Error";
import {
  CCol,
  CFormLabel,
  CRow,
} from "@coreui/react";

export default function FieldFormik(props) {

  if (props.isView) {
    if (props.isDisabled) {
      return <CRow>
        <CCol md="4">
          <CFormLabel htmlFor="converted_amount">{props.label}</CFormLabel>
        </CCol>
        <CCol md="8">
          <Field
            disabled
            as={props.coreUiComponent}
            id={props.variabelName}
            value={props.valueField}
            name={props.variabelName}
            {...props.function}
          >
            {props.children}
          </Field>
          {props.errors[props.variabelName] && props.touched[props.variabelName] ? (
            <Error>{props.errors[props.variabelName]}</Error>
          ) : null}
        </CCol>
      </CRow>;
    }
    return <CRow>
      <CCol md="4">
        <CFormLabel htmlFor="converted_amount">{props.label}</CFormLabel>
      </CCol>
      <CCol md="8">
        <Field
          disabled
          as={props.coreUiComponent}
          id={props.variabelName}
          value={props.valueField}
          name={props.variabelName}
          {...props.function}
        >
          {props.children}
        </Field>
        {props.errors[props.variabelName] && props.touched[props.variabelName] ? (
          <Error>{props.errors[props.variabelName]}</Error>
        ) : null}
      </CCol>
    </CRow>;

  }

  return <CRow className="mb-3">
    <CCol md={props.colLabel}>
      <CFormLabel htmlFor={props.variabelName}>{props.label}</CFormLabel>
    </CCol>
    <CCol md={props.colInput}>
      <Field
        as={props.coreUiComponent}
        id={props.variabelName}
        name={props.variabelName}
        {...props.function}
      >
        {props.children}
      </Field>
      {props.errors[props.variabelName] && props.touched[props.variabelName] ? (
        <Error>{props.errors[props.variabelName]}</Error>
      ) : null}
    </CCol>
  </CRow>;
}

FieldFormik.propTypes = {
  label: PropTypes.string,
  coreUiComponent: PropTypes.any,
  variabelName: PropTypes.string,
  errors: PropTypes.any,
  touched: PropTypes.any,
  isView: PropTypes.bool,
  isDisabled: PropTypes.bool,
  valueField: PropTypes.string,
  function: PropTypes.object,
  children: PropTypes.any,
  colLabel: PropTypes.string,
  colInput: PropTypes.string,
};
