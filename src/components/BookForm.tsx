import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../backend/store';
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
				placeholder="EU 40"
				className="form__input form__input--shoe"
			/>
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
		const isLaneCapacityValid = people <= lanes * 4;
		const isShoeCountValid = people === shoes.length && shoes.every(s => s >= 30 && s <= 50);

		let validationMessage = '';
		if (!isPeopleValid) validationMessage = 'Antal spelare måste vara minst 1.';
		else if (!isLanesValid) validationMessage = 'Antal banor måste vara minst 1.';
		else if (!isLaneCapacityValid) validationMessage = `Max ${lanes * 4} spelare tillåtna för ${lanes} bana/banor.`;
		else if (!isShoeCountValid) validationMessage = `Antal skostorlekar (${shoes.length}) måste matcha antal spelare (${people}) och vara giltiga (20-50).`;

		return {
			isValid: isPeopleValid && isLanesValid && isLaneCapacityValid && isShoeCountValid,
			message: validationMessage
		};
	}, [people, lanes, shoes]);

	const estimatedPrice = people * 120 + lanes * 100;

	useEffect(() => {
		if (error) {
      setError(null);
    }

		if (people > 0 && people !== shoes.length) {
			let newShoes = [...shoes];
			if (people > shoes.length) {
				const diff = people - shoes.length;
				for (let i = 0; i < diff; i++) newShoes.push(40);
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
			setError(validation.message || "Vänligen korrigera formuläret.");
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
			<section className="scrollable__content">
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
						<select 
							id="time" 
							value={time} 
							onChange={(e) => setDraftDetail('time', e.target.value)} 
							className="form__input"
						>
							{['17:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
								<option key={t} value={t}>{t}</option>
							))}
						</select>
					</div>
				</div>

				<div className="form__group">
					<label htmlFor="bowlers">NUMBER OF AWESOME BOWLERS</label>
					<input 
						type="number" 
						id="bowlers" 
						min="1" 
						max="16"
						value={people} 
						onChange={(e) => setDraftDetail('people', parseInt(e.target.value) || 1)} 
						placeholder="HOW MANY?" 
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
						value={lanes} 
						onChange={(e) => setDraftDetail('lanes', parseInt(e.target.value) || 1)} 
						placeholder="LANES?" 
						className="form__input" 
					/>
				</div>

				{!validation.isValid && validation.message && (
						<div className="validation-error">
								<p className="validation-message">{validation.message}</p>
						</div>
				)}
					
				<h2 className="section__title">SHOES</h2>
				
				<div className="shoe__size-group">
					{Array.from({ length: people }).map((_, index) => (
						<ShoeInput
							key={index}
							index={index}
							size={shoes[index] || 40}
							onSizeChange={handleShoeSizeChange}
						/>
					))}
				</div>
			</section>
			<div className="price__summary">
				<p className="price__text">
					Pris: <span>{estimatedPrice} kr</span>
				</p>
			</div>
			
			{error && (
				<div className="api-error">
					<strong className="api-error-title">Oh no!</strong>
					<p className="api-error-message">{error}</p>
				</div>
			)}

			<div className="button__wrapper">
			<button
				onClick={handleBooking}
				disabled={!validation.isValid || isLoading}
				className={`button__nav ${(!validation.isValid || isLoading) ? 'button__nav--disabled' : ''}`}
			>
				{isLoading ? "SKICKAR..." : "STRIIIIIIKE!"}
			</button>
			</div>
		</section>
	);
}

export default BookForm;