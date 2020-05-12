function Today() {
  let d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  return year + "" + month + "" + day + "" + hour + "" + min + "" + sec;
}
function SetCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function GetCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return null;
}
function ChooseImage(avatar, callback) {
  let file = avatar.target.files[0];
  let data = new FormData();
  data.append("file", file, file.name);
  //或者转base64
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    callback(e.target.result);
  }
}
module.exports = {
  Today: Today,
  SetCookie: SetCookie,
  GetCookie: GetCookie,
  ChooseImage: ChooseImage,
}