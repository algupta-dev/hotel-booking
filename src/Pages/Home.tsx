import React, { useState } from 'react';
import HotelList from '../Components/HotelList';
import BookingForm from '../Components/BookingForm';
import { Hotel } from '../types/types';

const Home: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  return (
    <div>
      {!selectedHotel ? (
        <HotelList onHotelSelect={setSelectedHotel} />
      ) : (
        <BookingForm hotel={selectedHotel} onBookingSuccess={()=> setSelectedHotel(null)} />
      )}
    </div>
  );
};

export default Home;
