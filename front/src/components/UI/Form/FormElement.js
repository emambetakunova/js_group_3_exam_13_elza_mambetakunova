import React from 'react';
import PropTypes from 'prop-types';
import {Col, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";

const FormElement = props => {
  return (
    <FormGroup row>
      <Label for={props.propertyName} sm={3}>{props.title}</Label>
      <Col sm={9}>
        <Input
          type={props.type} required={props.required}
          id={props.propertyName} name={props.propertyName}
          value={props.value} onChange={props.onChange}
          invalid={!!props.error} multiple={props.multiple}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
        />
        <FormText color="muted">
          {props.text}
        </FormText>
        {props.children}
        {props.error && (
          <FormFeedback>
            {props.error}
          </FormFeedback>
        )}
      </Col>
    </FormGroup>
  );
};

FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string
};

export default FormElement;