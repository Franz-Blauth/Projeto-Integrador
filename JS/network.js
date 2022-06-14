document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  document.addEventListener("offline", onOffline, false);
    navigator.notification.alert(
    'Você está offline!  Ative Wi-Fi ou Dados Móveis',
    alertCodarea,
    'Wolppi',
    'OK'
    );
  }
}
function alertCodarea() {
 window.location.href = "index.html"
}
