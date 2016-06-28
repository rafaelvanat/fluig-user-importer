var DATASET_API = {
		async:true,
		async: function(_async){
			if(_async != undefined){
				this.async = _async;
				return this;
			}
			else{
				return this.async;
			}
		},
		
		datasetCall: function (datasetData, successCallback, failureCallback, parameterCallback) {
			var _this = this;
			var dataset = "";
	    	if(datasetData){
		    	var _this = this;
		    	var tasks;
		    	$.ajax({
					url: '/api/public/ecm/dataset/datasets',
					dataType: 'json',
					contentType: 'application/json',
					type: "POST",
					async: _this.async,
		            data: JSON.stringify(datasetData),
		            success:function(data, status, xhr){
		            	dataset = data.content;
		            	(successCallback) ? 
		            			successCallback(data, status, xhr, parameterCallback) : console.log("success");},
					fail: function(xhr, status, error){
						dataset = xhr;
						(failCallback) ?
								failCallback(xhr, status, error, parameterCallback) :  console.error("failure");}
		    	});
	    	}
	    	return dataset;
	    },
		
		_DatasetVO: function(){
			this.name = "";
			this.fields = [""];
			this.constraints = [];//ConstraintVO
			this.order = [""];
			
			this.name = function(_name){
				if(_name){
					this.name = _name;
					return this;
				}
				else{
					return this.name;
				}
			}
			this.fields = function(_fields){
				if(_fields){
					this.fields = _fields;
					return this;
				}
				else{
					return this.fields;
				}
			}
			this.constraints = function(_constraints){
				if(_constraints){
					this.constraints = _constraints;
					return this;
				}
				else{
					return this.constraints;
				}
			}
			this.order = function(_order){
				if(_order){
					this.order = _order;
					return this;
				}
				else{
					return this.order;
				}
			}
		},
		DatasetVO: function(){
			return new DATASET_API._DatasetVO();
		},
		
		_ConstraintVO: function(){
			this.field = "";
			this.initialValue = "";
			this.finalValue = "";
			this.type = 0;//type of the constraint (0 - MUST, 1 - SHOULD, 2 - MUST_NOT)
			this.likeSearch = false;
			
			this.field = function(_field){
				if(_field){
					this.field = _field;
					return this;
				}
				else{
					return this.field;
				}
			}
			this.initialValue = function(_initialValue){
				if(_initialValue){
					this.initialValue = _initialValue;
					return this;
				}
				else{
					return this.initialValue;
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
			
			this.finalValue = function(_finalValue){
				if(_finalValue){
					this.finalValue = _finalValue;
					return this;
				}
				else{
					return this.finalValue;
				}
			}
			this.type = function(_type){
				if(_type){
					this.type = _type;
					return this;
				}
				else{
					return this.type;
				}
			}
			this.likeSearch = function(_likeSearch){
				if(_likeSearch){
					this.likeSearch = _likeSearch;
					return this;
				}
				else{
					return this.likeSearch;
				}
			}
		},
		ConstraintVO: function(){
			return new DATASET_API._ConstraintVO();
		}
}