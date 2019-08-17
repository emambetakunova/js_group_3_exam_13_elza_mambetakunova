import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {apiURL} from "../../constants";
import StarRatings from "react-star-ratings";
import {Button, ButtonGroup, Col, Form, FormGroup} from "reactstrap";
import {NotificationManager} from "react-notifications";

import {fetchOnePlace} from "../../store/actions/placeAction";
import {deleteReview, fetchReviews} from "../../store/actions/reviewAction";
import {addReview} from "../../store/actions/reviewAction";
import PlaceThumbnail from "../../components/PlaceThumbnail/PlaceThumbnail";
import FormElement from "../../components/UI/Form/FormElement";

import './FullPlace.css';

import {addPhoto, fetchPhotos} from "../../store/actions/photoAction";

class FullPlace extends Component {
  state = {
    images: [],
    responsive: {0: {items: 6}},
    review: '',
    overallRatings: 0,
    qualityRating: 0,
    serviceRating: 0,
    interiorRating: 0,
  };

  componentDidMount() {
    this.props.fetchOnePlace(this.props.match.params.id);
    this.props.fetchReviews(this.props.match.params.id);
    this.props.fetchPhotos(this.props.match.params.id);
  };


  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  changeRating = (newRating, name) => {
    if (name === 'qualityRating') {
      this.setState({
        qualityRating: newRating
      });
    } else if (name === 'serviceRating') {
      this.setState({
        serviceRating: newRating
      });
    } else if (name === 'interiorRating') {
      this.setState({
        interiorRating: newRating
      });
    }
  };

  fileChangeHandler = event => {
    const fileValidation = /(.*?)\.(jpg|bmp|jpeg|png|img)$/;
    if (event.target.value.match(fileValidation)) {
      this.setState({
        [event.target.name]: event.target.files
      })
    } else {
      NotificationManager.error('Unsupported file format')
    }
  };

  submitFormHandlerFiles = event => {
    event.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < this.state.images.length; i++) {
      formData.append("images", this.state.images[i]);
    }

