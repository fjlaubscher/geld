import React from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilState } from 'recoil';

// state
import { incomeState } from '../../state/income';

// components
import IncomeCard from '../../components/income-card';

const Income = () => {
  const [income, setIncome] = useRecoilState(incomeState);
  const totalIncome = income.reduce(
    (prev, current) => prev + current.amount,
    0
  );

  return (
    <>
      <Helmet>
        <title>Income | Geld</title>
      </Helmet>
      <div className="section">
        <div className="container">
          <h1 className="title">Income</h1>
          <h2 className="subtitle">R{totalIncome.toLocaleString()}</h2>
          {income.map((i) => (
            <IncomeCard
              key={`income-${i.id}`}
              income={i}
              onDelete={() => {
                const filtered = income.filter((x) => x.id !== i.id);
                setIncome(filtered);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Income;
