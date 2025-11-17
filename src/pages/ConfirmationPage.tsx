import strajkBowlingLogo from '../assets/logo.svg';
import NavButton from '../components/NavButton';
import Booking from '../components/Booking';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../backend/store';
import './confirmationpage.css';

function ConfirmationPage() {
	const confirmation = useBookingStore(state => state.confirmation);
  const resetBooking = useBookingStore(state => state.resetBooking);
  const navigate = useNavigate();

  useEffect(() => {
    if (!confirmation) {
      navigate('/');
    }
  }, [confirmation, navigate]);

  if (!confirmation) return null;

  return (
    <section className="confirmation__page">

      <img className="logo__confirmation" src={strajkBowlingLogo} alt="Strajk Bowling Logo" />
      <h1 className="confirmation__title">SEE YOU SOON!</h1>

      <Booking />

      <NavButton 
				buttonText="SWEET, BOOK MORE!" 
				path="/bookingpage" 
				onClick={resetBooking}
			/>
    </section>
  );
}

export default ConfirmationPage