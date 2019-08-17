import React, {Component} from 'react';
import {Button, ButtonGroup, Card, CardBody, CardLink, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {deletePlace, fetchPlaces} from "../../store/actions/placeAction";
import PlaceThumbnail from "../../components/PlaceThumbnail/PlaceThumbnail";


class PlaceBuilder extends Component {

  componentDidMount() {
    this.props.fetchPlaces()
  }

  deletePlaces = (id) => {
    this.props.deletePlace(id).then(
      () => {
        this.props.fetchPlaces();
      }
    )
  };

  render() {
    const places = this.props.places.map(place => {
      return <Col sm={3} key={place._id}>
        <Card>
          <PlaceThumbnail image={place.image}/>
          <CardBody>
            <CardLink href={`/places/${place._id}`}>{place.title}</CardLink>
          </CardBody>
        </Card>
        {this.props.user && this.props.user.role === 'admin' ? <ButtonGroup>
          <Button color="info" onClick={() => this.deletePlaces(place._id)}>Delete place</Button>
        </ButtonGroup> : null}
      </Col>
    });
    return (
      <Row>
        {places}
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  places: state.places.places
});

const mapDispatchToProps = dispatch => ({
  fetchPlaces: () => dispatch(fetchPlaces()),
  deletePlace: id => dispatch(deletePlace(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceBuilder);