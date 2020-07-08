import React from 'react';
import { Helmet } from 'react-helmet';

// components
import Form from './form';

const Track = () => (
  <>
    <Helmet>
      <title>Track | Geld</title>
    </Helmet>
    <div className="section">
      <div className="container">
        <h1 className="title">Track</h1>
        <Form />
      </div>
    </div>
  </>
);

export default Track;
