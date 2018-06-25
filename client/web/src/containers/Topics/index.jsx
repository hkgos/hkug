import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { compose, branch, renderComponent, pure } from 'recompose';
import { utils } from 'hkug-client-core';

import Loading from '../../components/Loading';
import NotFound from '../NotFound';

const allCategories = utils.categories.default;

const List = Loadable({
  loader: () => import('./List'),
  loading: Loading,
  delay: 500,
});
const Thread = Loadable({
  loader: () => import('./Thread'),
  loading: Loading,
  delay: 500,
});

const Topics = () => (
  <Switch>
    <Route exact path="/topics/:category" component={List} />
    <Route exact path="/topics/:category/:thread" component={Thread} />
    <Route component={NotFound} />
  </Switch>
);

const enhance = compose(
  branch(
    ({ match }) => !allCategories.some(c => c.id === Number(match.params.category)),
    renderComponent(NotFound),
  ),
  pure,
);

export default enhance(Topics);
