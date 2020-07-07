import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  expense: Geld.Expense;
}

const ExpenseCard = ({ expense }: Props) => {
  let textClass = 'is-primary';

  if (expense.amount > 100 && expense.amount < 1000) {
    textClass = 'is-warning';
  } else if (expense.amount > 1000) {
    textClass = 'is-danger';
  }

  return (
    <Link className="box" to={`/income/${expense.id}`}>
      <div className="content">
        <p>{expense.description}</p>
        <div className="tags">
          <span className={`tag ${textClass}`}>
            R{expense.amount.toLocaleString()}
          </span>
          <span className="tag">{expense.date}</span>
        </div>
      </div>
    </Link>
  );
};

export default ExpenseCard;
