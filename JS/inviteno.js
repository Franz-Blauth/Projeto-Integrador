var table = document.getElementById('tbody-register');
var rowscontrol = [];
var invitedrows = [];
var uniqidevent = "";
var tr = "";
var i = 0;
var eraseok = "S";
var deleteOK = 0;
var valicon = "";
var db = null;
var localPhoto = "";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  localPhoto = cordova.file.dataDirectory;
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
  valicon = "far fa-times-circle";
  var countrows = 0;
  db.transaction(function(tx) {
  tx.executeSql('SELECT * FROM invited WHERE uniqidevent=? ORDER BY invitedname ASC' , [uniqidevent], function(tx, result) {
    invitedrows = result.rows;
    for(var i = 0; i < invitedrows.length; i++) {
      if(invitedrows.item(i).dateconfirmation == null || invitedrows.item(i).dateconfirmation == ""){
        countrows = countrows + 1;
        tr += '<tr>';
        tr += '<td>' + countrows + '</td>';
        tr += '<td style="color:#ff8C00;">' + '<i class="' + valicon + '"></i>' + '</td>';
        tr += '<td style="font-variant:small-caps; font-size:80%">' + invitedrows.item(i).invitedname.substring(0,25) + '</td>';
        if(invitedrows.item(i).useridinvited == "1"){
          tr += '<td onClick="bigPhotoNO(' + i + ')" >' +'<img class="imginvited" src="' + "1.jpg" + '"></td>';
        }else{
          tr += '<td onClick="bigPhoto(' + i + ')" >' +'<img class="imginvited" src="' + localPhoto + invitedrows.item(i).useridinvited + ".jpg" + '"></td>';
        }
        tr += '</tr>';
        tr += '<td colspan="4"><hr>';
      }
    }
    table.innerHTML = tr;
    })
  })
}

function photoprofile_small(){
  document.getElementById("photoprofile_big").style.visibility = "hidden";
}

function bigPhotoNO(i){
  document.getElementById("photoprofile_big").src = "1.jpg"
  document.getElementById("photoprofile_big").style.visibility = "visible";
}

function bigPhoto(i){
  document.getElementById("photoprofile_big").src = localPhoto + invitedrows.item(i).useridinvited + ".jpg";
  document.getElementById("photoprofile_big").style.visibility = "visible";
}
