import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import GetStarted from './Get-started.jsx'
import ExplorerPage from './Explorer-page.jsx'
import HomePage from './HomePage.jsx'
import SocietyHead from './Society-Member.jsx'
import SocietyMember from './Society-Member.jsx'
import About from './About.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [accessToken, setAccessToken] = useState(null)
  const [selectedCollege, setSelectedCollege] = useState(null)

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
          <div >
            <About />
          </div>
        );
      case 'get-started':
        return (
          <GetStarted 
            setCurrentPage={setCurrentPage} 
            setSelectedCollege={setSelectedCollege}
          />
        );
      case 'explorer':
        return <ExplorerPage />;
      case 'societyHead':
        return (
          <SocietyHead 
            setCurrentPage={setCurrentPage}
            selectedCollege={selectedCollege}
          />
        );
      case 'societyMember':
        return (
          <SocietyMember 
            setCurrentPage={setCurrentPage}
            selectedCollege={selectedCollege}
          />
        );
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