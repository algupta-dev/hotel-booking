import React, { useState } from 'react';
import { bookRoom } from '../api/api';
import { Hotel } from '../types/types';
import './bookingForm.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  hotel: Hotel;
  onBookingSuccess: () => void;
}

const BookingForm: React.FC<Props> = ({ hotel, onBookingSuccess }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [rooms, setRooms] = useState(1);
  const navigate = useNavigate();

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    await bookRoom({
      hotel: hotel._id,
      userName: 'John Doe', // Hardcoded user ID
      checkIn: checkInDate,
      checkOut: checkOutDate, 
      rooms,
    });
    // onBookingSuccess();
    navigate('/bookings');
  };

  return (
    <div className='bookingFormPage'>
      <h2 className='heading'>Book {hotel.name}</h2>
      <p>Location: {hotel.location}</p>
      <p>Rooms Avalable: {hotel.roomsAvailable}</p>
      <p>Price per night: Rs 10000</p>
      <form onSubmit={handleBooking} className='form'>
        <div className='field'>
          <label htmlFor="rooms" className='label'>Number of Rooms</label>
          <input
            type="number"
            id="rooms"
            min="1"
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className='input'
          />
        </div>
        <div className='field'>
          <label htmlFor="checkInDate" className='label'>Check-In Date</label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className='input'
          />
        </div>
        <div className='field'>
          <label htmlFor="checkOutDate" className='label'>Check-Out Date</label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className='input'
          />
        </div>
        <button type="submit" className='button'>Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
