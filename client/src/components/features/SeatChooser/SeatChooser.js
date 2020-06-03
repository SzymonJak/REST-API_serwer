import React from 'react';
import { Button, Progress, Alert } from 'reactstrap';
import io from 'socket.io-client';

import './SeatChooser.scss';

class SeatChooser extends React.Component {
  state = {
    seatsTotal: 50,
  }
  
  componentDidMount() {
    const { loadSeats, updateSeats } = this.props;
    loadSeats();

    const port = process.env.NODE_ENV !== 'production' ? 'localhost:8000' : '';
    this.socket = io.connect(port);

    this.socket.on('seatsUpdated', seats => updateSeats(seats));
  }

  componentWillUnmount() {
    clearInterval(this.loadSeatsInterval);
  }

  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;

    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  freeSeats = () => {
    let free = 0;
    for (let i = 0; i < this.state.seatsTotal; i++) {
      if (this.isTaken(i) === false) free++;
    }
    return `Free seats: ${free}/${this.state.seatsTotal}`;
  }

  render() {

    const { prepareSeat } = this;
    const { requests } = this.props;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(this.state.seatsTotal)].map((x, i) => prepareSeat(i+1) )}</div>}
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={this.state.seatsTotal} /> }
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
        <p>{this.freeSeats()}</p>
      </div>
    )
  };
}

export default SeatChooser;