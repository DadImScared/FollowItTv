
import React from 'react';


const View = ({ episodes }) => (
  <div>
    {
      episodes.map((item, index) => {
        return (
          <div key={`${item.id}-${index}`}>{item.name}</div>
        );
      })
    }
  </div>
);

export default View;
