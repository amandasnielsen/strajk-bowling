import { Component, type ErrorInfo, type ReactNode } from 'react'
import ErrorPage from '../pages/ErrorPage'

// 1. TYPER FÖR PROPS
interface ErrorBoundaryProps {
  children: ReactNode;
}

// 2. TYPER FÖR STATE
interface ErrorBoundaryState {
  hasError: boolean;
}

// 3. DEFINIERA KLASSEN MED KORREKTA TYPER
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  // Uppdaterar state om ett fel inträffar
  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  // Fångar felet och loggar det
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Skickar användaren till fel-sidan
      return <ErrorPage />; 
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;