var React = require("react");
var render= require("react-dom");
var $ = require("jquery");
var Link = require('react-router').Link;
var ptypes = React.PropTypes;

var Header = React.createClass({
	propTypes: {
		header: ptypes.object.isRequired,
		setHeaderMenu: ptypes.func.isRequired
	},
	getInitialState:function(){
		return{
			i:1
		}
	},
	onClick:function(num){
		this.setState({i:num});
		this.props.onChangeView(num)
	},
	componentDidMount: function(){
		$("#ancJobs").focus();
		$("#ancJobs").css("outline", "none");
		console.log("::::::", this.props);
	},
	setMenu:function(){
		this.props.setHeaderMenu(3);
	},
	render:function(){
		var navClass1 = "";
		var navClass2 = "";
		var navClass3 = "";
		var navClass4 = "";
		switch(this.props.header.menu) {
			case 1:
				navClass1 = "active font-bold";
				break;
			case 2:
				navClass2 = "active font-bold";
				break;
			case 3:
			case 5:
				navClass3 = "dropdown active font-bold";
				break;
			case 4:
				navClass4 = "active font-bold";
				break

		}
		return(
			<nav className="navbar navbar-default">
				<div className="navbar-header">
				</div>
				<ul className = "nav navbar-nav navbar-right" role="navigation">
					<li className="hoverDisable"><Link to={/billing}>Billing</Link></li>
				</ul>
			</nav>
		)
	}
});
module.exports=Header;
