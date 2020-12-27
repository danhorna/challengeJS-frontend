import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import LoggedRoute from './components/guards/LoggedRoute'
import NotLoggedRoute from './components/guards/NotLoggedRoute'

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
        <LoggedRoute path="/apps" component={SeeApps} />
        <NotLoggedRoute path="/signup" component={SignUp} />
        <NotLoggedRoute path="/signin" component={SignIn} />
        <LoggedRoute component={Apps} path="/me/apps" />
        <LoggedRoute path="/me/edit" component={EditApp} />
        <LoggedRoute path="/me/new" component={NewApp} />
      </Router>
  );
}

export default App;
