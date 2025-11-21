import NavButton from '../components/NavButton'; 
import Booking from '../components/Booking'; 
import { useBookingStore } from '../backend/store'; 
import strajkBowlingLogo from '../assets/logo.svg';
import './confirmationpage.css';

const NoBookingsMessage = () => (
    <div className="no__booking-message">
        <h2 className="message__text">You have no bookings.</h2>
				<br />
        <p className="message__text">Start by booking your first game!</p>
    </div>
);


function ConfirmationPage() {
  const { bookings, resetBooking } = useBookingStore();

  const content = bookings.length === 0 ? (
      <NoBookingsMessage />
    ) : (
      <Booking bookings={bookings} />
    );

  return (
    <section className="confirmation__page">

      <img className="logo__confirmation" src={strajkBowlingLogo} alt="Strajk Bowling Logo" />
      
      <h1 className="confirmation__title">
        SEE YOU SOON!
      </h1>
			
      <div className="scrollable__content"> 
        {content}
      </div>

      <NavButton 
        buttonText="SWEET, LET'S GO!" 
        path="/bookingpage" 
        onClick={resetBooking} 
      />
    </section>
  );
}

export default ConfirmationPage;