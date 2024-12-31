import React, { useState, useEffect } from 'react';
import { fetchHotels } from '../api/api';
import { Hotel } from '../types/types';
import './hotelList.css';
import Pagination from './Pagination';

interface Props {
  onHotelSelect: (hotel: Hotel) => void;
}

const HotelList: React.FC<Props> = ({ onHotelSelect }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [locationFilter, setLocationFilter] = useState(''); 
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const pagelimit = 1;

  useEffect(() => {
    const getHotels = async () => {
      const data = await fetchHotels();
      setHotels(data);
      setFilteredHotels(data);
      setTotalPage(Math.ceil(data.length / pagelimit));
    };
    getHotels();
  }, []);

  useEffect(() => {
    const filteredHotels = hotels.filter(hotel =>
      hotel.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
    setFilteredHotels(filteredHotels);
    setPage(1);
  }, [locationFilter, hotels]);

  let startIndex = (page - 1) * pagelimit;
  let currentData = filteredHotels.slice(startIndex, startIndex + pagelimit);
  return (
    <div className='hotelListPage'>
      <input
        type="text"
        className='input'
        placeholder="Filter by location"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
      />
      <ul>
        {currentData.map((hotel) => (
          <li key={hotel._id} className='hotelList'>
            <div className='hotelCard'>
            <h3>{hotel.name}</h3>
            <p>Location: {hotel.location}</p>
            <p>Rooms Avalable: {hotel.roomsAvailable}</p>
            <p>Price per night: Rs 10000</p>
            <button className='bookNowButton' onClick={() => onHotelSelect(hotel)}>Book Now</button>
            </div>
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPage={totalPage} onPageChange={(key: any) => setPage(key)} />
    </div>
  );
};

export default HotelList;
