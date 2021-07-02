import './App.css';
import './text.css'
import './galaxy.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './pages/login';
import Home from './pages/home';
import Expenses from './pages/expenses';
import IncomeForm from './pages/incomeForm';
import ExpensesForm from './pages/addexpenses';
import ViewIncome from './pages/viewIncome';
import ViewExpenses from './pages/viewExpenses';
import EditIncome from './pages/editIncome';
import EditExpenses from './pages/editExpenses';
import TextPage from './pages/textPage';
import Signin from './pages/signin';
import Galaxy from './pages/galaxy';
import Register from './pages/register';

// https://www.hanselman.com/blog/enabling-websockets-for-socketio-node-apps-on-microsoft-azure

// https://github.com/projectkudu/kudu/wiki/Using-a-custom-web.config-for-Node-apps?WT.mc_id=-blog-scottha

function App() {
  return (
    <Router>
    <div >
      <Switch>
        <Route exact path='/' component={Login} />

        <Route exact path='/register' component={Register} />

          <Route exact path='/home' component={Home} />

          <Route exact path='/expenses' component={Expenses} />

          <Route exact path='/addincome' component={IncomeForm} />

          <Route exact path='/addexpenses' component={ExpensesForm}/>

          <Route exact path='/viewincome/:id' component={ViewIncome} />

          <Route exact path='/viewexpenses/:id' component={ViewExpenses} />

         <Route exact path='/editincome/:id' component={EditIncome} />

         <Route exact path='/editexpenses/:id' component={EditExpenses} />

         <Route exact path='/text' component={TextPage} />

         <Route exact path='/signin' component={Signin} />

         <Route exact path='/galaxy' component={Galaxy} />
      </Switch>
      
      </div>
   </Router>
  );
}

export default App;
