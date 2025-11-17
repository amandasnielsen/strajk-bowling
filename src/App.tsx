import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

import ErrorBoundary from "./components/ErrorBoundary"
import LandingPage from "./pages/LandingPage"
import BookingPage from "./pages/BookingPage"
import NotFoundPage from "./pages/NotFoundPage"
import ConfirmationPage from './pages/ConfirmationPage'
import BurgerMenu from './components/BurgerMenu'

function App() {
	return (
		<BrowserRouter>
			<ErrorBoundary>
				<section className="app">
					<BurgerMenu />
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/bookingpage" element={<BookingPage />} />
						<Route path="/confirmationpage" element={<ConfirmationPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</section>
			</ErrorBoundary>
		</BrowserRouter>
	)
}

export default App