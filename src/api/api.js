import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'https://pixabay.com/api';
const apiKey = '28904548-d9c2cfbf9827312a5dc0908e6';

const fetchImagesApi = ({ searchQuery = '', page = 1 }) => {
    return axios.get(
        `/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
        .then(({ data }) => data);

};

fetchImagesApi.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default fetchImagesApi