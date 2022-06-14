document.addEventListener("deviceready", onDeviceReady, false);

var table = document.getElementById('tbody-register');
var rowscontrol  = [];
var rows  = [];
var tr = "";
var oldidevent = 0;
var existactivity = "";
var db = null;

function onDeviceReady() {
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM iactivity ORDER BY nameactivity ASC', [], function(tx, result) {
      rows = result.rows;
      checkControl();
    }, null);
  });
}

function checkControl(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM tabcontrol', [], function(tx, result) {
      rowscontrol = result.rows;
      if (rowscontrol.item(0).control4 != ""){
        for (i = 0; i < rows.length; i++){
          if (rows.item(i).urlicon == rowscontrol.item(0).control4){
            existactivity = i;
            showEvents();
          }
        }
      }
      else{
        existactivity = 0;
        showEvents();
      }
    }, null);
  });
}

function showEvents() {
  for (var i = 0; i < rows.length; i++) {
    tr += '<tr>';
    tr += '<td onClick="returnEvent(' + i + ')" style="font-variant: small-caps;">' + '<img class="tableicon" src="' + rows.item(i).urlicon + '">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + rows.item(i).nameactivity + '</td>';
    tr += '<td>' + '&nbsp';
    tr += '<tr>';
    tr += '<td colspan="3">';
    tr += '<hr>';
    tr += '</td>';
    tr += '</tr>';
  }
  table.innerHTML = tr;
  document.getElementById(existactivity).checked = true;
}

function returnEvent(oldidevent){
  db.transaction(function(tx) {
    tx.executeSql('UPDATE tabcontrol SET control4=? WHERE id=?', [rows.item(oldidevent).urlicon, 1], onSuccessUP)
  });
}

function onSuccessUP(){
  window.location.href = "event.html";
}
