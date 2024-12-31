import React, { useState, useEffect } from 'react';
import { fetchBookings, cancelBooking, modifyBooking } from '../api/api';
import './managebooking.css';
import Pagination from '../Components/Pagination';

interface Booking {
    _id: string;
    hotel: any;
    rooms: number;
    checkIn: string;
    checkOut: string;
}

const BookingsPage: React.FC = () => {
    const [bookings, setBooking] = useState<Booking[]>([]);
    const [updateClicked, setUpdateClicked] = useState(false);
    const [bookingId, setBookingId] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const pagelimit = 5;

    const getBookings = async () => {
        const data = await fetchBookings('John%20Doe');
        setBooking(data.bookings);
        setTotalPage(Math.ceil(data.bookings.length / pagelimit));
    };
    useEffect(() => {
        getBookings();
    }, []);

    const onCancelClick = async (bookingId: string) => {
        await cancelBooking(bookingId);
        getBookings();
    }

    const updateBookingClick = (booking: any) => {
        setUpdateClicked(true);
        setBookingId(booking._id);
        setCheckInDate(booking.checkIn);
        setCheckOutDate(booking.checkOut);
    }
    const handleUpdateBooking = async () => {
        await modifyBooking(bookingId, {
            checkIn: checkInDate,
            checkOut: checkOutDate,
        });
        setUpdateClicked(false);
    };

    
  let startIndex = (page - 1) * pagelimit;
  let currentData = bookings.slice(startIndex, startIndex + pagelimit);
    return (
        <div className='container'>
            {updateClicked ? (
                <div className='bookingFormPage'>
                    <form onSubmit={handleUpdateBooking} className='form'>
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
                        <div className='buttonDiv'>
                            <button className='buttonCancel' onClick={() => setUpdateClicked(false)}>Back</button>
                            <button type="submit" className='button'>Confirm</button>
                        </div>

                    </form>
                </div>
            ) : (
                <>
                    <h2 className='heading'>Your Bookings</h2>
                    {bookings.length === 0 ? (
                        <p className='noBookings'>No bookings available.</p>
                    ) : (
                        <ul>
                            {currentData.map((booking) => (
                                <li key={booking._id} className='list'>
                                    <div className='bookingCard'>
                                        <h3 className='hotelName'>{`${booking.hotel.name}, ${booking.hotel.location}`}</h3>
                                        <p className='detail'>
                                            <strong>Rooms:</strong> {booking.rooms}
                                        </p>
                                        <p className='detail'>
                                            <strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString('en-US')}
                                        </p>
                                        <p className='detail'>
                                            <strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString('en-US')}
                                        </p>
                                        <div className='buttonDiv'>
                                            <button className='buttonCancel' onClick={() => onCancelClick(booking._id)}>Cancel Booking</button>
                                            <button className='buttonUpdate' onClick={() => updateBookingClick(booking)}>Update Booking</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Pagination page={page} totalPage={totalPage} onPageChange={(key: any) => setPage(key)} />
                </>
            )}
        </div>
    );
};

export default BookingsPage;
