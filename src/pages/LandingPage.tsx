import './landingpage.css';
import strajkBowlingLogo from '../assets/logo.svg';
import NavButton from '../components/NavButton';

function LandingPage() {
	return (
	<section className="landingpage">
		<img className="logo__landing" src={strajkBowlingLogo} alt="strajk bowling logo" />
		<h1 className="title__landing">STRAJK</h1>
		<h2 className="subtitle__landing">BOWLING</h2>
		<NavButton 
			buttonText="GO BOOOWLING!" 
			path="/bookingpage" 
		/>
	</section>
	)
}

export default LandingPage;