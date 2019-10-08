import React, { useState, useEffect } from 'react';
import CropImage from '../../../components/CropModal';

import { styles as tattooStyles } from '../../../assets/tattooStyles';
import './display-profile.css';

export const DisplayProfile = props => {
  let [activeStyles, setStyleState] = useState([]);
  let [modalVisibility, setModalState] = useState({
    formVisible: false,
    cropImageVisible: false,
  });
  let [imageState, setImageState] = useState(null);
  let [formState, setFormState] = useState({
    description: '',
    artist: '',
    studio: '',
    client: '',
  });
  let [profileState, setProfileState] = useState('');

  useEffect(() => {
    props.firebase.storage
      .ref()
      .child(`profile/${props.authUser.uid}_profile`)
      .getDownloadURL()
      .then(profileUrl => {
        setProfileState({ profileUrl });
      });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();

    const tattoo_id =
      props.authUser.uid + '_' + Math.floor(Math.random(7) * 645);

    let storageRef = props.firebase.storage.ref(
      `tattoos/${tattoo_id}`,
    );

    await storageRef.put(imageState.blob).then(temp => {
      storageRef.getDownloadURL().then(url => {
        props.firebase.tattoo(tattoo_id).set(
          {
            uid: props.authUser.uid,
            description: formState.description,
            client: formState.client,
            artist: formState.artist,
            studio: formState.studio,
            img_url: url,
          },
          { merge: true },
        );
      });
    });

    setModalState({
      formVisible: false,
      cropImageVisible: false,
    });
  };

  const { username, styles, description, authUser } = props.authUser;

  return (
    <div className="display-profile--container">
      {modalVisibility.cropImageVisible && (
        <CropImage
          closeModal={() =>
            setModalState({
              cropImageVisible: false,
              formVisible: false,
            })
          }
          closeAndOpen={() =>
            setModalState({
              cropImageVisible: false,
              formVisible: true,
            })
          }
          setBlobAndBase64={(blob, base64) => {
            setImageState({ blob, base64 });
          }}
        />
      )}

      <div className="display-profile--basic-info">
        <h1>
          My Profile{' '}
          <i
            onClick={() => props.setContainerState({ edit: true })}
            class="fas fa-pen"
          />
        </h1>

        <h2>{username && username} </h2>
        <div className="display-profile--styles">
          {styles.length > 0 &&
            styles.map((style, index) => {
              return <div key={index}>{style} / </div>;
            })}
        </div>

        <p>Followers: Unimplimented Yet</p>
        <p>Following: Unimplimented Yet</p>
        <p className="display-profile--favorites">
          <i class="fas fa-heart" /> Favorites tattoos: Unimplimented
          Yet
        </p>
        <p className="display-profile--description">
          {description && description}
        </p>

        <div
          className="display-profile--upload"
          onClick={() =>
            setModalState({
              cropImageVisible: true,
              formVisible: false,
            })
          }
        >
          Upload tattoo +
        </div>
      </div>

      {modalVisibility.formVisible && (
        <div className="display-profile--formVisible-modal">
          <div className="display-profile--formVisible-modal__nav">
            <span
              onClick={() =>
                setModalState({
                  formVisible: false,
                  cropImageVisible: true,
                })
              }
            >
              <i class="fas fa-arrow-left" />
            </span>
            <span
              onClick={() =>
                setModalState({
                  cropImageVisible: false,
                  formVisible: false,
                })
              }
            >
              &#10005;
            </span>
          </div>
          <div className="tattoo-form--img-container">
            <img src={imageState.base64} />
          </div>

          <div className="tattoo-form--container">
            <form onSubmit={event => onSubmit(event, props.authUser)}>
              <div className="tattoo-form--single-row">
                <h3>Style</h3>
                <div className="tattoo-form--styles-container">
                  {tattooStyles.map((style, index) => {
                    return (
                      <div
                        className={
                          activeStyles.includes(style.name)
                            ? 'active'
                            : ''
                        }
                        key={index}
                        onClick={() => {
                          if (activeStyles.includes(style.name)) {
                            let savedStyles = activeStyles.filter(
                              item => item !== style.name,
                            );

                            setStyleState(savedStyles);
                          } else {
                            setStyleState([
                              ...activeStyles,
                              style.name,
                            ]);
                          }
                        }}
                      >
                        <p>{style.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="tattoo-form--single-row">
                <h3>Description</h3>
                <input
                  placeholder="A few words about this tattoo"
                  type="text"
                  value={formState.description}
                  onChange={e =>
                    setFormState({
                      ...formState,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="tattoo-form--column">
                <div className="tattoo-form--row">
                  <h3>Artist</h3>
                  <input
                    placeholder="Add Artist"
                    type="text"
                    value={formState.artist}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        artist: e.target.value,
                      })
                    }
                  />

                  <h3>Client</h3>
                  <input
                    placeholder="Add Client"
                    type="text"
                    value={formState.client}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        client: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="tattoo-form--row">
                  <h3>Studio</h3>
                  <input
                    placeholder="Add Studio"
                    type="text"
                    value={formState.studio}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        studio: e.target.value,
                      })
                    }
                  />

                  <button
                    className="tattoo-form--submit"
                    type="submit"
                    onSubmit={e => onSubmit(e)}
                  >
                    Submit <i className="fas fa-arrow-right" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {profileState.profileUrl !== '' && (
        <div className="display-profile--picture">
          <img
            src={profileState.profileUrl}
            alt="user profile image"
          />
        </div>
      )}
    </div>
  );
};
