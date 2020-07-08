import React, { useState } from 'react';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';

// state
import { incomeByIdState } from '../../state/income';

const Income = () => {
  const history = useHistory();
  const { id } = useParams();
  const [busy, setBusy] = useState(false);
  const income = useRecoilValue(incomeByIdState(id));

  if (!income) {
    return <Redirect to="/not-found" />;
  }

  return (
    <>
      <Helmet>
        <title>{income.description} | Income | Geld</title>
      </Helmet>
      <div className="section">
        <div className="container">
          <h1 className="title">{income.description}</h1>
          <h2 className="subtitle">{income.date}</h2>
          <div className="field is-grouped">
            <p className="control">
              <Link to={`/income/${income.id}/edit`} className="button">
                Update
              </Link>
            </p>
            <p className="control">
              <button
                className={`button is-danger ${busy && 'is-loading'}`}
                onClick={async () => {
                  setBusy(true);
                  const del = confirm(`Delete ${income.description}?`);

                  if (del) {
                    const response = await fetch(`/api/income/${income.id}`, {
                      method: 'DELETE'
                    });

                    if (response.ok) {
                      setBusy(false);
                      history.push('/income');
                    }
                  }
                }}
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Income;
