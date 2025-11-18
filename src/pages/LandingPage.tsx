import './landingpage.css';
import strajkBowlingLogo from '../assets/logo.svg';
import NavButton from '../components/NavButton';

function LandingPage() {
  return (
    <section className="landingpage">
      
      <div className="center-content">
        <img className="logo__landing" src={strajkBowlingLogo} alt="strajk bowling logo" />
        <h1 className="title__landing">STRAJK</h1>
        <h2 className="subtitle__landing">BOWLING</h2>
      </div>

      <div className="nav-button-container"> 
        <NavButton 
          buttonText="GO BOOOWLING!" 
          path="/bookingpage" 
        />
      </div>
    </section>
  )
}

export default LandingPage