import React, { useState } from 'react';
import './explorer-page.css';
// Main App component
const App = () => {
  // Use state to manage the currently selected society for the modal
  const [selectedSociety, setSelectedSociety] = useState(null);

  // Array of society data with updated names and descriptions
  const societies = [
    {
      name: "Anveshan",
      description: "Anveshan is a technology society dedicated to fostering innovation and technical skills. We host coding workshops, hackathons, and seminars on emerging technologies to prepare our members for a future in the tech industry.",
    },
    {
      name: "Drishti",
      description: "Drishti is a charity society committed to making a positive impact in our community. We organize donation drives, volunteer for local shelters, and run fundraising events to support various humanitarian causes.",
    },
    {
      name: "NCC",
      description: "The NCC (National Cadet Corps) is an organization focused on discipline, leadership, and patriotism. We provide military training, adventure activities, and community service opportunities to develop character and a sense of duty.",
    },
  ];

  // Function to handle card clicks and open the modal
  const handleCardClick = (society) => {
    setSelectedSociety(society);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedSociety(null);
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Welcome to Our Societies</h1>
      <p style={styles.subtitle}>Click on any card to learn more about a society.</p>
      
      <div style={styles.cardsContainer}>
        {societies.map((society, index) => (
          <div 
            key={index} 
            style={styles.card} 
            onClick={() => handleCardClick(society)}
          >
            <h2 style={styles.cardTitle}>{society.name}</h2>
          </div>
        ))}
      </div>

      {/* Modal for displaying the society description */}
      {selectedSociety && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.closeButton} onClick={handleCloseModal}>&times;</button>
            <h2 style={styles.modalTitle}>{selectedSociety.name}</h2>
            <p style={styles.modalDescription}>{selectedSociety.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};



export default App;
