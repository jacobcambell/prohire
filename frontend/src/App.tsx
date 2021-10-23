import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProDetails from './pages/ProDetails/ProDetails';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Footer from './components/MainFooter/Footer';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Schedule from './components/Schedule';

import Home from './pages/Home/Home';

function App() {

  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path="/admin/dashboard">
            <AdminDashboard></AdminDashboard>
          </Route>

          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/professionals/:slug">
            <ProDetails></ProDetails>
            <Footer></Footer>
          </Route>
          <Route exact path="/admin">
            <AdminLogin></AdminLogin>
          </Route>
          <Route exact path="/schedule/:id">
            <Schedule></Schedule>
            <Footer></Footer>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
