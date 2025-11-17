import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './burgermenu.css';

function BurgerMenu() {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <div 
        className={`hamburger-icon ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`menu-drawer ${isOpen ? 'open' : ''}`}>
        
        <button 
          className="menu-link" 
          onClick={() => handleNavigation('/bookingpage')}
        >
          BOOKING
        </button>
        
        <button 
          className="menu-link" 
          onClick={() => handleNavigation('/confirmationpage')}
        >
          CONFIRMATION
        </button>
        
        
      </div>
    </>
  );
}

export default BurgerMenu;