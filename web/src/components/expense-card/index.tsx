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
        <div className="field is-grouped is-right">
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
                  const response = await fetch(`/api/expense/${expense.id}`, {
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

export default ExpenseCard;
