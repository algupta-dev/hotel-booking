import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManageBookings from './ManageBookings';
import { fetchBookings, cancelBooking, modifyBooking } from '../api/api'; // Mocked API functions

jest.mock('../api/bookings');

describe('ManageBookings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockBookings = [
    {
      _id: '1',
      hotel: { name: 'Luxury Hotel', location: 'City Center' },
      rooms: 2,
      checkIn: '2024-01-15',
      checkOut: '2024-01-20',
    },
    {
      _id: '2',
      hotel: { name: 'Beach Resort', location: 'Seaside' },
      rooms: 1,
      checkIn: '2024-02-10',
      checkOut: '2024-02-15',
    },
  ];

  test('renders bookings when data is available', async () => {
    // (fetchBookings as jest.Mock).mockResolvedValueOnce({ bookings: mockBookings });

    const {getByText} = render(<ManageBookings />);

    // Wait for bookings to load
    await waitFor(() => expect(screen.getByText(/Luxury Hotel, City Center/)).toBeInTheDocument());
    expect(getByText('Beach Resort')).toBeInTheDocument();
    expect(screen.getAllByText(/Cancel Booking/)).toHaveLength(2);
    expect(screen.getAllByText(/Update Booking/)).toHaveLength(2);
  });

  test('displays "No bookings available" when there are no bookings', async () => {
    (fetchBookings as jest.Mock).mockResolvedValueOnce({ bookings: [] });

    render(<ManageBookings />);

    await waitFor(() => expect(screen.getByText(/No bookings available/)).toBeInTheDocument());
  });

  test('cancels a booking when "Cancel Booking" button is clicked', async () => {
    (fetchBookings as jest.Mock).mockResolvedValueOnce({ bookings: mockBookings });
    (cancelBooking as jest.Mock).mockResolvedValueOnce({});
    (fetchBookings as jest.Mock).mockResolvedValueOnce({ bookings: [mockBookings[1]] });

    render(<ManageBookings />);

    await waitFor(() => expect(screen.getByText(/Luxury Hotel, City Center/)).toBeInTheDocument());

    const cancelButton = screen.getAllByText(/Cancel Booking/)[0];
    fireEvent.click(cancelButton);

    await waitFor(() => expect(cancelBooking).toHaveBeenCalledWith('1'));
    await waitFor(() => expect(screen.queryByText(/Luxury Hotel, City Center/)).not.toBeInTheDocument());
  });

  test('opens update form when "Update Booking" button is clicked', async () => {
    (fetchBookings as jest.Mock).mockResolvedValueOnce({ bookings: mockBookings });

    render(<ManageBookings />);

    await waitFor(() => expect(screen.getByText(/Luxury Hotel, City Center/)).toBeInTheDocument());

    const updateButton = screen.getAllByText(/Update Booking/)[0];
    fireEvent.click(updateButton);

    expect(screen.getByLabelText(/Check-In Date/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Check-Out Date/)).toBeInTheDocument();
  });

  test('submits the update booking form', async () => {
    (fetchBookings as jest.Mock).mockResolvedValueOnce({ bookings: mockBookings });
    (modifyBooking as jest.Mock).mockResolvedValueOnce({});
    (fetchBookings as jest.Mock).mockResolvedValueOnce({
      bookings: [
        { ...mockBookings[0], checkIn: '2024-01-18', checkOut: '2024-01-25' },
        mockBookings[1],
      ],
    });

    render(<ManageBookings />);

    await waitFor(() => expect(screen.getByText(/Luxury Hotel, City Center/)).toBeInTheDocument());

    const updateButton = screen.getAllByText(/Update Booking/)[0];
    fireEvent.click(updateButton);

    const checkInInput = screen.getByLabelText(/Check-In Date/);
    const checkOutInput = screen.getByLabelText(/Check-Out Date/);

    fireEvent.change(checkInInput, { target: { value: '2024-01-18' } });
    fireEvent.change(checkOutInput, { target: { value: '2024-01-25' } });

    const confirmButton = screen.getByText(/Confirm/);
    fireEvent.click(confirmButton);

    await waitFor(() => expect(modifyBooking).toHaveBeenCalledWith('1', {
      checkIn: '2024-01-18',
      checkOut: '2024-01-25',
    }));
    await waitFor(() => expect(screen.getByText(/2024-01-18/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/2024-01-25/)).toBeInTheDocument());
  });

  test('closes the update form when "Back" button is clicked', async () => {
    (fetchBookings as jest.Mock).mockResolvedValueOnce({ bookings: mockBookings });

    render(<ManageBookings />);

    await waitFor(() => expect(screen.getByText(/Luxury Hotel, City Center/)).toBeInTheDocument());

    const updateButton = screen.getAllByText(/Update Booking/)[0];
    fireEvent.click(updateButton);

    const backButton = screen.getByText(/Back/);
    fireEvent.click(backButton);

    expect(screen.queryByLabelText(/Check-In Date/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Check-Out Date/)).not.toBeInTheDocument();
  });
});
