import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
// http://localhost:5000/api/hotel/
export const fetchHotels = async () => {
  const response = await axios.get(`${API_URL}/hotel/`);
  console.log(response)
  return response.data;
};

export const bookRoom = async (bookingDetails: any) => {
  const response = await axios.post(`${API_URL}/booking/`, bookingDetails);
  return response.data;
};

export const fetchBookings = async (userId: string) => {
  const response = await axios.get(`${API_URL}/booking/?userName=${userId}`);
  return response.data;
};

export const modifyBooking = async (bookingId: string, updatedDetails: any) => {
  const response = await axios.put(`${API_URL}/booking/${bookingId}`, updatedDetails);
  return response.data;
};

export const cancelBooking = async (bookingId: string) => {
  const response = await axios.delete(`${API_URL}/booking/${bookingId}`);
  return response.data;
};
