import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImgGallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onSetImgInfo, openModal }) => {
    return (
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <ImgGallery>
                {images.map(({ webformatURL, largeImageURL, tags }, idx) => (
                <ImageGalleryItem
                    key={idx}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                    onSetImgInfo={onSetImgInfo}
                    openModal={openModal}
                />
            ))}
        </ImgGallery>
        </div>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    onSetImgInfo: PropTypes.func.isRequired,
};
