import React from "react";
import {
  IonText,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonSlide,
  IonSlides,
  IonProgressBar,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
  IonIcon,
  IonNote,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonList,
  IonFooter,
  IonGrid,
  IonCol,
  IonRow,
  IonDatetime
} from "@ionic/react";
import CredentialQueries from "../queries/CredentialQueries";
import CredentialManager from "../utilities/CredentialManager";
import "./RegistrationModal.css";

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  allowTouchMove: false
};

const styles = {
  label: {
    fontSize: "0.7em"
  }
};

/**
 * A class component representing the registration wizard as
 * a modal on top of the login component.
 */
class RegistrationModal extends React.Component {
  /**
   * The class constructor for setting up the registration wizard.
   * @param {Object} props Represents an object containing a function
   * callback received from the login view in order to signify whether
   * or not the registration process has been completed.
   */
  constructor(props) {
    super(props);

    this.state = {
      // Progress-defined states
      progress: 0,
      nextLabel: "Next",
      indicativeLabel: "Step 1: Account Type",
      isPrevDisabled: true,
      isNextEnabled: false,

      // User-related states
      role: "",
      name: "",
      dob: "",
      gender: "",
      email: "",
      username: "",
      password: "",
      passwordReentered: "",

      // Credential validation states
      usernameHasValidLength: "danger",
      usernameHasNoSpaces: "danger",
      usernameIsAvailable: "danger",
      passwordHasValidLength: "danger",
      passwordHasCapital: "danger",
      passwordHasSpecial: "danger",
      passwordHasNumber: "danger",

      // Backend-dependent state
      doesUserExist: false
    };

    // On navigation button press functions
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);

    // On step change functions
    this.onStepChange = this.onStepChange.bind(this);
    this.onSubmission = this.onSubmission.bind(this);
    this.checkStepOne = this.checkStepOne.bind(this);
    this.checkStepTwo = this.checkStepTwo.bind(this);
    this.checkStepThree = this.checkStepThree.bind(this);

    // On value change functions
    this.isStepOneComplete = this.isStepOneComplete.bind(this);
    this.isStepTwoComplete = this.isStepTwoComplete.bind(this);
    this.isStepThreeComplete = this.isStepThreeComplete.bind(this);

