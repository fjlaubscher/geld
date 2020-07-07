import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// state
import { incomeState, taxableIncomeState } from '../../state/income';
import { expenseState } from '../../state/expense';

const Home = () => {
  const taxableIncome = useRecoilValue(taxableIncomeState);
  const income = useRecoilValue(incomeState);
  const totalIncome = income.reduce(
    (prev, current) => prev + current.amount,
    0
  );
  const expenses = useRecoilValue(expenseState);
  const totalExpenses = expenses.reduce(
    (prev, current) => prev + current.amount,
    0
  );

  return (
    <>
      <Helmet>
        <title>Home | Geld</title>
      </Helmet>
      <div className="section">
        <div className="container">
          <h1 className="title">Taxable</h1>
          <h2
            className={`subtitle ${
              taxableIncome <= 0 ? `has-text-primary` : `has-text-danger`
            }`}
          >
            R{taxableIncome.toLocaleString()}
          </h2>
          <Link
            to="/income"
            className="tile is-vertical notification is-primary"
          >
            <p className="title">Income</p>
            <p className="subtitle">R{totalIncome.toLocaleString()}</p>
          </Link>
          <Link
            to="/expenses"
            className="tile is-vertical notification is-danger"
          >
            <p className="title">Expenses</p>
            <p className="subtitle">R{totalExpenses.toLocaleString()}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
