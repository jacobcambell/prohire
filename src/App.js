import './App.css';
import Navbar from './components/Navbar';
import ProList from './components/ProList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProDetails from './components/ProDetails';
import Schedule from './components/Schedule';

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
          <Route exact path="/schedule">
            <Schedule></Schedule>
          </Route>
        </Switch>
      </Router>            
    </div>
  );
}

export default App;
