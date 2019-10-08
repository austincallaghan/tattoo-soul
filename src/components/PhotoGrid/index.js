import React from 'react';

import './photoGrid.css';

const PhotoGrid = props => {
  return (
    <div id="photos">
      {props.imgSrcArray.map((item, index) => {
        return (
          <div key={index} className="idv-tattoo--container">
            <img src={item.img_url} />
            <div className="idv-tattoo--info">
              <div className="idv-tattoo--headline">
                <div className="idv-tattoo--studio" />
                <div className="idv-tattoo--title">
                  <span>Love Hates Club</span>
                  <span>Rating: 4.9</span>
                </div>
              </div>
              <div>
                <i class="fas fa-heart" /> Add To Favorites
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
