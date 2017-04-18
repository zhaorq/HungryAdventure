import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import DonutChart from 'react-donut-chart';
import { Col, Button } from 'react-bootstrap';
import { googleMaps } from '../keys/mapsKey';
import { StoryPin } from '../components/Pins';
import { pinArray } from '../../utils/storyPageHelpers';

class StoryPage extends Component {
  render() {
    const budget = this.props.budget.original;
    const flightCost = this.props.budget.flight || 0;
    const hotelCost = this.props.budget.hotel || 0;
    const activityCost = this.props.budget.viatorEvents || 0;
    const foodCost = this.props.budget.yelpEvents || 0;
    const totalBudget = budget - flightCost - hotelCost - activityCost - foodCost;
    const mapArray = pinArray(this.props);
    return (
      <div className="parallaxContainer">
        <section
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${this.props.destination.imageUrl[1] || this.props.destination.imageUrl[0]}) no-repeat center center fixed`,
            backgroundSize: 'cover',
          }}
        >
          <h1 className="storyCity">{this.props.destination.city}</h1>
          <div className="infoContainer">
            <div className="container">
              <Col md={8}>
                <h3>Summary</h3>
                <div className="storyMap">
                  <GoogleMapReact
                    options={{ scrollwheel: false }}
                    defaultCenter={{
                      lat: this.props.locator.latitude,
                      lng: this.props.locator.longitude,
                    }}
                    defaultZoom={15}
                    bootstrapURLKeys={{ key: googleMaps() }}
                  >
                    {mapArray.map(elem =>
                      <StoryPin
                        lat={elem.lat || elem.coordinates.latitude}
                        lng={elem.lng || elem.coordinates.longitude}
                        text={elem.hotel || elem.name}
                        key={elem.id || elem.name}
                      />,
                )}
                  </GoogleMapReact>
                </div>
              </Col>
              <Col md={4} style={{ textAlign: 'center' }}>
                <h3>Budget</h3>
                <DonutChart
                  data={[{ label: `Remaining ( $ ${totalBudget} )`,
                    value: totalBudget,
                    isEmpty: true,
                  },
                  { label: ` Hotel ( $ ${hotelCost} )`,
                    value: hotelCost },
                  { label: ` Flight ( $ ${flightCost} )`,
                    value: flightCost },
                  { label: `Attractions ( $ ${activityCost} )`,
                    value: activityCost },
                  { label: `Food ( $ ${foodCost} )`,
                    value: foodCost,
                  },
                  ]} height={200} width={200} legend={false} className="storyDonut"
                />
              </Col>
            </div>
          </div>
          <div className="blankContainer">
            <div className="container">
              <Col sm={10}>
                <div className="">
                  <h3 className="price-title text-aquamarine">Flight</h3>
                  <h3 className="text-white">${this.props.destination.price}</h3>
                  <div className="clearfix" />
                  <div className="text-white rule">
                    {this.props.destination.originTerminal} to {this.props.destination.IataCode}
                  </div>
                  <a href={this.props.destination.url} target="_blank" className="btn btn-solid js-goto-signup js-button-module-get-free">buy</a>
                </div>
              </Col>
            </div>
          </div>
          {this.props.hotel ?
            <div className="infoContainer" >
              <div className="container">
                <Col sm={10}>
                  <h3 className="price-title text-aquamarine">Hotel</h3>
                  <h3 className="text-white">${this.props.hotel.price}</h3>
                  <div className="clearfix" />
                  <div className="text-white rule">
                    {this.props.hotel.hotel}
                  </div>
                  <a href={this.props.hotel.url} target="_blank" className="btn btn-solid js-goto-signup js-button-module-get-free">Buy</a>
                </Col>
              </div>
            </div>
          : '' }
          {this.props.yelpEvents ?
            <div className="blankContainer">
              <div className="container">
                <Col sm={10}>
                  <h3 className="price-title text-aquamarine">Yelp Events</h3>
                  {this.props.yelpEvents.map((event, i) =>
                    <div key={event.name}>
                      <h3 className="text-white">({event.price})</h3>
                      <div className="clearfix" />
                      <div className="text-white rule">
                        {event.name}
                      </div>
                      <a href={event.url} target="_blank" className="btn btn-solid js-goto-signup js-button-module-get-free">Link</a>
                      {i < this.props.yelpEvents.length - 1 ?
                        <div className="space" />
                        : '' }
                    </div>)}
                </Col>
              </div>
            </div>
          : '' }
          {this.props.viatorEvents ?
            <div className="infoContainer">
              <div className="container">
                <Col sm={10}>
                  <h3 className="price-title text-aquamarine">Viator Events</h3>
                  {this.props.viatorEvents.map((event, i) =>
                    <div key={event.title}>
                      <h3 className="text-white">${event.price}</h3>
                      <div className="clearfix" />
                      <div className="text-white rule">
                        {event.title}
                      </div>
                      <a href={`https://www.viator.com/${event.url}`} target="_blank" className="btn btn-solid js-goto-signup js-button-module-get-free">Buy</a>
                      {i < this.props.viatorEvents.length - 1 ?
                        <div className="space" />
                    : '' }
                    </div>)}
                </Col>
              </div>
            </div>
          : '' }
          <div className="space" />
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ current, geo, budget }) => ({
  ...current,
  ...geo,
  budget,
});

export default connect(mapStateToProps, null)(StoryPage);
