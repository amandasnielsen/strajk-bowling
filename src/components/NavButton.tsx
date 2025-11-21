import { useNavigate } from 'react-router-dom'
import './navbutton.css'

interface NavButtonProps {
  buttonText: string; 
  path: string; 
  onClick?: () => void;
}

function NavButton({ buttonText, path, onClick }: NavButtonProps) { 
  const navigate = useNavigate();

  const handleClick = () => {
	if (onClick) {
		onClick();
	}
	navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className="button__nav"
    >
      {buttonText} 
    </button>
  )
}

export default NavButton