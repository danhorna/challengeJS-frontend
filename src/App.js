import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import LoggedRoute from './components/guards/LoggedRoute'

import SignUp from './components/routes/signup/SignUp';
import SignIn from './components/routes/signin/SignInPage';
import Home from './components/routes/home/HomePage';
import EditApp from './components/routes/me/EditApp';
import NewApp from './components/routes/me/NewApp';
import SeeApps from './components/routes/apps/AllApps'
import Apps from './components/routes/me/Apps'

function App() {
  return (
      <Router>
        <LoggedRoute component={Home} path="/" exact />
        <Route path="/apps" component={SeeApps} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <LoggedRoute component={Apps} path="/me/apps" />
        <Route path="/me/edit" component={EditApp} />
        <Route path="/me/new" component={NewApp} />
      </Router>
  );
}

export default App;
