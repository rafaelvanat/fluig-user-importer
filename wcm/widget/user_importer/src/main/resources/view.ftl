<div id="UserImporter_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
     data-params="UserImporter.instance({message: 'Hello world'})">

    <!-- efetua a tradução do texto do objeto i18n -->	
    <h1>${i18n.getTranslation('hello.example.hello')}</h1>

    <div id="fileImport_${instanceId}" data-handle-drop>
    	<br/><br/><br/><br/><br/>
    </div>
    
    <input type="file" id="fileSelect" data-handle-file />
</div>