import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/layout';

// lazy loaded containers
const Home = lazy(() => import('./home'));
const Income = lazy(() => import('./income'));
const Expenses = lazy(() => import('./expenses'));
const Health = lazy(() => import('./health'));
const NotFound = lazy(() => import('./not-found'));

const App = () => (
  <Suspense
    fallback={<progress className="progress is-small is-primary" max="100" />}
  >
    <Layout>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/income" component={Income} exact />
        <Route path="/expenses" component={Expenses} exact />
        <Route path="/health" component={Health} exact />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Suspense>
);

export default App;
