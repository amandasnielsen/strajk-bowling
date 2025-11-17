import strajkBowlingLogo from '../assets/logo.svg';
import NavButton from '../components/NavButton';
import Booking from '../components/Booking';
import './confirmationpage.css';

function ConfirmationPage() {
  return (
    <section className="confirmation__page">

      <img className="logo__confirmation" src={strajkBowlingLogo} alt="Strajk Bowling Logo" />
      <h1 className="confirmation__title">SEE YOU SOON!</h1>

      <Booking />

      <NavButton 
				buttonText="SWEET, LET'S GO!" 
				path="/bookingpage" 
			/>
    </section>
  );
}

export default ConfirmationPage