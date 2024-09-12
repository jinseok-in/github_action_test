import React, { useState, useEffect }  from 'react';
import '../styles/NewsCheck.css';
import good_png from '../images/good_news_image.png'
import bad_png from '../images/bad_news_image.png'



function NewsCheckPage() {
  const [randomImages, setRandomImages] = useState([]);

  const getRandomImage = () => {
    const sampleImages = [good_png, bad_png];
    const randomIndex = Math.floor(Math.random() * sampleImages.length);
    return sampleImages[randomIndex];
  };
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localshot:5000/api/')
  //     }
  //   }
  // })

  return (
    <div id="news-container">
      <div className="news-main-content">
        <h1>News Head</h1>
        <p>
          뉴스의 본문이 들어가는 공간
        </p>
        <div className='news-bottom'></div>
      </div>
      <div className="news-sidebar">
        <h2>News</h2>
        {randomImages.map((image, index) => (
          <div className="news-item" key={index}>
            <div className="news-desc-text">
              <h3>News head</h3>
              <p>Innovative Algorithm Boosts Speed and Accuracy, Bringing</p>
            </div>
            {image && <img src={image} alt={`news-${index}`} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsCheckPage;
