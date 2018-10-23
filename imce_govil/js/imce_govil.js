(function($) {

  Drupal.behaviors.imce_govil = {
    attach: function(context) {
      $("#edit-upload").click(function(e) {
        e.preventDefault();
        var mes = "";
        var rep = false;
        $("#edit-imce_filelist .plupload_file_name span").each(function() {
          var newfile = $(this).html();
          var newfile_name = newfile.substr(0, newfile.lastIndexOf('.')) || newfile;
          $("#file-list td.name").each(function() {
            tableobj = $(this);
            var oldfile = tableobj.find("span").html();
            var oldfile_name = oldfile.substr(0, oldfile.lastIndexOf('.')) || oldfile;
            if (oldfile == newfile) {
              rep = true;
              var langcode = $('html').attr('lang');
              var path = $("#navigation-tree .folder.active").attr("title");
              $.ajax({
                url: Drupal.settings.basePath + "imce_file_usage_list",
                type: "post",
                data: { "relpath": path + "/" + oldfile, "langcode": langcode },
                async: false,
                success: function(data) {
                  mes += data;
                }
              });
            }
            else if (oldfile_name == newfile_name){
              if($('#file-list td.name span:contains("'+newfile+'")').length == 0){
                alert(Drupal.t("Note that the current file is different from the file: @filename so the file will not be overwritten", {'@filename': oldfile}));
              }
            }
          });
        });
        if (mes.length > 0) {
          var dialogDiv = $(document.createElement("div"));
          data = '<div class="imce-title">' + Drupal.t("You are about to replace the following files from the following pages (and page versions)") + ":</div>" + mes;
          dialogDiv.html(data);
          dialogDiv.dialog({
            width: "auto",
            buttons: [{
                text: Drupal.t("Confirm"),
                click: function() {
                  $(this).dialog("close");
                  $("#imce-upload-form").submit();
                  $("#edit-imce_filelist .plupload_file_name span").each(function() {
                    var img_name = $(this).html();
                    var path = $("#navigation-tree .folder.active").attr("title");
                    $.ajax({
                      url: Drupal.settings.basePath + "delete_thumb",
                      type: "post",
                      data: { "img_dir": path, "img_name": img_name },
                    });
                  });
                }
              },
              {
                text: Drupal.t("Cancel"),
                click: function() {
                  $(this).dialog("close");
                }
              }
            ]
          });
        } 
        else {
          if(rep){
            if(confirm(Drupal.t('Are you sure you want to replace the files?'))){
              $("#imce-upload-form").submit();
            }
            else{
              return;
            }
          }
          else{
            $("#imce-upload-form").submit();
          }
        }
      });
    }
  };

})(jQuery);