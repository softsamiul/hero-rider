import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route exact path='/home'>
            <Home></Home>
          </Route>
          <Route exact path='/signup'>
            <SignUp></SignUp>
          </Route>
          <Route exact path='/signin'>
            <SignIn></SignIn>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
