import React from 'react'
import type { BookingResponse } from '../backend/types'
import './booking.css'

interface BookingProps {
  bookings: BookingResponse[]; // Tar emot en array av bokningar
}

// Komponent för att visa varje detalj-rad för bokningen
const DetailRow: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
  <div className={`detail__row`}>
    <span className="detail__label">{label}</span>
    <span className="detail__value">{value}</span>
  </div>
);

// Visar alla detaljer för en eller flera bokningar
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
            <DetailRow label="BOOKING NR" value={shortBookingId} />
            <div className="total__summary">
            <p className="total__text">
              TOTAL: <span>{confirmation.price} SEK</span>
            </p>
          </div>
          </div>
        </div>
      );
  };

  return (
    <section>
        
			{/* Visar totalt antal bokningar om det finns fler än en */}
      {bookings.length > 1 && (
        <div>
          <h2 className="bookings__title">TOTAL BOOKINGS: {bookings.length}</h2>
        </div>
      )}

			{/* Loopar igenom och renderar detaljer för varje enskild bokning */}
      <div>
        {bookings.map((booking) => renderBookingDetails(booking))}
      </div>

    </section>
  );
}

export default Booking;