import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSetRecoilState } from 'recoil';
import OtpInput from 'react-otp-input';

// state
import authAtom from '../../state/auth';

import styles from './styles.scss';

const Login = () => {
  const [requested, setRequested] = useState(false);
  const [authing, setAuthing] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const setAuthState = useSetRecoilState(authAtom);

  useEffect(() => {
    if (!requested) {
      fetch('/api/otp').then((r) => setRequested(r.ok));
    }
  }, [requested, setRequested]);

  return (
    <>
      <Helmet>
        <title>Login | Geld</title>
      </Helmet>
      <div className="section">
        <div className="container">
          <h1 className="title has-text-centered">Login</h1>
          {error && <div className="notification is-danger">{error}</div>}
          {authing && <progress className="progress is-primary" max="100" />}
          <div className="field">
            <OtpInput
              value={value}
              numInput={4}
              containerStyle={styles.otp}
              inputStyle="input"
              isInputNum
              onChange={async (otp: string) => {
                setValue(otp);
                try {
                  if (otp.length === 4) {
                    setAuthing(true);
                    const response = await fetch('/api/otp', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ token: otp })
                    });
                    const { data } = await response.json();

                    if (response.ok) {
                      setAuthState(data as boolean);
                    } else {
                      setError('Invalid OTP.');
                    }

                    setAuthing(false);
                  }
                } catch (ex) {
                  setError('Unable to send OTP.');
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
