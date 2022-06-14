function onOnline() {
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://192.168.1.109/json/evuniqid.php", true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert("1  " + xhr.responseText);
      console.log(xhr.responseText);
    } else {
      alert("2 " + xhr.statusText);
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function (e) {
  alert("3" + xhr.statusText);
  console.error(xhr.statusText);
};
xhr.send(null);
}
xmlhttp.onerror = function (e) {
  alert("3" + xmlhttp.statusText);
  console.error(xmlhttp.statusText);
};
// xmlhttp.onerror = function (e) {
//   alert("sou o sincevetui chamando sincenevtdb NO ERRO");
//   window.location.href = "sinceventdb.html";
// };
