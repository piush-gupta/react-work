var React = require("react");
var ReactDOM = require("react-dom");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var Provider = require('react-redux').Provider;

var MainLayout = require("./components/MainLayout.jsx")
var Billing = require("./components/billing.jsx")

var App = React.createClass({
  render:function(){
	return(
		<Provider>
			<Router history={browserHistory}>
				<Route component={MainLayout}>
					<IndexRoute component={Jobs} />
					<Route path="billing" component={Billing} />
				</Route>
			</Router>
		</Provider>
	)  	
  }  
});
module.exports=App;

ReactDOM.render(<App />, document.getElementById("content"))