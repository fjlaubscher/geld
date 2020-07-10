import React from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilState } from 'recoil';

// state
import { expenseState } from '../../state/expense';

// components
import ExpenseCard from '../../components/expense-card';

const Expenses = () => {
  const [expenses, setExpenses] = useRecoilState(expenseState);
  const totalExpenses = expenses.reduce(
    (prev, current) => prev + current.amount,
    0
  );

  return (
    <>
      <Helmet>
        <title>Expenses | Geld</title>
      </Helmet>
      <div className="section">
        <div className="container">
          <h1 className="title">Expenses</h1>
          <h2 className="subtitle">R{totalExpenses.toLocaleString()}</h2>
          {expenses.map((e) => (
            <ExpenseCard
              key={`income-${e.id}`}
              expense={e}
              onDelete={() => {
                const filtered = expenses.filter((x) => x.id !== e.id);
                setExpenses(filtered);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Expenses;
