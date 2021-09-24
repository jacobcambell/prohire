import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProList from './components/ProList';
import ProDetails from './components/ProDetails';
import AdminLogin from './components/AdminLogin';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Schedule from './components/Schedule';

function App() {

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
          <Route exact path="/schedule/:id">
            <Navbar></Navbar>
            <Schedule></Schedule>
            <Footer></Footer>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
