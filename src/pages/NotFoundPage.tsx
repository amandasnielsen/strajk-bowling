import './notfoundpage.css';
import NotFoundLogo from '../assets/404.png';
import NavButton from '../components/NavButton';

function NotFoundPage() {
  return (
	<div className="notfound__page">
		<h2>404</h2>
		<p>SEEMS LIKE THERE IS NOTHING HERE...</p>
		<img className="logo__notfound" src={NotFoundLogo} alt="Confused Bowlingpin" />
		<NavButton 
			buttonText="BACK TO HOME" 
			path="/" 
		/>
	</div>
  )
}

export default NotFoundPage;