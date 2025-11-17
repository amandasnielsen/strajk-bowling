import strajkBowlingLogo from '../assets/logo.svg';
import NavButton from '../components/NavButton';
import './bookingpage.css';

function BookingPage() {
  return (
    <section className="booking__page">

      <img className="logo__booking" src={strajkBowlingLogo} alt="Strajk Bowling Logo" />
      <h1 className="booking__title">BOOKING</h1>

      <h2 className="section__title">WHEN, WHAT & WHO</h2>
      <div className="form__group form__two">
				<div className="form__two-input">
        	<label htmlFor="date">DATE</label>
        	<input type="text" id="date" placeholder="DATE.." className="form__input" />
        </div>
				<div className="form__two-input">
					<label htmlFor="time">TIME</label>
					<input type="text" id="time" placeholder="TIME.." className="form__input" />
				</div>
			</div>
      <div className="form__group">
        <label htmlFor="bowlers">NUMBER OF AWESOME BOWLERS</label>
        <input type="text" id="bowlers" placeholder="HOW MANY?" className="form__input" />
      </div>
      <div className="form__group">
        <label htmlFor="lanes">NUMBER OF LANES</label>
        <input type="text" id="lanes" placeholder="LANES?" className="form__input" />
      </div>

      <h2 className="section__title">SHOES</h2>
      <div className="shoe__size-group">
        <div className="shoe__input-wrapper">
					<div className="shoe__input-field">
						<label htmlFor="shoe">SHOE SIZE / PERSON 1</label>
						<input type="text" id="shoe" placeholder="Euro 44" className="form__input form__input--shoe" />
					</div>
          <button className="remove__shoe">-</button>
        </div>
      </div>

      <button className="add__shoe">+</button>

      <NavButton 
				buttonText="STRIIIIIIKE!" 
				path="/confirmationpage" 
			/>
    </section>
  );
}

export default BookingPage;