import React, { Component } from 'react';

import { AuthUserContext } from '../../components/Session';
import { withFirebase } from '../../components/Firebase';

import './profile.css';

const Profile = props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => <ProfileInner authUser={authUser} {...props} />}
    </AuthUserContext.Consumer>
  );
};

class ProfileInner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      username: '',
      styles: [],
      description: '',
      url: '',
      displayTattoos: [],
    };
  }

  componentDidMount() {
    this.props.firebase
      .user(this.props.authUser.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          let val = doc.data();

          this.setState({
            loading: false,
            description: val.description,
            styles: val.styles,
            username: val.username,
          });
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

    this.props.firebase
      .tattoos()
      .where('uid', '==', this.props.authUser.uid)
      .get()
      .then(async querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(doc => {
            let tattooInfo = doc.data();
            this.setState({
              displayTattoos: [
                ...this.state.displayTattoos,
                tattooInfo,
              ],
            });
          });
        } else {
          console.log('No such document!');
        }
      })
      .catch(function(error) {
        console.log('Error getting document: ', error);
      });

    this.props.firebase.storage
      .ref()
      .child(`profile/${this.props.authUser.uid}_profile`)
      .getDownloadURL()
      .then(url => {
        this.setState({ url });
      });
  }

  render() {
    const { loading, description, styles, username } = this.state;

    console.log(this.state);
    return (
      <div className="profile--container">
        {loading ? (
          <h1>Loading!</h1>
        ) : (
          <div className="profile--loaded-box">
            <div className="profile--image-box">
              {this.state.url !== '' && (
                <img src={`${this.state.url}`} />
              )}
            </div>
            <div className="profile--name-styles">
              <h1>{username && username}</h1>
              <div className="profile--styles">
                {styles.length > 0 &&
                  styles.map((style, index) => {
                    return <div key={index}>{style} /</div>;
                  })}
              </div>
            </div>

            <div className="profile--studio-container">
              <div className="profile--studio">
                <span>Mysteria Studio</span>
                <span>Rating: 5.0</span>
              </div>
              <div className="profile--studio-img"></div>
            </div>

            <div className="profile--info-box">
              <p>Followers: Unimplimented Yet</p>
              <p>Following: Unimplimented Yet</p>
              <p>Reviews: Unimplimented Yet</p>
            </div>

            <div className="profile--description">
              <div>{description && description}</div>
              <div className="profile--cta-buttons">
                <div>Book Now</div>
                <div>Follow</div>
              </div>
            </div>

            <div className="profile--gallery-box-1">
              {this.state.displayTattoos.length >= 0 ? (
                this.state.displayTattoos.map((tattoo, index) => {
                  return (
                    <div key={index}>
                      <img className="temp" src={tattoo.img_url} />
                    </div>
                  );
                })
              ) : (
                <p>hullo</p>
              )}
            </div>
            {/* {this.state.displayTattoos.length >= 0 ? (
              this.state.displayTattoos.map((tattoo, index) => {
                return (
                  <div key={index}>
                    <img className="temp" src={tattoo.img_url} />
                    <h1>{tattoo.name}</h1>
                  </div>
                );
              })
            )} */}
            {/* </div> */}
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(Profile);
