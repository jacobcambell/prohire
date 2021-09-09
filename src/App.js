import './App.css';
import Navbar from './components/Navbar';
import ProList from './components/ProList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProDetails from './components/ProDetails';

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
        </Switch>
      </Router>            
    </div>
  );
}

export default App;
