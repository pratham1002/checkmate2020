function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  
  $("#submit").click(function (event) {
      event.preventDefault();
      $("#submit").val('Registering...')
      $("#submit").attr('disabled','disabled');

      const body = {
        "username": `${$("#username").val()}`,
        "password": `${$("#password").val()}`,
        "id_1": `${$("#id_1").val()}`
      };

      $.ajax({
          url: "/register",
          method: 'POST',
          data: body,
          success: function(response){
              const jwt = response["token"] ;
              if (jwt!==null) {
                  alert("Successfuly registered user");
                  setCookie("jwt", jwt, 1);
                  window.location.href = window.location.origin + "/tic-tac-toe"
              }else {
                  alert("Invalid data/username/ids")
              }
          },
          error : function (error) {
              alert("Invalid data/username/ids") ;
          }
        });
      document.getElementById("submit").disable = false ;
      }
  ) ;