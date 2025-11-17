import './errorpage.css';

function ErrorPage() {
  return (
    <div className="error__page">
      <div className="text">
        <h2>Something went wrong 🫥</h2>
        <p>We're working on it!</p>
      </div>
      <a href="/" className='button__notfound'>Back to home</a>
	  </div>
  );
}

export default ErrorPage;