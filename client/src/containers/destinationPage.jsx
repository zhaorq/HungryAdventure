import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMaps from './GoogleMaps';
import HotelList from '../components/HotelList';
// +++++ Imported Components


class destinationPage extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    const heroImage = this.props.destination.imageUrl[0];

    console.log('*******************', this.props);
    return (<div>
      <h1> Hungry Adventure </h1>
      <div className="hero" style={{ backgroundImage: `url(${heroImage})` }} />
      <GoogleMaps locator={this.props.geo.locator} />
      <h1> {this.props.destination.city}</h1>
      <h1> {this.props.destination.country}</h1>
      <h1>$ {this.props.destination.price}</h1>
      {/* < HEADERIMG />*/}
      {/* < INFO Component />*/}
      {/* < Weather Component />*/}
      <HotelList hotels={this.props.hotels} destination={this.props.destination} />
    </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, null)(destinationPage);
