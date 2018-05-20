import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { compose, branch, renderComponent, pure } from 'recompose';

import allCategories from '../../utils/categories';
import Loading from '../Loading';
import NotFound from '../NotFound';

const List = Loadable({
  loader: () => import('./List'),
  loading: Loading,
  delay: 300,
});
const Thread = Loadable({
  loader: () => import('./Thread'),
  loading: Loading,
  delay: 300,
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
