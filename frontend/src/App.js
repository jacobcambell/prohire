import Navbar from './components/Navbar';
import ProList from './components/ProList';
import ProDetails from './components/ProDetails';
import Admin from './components/Admin';
import Footer from './components/Footer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/AdminDashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/admin/dashboard">
            <Dashboard></Dashboard>
          </Route>

          <Route path="/">
            <Navbar></Navbar>

            <Route exact path="/">
              <ProList></ProList>
            </Route>
            <Route exact path="/professionals/:slug">
              <ProDetails></ProDetails>
            </Route>
            <Route exact path="/admin">
              <Admin></Admin>
            </Route>

            <Footer></Footer>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
