import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import imageApi from "./api/api";
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
    };
  
  componentDidMount() {
    this.setState({searchQuery: 'smile'})
  }

  componentDidUpdate(prevProps, prevState) {
  if (prevState.searchQuery !== this.state.searchQuery) {
    this.fetchImages();
  }
  if (this.state.page > 1) {
      this.scrollToBottom();
  }
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
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  scrollToBottom = () => {
    return window.scrollTo({      
      top: document.documentElement.scrollHeight,  
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
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onLoadMore={this.fetchImages}/>
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
