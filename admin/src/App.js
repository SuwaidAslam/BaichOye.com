import "./App.css";
import Dashboard from "./Core/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./Core/User Pages/Users";
import Categories from "./Core/Category Pages/Categories";
import Ads from "./Core/Ads Pages/Ads";
import AddCategory from "./Core/Category Pages/AddCategory";
import EditCategory from "./Core/Category Pages/EditCategory";
import User from "./Core/User Pages/User";
import Ad from "./Core/Ads Pages/Ad";
import CategoryProduct from "./Core/Category Pages/CategoryProduct";
import VerificationRequests from "./Core/User Verification Pages/VerificationRequests";
import PaymentApproval from "./Core/Payment Approval Pages/PaymentApproval";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/users" exact component={Users} />
          <Route path="/users/:userId" exact component={User} />
          <Route path="/ads" exact component={Ads} />
          <Route path="/ads/:adId" exact component={Ad} />
          <Route path="/categories" exact component={Categories} />
          <Route path="/categories/add" exact component={AddCategory} />
          <Route
            path="/categories/ads/:categoryId"
            exact
            component={CategoryProduct}
          />
          <Route
            path="/categories/edit/:categoryId"
            exact
            component={EditCategory}
          />
          <Route path="/ads" exact component={Ads} />
          {/* <Route path="/complaints" exact component={Complaints} /> */}
          <Route path="/user-verification" exact component={VerificationRequests} />
          <Route path="/payment-approval" exact component={PaymentApproval} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
