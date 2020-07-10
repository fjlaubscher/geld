import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilState } from 'recoil';
import { parseJSON, isAfter, isBefore } from 'date-fns';

// state
import { incomeState } from '../../state/income';
import { expenseState } from '../../state/expense';

// components
import Form from './form';

const sortByDate = (collection: Geld.Income[] | Geld.Expense[]) =>
  collection.sort((a, b) => {
    const aDate = parseJSON(a.date);
    const bDate = parseJSON(b.date);
    if (isBefore(aDate, bDate)) {
      return 1;
    } else if (isAfter(aDate, bDate)) {
      return -1;
    } else {
      return 0;
    }
  });

const Track = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [income, setIncome] = useRecoilState(incomeState);
  const [expenses, setExpenses] = useRecoilState(expenseState);
  return (
    <>
      <Helmet>
        <title>Track | Geld</title>
      </Helmet>
      <div className="section">
        <div className="container">
          <h1 className="title">Track</h1>
          {showMessage && (
            <div className="notification is-success">Tracked.</div>
          )}
          <Form
            onSubmit={(type, tracked) => {
              if (type === 'income') {
                const newIncome = sortByDate([
                  ...income,
                  tracked as Geld.Income
                ]);
                setIncome(newIncome);
              } else {
                const newExpenses = sortByDate([
                  ...expenses,
                  tracked as Geld.Expense
                ]);
                setExpenses(newExpenses);
              }
              setShowMessage(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Track;
