import { Component } from 'react';
import ErrorPage from '../pages/ErrorPage';

// Creates a class-component that works as an errorboundary
// With state that keeps track if an error occurs
class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  // Updates state if an error occurs
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Catches the error
  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />; // If an error, show ErrorPage
    }

    return this.props.children; // If no error, show content
  }
}

export default ErrorBoundary;