    // Validation methods
    this.validateEmail = this.validateEmail.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);

    // Get today's date for birthdate picker
    this.getDateToday = this.getDateToday.bind(this);
  }

  /**
   * An event function representing a button click for navigating to
   * the previous slide of the registration process by changing the
   * configuration properties statewise.
   */
  onPrev = () => {
    let newState = {
      progress: this.state.progress - 0.25
    };

    let swiper = document.querySelector(".swiper-container").swiper;
    swiper.slidePrev();

    if (swiper.activeIndex < 1) newState.isPrevDisabled = true;

    // Revert the button text in the penultimate slide
    if (swiper.activeIndex < 3) newState.nextLabel = "Next";

    this.setState(newState, () => {
      this.onStepChange(swiper.activeIndex);
    });
  };

  /**
   * An event function representing a button click for navigating to
   * the next slide of the registration process by changing the
   * configuration properties statewise.
   */
  onNext = () => {
    let newState = {
      progress: this.state.progress + 0.25
    };

    let swiper = document.querySelector(".swiper-container").swiper;
    swiper.slideNext();

    let callback = () => {
      this.onStepChange(swiper.activeIndex);
    };

    if (swiper.activeIndex > 0) newState.isPrevDisabled = false;

    // Change the button text after pressing in the penultimate slide
    if (swiper.activeIndex === 3) newState.nextLabel = "Submit";

    // Complete the registration in the last slide
    if (this.state.nextLabel === "Submit") {
      newState.isNextEnabled = false;
      callback = () => {
        this.onSubmission();
      };
    }

    this.setState(newState, callback);
  };

  /**
   * An event function representing the means of changing the progress
   * label of the current step.
   * @param {Number} level Represents the step of the transitioned slide.
   */
  onStepChange = level => {
    let label;

    switch (level) {
      case 0:
        label = "Step 1: Account Type";
        this.checkStepOne();
        break;
      case 1:
        label = "Step 2: Personal Details";
        this.checkStepTwo();
        break;
      case 2:
        label = "Step 3: Account Creation";
        this.checkStepThree();
        break;
      case 3:
        label = "Summary";
        break;
      default:
        label = "";
        break;
    }

    this.setState({
      indicativeLabel: label
    });
  };

  /**
   * Initiates the registration submission by storing the data
   * in the database.
   */
  onSubmission = () => {
    // Call Database
    let details = this.state;
    CredentialQueries.createUserProfile(`${details.role}s`, {
      name: details.name,
      email: details.email,
      gender: details.gender,
      dob: details.dob
    })
      .then(res => {
        CredentialQueries.createUserCredential({
          user: { ID: res.ID },
          username: details.username,
          password: CredentialManager.EncryptAccesscode(
            details.username,
            details.password
          )
        })
          .then(() => {
            setTimeout(() => {
              this.props.closeAction(true);
            }, 500);
          })
          .catch(err => alert(err));
      })
      .catch(err => alert(err));
  };

  /**
   * Monitors the value changes related to the first step.
   */
  checkStepOne = () => {
    this.setState({
      isNextEnabled: this.state.role !== ""
    });
  };

  /**
   * Monitors the value changes related to the second step.
   */
  checkStepTwo = () => {
    let isNameValid = this.state.name !== "",
      isAddressValid = this.validateEmail(),
      isGenderSelected = this.state.gender !== "",
      isBirthdaySelected = this.state.dob !== "",
      btnNextState =
        isNameValid && isAddressValid && isGenderSelected && isBirthdaySelected;

    this.setState({
      isNextEnabled: btnNextState
    });
  };

  /**
   * Monitors the value changes related to the third step.
   */
  checkStepThree = () => {
    this.checkUsernameByAvailability().then(() => {
      let isUsernameValid = this.validateUsername(),
        isPasswordValid = this.validatePassword(),
        isReentryValid = this.state.password === this.state.passwordReentered,
        btnNextState = isUsernameValid && isPasswordValid && isReentryValid;

      this.setState({
        isNextEnabled: btnNextState
      });
    });
  };

  /**
   * Event function for checking whether or not the first step is validated.
   */
  isStepOneComplete = newState => {
    this.setState(newState, () => {
      this.checkStepOne();
    });
  };

  /**
   * Event function for checking whether or not the second step is validated.
   */
  isStepTwoComplete = newState => {
    this.setState(newState, () => {
      this.checkStepTwo();
    });
  };

  /**
   * Event function for checking whether or not the third step is validated.
   */
  isStepThreeComplete = newState => {
    this.setState(newState, () => {
      this.checkStepThree();
    });
  };

  /**
   * Validates the format of the email address input.
   * @returns {boolean} Validity of email address.
   */
  validateEmail = () => {
    // Source: https://www.w3resource.com/javascript/form/email-validation.php

    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      this.state.email
    );
  };

  /**
   * Validates whether or not a username has already been taken.
   * @returns {Promise} Returns a promise in order to allow the chaining of
   * subsequent operations.
   */
  checkUsernameByAvailability = () => {
    return CredentialQueries.verifyUsername(this.state.username)
      .then(() => this.setState({ doesUserExist: true }))
      .catch(() => this.setState({ doesUserExist: false }));
  };

  /**
   * Validates the format of the username input.
   * @returns {boolean} Validity of username.
   */
  validateUsername = () => {
    let uname = this.state.username;

    let isLengthValid = uname.length >= 6;
    let isNoWhitespace = !/\s/g.test(uname);
    let isAvailable = this.state.doesUserExist;

    let lengthIndicator = isLengthValid ? "success" : "danger";
    let noSpaceIndicator = isNoWhitespace ? "success" : "danger";
    let availableIndicator = isAvailable ? "success" : "danger";

    this.setState({
      usernameHasValidLength: lengthIndicator,
      usernameHasNoSpaces: noSpaceIndicator,
      usernameIsAvailable: availableIndicator
    });

    return isLengthValid && isNoWhitespace && isAvailable;
  };

  /**
   * Validates the format of the password input.
   * @returns {boolean} Validity of password.
   */
  validatePassword = () => {
    // Source: https://www.w3resource.com/javascript/form/password-validation.php
    let pword = this.state.password;

    let upperIndicator = /(?=.*[A-Z])/.test(pword) ? "success" : "danger";
    let numberIndicator = /(?=.*[0-9])/.test(pword) ? "success" : "danger";
    let specialIndicator = /(?=.*[!@#$%^&*])/.test(pword)
      ? "success"
      : "danger";
    let lengthIndicator = /(?=.{8,15})/.test(pword) ? "success" : "danger";

    this.setState({
      passwordHasValidLength: lengthIndicator,
      passwordHasSpecial: specialIndicator,
      passwordHasCapital: upperIndicator,
      passwordHasNumber: numberIndicator
    });

    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
      pword
    );
  };

  /**
   * Provides the format of today's date in order to constrain
   * the datetime picker to today and backwards.
   * @returns {string} Maximum boundary of the datetime picker.
   */
  getDateToday = () => {
    // Source: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"), //January is 0!
      yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  };

  /**
   * Renders the registration view on top of the login view.
   * @returns {Component} The rendered component.
   */
  render = () => {
    return (
      <>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Registration</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => this.props.closeAction(false)}>
                <IonIcon name="close" slot="icon-only"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" scrollY={false}>
          <IonLabel>
            <strong>{this.state.indicativeLabel}</strong>
          </IonLabel>
          <IonProgressBar
            value={this.state.progress}
            buffer={this.state.progress + 0.25}
          />
          <br />
          <IonSlides options={slideOpts}>
            <IonSlide>
              <IonList>
                <IonRadioGroup
                  onIonChange={e =>
                    this.isStepOneComplete({
                      role: e.target.value
                    })
                  }
                >
                  <IonItem>
                    <IonLabel>
                      <strong>Choose your Account Type</strong>
                      <IonText color="danger">*</IonText>
                    </IonLabel>
                  </IonItem>

                  <IonItem lines="none">
                    <IonLabel>Patient</IonLabel>
                    <IonRadio slot="start" value="Patient" />
                  </IonItem>

                  <IonItem lines="none">
                    <IonLabel>Doctor</IonLabel>
                    <IonRadio slot="start" value="Doctor" />
                  </IonItem>
                </IonRadioGroup>
              </IonList>
            </IonSlide>
            <IonSlide>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <strong>Full Name</strong>
                    <IonText color="danger">*</IonText>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonInput
                    placeholder="Enter your name."
                    value={this.state.name}
                    onIonInput={e =>
                      this.isStepTwoComplete({
                        name: e.target.value
                      })
                    }
                  />
                </IonItem>
                <br />
                <IonItem>
                  <IonLabel>
                    <strong>Email Address</strong>
                    <IonText color="danger">*</IonText>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonInput
                    placeholder="Enter your email."
                    value={this.state.email}
                    onIonInput={e =>
                      this.isStepTwoComplete({
                        email: e.target.value
                      })
                    }
                  />
                </IonItem>
                <br />
                <IonItem>
                  <IonLabel>
                    <strong>Gender</strong>
                    <IonText color="danger">*</IonText>
                  </IonLabel>
                </IonItem>
                <IonRadioGroup
                  onIonChange={e =>
                    this.isStepTwoComplete({
                      gender: e.target.value
                    })
                  }
                >
                  <IonRow>
                    <IonCol>
                      <IonItem lines="none">
                        <IonLabel class="radio-label">Male</IonLabel>
                        <IonRadio slot="start" value="Male" />
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem lines="none">
                        <IonLabel>Female</IonLabel>
                        <IonRadio slot="start" value="Female" />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonRadioGroup>
                <br />
                <IonItem>
                  <IonLabel>
                    <strong>Birthdate</strong>
                    <IonText color="danger">*</IonText>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonDatetime
                    placeholder="Select your date of birth."
                    displayFormat="DD MMMM YYYY"
                    pickerFormat="DD MMMM YYYY"
                    max={this.getDateToday()}
                    value={this.state.dob}
                    onIonChange={e =>
                      this.isStepTwoComplete({
                        dob: e.target.value
                      })
                    }
                  />
                </IonItem>
              </IonList>
            </IonSlide>
            <IonSlide>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <strong>Username</strong>
                    <IonText color="danger">*</IonText>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonInput
                    placeholder="Enter your username."
                    onIonChange={e =>
                      this.isStepThreeComplete({
                        username: e.target.value
                      })
                    }
                  />
                </IonItem>
                <IonItem lines="none">
                  <IonGrid>
                    <IonRow>
                      <IonNote style={styles.label}>
                        Your username must contain the following:
                      </IonNote>
                      <br />
                    </IonRow>
                    <IonRow>
                      <IonNote
                        color={this.state.usernameHasValidLength}
                        style={styles.label}
                      >
                        - At least 6 characters.
                      </IonNote>
                      <br />
                    </IonRow>
                    <IonRow>
                      <IonNote
                        color={this.state.usernameHasNoSpaces}
                        style={styles.label}
                      >
                        - No whitespaces.
                      </IonNote>
                      <br />
                    </IonRow>
                    <IonRow>
                      <IonNote
                        color={this.state.usernameIsAvailable}
                        style={styles.label}
                      >
                        - Be available.
                      </IonNote>
                      <br />
                    </IonRow>
                  </IonGrid>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <strong>Password</strong>
                    <IonText color="danger">*</IonText>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonInput
                    type="password"
                    placeholder="Enter your password."
                    onIonChange={e =>
                      this.isStepThreeComplete({
                        password: e.target.value
                      })
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonInput
                    type="password"
                    placeholder="Reenter your password."
                    onIonChange={e =>
                      this.isStepThreeComplete({
                        passwordReentered: e.target.value
                      })
                    }
                  />
                </IonItem>
                <IonItem lines="none">
                  <IonGrid>
                    <IonRow>
                      <IonNote style={styles.label}>
                        Your password must contain the following:
                      </IonNote>
                      <br />
                    </IonRow>
                    <IonRow>
                      <IonNote
                        color={this.state.passwordHasValidLength}
                        style={styles.label}
                      >
                        - Between 8 and 15 characters.
                      </IonNote>
                      <br />
                    </IonRow>
                    <IonRow>
                      <IonNote
                        color={this.state.passwordHasCapital}
                        style={styles.label}
                      >
                        - At least a capital letter.
                      </IonNote>
                      <br />
                    </IonRow>
                    <IonRow>
                      <IonNote
                        color={this.state.passwordHasNumber}
                        style={styles.label}
                      >
                        - At least a number.
                      </IonNote>
                      <br />
                    </IonRow>
                    <IonRow>
                      <IonNote
                        color={this.state.passwordHasSpecial}
                        style={styles.label}
                      >
                        - At least a special character.
                      </IonNote>
                      <br />
                    </IonRow>
                  </IonGrid>
                </IonItem>
              </IonList>
            </IonSlide>
            <IonSlide>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <strong>1. Role Selection</strong>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>Role: </IonLabel>
                  <IonNote slot="end">{this.state.role}</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <strong>2. Personal Details</strong>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>Name: </IonLabel>
                  <IonNote slot="end">{this.state.name}</IonNote>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>Email: </IonLabel>
                  <IonNote slot="end">{this.state.email}</IonNote>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>Gender: </IonLabel>
                  <IonNote slot="end">{this.state.gender}</IonNote>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>Birthdate: </IonLabel>
                  <IonNote slot="end">
                    {new Date(this.state.dob).toLocaleDateString()}
                  </IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <strong>3. Account Creation</strong>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>Username: </IonLabel>
                  <IonNote slot="end">{this.state.username}</IonNote>
                </IonItem>
              </IonList>
            </IonSlide>
          </IonSlides>
        </IonContent>
        <IonFooter className="ion-no-border">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  hidden={this.state.isPrevDisabled}
                  expand="block"
                  shape="round"
                  onClick={this.onPrev}
                >
                  Back
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  disabled={!this.state.isNextEnabled}
                  expand="block"
                  shape="round"
                  onClick={this.onNext}
                >
                  {this.state.nextLabel}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonFooter>
      </>
    );
  };
}

export default ({ closeAction }) => {
  return <RegistrationModal closeAction={closeAction}></RegistrationModal>;
};
