import React from 'react';
import { useDispatch } from 'react-redux';
import {
    searchAlbums,
} from '../listingSlice';
import search from '../../../images/search.png'

import '../../../style/_search.css';

export function Search() {
  const dispatch = useDispatch();

  return (
    <div className='search-pane'>
      <div className="search">
          <img src={search} className="icon"/>
        <input className='input' onChange={evt => 
          dispatch(searchAlbums(evt.target.value))
          }></input>
        
      </div>
    </div>
  );
}
