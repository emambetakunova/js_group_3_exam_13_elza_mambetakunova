import React, {Component} from 'react';
import {Card, CardBody, CardLink, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {fetchPlaces} from "../../store/actions/placeAction";
import PlaceThumbnail from "../../components/PlaceThumbnail/PlaceThumbnail";


class PlaceBuilder extends Component {

  componentDidMount() {
    this.props.fetchPlaces()
  }

  render() {
    const places = this.props.places.map(place => {
      return <Col sm={3} key={place._id}>
        <Card>
          <PlaceThumbnail image={place.image}/>
          <CardBody>
            <CardLink href={`/places/${place._id}`}>{place.title}</CardLink>
          </CardBody>
        </Card>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceBuilder);