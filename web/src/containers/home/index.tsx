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

  const taxableBackgroundClass =
    taxableIncome <= 0 ? 'has-background-success' : 'has-background-danger';

  return (
    <>
      <Helmet>
        <title>Home | Geld</title>
      </Helmet>
      <div className="section">
        <div className="container">
          <h1 className="title">
            Geld
            <Link className="button is-primary is-pulled-right" to="/track">
              Track
            </Link>
          </h1>
          <div className="columns">
            <div className="column">
              <div className={`box ${taxableBackgroundClass}`}>
                <p className="title has-text-white">Taxable</p>
                <p className="subtitle has-text-white">
                  R{taxableIncome.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="column">
              <Link to="/income" className="box">
                <p className="title has-text-primary">Income</p>
                <p className="subtitle has-text-primary">
                  R{totalIncome.toLocaleString()}
                </p>
              </Link>
            </div>
            <div className="column">
              <Link to="/expenses" className="box">
                <p className="title has-text-primary">Expenses</p>
                <p className="subtitle has-text-primary">
                  R{totalExpenses.toLocaleString()}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
