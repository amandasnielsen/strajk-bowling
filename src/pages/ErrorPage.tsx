import './errorpage.css';
import NotFoundLogo from '../assets/404.png';
import NavButton from '../components/NavButton';

function ErrorPage() {
  return (
	<div className="error__page">
		<h2>OH NO!</h2>
		<p>SOMETHING WENT WRONG..</p>
		<img className="logo__notfound" src={NotFoundLogo} alt="Confused Bowlingpin" />
		<NavButton 
			buttonText="TRY AGAIN!" 
			path="/" 
		/>
	</div>
  )
}

export default ErrorPage