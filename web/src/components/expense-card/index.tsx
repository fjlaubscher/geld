import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, parseJSON } from 'date-fns';

interface Props {
  expense: Geld.Expense;
}

const ExpenseCard = ({ expense }: Props) => {
  const [busy, setBusy] = useState(false);
  let textClass = 'is-primary';

  if (expense.amount > 100 && expense.amount < 1000) {
    textClass = 'is-warning';
  } else if (expense.amount > 1000) {
    textClass = 'is-danger';
  }

  const isImage = /\.(png|jpg|gif|svg)/.test(expense.attachment);

  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <div
            className="image is-128x128"
            style={{
              backgroundImage: isImage
                ? `url(${expense.attachment})`
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
            <p>{expense.description}</p>
            <div className="tags">
              <span className={`tag ${textClass}`}>
                R{expense.amount.toLocaleString()}
              </span>
              <span className="tag">
                {format(parseJSON(expense.date), 'yyyy-MM-dd')}
              </span>
            </div>
            <div className="field is-grouped">
              {expense.attachment && (
                <p className="control">
                  <a
                    className="button"
                    href={expense.attachment}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Attachment
                  </a>
                </p>
              )}
              <p className="control">
                <Link to={`/income/${expense.id}/edit`} className="button">
                  Edit
                </Link>
              </p>
              <p className="control">
                <button
                  className={`button is-danger ${busy && 'is-loading'}`}
                  onClick={async () => {
                    setBusy(true);
                    const del = confirm(`Delete ${expense.description}?`);

                    if (del) {
                      const response = await fetch(
                        `/api/expense/${expense.id}`,
                        {
                          method: 'DELETE'
                        }
                      );

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

export default ExpenseCard;
