import React from 'react'
import type { BookingResponse } from '../backend/types'
import './booking.css'

interface BookingProps {
  bookings: BookingResponse[];
}

// Helper component
const DetailRow: React.FC<{ label: string, value: string | number, isHighlight?: boolean }> = ({ label, value, isHighlight = false }) => (
  <div className={`detail__row ${isHighlight ? 'detail__row-highlight' : ''}`}>
    <span className="detail__label">{label}</span>
    <span className="detail__value">{value}</span>
  </div>
);

function Booking({ bookings }: BookingProps) {

  const renderBookingDetails = (confirmation: BookingResponse) => {

      const datePart = confirmation.when.substring(0, 10);
      const timePart = confirmation.when.substring(11, 16);
      const shortBookingId = confirmation.id.substring(0, 8).toUpperCase();

      return (
        <div key={confirmation.id} className="booking__item">
          <h3 className="booking__item-title">
            BOOKING DETAILS
          </h3>
          <div className="details__group">
            <DetailRow label="WHEN" value={`${datePart} kl ${timePart}`} />
            <DetailRow label="WHO" value={`${confirmation.people} player/s`} />
            <DetailRow label="LANES" value={`${confirmation.lanes} lane/s`} />
            <DetailRow label="BOOKING NR" value={shortBookingId} isHighlight={true} />
            <div className="total__summary">
            <p className="total__text">
              Price: <span>{confirmation.price} kr</span>
            </p>
          </div>
          </div>
        </div>
      );
  };

  return (
    <section>
        
      {bookings.length > 1 && (
        <div>
          <h2 className="bookings__title">TOTAL BOOKINGS: {bookings.length}</h2>
        </div>
      )}

      <div>
        {/* Modifierad: Ignorerar 'index' genom att bara skicka 'booking' */}
        {bookings.map((booking) => renderBookingDetails(booking))}
      </div>

    </section>
  );
}

export default Booking;