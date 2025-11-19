import React from "react"
import "./timeselect.css"

const TimeSelect: React.FC<{ value: string, onChange: (time: string) => void }> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const options = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Hanterar både MouseEvent och TouchEvent
    const handleClickOutside = (event: MouseEvent | TouchEvent) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (event: React.MouseEvent<HTMLDivElement>, time: string) => {
    event.stopPropagation(); 
    
    setIsOpen(false); 
    onChange(time);
  };

  return (
    <div className="custom-select" ref={dropdownRef}>
      <button 
        type="button" 
        className="form__input custom-select__button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
        <span className="arrow">▼</span>
      </button>

      {isOpen && (
        <div className="custom-select__options">
          {options.map(t => (
            <div 
              key={t} 
              className="custom-select__option" 
              onClick={(e) => handleSelect(e, t)}
            >
              {t}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSelect