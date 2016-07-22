var React = require("react");
var ReactRedux = require("react-redux");
var Header = require("./header.jsx");
var actions = require('../actions/actions');
var ptypes = React.PropTypes;

var MainLayout = React.createClass({
	propTypes: {
		// redux store state, imported below
		header:ptypes.object.isRequired,
		getHeaderMenu:ptypes.func.isRequired,
		setHeaderMenu:ptypes.func.isRequired
	},
	getInitialState:function(){
		return{
			ScreenNumber:1
		}
	}, 	
	render:function(){
		var headerFunc = this.props.setHeaderMenu;
		return(

			<div>
				<Header header={this.props.header} setHeaderMenu={this.props.setHeaderMenu} />
				<div className="container-fluid">
					{React.cloneElement(this.props.children, {setHeaderMenu:headerFunc})}
				</div>
			</div>
			)
	}
});

// connect the component to the Redux store:

var mapStateToProps = function(state){
	console.log("STATE");
	console.log(state);
	return state;
};

var mapDispatchToProps = function(dispatch){
	return {
		getHeaderMenu: function(){ dispatch(actions.getHeaderMenu()); },
		setHeaderMenu: function(nMenu){ dispatch(actions.setHeaderMenu(nMenu)); }
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(MainLayout);

