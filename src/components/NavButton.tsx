import './navbutton.css';
import { useNavigate } from 'react-router-dom';

interface NavButtonProps {
  buttonText: string; 
  path: string; 
}

function NavButton({ buttonText, path }: NavButtonProps) { 

  const navigate = useNavigate();

  return (
		<button
			onClick={() => navigate(path)} 
			className="button__nav"
			>
			{buttonText} 
		</button>
  )
}

export default NavButton;