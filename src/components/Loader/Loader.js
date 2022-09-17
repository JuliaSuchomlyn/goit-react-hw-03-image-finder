import { Component } from 'react';
import { RotatingLines } from 'react-loader-spinner'
import { LoaderContainer } from './Loader.styled';



export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <LoaderContainer>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
                />
      </LoaderContainer>
    );
  }
}