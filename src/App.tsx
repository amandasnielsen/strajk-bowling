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

import './index.css';

function App() {
  const fetchApiKey = useBookingStore(state => state.fetchApiKey);
  const apiKey = useBookingStore(state => state.apiKey);
  //const isLoading = useBookingStore(state => state.isLoading);
  const error = useBookingStore(state => state.error);

  useEffect(() => {
    if (!apiKey) {
      fetchApiKey();
    }
  }, [apiKey, fetchApiKey]);

  if (!apiKey) {
    return (
        <div className="status-screen">
            <h1 className="main-title">STRAJK BOWLING</h1>
            <div className="loading-box">
                <p className="status-message">Loading..</p>
                <div className="spinner"></div>
                {error && <p className="error-message">{error}</p>}
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