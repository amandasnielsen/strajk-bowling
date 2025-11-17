import strajkBowlingLogo from '../assets/logo.svg';
import NavButton from '../components/NavButton';
import BookForm from '../components/BookForm';
import './bookingpage.css';

function BookingPage() {
  return (
    <section className="booking__page">

      <img className="logo__booking" src={strajkBowlingLogo} alt="Strajk Bowling Logo" />
      <h1 className="booking__title">BOOKING</h1>

      <BookForm />

      <NavButton 
				buttonText="STRIIIIIIKE!" 
				path="/confirmationpage" 
			/>
    </section>
  );
}

export default BookingPage;