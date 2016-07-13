var USER_API = {
	async:true,
	setAsync: function(_async){
		this.async = _async;
		return this;
	},
	
	createUser: function (userData, successCallback, failCallback, parameterCallback) {
		var _this = this;
		var user = "";
		if(userData){
			var _this = this;
			var tasks;
			$.ajax({
				url: '/api/public/wcm/user/create',
				dataType: 'json',
				contentType: 'application/json',
				type: "POST",
				async: _this.async,
				data: JSON.stringify(userData),
				success:function(data, status, xhr){
					user = data.content;
					(successCallback) ? 
							successCallback(data, status, xhr, parameterCallback) : console.log("success");},
				fail: function(xhr, status, error){
					user = xhr;
					(failCallback) ?
							failCallback(xhr, status, error, parameterCallback) :  console.error("failure");},
				statusCode:{
				    500: function(err) {
				    user = err.responseJSON.message.message;
				     (failCallback) ?
								failCallback(xhr, status, error, parameterCallback) :  console.error("failure");
				    }
				}
			});
		}
		return user;
	},

	_UserVO: function(){
		this.login = "";
		this.firstName = "";
		this.lastName = "";
		this.fullName = "";
		this.password = ""; // User's plain text password
		this.email = "";
		this.roles = []; // User's roles (optional) ["user", "financial"]
		this.groups = []; // User's groups (optional) ["directors", "managers"]
		this.customData = {}; // User's custom data (optional) EX: {"UserProjects" : "VP Fluig"}
		
		this.login = function(_login){
			if(_login){
				this.login = _login;
				return this;
			}
			else{
				return login;
			}
		}		
		this.firstName = function(_firstName){
			if(_firstName){
				this.firstName = _firstName;
				return this;
			}
			else{
				return firstName;
			}
		}
		this.lastName = function(_lastName){
			if(_lastName){
				this.lastName = _lastName;
				return this;
			}
			else{
				return lastName;
			}
		}
		this.fullName = function(_fullName){
			if(_fullName){
				this.fullName = _fullName;
				return this;
			}
			else{
				return fullName;
			}
		}
		this.password = function(_password){
			if(_password){
				this.password = _password;
				return this;
			}
			else{
				return password;
			}
		}
		this.email = function(_email){
			if(_email){
				this.email = _email;
				return this;
			}
			else{
				return email;
			}
		}
		this.roles = function(_roles){
			if(_roles){
				this.roles = _roles;
				return this;
			}
			else{
				return roles;
			}
		}
		this.groups = function(_groups){
			if(_groups){
				this.groups = _groups;
				return this;
			}
			else{
				return groups;
			}
		}
		this.customData = function(_customData){
			if(_customData){
				this.customData = _customData;
				return this;
			}
			else{
				return customData;
			}
		}
	},
	
	UserVO: function(){
		return new USER_API._UserVO();
	}
}