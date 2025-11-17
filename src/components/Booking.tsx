import './booking.css';

function Booking() {
  return (
    <section className="booking">

      <h2 className="section__title">BOOKING DETAILS</h2>
      <div className="form__group">
        <label htmlFor="bowlers">WHEN</label>
        <input type="text" id="when"className="form__input" />
      </div>
      <div className="form__group">
        <label htmlFor="lanes">WHO</label>
        <input type="text" id="who" className="form__input" />
      </div>
			<div className="form__group">
        <label htmlFor="lanes">LANES</label>
        <input type="text" id="lanes" className="form__input" />
      </div>
			<div className="form__group">
        <label htmlFor="lanes">BOOKING NUMBER</label>
        <input type="text" id="booking-number" className="form__input" />
      </div>

    </section>
  );
}

export default Booking