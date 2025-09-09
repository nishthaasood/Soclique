import React, { useState } from 'react';
import './explorer-page.css';

// ExplorerPage component with photo gallery and interactive features
const ExplorerPage = () => {
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [likedSocieties, setLikedSocieties] = useState({});

  // Society data with multiple images for each society
  const societies = [
    {
      id: 1,
      name: "Anveshan",
      description: "Anveshan is a technology society dedicated to fostering innovation and technical skills. We host coding workshops, hackathons, and seminars on emerging technologies to prepare our members for a future in the tech industry.",
      fullDescription: "Anveshan stands at the forefront of technological innovation in our institution. Our society organizes regular coding bootcamps, AI/ML workshops, web development sessions, and competitive programming contests. We collaborate with industry professionals to provide real-world exposure and internship opportunities. Our members have successfully launched several tech startups and won national-level hackathons.",
      images: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop&crop=center"
      ],
      likes: 42
    },
    {
      id: 2,
      name: "Drishti",
      description: "Drishti is a charity society committed to making a positive impact in our community. We organize donation drives, volunteer for local shelters, and run fundraising events to support various humanitarian causes.",
      fullDescription: "Drishti believes in the power of collective action to create meaningful change. Our initiatives include monthly food distribution drives, educational support for underprivileged children, environmental cleanup campaigns, and health awareness programs. We have partnered with over 15 NGOs and have impacted more than 5000 lives through our various social welfare projects.",
      images: [
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=250&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop&crop=center"
      ],
      likes: 38
    },
    {
      id: 3,
      name: "NCC",
      description: "The NCC (National Cadet Corps) is an organization focused on discipline, leadership, and patriotism. We provide military training, adventure activities, and community service opportunities to develop character and a sense of duty.",
      fullDescription: "The National Cadet Corps shapes future leaders through disciplined training and character building activities. Our cadets participate in annual training camps, adventure sports, disaster management drills, and national integration programs. We instill values of unity, discipline, and selfless service while preparing young minds for leadership roles in society and the armed forces.",
      images: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center"
      ],
      likes: 35
    },
  ];

  // Initialize current image index for each society
  React.useEffect(() => {
    const initialIndexes = {};
    societies.forEach(society => {
      initialIndexes[society.id] = 0;
    });
    setCurrentImageIndex(initialIndexes);
  }, []);

  // Navigate to previous image
  const previousImage = (societyId, e) => {
    e.stopPropagation();
    const society = societies.find(s => s.id === societyId);
    setCurrentImageIndex(prev => ({
      ...prev,
      [societyId]: prev[societyId] === 0 ? society.images.length - 1 : prev[societyId] - 1
    }));
  };

  // Navigate to next image
  const nextImage = (societyId, e) => {
    e.stopPropagation();
    const society = societies.find(s => s.id === societyId);
    setCurrentImageIndex(prev => ({
      ...prev,
      [societyId]: (prev[societyId] + 1) % society.images.length
    }));
  };

  // Go to specific image
  const goToImage = (societyId, imageIndex, e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [societyId]: imageIndex
    }));
  };

  // Toggle like for society
  const toggleLike = (societyId, e) => {
    e.stopPropagation();
    setLikedSocieties(prev => ({
      ...prev,
      [societyId]: !prev[societyId]
    }));
  };

  // Open modal with society details
  const openModal = (society) => {
    setSelectedSociety(society);
  };

  // Close modal
  const closeModal = () => {
    setSelectedSociety(null);
  };

  return (
    <div className="explorer-page">
      <div className="explorer-header">
        <h1 className="explorer-title">Discover Our Societies</h1>
        <p className="explorer-subtitle">Explore, engage, and find your perfect community</p>
      </div>
      
      <div className="societies-grid">
        {societies.map((society) => (
          <div 
            key={society.id} 
            className="society-card"
            onClick={() => openModal(society)}
          >
            {/* Photo Gallery Section */}
            <div className="photo-gallery">
              <div className="gallery-container">
                {society.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${society.name} ${index + 1}`}
                    className={`gallery-image ${currentImageIndex[society.id] === index ? 'active' : ''}`}
                  />
                ))}
                
                {/* Navigation Arrows */}
                <button 
                  className="nav-arrow prev"
                  onClick={(e) => previousImage(society.id, e)}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button 
                  className="nav-arrow next"
                  onClick={(e) => nextImage(society.id, e)}
                  aria-label="Next image"
                >
                  ›
                </button>
                
                {/* Photo Dots Indicator */}
                <div className="photo-dots">
                  {society.images.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${currentImageIndex[society.id] === index ? 'active' : ''}`}
                      onClick={(e) => goToImage(society.id, index, e)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="card-content">
              <h2 className="society-name">{society.name}</h2>
              <p className="society-description">{society.description}</p>
              
              {/* Action Buttons */}
              <div className="card-actions">
                <button 
                  className={`like-button ${likedSocieties[society.id] ? 'liked' : ''}`}
                  onClick={(e) => toggleLike(society.id, e)}
                >
                  <span className="like-icon">
                    {likedSocieties[society.id] ? '❤️' : '🤍'}
                  </span>
                  <span>
                    {society.likes + (likedSocieties[society.id] ? 1 : 0)} likes
                  </span>
                </button>
                
                <button className="know-more-btn">
                  Know More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for detailed society information */}
      {selectedSociety && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            
            {/* Modal Gallery */}
            <div className="modal-gallery">
              <div className="photo-gallery" style={{height: '300px'}}>
                <div className="gallery-container">
                  {selectedSociety.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedSociety.name} ${index + 1}`}
                      className={`gallery-image ${currentImageIndex[selectedSociety.id] === index ? 'active' : ''}`}
                    />
                  ))}
                  
                  <button 
                    className="nav-arrow prev"
                    onClick={(e) => previousImage(selectedSociety.id, e)}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button 
                    className="nav-arrow next"
                    onClick={(e) => nextImage(selectedSociety.id, e)}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                  
                  <div className="photo-dots">
                    {selectedSociety.images.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${currentImageIndex[selectedSociety.id] === index ? 'active' : ''}`}
                        onClick={(e) => goToImage(selectedSociety.id, index, e)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="modal-title">{selectedSociety.name}</h2>
            <p className="modal-description">{selectedSociety.fullDescription}</p>
            
            <div className="card-actions">
              <button 
                className={`like-button ${likedSocieties[selectedSociety.id] ? 'liked' : ''}`}
                onClick={(e) => toggleLike(selectedSociety.id, e)}
              >
                <span className="like-icon">
                  {likedSocieties[selectedSociety.id] ? '❤️' : '🤍'}
                </span>
                <span>
                  {selectedSociety.likes + (likedSocieties[selectedSociety.id] ? 1 : 0)} likes
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorerPage;