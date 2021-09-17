import Navbar from './components/Navbar';
import ProList from './components/ProList';
import ProDetails from './components/ProDetails';
import AdminLogin from './components/AdminLogin';
import Footer from './components/Footer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/Dashboard';
import AdminNav from './components/AdminDashboard/Nav';

function App() {

  let onAdminDashboard = false;

  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path="/admin/dashboard">
            <AdminDashboard></AdminDashboard>
          </Route>

          <Route exact path="/">
            <Navbar></Navbar>
            <ProList></ProList>
            <Footer></Footer>
          </Route>
          <Route exact path="/professionals/:slug">
            <Navbar></Navbar>
            <ProDetails></ProDetails>
            <Footer></Footer>
          </Route>
          <Route exact path="/admin">
            <Navbar></Navbar>
            <AdminLogin></AdminLogin>
            <Footer></Footer>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
