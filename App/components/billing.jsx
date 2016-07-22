var React = require("react");
var render= require("react-dom")
var $ = require("jquery")

var Billing = React.createClass({
	getInitialState:function(){
		return{
			discounted_value: null,
			item_price: null,
			item_category: '',
			user_role: ''
		}
	},
	onSubmit:function(){

	},
	setValues:function(e){
		console.log('item_price = ', this.state.item_price)
		switch(e.target.id){
			case 'item_category':
				this.setState({item_category: e.target.value});
				break;
			case 'user_role':
				this.setState({user_role: e.target.value});
		}

	},
	calculateDiscount:function(){
		if(this.state.user_role != ''){
			switch(this.state.user_role){
				case 'employee':
					var value = this.state.item_price * 0.7
					this.setState({discounted_value: value.toFixed(3)});
					break;
				case 'member':
					var value = this.state.item_price * 0.9
					this.setState({discounted_value: value.toFixed(3)});
					break;
			}
		}else if(this.state.item_category == 'grocery'){
			var value = this.state.item_price * 0.95
			this.setState({discounted_value: value.toFixed(3)});
		}else{
			this.setState({discounted_value: this.state.item_price});
		}
	},
	setItemPrice:function(){
		var val = $('#item_price').val();
		console.log('value is '+val)
		this.setState({item_price: val})
	},
	render:function(){
		return(
			<div>
				<h3>Billing Dashboard</h3>
				<form>
					<div>
						<div className='col-sm-2'>
							<lable>item name</lable>
						</div>
						<div className='col-sm-10'>
							<input type='text' id='item_name'/>
						</div>
					</div>
					<div>
						<div className='col-sm-2'>
							<lable>item price</lable>
						</div>
						<div className='col-sm-10'>
							<input type='input' id='item_price' onBlur={this.setItemPrice}/>
						</div>
					</div>
					<div>
						<div className='col-sm-2'>
							<lable>item category</lable>
						</div>
						<div className='col-sm-10'>
							<select id='item_category' onChange={this.setValues}>
								<option value="">Select Item Type</option>
								<option value='grocery'>Grocery</option>
								<option value='health'>Health</option>
								<option value='Home'>Home Decor</option>
								<option value='entertainment'>Entertainment</option>
							</select>
						</div>
					</div>
					<div>
						<div className='col-sm-2'>
							<lable>User Role</lable>
						</div>
						<div className='col-sm-10'>
							<select id='user_role' onChange={this.setValues}>
								<option value="">Select User Type</option>
								<option value='employee'>Employee</option>
								<option value='member'>Member</option>
								<option value=''>Other</option>
							</select>
						</div>
					</div>
					<div>
						<div className='col-sm-2'>
							<lable>Discounted price</lable>
						</div>
						<div className='col-sm-10'>
							<input type='input' id='dis_price' value={this.state.discounted_value}/>
						</div>
					</div>
					<div>
						<div className='col-sm-4'>
							<input type='button' onClick={this.calculateDiscount} value='Calculate Discount' />
						</div>
					</div>
				</form>
			</div>	
		)
	}
});

module.exports=Billing;
