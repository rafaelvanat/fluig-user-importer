<div id="UserImporter_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="UserImporter.instance({message: 'Hello world'})">

    <!-- <h1>${i18n.getTranslation('hello.example.hello')}</h1> -->

	<div class="row form-group">
		<div class="form-group col-md-12">
	        <label for="fileSelect">${i18n.getTranslation('application.header.file')}</label>
	       	<input type="file" id="fileSelect" data-handle-file />
	        <p class="help-block" id="totalUsers"></p>
	  	</div>
  	</div>
  	<div class="row form-group">
  	  	<div class="form-group col-md-12">
  	  		<button type="button" class="btn btn-danger" data-start-cancel>${i18n.getTranslation('application.header.cancel')}</button>
  			<button type="button" class="btn btn-success" data-start-import>${i18n.getTranslation('application.header.start')}</button>
  		</div>
  	</div>
  	<div class="row form-group">
		<div class="col-md-12">
			<label>${i18n.getTranslation('application.header.log')}</label>
			<ul id="log"></ul>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<div id="userList"></div>
		</div>
	</div>
</div>


<#-- Template do datatable -->
<script type="text/template" class="user_template">
    <tr>
        <td>{{Matricula}}</td>
        <td>{{Nome}}</td>
        <td>{{Sobrenome}}</td>
    </tr>
</script>

<#-- Template quantidade de usuarios -->
<script type="text/template" class="total_users">
	${i18n.getTranslation('application.header.total.user')} {{total}}
</script>