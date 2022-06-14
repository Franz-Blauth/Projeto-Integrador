document.addEventListener("deviceready", onDeviceReady, false);

var table = document.getElementById('tbody-register');
var rowscontrol = [];
var invitedrows = [];
var uniqidevent = "";
var tr = "";
var i = 0;
var eraseok = "S";
var deleteOK = 0;
var db = null;
var localphoto = "";

function onDeviceReady(){
  localphoto = cordova.file.dataDirectory;
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM tabcontrol', [], function(tx, result) {
      rowscontrol = result.rows;
      uniqidevent = rowscontrol.item(0).control2;
      showInvited(uniqidevent);
    }, null);
  });
}

function showInvited(uniqidevent){
  var valiconup   = "far fa-check-circle";
  var valicondown = "far fa-times-circle";
  db.transaction(function(tx) {
  tx.executeSql('SELECT * FROM invited WHERE uniqidevent=? ORDER BY invitedname ASC' , [uniqidevent], function(tx, result) {
    invitedrows = result.rows;
    for (var i = 0; i < invitedrows.length; i++) {
      tr += '<tr>';
      tr += '<td>' + ( i + 1) + '</td>';
      if (invitedrows.item(i).dateconfirmation != null && invitedrows.item(i).dateconfirmation != ""){
        tr += '<td style="color:#0da205;">' + '<i class="' + valiconup   + '"></i>' + '</td>';
      }else{
        tr += '<td style="color:#ff8C00;">' + '<i class="' + valicondown + '"></i>' + '</td>';
      }
      tr += '<td style="font-variant:small-caps; font-size:80%">' + invitedrows.item(i).invitedname.substring(0,25) + '</td>';
      if(invitedrows.item(i).useridinvited == "1"){
        tr += '<td onClick="bigPhotoNO(' + i + ')" >' +'<img class="imginvited" src="' + "1.jpg" + '"></td>';
      }else{
        tr += '<td onClick="bigPhoto(' + i + ')" >' +'<img class="imginvited" src="' + localphoto + invitedrows.item(i).useridinvited + ".jpg" + '"></td>';
      }
      tr += '</tr>';
      tr += '<td colspan="4"><hr>';
    }
    table.innerHTML = tr;
    })
  })
}

function photoprofile_small(){
  document.getElementById("photoprofile_big").style.visibility = "hidden";
}

function bigPhotoNO(i){
  document.getElementById("photoprofile_big").src = "1.jpg" ;
  document.getElementById("photoprofile_big").style.visibility = "visible";
}

function bigPhoto(i){
  document.getElementById("photoprofile_big").src = localphoto + invitedrows.item(i).useridinvited + ".jpg" ;
  document.getElementById("photoprofile_big").style.visibility = "visible";
}
