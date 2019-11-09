import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import Plans from '~/pages/Plans';
import Memberships from '~/pages/Memberships';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/memberships" component={Memberships} isPrivate />
    </Switch>
  );
};

export default Routes;
