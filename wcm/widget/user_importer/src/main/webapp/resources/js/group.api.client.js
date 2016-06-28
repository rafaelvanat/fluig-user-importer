var GROUP_API = {
	async:true,
	setAsync: function(){
		GROUP_API.async = false;
		return GROUP_API;
	},
	
	/** TODO TEST
	 * Add list of user ids to group.
	 * In case of async call, will @return void
	 * If run sync @return the api result   
	 * @param groupUsers (GroupVO)
	 * @param successCallback
	 * @param failureCallback
	 * @param parameterCallback (Custom object that you need)
	 */
	addUsers: function (groupUsers, successCallback, failureCallback, parameterCallback) {
		var _this = this;
		var _url = '/api/public/2.0/groups/addUsers/{groupCode}';
		
		var result = "";
		if(groupUsers){
			result = this._request(
					_url.replace('{groupCode}', groupUsers.groupCode())
					, 'POST'
					, groupUsers.userList()
					, successCallback
					, failureCallback
					, parameterCallback);
		}
		return result;
	},
	
	/**
	 * Verify if group contains user.
	 * In case of async call, will @return void
	 * If run sync @return the api result   
	 * @param groupUser (GroupUserVO)
	 * @param successCallback
	 * @param failureCallback
	 * @param parameterCallback (Custom object that you need)
	 * @expected
	 * 	@return boolean
	 * 
	 * @Example var result = GROUP_API.setAsync(false)
	 * 	.containsUser(GROUP_API.GroupUserVO()
	 * 		.groupCode('analista_financeiro')
	 * 		.genericId('adm'))
	 */
	containsUser: function (groupUser, successCallback, failureCallback, parameterCallback) {
		var _this = this;
		var _url = '/api/public/2.0/groups/containsUser/{groupCode}/{genericId}';
		
		var result = "";
		if(groupUser){
			result = this._request(
					_url.replace('{groupCode}', groupUser.groupCode())
						.replace('{genericId}', groupUser.genericId())
					, 'GET'
					, undefined
					, successCallback
					, failureCallback
					, parameterCallback);
		}
		return result;
	},
	
	/**TODO TEST
	 * Create a new Group.
	 * In case of async call, will @return void
	 * If run sync @return the api result   
	 * @param group (GroupVO)
	 * @param successCallback
	 * @param failureCallback
	 * @param parameterCallback (Custom object that you need)
	 */
	createGroup: function (group, successCallback, failureCallback, parameterCallback) {
		var _this = this;
		var _url = '/api/public/2.0/groups/create';
		
		var result = "";
		if(group){
			result = this._request(
					_url
					, 'POST'
					, group
					, successCallback
					, failureCallback
					, parameterCallback);
		}
		return result;
	},
	
	/**TODO TEST
	 * Find group by user.
	 * In case of async call, will @return void
	 * If run sync @return the api result   
	 * @param groupUser (GroupUserVO)
	 * @param successCallback
	 * @param failureCallback
	 * @param parameterCallback (Custom object that you need)
	 */
	findGroupsByUser: function (groupUser, successCallback, failureCallback, parameterCallback) {
		var _this = this;
		var _url = '/api/public/2.0/groups/findGroupsByUser/{genericId}?pattern={pattern}';
		
		var result = "";
		if(groupUser){
			result = this._request(
					_url.replace('{genericId}', groupUser.genericId())
						.replace('{pattern}', groupUser.pattern)
					, 'GET'
					, undefined
					, successCallback
					, failureCallback
					, parameterCallback);
		}
		return result;
	},
	
	/**
	 * Find groups using filter
	 * In case of async call, will @return void
	 * If run sync @return the api result   
	 * @param filter (FilterVO)
	 * @param successCallback
	 * @param failureCallback
	 * @param parameterCallback (Custom object that you need)
	 * @expected
	 * 	@return [Object]
	 * @Example var result = GROUP_API.setAsync(false)
	 * 	.findUsingFilter(GROUP_API.FilterVO()
	 * 		.limit(10).pattern('_'))
	 */
	findUsingFilter: function (filter, successCallback, failureCallback, parameterCallback) {
		var _this = this;
		var _url = '/api/public/wcm/group/findUsingFilter';
		
		var result = "";
		if(filter){
			for(var i in filter){
				if(typeof filter[i] != 'function'){
					_url += '&' + i + '=' + filter[i];
				}
			}
			_url = _url.replace('&', '?');
			
			result = this._request(
					_url
					, 'GET'
					, undefined
					, successCallback
					, failureCallback
					, parameterCallback);
		}
		return result;
	},
	
	/**
	 * Get a list of all groups of current tenant
	 * In case of async call, will @return void
	 * If run sync @return the api result   
	 * @deprecated 
	 * 	@param filter (FilterVO) - Verified that the filter was removed from the API implementation
	 * @param successCallback
	 * @param failureCallback
	 * @param parameterCallback (Custom object that you need)
	 * @expected
	 * 	@return [String] 
	 * 
	 * @Example var result = GROUP_API.setAsync(false).getGroups()
	 */
	getGroups: function (successCallback, failureCallback, parameterCallback) {
		var _this = this;
		var _url = '/api/public/wcm/group';
		
		var result = this._request(
				_url
				, 'GET'
				, undefined
				, successCallback
				, failureCallback
				, parameterCallback);
		return result;
	},
	
	/**
	 * Internal method.
	 * Execute a generic ajax call, setting approprieted parameters and headers
	 * In case of async call, will @return void
	 * If run sync @return the api result   
	 * @param _url (String)
	 * @param _method (String)
	 * @param _data (Object)
	 * @param successCallback
	 * @param failureCallback
	 * @param parameterCallback (Custom object that you need)
	 */
	_request: function(_url, _method, _data, successCallback, failCallback, parameterCallback){
		var _this = this;
		var result = '';
		$.ajax({
			url: _url,
			dataType: 'json',
			contentType: 'application/json',
			type: _method,
			async: _this.async,
			data: JSON.stringify(_data),
			success:function(data, status, xhr){
				result = (data.content) ? data.content : data;
				(successCallback) ? 
						successCallback(data, status, xhr, parameterCallback) : console.log("success");},
			fail: function(xhr, status, error){
				result = xhr;
				(failCallback) ?
						failCallback(xhr, status, error, parameterCallback) :  console.error("failure");}
		});
		return result;
	},

	_GroupVO: function(){
		var code = "";
		var description = "";
		var isInternal = false;
		var userList = [];
		
		this.code = function(_code){
			if(_code){
				code = _code;
				return this;
			}
			else{
				return code;
			}
		}		
		this.description = function(_description){
			if(_description){
				description = _description;
				return this;
			}
			else{
				return description;
			}
		}
		this.isInternal = function(_isInternal){
			if(_isInternal){
				isInternal = _isInternal;
				return this;
			}
			else{
				return isInternal;
			}
		}
		this.userList = function(_userList){
			if(_userList){
				userList = _userList;
				return this;
			}
			else{
				return userList;
			}
		}
	},
	GroupVO: function(){
		return new GROUP_API._GroupVO();
	},
	
	_GroupUserVO: function(){
		var groupCode = '';
		var genericId = '';
		var pattern = '';
		
		this.groupCode = function(_groupCode){
			if(_groupCode){
				groupCode = _groupCode;
				return this;
			}
			else{
				return groupCode;
			}
		}
		this.genericId = function(_genericId){
			if(_genericId){
				genericId = _genericId;
				return this;
			}
			else{
				return genericId;
			}
		}
		this.pattern = function(_pattern){
			if(_pattern){
				pattern = _pattern;
				return this;
			}
			else{
				return pattern;
			}
		}
	},
	GroupUserVO: function(){
		return new GROUP_API._GroupUserVO();
	},
	
	
	_FilterVO: function(){
		var orderby = '';
		var limit = 10;
		var offset = 10;
		var pattern = '';
		
		this.orderby = function(_orderby){
			if(_orderby){
				orderby = _orderby;
				return this;
			}
			else{
				return orderby;
			}
		}
		this.limit = function(_limit){
			if(_limit){
				limit = _limit;
				return this;
			}
			else{
				return limit;
			}
		}
		this.offset = function(_offset){
			if(_offset){
				offset = _offset;
				return this;
			}
			else{
				return offset;
			}
		}
		this.pattern = function(_pattern){
			if(_pattern){
				pattern = _pattern;
				return this;
			}
			else{
				return pattern;
			}
		}
	},
	FilterVO: function(){
		return new GROUP_API._FilterVO();
	}
}