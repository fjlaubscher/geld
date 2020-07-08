import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';

// lazy loaded containers
const Home = lazy(() => import('./home'));
const Income = lazy(() => import('./income'));
const IncomeList = lazy(() => import('./income/list'));
const Expense = lazy(() => import('./expense'));
const ExpenseList = lazy(() => import('./expense/list'));
const Health = lazy(() => import('./health'));
const NotFound = lazy(() => import('./not-found'));
const Track = lazy(() => import('./track'));

const App = () => (
  <>
    <Helmet>
      <title>Geld</title>
    </Helmet>
    <Suspense fallback={<progress className="progress is-primary" max="100" />}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/track" component={Track} exact />
          <Route path="/income/:id" component={Income} exact />
          <Route path="/income" component={IncomeList} exact />
          <Route path="/expense/:id" component={Expense} exact />
          <Route path="/expenses" component={ExpenseList} exact />
          <Route path="/health" component={Health} exact />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Suspense>
  </>
);

export default App;
