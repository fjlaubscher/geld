import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';
import ProtectedRoute from './protected-route';

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
          <ProtectedRoute path="/" component={Home} exact />
          <ProtectedRoute path="/track" component={Track} exact />
          <ProtectedRoute path="/income/:id" component={Income} exact />
          <ProtectedRoute path="/income" component={IncomeList} exact />
          <ProtectedRoute path="/expense/:id" component={Expense} exact />
          <ProtectedRoute path="/expenses" component={ExpenseList} exact />
          <Route path="/health" component={Health} exact />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Suspense>
  </>
);

export default App;
