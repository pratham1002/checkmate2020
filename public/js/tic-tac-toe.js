function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
const token = getCookie("jwt");

if (token===""){
    alert("Please login before accessing the game")
} 
// else {
//     window.onload = $.ajax({
//     url: "/tic",
//     headers: {
//         'Authorization': `Bearer ${token}`,
//     },
//     method: 'POST',
