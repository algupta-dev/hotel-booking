export interface Hotel {
    _id: string;
    name: string;
    location: string;
    roomsAvailable: number;
    pricePerNight: number;
  }
  
  export interface Booking {
    id: string;
    hotel: any;
    userId: string;
    checkInDate: string;
    checkOutDate: string;
    roomsBooked: number;
  }
  