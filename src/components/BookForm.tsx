import React, { useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookingStore } from '../backend/store'
import TimeSelect from './TimeSelect'
import './bookform.css';

interface ShoeInputProps {
  index: number;
  size: number;
  onSizeChange: (index: number, size: number) => void;
}

const ShoeInput: React.FC<ShoeInputProps> = ({ index, size, onSizeChange }) => {
  return (
    <div className="shoe__input-field">
      <label htmlFor={`shoe-${index}`} className="shoe-label">
        SHOE SIZE / PERSON {index + 1}
      </label>
      <input
        type="number"
        id={`shoe-${index}`}
        min="20"
        max="50"
        value={size}
        onChange={(e) => onSizeChange(index, parseInt(e.target.value) || 0)}
        placeholder="38"
        className="form__input form__input--shoe"
      />
    </div>
  );
};

const ApiErrorModal: React.FC<{ message: string, onRetry: () => void, onClose: () => void }> = ({ message, onRetry, onClose }) => {
  
  const handleRetry = () => {
    onClose();
    onRetry();
  };
    
  return (
    <div className="modal__backdrop">
      <div className="modal__content">
        <h3 className="modal__title">BOOKINGERROR ☹️</h3>
        <p className="modal__message">{message}</p>
        
        <div className="modal__actions">
          <button onClick={handleRetry} className="modal__button--retry">
            TRY AGAIN!
          </button>
        </div>
      </div>
    </div>
  );
};

function BookForm() {
  const navigate = useNavigate();
  const { 
    date, time, people, lanes, shoes, error, isLoading, 
    setDraftDetail, setShoes, startBooking, setError 
  } = useBookingStore();

  const validation = useMemo(() => {
    const isPeopleValid = people >= 1;
    const isLanesValid = lanes >= 1;
    
    // NY VALIDERINGSREGEL: Måste vara minst 1 person per bana
    const isMinimumPeoplePerLaneValid = people >= lanes; 
    
    // Befintlig kapacitetsregel
    const isLaneCapacityValid = people <= lanes * 4;
    
    const isShoeCountValid = people === shoes.length && shoes.every(s => s >= 20 && s <= 50);

    let validationMessage = '';
    
    if (!isPeopleValid) validationMessage = 'Number of players has to be at least 1.';
    else if (!isLanesValid) validationMessage = 'Number of lanes has to be at least 1.';
    else if (!isMinimumPeoplePerLaneValid) validationMessage = 'You need at least 1 player for each lane booked.'; 
    else if (!isLaneCapacityValid) validationMessage = `Max ${lanes * 4} players allowed for ${lanes} lane/lanes.`;
    else if (!isShoeCountValid) validationMessage = `Number of shoesizes (${shoes.length}) has to match the number of players (${people}) and valid sizes. (20-50).`;

    return {
      isValid: isPeopleValid && isLanesValid && isMinimumPeoplePerLaneValid && isLaneCapacityValid && isShoeCountValid,
      message: validationMessage
    };
  }, [people, lanes, shoes]);

  const estimatedPrice = people * 120 + lanes * 100;

  useEffect(() => {
    if (people > 0 && people !== shoes.length) {
      let newShoes = [...shoes];
      if (people > shoes.length) {
        const diff = people - shoes.length;
        for (let i = 0; i < diff; i++) newShoes.push(38);
      } else if (people < shoes.length) {
        newShoes = newShoes.slice(0, people);
      }
      setShoes(newShoes);
    }
  }, [people, shoes.length, setShoes, error, setError]);

  const handleShoeSizeChange = (index: number, size: number) => {
    const newShoes = [...shoes];
    newShoes[index] = size;
    setShoes(newShoes);
  };

  const handleBooking = async () => {
    if (!validation.isValid || isLoading) {
      setError(validation.message || "Please correct the form.");
      return;
    }

    setError(null); 

    const bookingRequest = {
      when: `${date}T${time}:00`,
      lanes: lanes,
      people: people,
      shoes: shoes,
    };

    try {
      await startBooking(bookingRequest);
      navigate('/confirmationpage');
    } catch (e) {
      // Felet hanteras i store.ts, stanna på sidan och visa felmeddelandet
    }
  };

  return (
    <section className="book__form">
			<h2 className="section__title">WHEN, WHAT & WHO</h2>
			<div className="form__group form__two">
				<div className="form__two-input">
					<label htmlFor="date">DATE</label>
					<input 
						type="date" 
						id="date" 
						value={date} 
						onChange={(e) => setDraftDetail('date', e.target.value)} 
						className="form__input" 
					/>
				</div>
				<div className="form__two-input">
					<label htmlFor="time">TIME</label>
					<TimeSelect
						value={time}
						onChange={(t) => setDraftDetail('time', t)}
					/>
				</div>
			</div>

			<div className="form__group">
				<label htmlFor="bowlers">NUMBER OF AWESOME BOWLERS</label>
				<input 
					type="number" 
					id="bowlers" 
					min="1" 
					max="16"
					value={people === 0 ? '' : people} 
					onChange={(e) => {
						const val = e.target.value === '' ? 0 : parseInt(e.target.value);
						setDraftDetail('people', val);
					}} 
					placeholder="..." 
					className="form__input" 
				/>
			</div>

			<div className="form__group">
				<label htmlFor="lanes">NUMBER OF LANES</label>
				<input 
					type="number" 
					id="lanes" 
					min="1" 
					max="4"
					value={lanes === 0 ? '' : lanes} 
					onChange={(e) => {
						const val = e.target.value === '' ? 0 : parseInt(e.target.value);
						setDraftDetail('lanes', val);
					}} 
					placeholder="..." 
					className="form__input" 
				/>
			</div>

			{!validation.isValid && validation.message && (
					<div className="validation__error">
							<p className="validation__message">{validation.message}</p>
					</div>
			)}
            
			<h2 className="section__title">SHOES</h2>
			
			<div className="shoe__size-group">
				{Array.from({ length: people }).map((_, index) => (
					<ShoeInput
						key={index}
						index={index}
						size={shoes[index] || 38}
						onSizeChange={handleShoeSizeChange}
					/>
				))}
			</div>
      
			<div className="price__summary">
				<p className="price__text">
					Pris: <span>{estimatedPrice} kr</span>
				</p>
			</div>

			<div className="button__wrapper">
        <button
          onClick={handleBooking}
          disabled={!validation.isValid || isLoading}
          className={`button__nav ${(!validation.isValid || isLoading) ? 'button__nav--disabled' : ''}`}
        >
          {isLoading ? "SENDING..." : "STRIIIIIIKE!"}
        </button>
      </div>

      {error && (
        <ApiErrorModal
          message={error}
          onRetry={handleBooking}
          onClose={() => setError(null)}
        />
      )}
    </section>
  );
}

export default BookForm;