    this.props.addPhoto(formData, this.props.match.params.id)
  };

  submitFormHandler = event => {
    event.preventDefault();

    const data = {
      message: this.state.review,
      qualityRating: this.state.qualityRating,
      serviceRating: this.state.serviceRating,
      interiorRating: this.state.interiorRating,
      place: this.props.place._id,
      overallRatings: this.state.overallRatings
    };

    this.props.addReview(data, this.props.match.params.id);
    this.setState({review: '', overallRatings: 0, qualityRating: 0, serviceRating: 0, interiorRating: 0,})
  };

  // deleteImages = (id) => {
  //   this.props.deleteImage(id).then(
  //     () => {
  //       this.props.fetchPhotos();
  //     }
  //   )
  // };

  deleteReviews = (id) => {
    this.props.deleteReview(id).then(
      () => {
        this.props.fetchReviews();
      }
    )
  };

  render() {
    const photos = this.props.photos;
    const reviews = this.props.reviews || [];
    let allRating;
    let quality = 0;
    let service = 0;
    let interior = 0;
    reviews.map(review => {
      quality += review.qualityRating / this.props.reviews.length;
      service += review.serviceRating / this.props.reviews.length;
      interior += review.interiorRating / this.props.reviews.length;
      return <Fragment/>
    });
    allRating = (quality + service + interior) / 3;
    return (
      <Fragment>
        <div>
          <h4>{this.props.place.title}</h4>
          <p>{this.props.place.description}</p>
        </div>
        <div>
          <PlaceThumbnail image={this.props.place.image}/>
        </div>
        <hr/>
        <div>
          <h3>Images</h3>
          {photos && photos.images.map((image, index) => {
            return <Fragment
              key={index}>
              <img
                key={index}
                alt='place images'
                src={`${apiURL}/uploads/${image}`}
                className="images"
              />
              {/*{this.props.user && this.props.user.role === 'admin' ? <ButtonGroup>*/}
                {/*<Button color="info" onClick={() => this.deleteImages(index)}>Delete image</Button>*/}
              {/*</ButtonGroup> : null}*/}
            </Fragment>
          })}
        </div>
        <hr/>
        <div>
          <h3>Average ratings</h3>
          <FormGroup row>
            <Col sm={3}>
              <span>All rating: </span>
              <StarRatings
                starDimension={'20px'}
                rating={allRating}
                starRatedColor="orange"
                numberOfStars={5}
              />
              <span> {allRating.toFixed(2)}</span>
            </Col>
            <Col sm={3}>
              <span>Quality of food: </span>
              <StarRatings
                starDimension={'20px'}
                rating={quality}
                starRatedColor="orange"
                numberOfStars={5}
              />
              <span> {quality.toFixed(2)}</span>
            </Col>
            <Col sm={3}>
              <span>Service quality: </span>
              <StarRatings
                starDimension={'20px'}
                rating={service}
                starRatedColor="orange"
                numberOfStars={5}
              />
              <span> {service.toFixed(2)}</span>
            </Col>
            <Col sm={3}>
              <span>Interior rating:</span>
              <StarRatings
                starDimension={'20px'}
                rating={interior}
                starRatedColor="orange"
                numberOfStars={5}
              />
              <span> {interior.toFixed(2)}</span>
            </Col>
          </FormGroup>
        </div>
        <hr/>
        <div>
          <h3>Reviews</h3>
          {reviews.map((review, index) => {
            console.log(review);
            return <div key={index}>
              <span><strong>Title: </strong>{review.user.username}</span>
              <p><strong>Description: </strong>{review.message}</p>
              {this.props.user && this.props.user.role === 'admin' ? <ButtonGroup>
              <Button color="info" onClick={() => this.deleteReviews(review._id)}>Delete review</Button>
              </ButtonGroup> : null}
              <FormGroup row>
                <Col sm={4}>
                  <span>Quality of food: </span>
                  <StarRatings
                    starDimension={'20px'}
                    rating={review.qualityRating}
                    starRatedColor="orange"
                    numberOfStars={5}
                  />
                  <span> {review.qualityRating}.0</span>
                </Col>
                <Col sm={4}>
                  <span>Service quality: </span>
                  <StarRatings
                    starDimension={'20px'}
                    rating={review.serviceRating}
                    starRatedColor="orange"
                    numberOfStars={5}
                  />
                  <span> {review.serviceRating}.0</span>
                </Col>
                <Col sm={4}>
                  <span>Interior rating:</span>
                  <StarRatings
                    starDimension={'20px'}
                    rating={review.interiorRating}
                    starRatedColor="orange"
                    numberOfStars={5}
                  />
                  <span> {review.interiorRating}.0</span>
                </Col>
              </FormGroup>
            </div>
          })}
        </div>
        <hr/>
        <Form onSubmit={this.submitFormHandler}>
          <FormElement
            propertyName="review"
            title="Review"
            type="textarea"
            value={this.state.review}
            onChange={this.inputChangeHandler}
            placeholder="Enter review"
          />
          <FormGroup row>
            <Col sm={{offset: 3, size: 9}}>
              <FormGroup row>
                <Col>
                  <p>Quality of food</p>
                  <StarRatings
                    starDimension={'20px'}
                    rating={this.state.qualityRating}
                    starRatedColor="orange"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='qualityRating'
                  />
                </Col>
                <Col>
                  <p>Service quality</p>
                  <StarRatings
                    starDimension={'20px'}
                    rating={this.state.serviceRating}
                    starRatedColor="orange"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="serviceRating"
                  />
                </Col>
                <Col>
                  <p>Interior</p>
                  <StarRatings
                    starDimension={'20px'}
                    rating={this.state.interiorRating}
                    starRatedColor="orange"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="interiorRating"
                  />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{offset: 3, size: 9}}>
              <Button type="submit" color="primary">
                Submit review
              </Button>
            </Col>
          </FormGroup>
        </Form>
        <hr/>
        <Form onSubmit={this.submitFormHandlerFiles}>
          <FormElement
            propertyName="images"
            title="Images"
            type="file" multiple={true} required
            onChange={this.fileChangeHandler}
            text="Upload new photo"
          />

          <FormGroup row>
            <Col sm={{offset: 3, size: 9}}>
              <Button type="submit" color="primary">
                Submit photo
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  place: state.places.place,
  reviews: state.reviews.reviews,
  photos: state.photos.photos
});

const mapDispatchToProps = dispatch => ({
  fetchOnePlace: id => dispatch(fetchOnePlace(id)),
  fetchReviews: id => dispatch(fetchReviews(id)),
  fetchPhotos: id => dispatch(fetchPhotos(id)),
  addPhoto: (data, id) => dispatch(addPhoto(data, id)),
  addReview: (data, id) => dispatch(addReview(data, id)),
  deleteReview: id => dispatch(deleteReview(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullPlace);