import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import {
  fetchList,
  selectData,
  selectState,
  setCategory,
  setReleaseDate,
} from '../listingSlice';
import { Search } from './search';
import { AlbumItem } from './albumItem';
import { isSameDay } from 'date-fns'

import '../../../style/_listing.css';
import "react-datepicker/dist/react-datepicker.css";

export function Listing() {
  const data = useSelector(selectData);
  const {
    searchQuery,
    categories,
    selectedCategory,
    selectedReleaseDate,
  } = useSelector(selectState)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [])

  let noItems = false;
  return (
    <div>
      <Search/>
        <div className="filters-box">
          <h4>Showing top 100 albums</h4>
          <span className="filters">
            <select placeholder="Categories" onChange={evt => {dispatch(setCategory(evt.target.value))}}>
              <option value="All" disabled selected>Categories</option>
              {
              Object.keys(categories).map(category => {
                return <option value={category}>{category}</option>
              })
              }
            </select>
            <DatePicker 
              dateFormat="yyyy/MM/dd" 
              selected={selectedReleaseDate}
              isClearable 
              onChange={(date) => {
                dispatch(setReleaseDate(date))
              }} 
              wrapperClassName='date-picker' 
              placeholderText="Release date"
            />
          </span>
        </div>

      <div className="row">
        {data.map((item, index) => {
          let i = null;
          if(!searchQuery || item.name.toLowerCase().includes(searchQuery) || item.artist.toLowerCase().includes(searchQuery)){
            i = item;
          }
          if(i && (selectedCategory == "All" || item.category === selectedCategory)){
            i = item;
          } else i = null;
          if(i && (!selectedReleaseDate || isSameDay(new Date(item.releaseDate),selectedReleaseDate))) {
            i = item;
          } else i = null;
          if(i) {
            return <AlbumItem item={item} />
          } else {
            noItems = true;
            return null;
          }
        })}
      </div>

      <div className="row">
        {noItems && <div>No Items . . .</div>} 
      </div>
    </div>
  );
}
