import React from "react"
import "./timeselect.css"

const TimeSelect: React.FC<{ value: string, onChange: (time: string) => void }> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const options = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  // Använd en ref för att stänga modalen när man klickar utanför
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
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
              onClick={() => handleSelect(t)}
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