import React from 'react'
import { useBookingStore } from '../backend/store'
import './booking.css'

// Helper component
const DetailRow: React.FC<{ label: string, value: string | number, isHighlight?: boolean }> = ({ label, value, isHighlight = false }) => (
	<div className={`detail-row ${isHighlight ? 'detail-row--highlight' : ''}`}>
		<span className="detail-label">{label}</span>
		<span className="detail-value">{value}</span>
	</div>
);

// Booking Component (Visar bekräftelsedetaljer)
function Booking() {
	const confirmation = useBookingStore(state => state.confirmation);

	if (!confirmation) {
		return (
			<div className="no-booking-message">
				<p className="message-text">Ingen bokning hittades. Vänligen boka en bana först.</p>
			</div>
		);
	}
	
	// Formatera datum och tid för presentation
	const datePart = confirmation.when.substring(0, 10);
	const timePart = confirmation.when.substring(11, 16);

	return (
		<section className="booking">

			<h2 className="section__title">BOOKING DETAILS</h2>
			
			<div className="details-group">
				<DetailRow label="WHEN" value={`${datePart} kl ${timePart}`} />
				<DetailRow label="WHO" value={`${confirmation.people} spelare`} />
				<DetailRow label="LANES" value={`${confirmation.lanes} bana`} />
				<DetailRow label="BOOKING NUMBER" value={confirmation.id} isHighlight={true} />
			</div>

			<div className="total-summary">
				<p className="total-text">
					Price: <span className="total-price">{confirmation.price} kr</span>
				</p>
			</div>

		</section>
	);
}

export default Booking