var UserImporter = SuperWidget.extend({
	message: null,
	
	init: function () {
	    //code
	},
	
	bindings: {
		local: {
			'show-message': ['click_showMessage'],
			'handle-drop': ['drop_handleDrop'],
			'handle-file': ['change_handleFile']
		}
	},
	
	showMessage: function () {
		$div = $('#helloMessage_' + this.instanceId);
		$message = $('<div>').addClass('message').append(this.message);
		$div.append($message);
	},
    
	/* set up drag-and-drop event */
	handleDrop: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this.handleFile(e);
	},
    
	handleFile: function(e) {
		var _this = this;
		var files = (e.target == undefined) ? e.files : e.target.files;
		var i,f;
		for (i = 0, f = files[i]; i != files.length; ++i) {
			var reader = new FileReader();
			var name = f.name;
			reader.onload = function(e) {
				var data = e.target.result;
				
				var workbook = XLSX.read(data, {type: 'binary'});
				var workbookJson = XLSX.utils.make_json(workbook.Sheets[workbook.SheetNames[0]]);
				var users = [];
				for(var i in workbookJson){
					users.push(DATASET_API.ConstraintVO().field('user').initialValue(workbookJson[i]));
				}
				DATASET_API.async(false).datasetCall(
						DATASET_API.DatasetVO().name('importer_user').constraints(users)
						, _this.sucess, _this.error);
				/* DO SOMETHING WITH workbook HERE */
			};
			reader.readAsBinaryString(f);
		}
	},
	
	sucess: function(data, status, xhr, parameterCallback){
		console.info(data);
	},
	error: function(xhr, status, error, parameterCallback){
		console.error(error);
	}
    
});