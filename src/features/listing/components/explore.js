import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectData,
  selectState,
} from '../listingSlice';
import { Search } from './search';

import '../../../style/_listing.css';

export function Explore() {
  return (
    <div>
      <Search/>
        <div className="filters-box">
          <h4>Showing explore. . .</h4>
        </div>
    </div>
  );
}
