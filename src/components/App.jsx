import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import imageApi from "../api/api";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import Loader from "./Loader/Loader";


export class App extends Component {
    state = {
      searchQuery: '',
      isLoading: false,
      page: 1,
      images: [],
      showModal: false,
      largeImageURL: null,
      imgTags: null,
      error: null,
      totalHits: null
    };
  

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    // if (this.state.images.length > 12) {
    //   this.scrollToBottom();
    // }
  }

  handleSubmitForm = query => {
    if (this.state.searchQuery === query) {
      return;
    }

    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };
  
  
  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    imageApi({ searchQuery, page })
      .then(({ hits, totalHits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
          totalHits: totalHits
        }));
            // if (this.state.images.length > 12) {
            //   this.scrollToBottom();
            // };
        // console.log( this.state.images.length, this.state.page )
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));

  };

  scrollToBottom = () => {
    return window.scrollBy({
      top: window.innerHeight,  
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setImgInfo = ({ largeImageURL, tags }) => {
    this.setState({ largeImageURL, tags });
  };

  
  
  render() {
    const {
      images,
      showModal,
      largeImageURL,
      imgTags,
      isLoading,
      error,
      totalHits
    } = this.state;
    return (      
    <div className="container">
        <Searchbar onSubmit={this.handleSubmitForm} isLoading={isLoading}/>
        {error && <p>Whoops, something went wrong.</p>}
        
        <ImageGallery
          images={images}
          openModal={this.toggleModal}
          onSetImgInfo={this.setImgInfo}
        />

        {isLoading && <Loader /> }
        {images.length > 0 && !isLoading && totalHits > images.length &&(
          <Button onLoadMore={this.fetchImages} />
        )}
        
        {showModal && (
          <Modal onClose={this.toggleModal}>            
            <img src={largeImageURL} alt={imgTags} />
          </Modal>
        )}
    </div>
  );
  }
};
