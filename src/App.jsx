import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar.jsx'
import GetStarted from './Get-started.jsx'
import ExplorerPage from './Explorer-page.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [accessToken, setAccessToken] = useState(null)

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
          </div>
        );
      case 'about':
        return (
          <div>
            <h1>About Us</h1>
            <p>Learn more about us here.</p>
          </div>
        );
      case 'get-started':
        return <GetStarted setCurrentPage={setCurrentPage} />;
      case 'explorer':
        return <ExplorerPage />;
      default:
        return (
          <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Navbar 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage} 
      />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App