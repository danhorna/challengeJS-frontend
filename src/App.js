import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import MeApps from './components/MeApps';
import EditApp from './components/EditApp';

function App() {
  return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/me/apps" component={MeApps} />
        <Route path="/me/edit" component={EditApp} />
      </Router>
  );
}

export default App;
