import PropTypes from 'prop-types';
import { ImgGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
    webformatURL,
    largeImageURL,
    tags = '',
    onSetImgInfo,
    openModal }) => {
    return (
        <ImgGalleryItem >
            <img
                src={webformatURL}
                alt={tags}
                onClick={() => {
                    onSetImgInfo({ largeImageURL, tags });
                    openModal();
                }}
            />
        </ImgGalleryItem>
    )
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
    onSetImgInfo: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
};