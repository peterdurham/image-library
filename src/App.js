import React, { Component } from 'react';

import './App.css';

import Modal from './Components/Modal';
import Search from './Components/Search';
import Results from './Components/Results';

class App extends Component {
  state = {
    searchResults: [],
    searchInput: '',
    lastInput: '',
    viewingImage: false,
    imageToView: null
  }
  
  bindSearchInputHandler = (input) => {
    this.setState(()=>({ searchInput: input }))
  }
  searchImagesHandler = (input) => {
    input = input.replace(" ", "+");
    let URL = `https://pixabay.com/api/?key=10823850-e691644d7a93a21619904f332&q=${input}&image_type=photo`
    return fetch(URL)
          .then(r => r.json())
          .then(data => {
              console.log(data.hits);
              let searchResults = [];
              data.hits.forEach((hit)=>{
                let result = {
                  id: hit.id,
                  previewWidth: hit.previewWidth,
                  previewURL: hit.previewURL,
                  largeImageURL: hit.largeImageURL,
                  webformatHeight: hit.webformatHeight,
                  webformatWidth: hit.webformatWidth,
                  webformatURL: hit.webformatURL
                }
                searchResults.push(result);
              })
              this.setState(()=>({ searchResults, lastInput: input }))
          })
          .catch(err => {
              console.log(err)
          })
  } 
  viewImageHandler = (idToView) => {
    setTimeout(()=>{
      let searchResults = [...this.state.searchResults];
      let filtered = searchResults.filter((result)=>result.id === idToView);
      let imageToView = filtered[0].largeImageURL;
      ;
      this.setState(()=>({ imageToView, viewingImage: true }))
    }, 400)
    
  }
  viewCancelHandler = () => {
    this.setState(()=>({ viewingImage: false }))
  }
  
  render() {
    


    return (
      <div className="App">
        <Modal show={this.state.viewingImage} modalClosed={this.viewCancelHandler}>
          <img src={this.state.imageToView} class="modal__image" alt="viewed"/>
        </Modal>
        <Search
          searchInput = {this.state.searchInput}
          searchImages = {this.searchImagesHandler}
          bindSearchInput = {this.bindSearchInputHandler}
        />
        <Results 
          searchResults = {this.state.searchResults}
          lastInput = {this.state.lastInput}
          viewImage = {this.viewImageHandler}
        />
      </div>
    );
  }
}

export default App;
