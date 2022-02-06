// Render Prop
import React from "react";
import { Formik } from "formik";
import propTypes from "prop-types";

const Basic = (props) => (
  <div>
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
    >
      {props.children}
    </Formik>
  </div>
);

export default Basic;

Basic.propTypes = {
  children: propTypes.any,
  initialValues: propTypes.object,
  validationSchema: propTypes.object,
};
