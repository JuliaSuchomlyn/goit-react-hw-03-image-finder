import PropTypes from 'prop-types';
import { Component } from "react";
import { SearchbarComponent, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

export class Searchbar extends Component {
    state = {
        query: '',
    }

    handleChangeQuery = ({ currentTarget }) => {
        this.setState({ query: currentTarget.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { query } = this.state;

        if 
            (query.trim() === '') {
            alert('Enter what you are looking for.');
            return;
        }
        
        this.props.onSubmit(query);
        // this.setState({ query: '' });

    }

        render() {
            const { query } = this.state;
            return (
                <SearchbarComponent>
                    <SearchForm onSubmit={this.handleSubmit}>
                        <SearchFormButton type="submit">
                            <SearchFormButtonLabel/>
                        </SearchFormButton>
                        
                        <SearchFormInput
                            value={query}
                            onChange={this.handleChangeQuery}
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />

                    </SearchForm>
                </SearchbarComponent>
            )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
