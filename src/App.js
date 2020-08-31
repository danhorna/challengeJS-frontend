import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import MeApps from './components/MeApps';
import EditApp from './components/EditApp';
import NewApp from './components/NewApp';
import DeleteApp from './components/DeleteApp'
import SeeApps from './components/SeeApps'
import CancelBuy from './components/CancelBuy'

function App() {
  return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/apps" component={SeeApps} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/me/apps" component={MeApps} />
        <Route path="/me/edit" component={EditApp} />
        <Route path="/me/delete" component={DeleteApp} />
        <Route path="/me/new" component={NewApp} />
        <Route path="/me/cancel" component={CancelBuy} />
      </Router>
  );
}

export default App;
