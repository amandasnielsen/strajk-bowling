import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useBookingStore } from './backend/store'

import ErrorBoundary from "./components/ErrorBoundary"
import LandingPage from "./pages/LandingPage"
import BookingPage from "./pages/BookingPage"
import NotFoundPage from "./pages/NotFoundPage"
import ConfirmationPage from './pages/ConfirmationPage'
import BurgerMenu from './components/BurgerMenu'
import ErrorPage from './pages/ErrorPage'
import strajkBowlingLogo from './assets/logo.svg'

import './index.css';

function App() {
  const fetchApiKey = useBookingStore(state => state.fetchApiKey);
  const apiKey = useBookingStore(state => state.apiKey);
  const error = useBookingStore(state => state.error);

  useEffect(() => {
    if (!apiKey) {
      fetchApiKey();
    }
  }, [apiKey, fetchApiKey]);

  if (!apiKey) {
    return (
			<div className="status__screen">
				<div>
						<img className="logo__error" src={strajkBowlingLogo} alt="strajk bowling logo" />
						<p className="status__message">Loading..</p>
						{error && <p className="error__message">{error}</p>}
				</div>
			</div>
    );
  }

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <section className="app">
          <BurgerMenu />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/bookingpage" element={<BookingPage />} />
            <Route path="/confirmationpage" element={<ConfirmationPage />} />
            <Route path="/error" element={<ErrorPage />} /> 
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </section>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;