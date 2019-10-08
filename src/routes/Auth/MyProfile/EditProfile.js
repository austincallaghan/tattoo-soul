import React, { Component } from 'react';
import CropImage from '../../../components/CropModal';
import { styles } from '../../../assets/tattooStyles';

import './edit-profile.css';

export class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cropImageVisible: false,
      checkedItems: [],
      description: '',
      loading: false,
      updateComplete: false,
      image: '',
      blob: '',
      base64: '',
    };
  }

  componentDidMount() {
    this.setState({
      description: this.props.authUser.description,
      checkedItems: [...this.props.authUser.styles],
    });
  }

  handleChange = name => {
    if (this.state.checkedItems.includes(name)) {
      const savedStyles = this.state.checkedItems.filter(
        item => item !== name,
      );

      this.setState({
        checkedItems: savedStyles,
      });
    } else {
      this.setState({
        checkedItems: [...this.state.checkedItems, name],
      });
    }
  };

  onSubmit = (event, authUser) => {
    event.preventDefault();
    let storageRef = this.props.firebase.storage.ref(
      `profile/${authUser.uid}_profile`,
    );

    storageRef.put(this.state.blob).then(res => {
      this.setState({ updateComplete: true });
    });

    this.props.firebase.user(authUser.uid).set(
      {
        styles: this.state.checkedItems,
        description: this.state.description,
      },
      { merge: true },
    );

    this.props.setContainerState({ edit: false });
  };

  render() {
    const { description } = this.state;
    const { authUser } = this.props;

    return (
      <div className="edit-profile--container">
        <h1>Edit Profile</h1>

        {this.state.cropImageVisible && (
          <CropImage
            closeModal={() =>
              this.setState({
                cropImageVisible: false,
              })
            }
            setBlobAndBase64={(blob, base64) => {
              this.setState({ blob, base64 });
            }}
          />
        )}

        <div className="edit-profile--upload">
          Connect with a Studio
        </div>

        <div
          className="edit-profile--upload"
          onClick={() => this.setState({ cropImageVisible: true })}
        >
          Update Profile Picture
        </div>

        <form onSubmit={event => this.onSubmit(event, authUser)}>
          <h3>Description</h3>
          <textarea
            className="edit-profile--textarea"
            type="textarea"
            value={description}
            onChange={e =>
              this.setState({ description: e.target.value })
            }
          />
          <div className="edit-profile--checkbox-container">
            <h3>Styles</h3>
            {styles.map(item => {
              return (
                <div key={item.key} className="checkbox">
                  <label
                    onClick={() => this.handleChange(item.name)}
                    className={
                      this.state.checkedItems.includes(item.name)
                        ? 'checked'
                        : ''
                    }
                  >
                    {item.name}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="edit-profile--cta">
            <div
              className="edit-profile--cancel"
              onClick={() =>
                this.props.setContainerState({ edit: false })
              }
            >
              <i class="fas fa-arrow-left" />
              Cancel
            </div>
            <button className="edit-profile--submit" type="submit">
              Submit <i class="fas fa-arrow-right" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}
