import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';

function App() {
  return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Router>
  );
}

export default App;
