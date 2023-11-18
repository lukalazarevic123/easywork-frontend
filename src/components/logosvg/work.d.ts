import {ReactComponent as work} from '../../assets/work.svg';
import React from 'react';

export const workSVG: React.FC = () => {
    return (
      <div>
        <img src={work} alt="Logo" />
      </div>
    );
  };