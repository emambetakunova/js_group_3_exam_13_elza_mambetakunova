import React, {Component, Fragment} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import {connect} from "react-redux";

import FormElement from "../../components/UI/Form/FormElement";
import {addPlace} from "../../store/actions/placeAction";

class AddPlace extends Component {
  state = {
    title: '',
    image: null,
    description: ''
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });

    this.props.addPlace(formData);
  };

  render() {
    return (
      <Fragment>
        <h2>Add new place</h2>
        <Form onSubmit={this.submitFormHandler}>
          <FormElement
            propertyName="title"
            title="Title"
            type="text"
            value={this.state.title}
            onChange={this.inputChangeHandler}
            placeholder="Enter place title"
          />
          <FormElement
            propertyName="description"
            title="Description"
            type="textarea"
            value={this.state.description}
            onChange={this.inputChangeHandler}
            placeholder="Enter description"
          />
          <FormElement
            propertyName="image"
            title="Image"
            type="file"
            onChange={this.fileChangeHandler}
          />
          <FormGroup row>
            <Col sm={{offset: 3, size: 9}}>
              <Button type="submit" color="primary">
                Submit new place
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  addPlace: data => dispatch(addPlace(data)),
});

export default connect(null, mapDispatchToProps)(AddPlace);