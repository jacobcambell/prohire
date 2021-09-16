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
          <Route exact path="/admin/dashboard">
            <Dashboard></Dashboard>
          </Route>
        </Switch>

        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
