import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { parseJSON, format } from 'date-fns';

interface Props {
  income: Geld.Income;
  onDelete: () => void;
}

const IncomeCard = ({ income, onDelete }: Props) => {
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
        <div className="buttons are-small">
          {income.attachment && (
            <a
              className="button"
              href={income.attachment}
              target="_blank"
              rel="noreferrer"
            >
              View Attachment
            </a>
          )}
          <Link to={`/income/${income.id}/edit`} className="button">
            Edit
          </Link>
          <button
            className={`button is-danger ${busy && 'is-loading'}`}
            onClick={async () => {
              const del = confirm(`Delete ${income.description}?`);

              if (del) {
                setBusy(true);
                const response = await fetch(`/api/income/${income.id}`, {
                  method: 'DELETE'
                });

                if (response.ok) {
                  setBusy(false);
                  onDelete();
                }
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeCard;
