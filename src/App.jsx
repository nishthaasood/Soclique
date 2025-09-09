import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import GetStarted from './Get-started.jsx'
import ExplorerPage from './Explorer-page.jsx'
import HomePage from './HomePage.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [accessToken, setAccessToken] = useState(null)

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div>
            <HomePage />
          </div>
        );
      
      case 'about':
        return (
          <div className="page-content">
            <h1>About Us</h1>
            <p>Learn more about us here. Soclique is a platform designed to connect communities and foster meaningful social interactions. We believe in the power of bringing people together through innovative technology solutions.</p>
            <p>Our mission is to create spaces where societies can thrive, members can connect, and explorers can discover new communities that match their interests and values.</p>
          </div>
        );
      case 'get-started':
        return <GetStarted setCurrentPage={setCurrentPage} />;
      case 'explorer':
        return <ExplorerPage />;
      default:
        return (
          <div>
            <HomePage />
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
      <main className="main-content">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App