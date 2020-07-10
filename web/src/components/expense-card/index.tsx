import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, parseJSON } from 'date-fns';

interface Props {
  expense: Geld.Expense;
  onDelete: () => void;
}

const ExpenseCard = ({ expense, onDelete }: Props) => {
  const [busy, setBusy] = useState(false);
  let textClass = 'is-primary';

  if (expense.amount > 100 && expense.amount < 1000) {
    textClass = 'is-warning';
  } else if (expense.amount > 1000) {
    textClass = 'is-danger';
  }

  return (
    <div className="box">
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
        <div className="buttons are-small">
          {expense.attachment && (
            <a
              className="button"
              href={expense.attachment}
              target="_blank"
              rel="noreferrer"
            >
              View Attachment
            </a>
          )}
          <Link to={`/income/${expense.id}/edit`} className="button">
            Edit
          </Link>
          <button
            className={`button is-danger ${busy && 'is-loading'}`}
            onClick={async () => {
              const del = confirm(`Delete ${expense.description}?`);

              if (del) {
                setBusy(true);
                const response = await fetch(`/api/expense/${expense.id}`, {
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

export default ExpenseCard;
