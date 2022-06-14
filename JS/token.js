var tokenapp = "";
var tokenrefresh = "";
var db = "";

//window.location.href = "indexstart.html";

document.addEventListener("deviceready", function(){
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
})

function onSuccessDB(){

  window.FirebasePlugin.getToken(function(token) {
    tokenapp =  token;
    if (tokenapp.length > 50){
      db.transaction(function(tx) {
        tx.executeSql('UPDATE tabcontrol SET control1=? WHERE id=?', [tokenapp, 1], function(tx, result) {
          window.location.href = "indexstart.html";
        }, null);
      });
    }
  });

  window.FirebasePlugin.onTokenRefresh(function(token) {
    tokenrefresh = token;
    if(tokenrefresh.length > 50){
      db.transaction(function(tx) {
        tx.executeSql('UPDATE tabcontrol SET control1=? WHERE id=?', [tokenrefresh, 1], function(tx, result) {
          window.location.href = "indexstart.html";
        }, null);
      });
    }
  });

  window.FirebasePlugin.onNotificationOpen(function(notification) {
    console.log("The notification is open!  " + JSON.stringify(notification));
  });

}
