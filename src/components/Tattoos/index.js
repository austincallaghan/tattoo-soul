import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';

import './tattoos.css';
import { styles } from '../../assets/tattooStyles';

import PhotoGrid from '../PhotoGrid';

class Tattoos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStyles: [],
      displayedTattoos: [],
    };
  }

  componentDidMount() {
    this.props.firebase
      .tattoos()
      .limit(20)
      // .where('uid', '==', this.props.authUser.uid)
      .get()
      .then(async querySnapshot => {
        if (querySnapshot.size > 0) {
          this.setState({ loading: true });
          const updatedTattooList = [];
          querySnapshot.forEach(doc => {
            let tattooInfo = doc.data();
            updatedTattooList.push(tattooInfo);
          });

          this.setState({
            displayedTattoos: updatedTattooList,
            loading: false,
          });
        } else {
          console.log('No such document!');
        }
      })
      .catch(function(error) {
        console.log('Error getting document: ', error);
      });
  }

  temp = () => {
    this.props.firebase
      .tattoos()
      // .limit(20).start()
      // .where('uid', '==', this.props.authUser.uid)
      .get()

      .then(async querySnapshot => {
        if (querySnapshot.size > 0) {
          this.setState({ loading: true });
          const updatedTattooList = [];
          querySnapshot.forEach(doc => {
            let tattooInfo = doc.data();

            console.log(tattooInfo);

            updatedTattooList.push(tattooInfo);
          });

          console.log(updatedTattooList);
          this.setState({
            displayedTattoos: updatedTattooList,
            loading: false,
          });
        } else {
          console.log('No such document!');
        }
      })
      .catch(function(error) {
        console.log('Error getting document: ', error);
      });
  };

  render() {
    console.log(this.state);

    return (
      <div className="tattoos--container">
        <div>
          <h1>Tattoos</h1>
        </div>
        <div className="tattoos--category-container">
          {styles.map((style, index) => {
            return (
              <div
                className={
                  this.state.activeStyles.includes(style.name)
                    ? 'strikethrough'
                    : ''
                }
                key={index}
                onClick={() => {
                  if (this.state.activeStyles.includes(style.name)) {
                    let savedStyles = this.state.activeStyles.filter(
                      item => item !== style.name,
                    );
                    this.setState({
                      activeStyles: savedStyles,
                    });
                  } else {
                    this.setState({
                      ...this.state,
                      activeStyles: [
                        ...this.state.activeStyles,
                        style.name,
                      ],
                    });
                  }
                }}
              >
                <p>{style.name}</p>
              </div>
            );
          })}
        </div>

        {!this.state.loading && (
          <PhotoGrid imgSrcArray={this.state.displayedTattoos} />
        )}
      </div>
    );
  }
}

export default withFirebase(Tattoos);
