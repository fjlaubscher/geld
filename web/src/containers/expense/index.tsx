import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';

// state
import { expenseByIdState } from '../../state/expense';

const Income = () => {
  const { id } = useParams();
  const expense = useRecoilValue(expenseByIdState(id));

  return (
    <>
      <Helmet>
        <title>{expense.description} | Expense | Geld</title>
      </Helmet>
      <div className="section">
        <div className="container">
          <h1 className="title">{expense.description}</h1>
          <h2 className="subtitle">R{expense.amount}</h2>
        </div>
      </div>
    </>
  );
};

export default Income;
