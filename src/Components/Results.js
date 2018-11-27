import React from 'react';

const Results = (props) => {
    let searchLabel = (props.searchResults.length > 0) ?
    <p className="searchresults__text">Search results for <span className="bold-text">{props.lastInput}</span> (click for larger images) </p> :
    null
    
    let pixabayLink = (props.searchResults.length > 0) ?
    <p>Photos generated from <a href="https://pixabay.com/" className="pixabay__link">Pixabay</a> API</p> : null
    

    return (
        <div>
            
            {searchLabel}
            <div className="search__results">
                {props.searchResults.map((result)=><img 
                    src={result.webformatURL} 
                    className="search__image" 
                    alt="search result"
                    onClick={()=>props.viewImage(result.id)}
                />)}
            </div>
            {pixabayLink}
        </div>
    );
}

export default Results;