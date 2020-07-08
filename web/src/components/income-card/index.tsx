import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { parseJSON, format } from 'date-fns';

interface Props {
  income: Geld.Income;
}

const IncomeCard = ({ income }: Props) => {
  const [busy, setBusy] = useState(false);

  return (
    <div className="box">
      <div className="content">
        <p>{income.description}</p>
        <div className="tags">
          <span className="tag is-success">
            R{income.amount.toLocaleString()}
          </span>
          <span className="tag">
            {format(parseJSON(income.date), 'yyyy-MM-dd')}
          </span>
        </div>
        <div className="field is-grouped is-right">
          <p className="control">
            <Link to={`/income/${income.id}/edit`} className="button">
              Edit
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
  );
};

export default IncomeCard;
