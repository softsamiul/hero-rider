import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminDashBoardHome from './Pages/AdminDashBoard/AdminDashBoardHome/AdminDashBoardHome';
import NotFound from './Pages/NotFound/NotFound';
import Payment from './Pages/Payment/Payment/Payment';
import ProcedShiping from './Pages/ProcedShiping/ProcedShiping';
import Profile from './Pages/Profile/Profile';
import SignIn from './Pages/SignIn/SignIn';
import SignUpLearner from './Pages/SignUpLearner/SignUpLearner';
import SignUpRider from './Pages/SignUpRider/SignUpRider';
import AuthProvider from './Shared/AuthProdiver/AuthProvider';
import PrivateRoute from './Shared/PrivateRoute/PrivateRoute';
import './Responsive.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <SignIn></SignIn>
            </Route>
            <Route path='/signin'>
              <SignIn></SignIn>
            </Route>
            <Route path='/signuprider'>
              <SignUpRider></SignUpRider>
            </Route>
            <Route path='/signuplearner'>
              <SignUpLearner></SignUpLearner>
            </Route>
            <PrivateRoute path='/profile'>
              <Profile></Profile>
            </PrivateRoute>
            <PrivateRoute path='/procedshiping/:id'>
              <ProcedShiping></ProcedShiping>
            </PrivateRoute>
            <PrivateRoute path='/payment/:id'>
              <Payment></Payment>
            </PrivateRoute>
            <PrivateRoute path='/dashboard'>
              <AdminDashBoardHome></AdminDashBoardHome>
            </PrivateRoute>
            <Route path='*'>
              <NotFound></NotFound>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
