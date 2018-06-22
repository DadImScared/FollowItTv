
import React from 'react';


export const View = ({ show, people, characters }) => (
  <div>
    {
      show.cast.map((castId) => {
        const character = characters[castId];
        return (
          <div key={castId}>
            {character.name}
          </div>
        );
      })
    }
  </div>
);

export default View;
