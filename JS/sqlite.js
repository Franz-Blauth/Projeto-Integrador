db = window.sqlitePlugin.openDatabase({name: 'MyDatabase.db', location: 'default'}, onSuccessDB);


window.sqlitePlugin.echoTest(successCallback, errorCallback);
window.sqlitePlugin.selfTest(successCallback, errorCallback);


// Cordova is ready
function onDeviceReady() {
  var db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});
  // ...
}
var database = null;

document.addEventListener("deviceready", function(){
    // Initialize the database after the Cordova is ready.
    initDatabase();
});

function initDatabase() {
  database = window.sqlitePlugin.openDatabase({name: 'sample.db', location: 'default'});
  database.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE SampleTable (name, score)');
  });
}

var db = null;

document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener("deviceready", function(){
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'});
});

var db = null;
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'});
