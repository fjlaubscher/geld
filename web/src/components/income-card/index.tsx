import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { parseJSON, format } from 'date-fns';

interface Props {
  income: Geld.Income;
}

const IncomeCard = ({ income }: Props) => {
  const [busy, setBusy] = useState(false);

  const isImage = /\.(png|jpg|gif|svg)/.test(income.attachment);

  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <div
            className="image is-128x128"
            style={{
              backgroundImage: isImage
                ? `url(${income.attachment})`
                : undefined,
              backgroundSize: 'cover',
              borderRadius: 8,
              backgroundPosition: 'center',
              backgroundColor: '#eee'
            }}
          />
        </div>
        <div className="media-content">
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
              {income.attachment && (
                <p className="control">
                  <a
                    className="button"
                    href={income.attachment}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Attachment
                  </a>
                </p>
              )}
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
      </article>
    </div>
  );
};

export default IncomeCard;
