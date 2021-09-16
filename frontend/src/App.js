import Navbar from './components/Navbar';
import ProList from './components/ProList';
import ProDetails from './components/ProDetails';
import Admin from './components/Admin';
import Footer from './components/Footer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <ProList></ProList>
          </Route>
          <Route exact path="/professionals/:slug">
            <ProDetails></ProDetails>
          </Route>
          <Route exact path="/admin">
            <Admin></Admin>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
