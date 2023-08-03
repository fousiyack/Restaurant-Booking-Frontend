import React, { useState } from 'react';

const OtpForm = () => {
  const [otp, setOtp] = useState('');

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const otpArray = otp.split('');
    otpArray[index] = value;
    const newOtp = otpArray.join('');
    setOtp(newOtp);

    if (e.key === 'Backspace' && index > 0) {
      document.querySelector(`.otp__field__${index - 1}`).focus();
    }
    if (index < 5 && /^[0-9]$/.test(value)) {
      document.querySelector(`.otp__field__${index + 1}`).focus();
    }
  };

  return (
    <form className="otp-form" name="otp-form">
      <div className="title">
        <h3>OTP VERIFICATION</h3>
        <p className="info">An otp has been sent to ********k876@gmail.com</p>
        <p className="msg">Please enter OTP to verify</p>
      </div>
      <div className="otp-input-fields">
        {Array.from({ length: 6 }, (_, index) => (
          <input
            type="number"
            className={`otp__digit otp__field__${index}`}
            value={otp[index] || ''}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleInputChange(e, index)}
            key={index}
          />
        ))}
      </div>
      <div className="result">
        <p id="_otp" className={`notok ${otp.length === 6 ? 'ok' : ''}`}>
          {otp}
        </p>
      </div>
    </form>
  );
};

export default OtpForm;
