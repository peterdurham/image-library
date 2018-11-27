import React from 'react';

const Search = (props) => {
    return (
        <div className="search__box">
          <div className="search__label">Image Library</div>
            <div className="search__input--features">
              <input type="text" className="search__input" placeholder="Search images" onChange={(event)=>props.bindSearchInput(event.target.value)}/>
              <button className="search__button" onClick={()=>props.searchImages(props.searchInput)}>Search</button>
            </div>
        </div>
    );
}

export default Search;