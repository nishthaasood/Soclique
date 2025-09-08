import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [accessToken, setAccessToken] = useState(null)

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App
