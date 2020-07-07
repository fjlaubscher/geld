import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  income: Geld.Income;
}

const IncomeCard = ({ income }: Props) => (
  <Link className="box" to={`/income/${income.id}`}>
    <div className="content">
      <p>{income.description}</p>
      <div className="tags">
        <span className="tag is-success">
          R{income.amount.toLocaleString()}
        </span>
        <span className="tag">{income.date}</span>
      </div>
    </div>
  </Link>
);

export default IncomeCard;
