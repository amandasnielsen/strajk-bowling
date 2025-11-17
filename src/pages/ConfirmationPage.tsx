import strajkBowlingLogo from '../assets/logo.svg';
import NavButton from '../components/NavButton';
import './confirmationpage.css';

function ConfirmationPage() {
  return (
    <section className="confirmation__page">

      <img className="logo__confirmation" src={strajkBowlingLogo} alt="Strajk Bowling Logo" />
      <h1 className="confirmation__title">SEE YOU SOON!</h1>

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

      <NavButton 
				buttonText="SWEET, LET'S GO!" 
				path="/bookingpage" 
			/>
    </section>
  );
}

export default ConfirmationPage