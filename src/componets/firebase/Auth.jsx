import { useState, useRef } from "react";
import firebase from "./firebase";
import "../../custom.css";
const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const recaptchaRef = useRef(null);

  const handleSendOtp = () => {
    if (!phoneNumber) {
      alert("Please enter a phone number!");
      return;
    }

    recaptchaRef.current.innerHTML = '<div id="recaptcha-container"></div>';
    const verifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, verifier)
      .then(confirmationResult => {
        setVerificationId(confirmationResult.verificationId);
        setIsOtpSent(true);
        alert("OTP sent to your phone!");
      })
      .catch(error => {
        console.error("Error sending OTP:", error);
      });
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      alert("Please enter the OTP!");
      return;
    }

    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        alert("Phone number verified successfully!");
      })
      .catch(error => {
        console.error("Error verifying OTP:", error);
        alert("Invalid OTP!");
      });
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>Phone Authentication</h2>
        <div ref={recaptchaRef}></div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="+91XXXXXXXXXX"
            required
          />
          <button onClick={handleSendOtp} className="btn">
            Send OTP
          </button>
        </div>

        {isOtpSent && (
          <div className="form-group">
            <label>Enter OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
            <button onClick={handleVerifyOtp} className="btn">
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
