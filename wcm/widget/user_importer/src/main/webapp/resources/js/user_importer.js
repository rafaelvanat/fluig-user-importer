var UserImporter = SuperWidget.extend({
	message: null,
	workbookJson: null,
	
	init: function () {
	    //code
	},
	
	bindings: {
		local: {
			'show-message': ['click_showMessage'],
			'handle-drop': ['drop_handleDrop'],
			'handle-file': ['change_handleFile'],
			'start-import': ['click_startImport']
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
				_this.workbookJson = XLSX.utils.make_json(workbook.Sheets[workbook.SheetNames[0]]);
				
				var template = $('.total_users').html();
				var menuRender = Mustache.render(template, {total: _this.workbookJson.length});
				$("#totalUsers").append(menuRender);
			};
			reader.readAsBinaryString(f);
		}
	},
	
	startImport: function(){
		if(this.workbookJson){
			var userListVO = [];
			var groupListVO = [];
			
			for(var i in this.workbookJson){
				var groups = (this.workbookJson[i][GROUPS]) ? this.workbookJson[i][GROUPS].split(",") : [];
				for(var x in groups){
					groupListVO.push(groups[x]);
				}
				userListVO.push(USER_API.UserVO().login(this.workbookJson[i][LOGIN]).firstName(this.workbookJson[i][FIRST_NAME])
								 .lastName(this.workbookJson[i][LAST_NAME]).password(this.workbookJson[i][PWD])
								 .email(this.workbookJson[i][MAIL]).groups(groups)
								 .fullName(this.workbookJson[i][FIRST_NAME]+" "+this.workbookJson[i][LAST_NAME])
				);
			}
			
			/* create new groups*/
			groupListVO = jQuery.unique(groupListVO);
			this.createGroups(false, groupListVO);
			
			
			/* create users from list*/
			this.createUsers(false, userListVO);
		}
	},
	
	createGroups: function(async,groupListVO){
		this.log("##### CRIANDO GRUPOS #####");
		for(var i in groupListVO){
			var result = GROUP_API.setAsync(async).createGroup(GROUP_API.GroupVO().code(groupListVO[i]).description(groupListVO[i]));
			this.log(result);
		}
	},
	
	createUsers: function(async,userListVO){
		this.log("##### CRIANDO USUÁRIOS #####");
		for(var i in userListVO){
			var result = USER_API.setAsync(false).createUser(userListVO[i]);
			this.log(result);
		}
	},
	
	log: function(msg){
		$('#log').append($('<li>').append(msg));
	},
	
	loadUsers: function(workbookJson){
		var _this = this;
		
		var userList = FLUIGC.datatable('#userList', {
		    dataRequest: workbookJson,
		    renderContent: '.user_template',
		    header: [
		        {'title': '${i18n.getTranslation("import.table.registration")}'},
		        {'title': '${i18n.getTranslation("import.table.name")}'}
		    ],
		    search: {
		        enabled: false
		    },
		    actions: {
		        enabled: false
		    },
		    navButtons: {
		        enabled: false
		    },
		    emptyMessage: '<div class="info">${i18n.getTranslation("application.table.noresults")}</div>',
		    tableStyle: 'table-striped'
		}, function(err, data){
			console.log(data);
		});
	},
	
	sucess: function(data, status, xhr, parameterCallback){
		console.info(data);
	},
	error: function(xhr, status, error, parameterCallback){
		console.error(error);
	}
    
});