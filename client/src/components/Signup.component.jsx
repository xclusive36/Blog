import { useState } from "react";
import { IonButton, IonCardTitle, IonInput } from "@ionic/react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupComponent = () => {
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // the passwordpattern requires at least one number, one lowercase letter, one uppercase letter, and one special character
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // regex pattern for password validation

  // the namepattern only allows letters, no spaces, no numbers, no special characters
  const namePattern = /^[a-zA-Z]+$/; // regex pattern for name validation

  // the emailpattern requires a valid email address
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex pattern for email validation

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const username = form[0].value.trim();
    const email = form[1].value.trim();
    const password = form[2].value.trim();

    // is the password at least 8 characters long?
    if (password.length < 8) {
      // if not, display an alert
      alert("Password must be at least 8 characters long!");
      return;
    }

    // does the password contain at least one number, one lowercase letter, and one uppercase letter, and one special character?
    if (!passwordPattern.test(password)) {
      // if not, display an alert
      alert(
        "Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character!"
      );
      return;
    }

    // does the username contain only letters?
    if (!namePattern.test(username)) {
      // if not, display an alert
      alert("Username must contain only letters!");
      return;
    }

    // does email match a valid email pattern?
    if (!emailPattern.test(email)) {
      // if not, display an alert
      alert("Invalid email address!");
      return;
    }

    // if all is well, attempt to send the data to the server
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { username, email, password },
      });

      // once the mutation is complete, sign the user in
      Auth.login(data.addUser.token);

      // once complete, clear all form fields
      form.reset();
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <IonCardTitle className="header ion-margin-top ion-margin-bottom">
        Signup
      </IonCardTitle>

      {/* If data exists (successful user creation), show success message */}
      {data ? (
        <p>
          Success! You may now head <a href="/">back to the homepage.</a>
        </p>
      ) : (
        <form className="ion-padding" onSubmit={handleFormSubmit}>
          <IonInput
            className="ion-margin-top ion-margin-bottom"
            label="Username"
            name="username"
            labelPlacement="stacked"
            fill="outline"
            placeholder="Username"
            mode="md"
            onBlur={(event) => setUserName(event.target.value)}
          />

          {username && !namePattern.test(username) && (
            <p className="help is-danger">This username is invalid</p>
          )}

          <IonInput
            className="ion-margin-top ion-margin-bottom"
            label="Email Address"
            name="email"
            labelPlacement="stacked"
            fill="outline"
            placeholder="Email Address"
            mode="md"
            onBlur={(event) => setEmail(event.target.value)}
          />

          {email && !emailPattern.test(email) && (
            <p className="help is-danger">This email is invalid</p>
          )}

          <IonInput
            className="ion-margin-top ion-margin-bottom"
            label="Password"
            name="password"
            labelPlacement="stacked"
            fill="outline"
            placeholder="Password"
            type="password"
            mode="md"
            onBlur={(event) => setPassword(event.target.value)}
          />

          {password && !passwordPattern.test(password) && (
            <>
              <p className="help is-danger">This password is invalid</p>
              <p className="help">
                Password must contain at least one number, one lowercase letter,
                one uppercase letter, and one special character!
              </p>
            </>
          )}

          <p className="ion-text-center">
            By Signing up, you agree to our&nbsp;
            <a href="/terms">Terms of Use</a>
            &nbsp;and&nbsp;
            <a href="/privacy">Privacy Policy</a>.
          </p>
          <IonButton expand="block" type="submit">
            Signup
          </IonButton>
        </form>
      )}
      {error && <p className="help is-danger">{error.message}</p>}
    </>
  );
};

export default SignupComponent;
