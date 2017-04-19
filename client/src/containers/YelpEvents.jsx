import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentEvents } from '../actions/currentStateAction';
import { yelpBudget } from '../actions/budgetAction';
import { eventsImage } from '../actions/budgetBarAction';
import { Col, Button, Row } from 'react-bootstrap';
import Scroll from 'react-scroll';
const scroll = Scroll.animateScroll;


class YelpEvents extends Component {
  constructor(props) {
    super(props)
      this.state = {
      show: " hide",
      flag: true,
      added: [],
    }
  }

  check = (index) => {
    const first = this.state.added.indexOf(index);
    const last = this.state.added.lastIndexOf(index);
    if (first !== last) {
      this.state.added.splice(first, 1);
      this.state.added.splice(last, 1);
      return this.state[index] = 0;
    }
    this.state[index] = 1;
  }

  add = (event, index) => {
    this.props.currentEvents({event: event});
    this.props.eventsImage({ events: event.image_url });
    setTimeout(() => {
      this.props.yelpBudget(this.props.current)
    }, 1000);
    this.state.added.push(index);
    this.check(index);
  }

  expand = () => {
    if (this.state.flag) {
      this.setState({show: ""});
      this.setState({flag: false});
    } else if (!this.state.flag) {
      this.setState({show: " hide"});
      this.setState({flag: true});
    }
    scroll.scrollMore(500, { delay : 100 });
  }

  render() {
    if (this.props.yelp.events === undefined) {
      return (
        <div>No Yelp Events</div>
      );
    }

    return (
      <div className="eventsContainer">
        <Row className="rowTitle">
          <Col md={6} xs={6}><h2>Resturants</h2></Col>
          <Col md={6} xs={6}><div className="seeAll" onClick={() => this.expand()}>See all >></div></Col>
        </Row>
        {this.props.yelp.events.map((event, index) => (
          <Col md={3} key={index} className={"eventContainer" + ((index > 3) ? this.state.show : "")}>
          <div className="portfolio-box" onClick={() => this.add(event, index)}>
            <img className="eventImg" src={event.image_url}/>
            <div className ="portfolio-box-caption"></div>
            <div className ="portfolio-box-caption" style={{opacity: this.state[index]}}><span className="glyphicon glyphicon-shopping-cart" /></div>
          </div>
          <div>
            <span className="price">{event.price}</span>
            <a href={event.url}>{event.name}</a>
          </div>
        </Col>
        ))}
        <div className="spaceMe"></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, { currentEvents, yelpBudget, eventsImage })(YelpEvents);
