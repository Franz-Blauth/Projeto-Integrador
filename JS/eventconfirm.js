var invitedrows   = [];
var rowsinvited   = [];
var rowscontrol   = [];
var invitedJS     = [];
var myObj         = [];
var useruniqid    = "";
var usernickname  = "";
var namephoto     = "";
var userideventDB = "";
var obj           = "";
var yesorno       = "";
var db            = null;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){
  document.addEventListener("backbutton", function() {}, false);
  regid();
}

function regid() {
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM users WHERE id=?', [1], function(tx, results){
      usersrows    = results.rows;
      useruniqid   = usersrows.item(0).uniqid;
      usernickname = usersrows.item(0).nickname;
      checkControl();
    }, null);
  });
}

function checkControl(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM tabcontrol', [], function(tx, result) {
      rowscontrol = result.rows;
      countInvited();
    }, null);
  });
}

function photoprofile_big(){
  document.getElementById("photoprofile_big").style.visibility = "visible";
}

function photoprofile_small(){
  document.getElementById("photoprofile_big").style.visibility = "hidden";
}

function countInvited() {

  uniqidevent = rowscontrol.item(0).control2;

  var confirm_yes = 0;
  var confirm_no  = 0;

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM invited WHERE uniqidevent=?' , [uniqidevent], function(tx, result) {
      rowsinvited = result.rows;

      for (i = 0; i < rowsinvited.length; i++){
          if (rowsinvited.item(i).dateconfirmation != "" && rowsinvited.item(i).dateconfirmation != null){
              confirm_yes = confirm_yes + 1;
          }else{
              confirm_no = confirm_no + 1;
          }
      }

      document.getElementById('numok').value = confirm_yes;
      document.getElementById('numno').value = confirm_no;
      document.getElementById('numinvited').value = (confirm_yes + confirm_no);

      displayFields(uniqidevent);

    }, null);
 });
}

function displayFields(uniqidevent) {

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM event WHERE uniqid=?', [uniqidevent], function(tx, results) {
      rows = results.rows;
      document.getElementById('name').value             = rows.item(0).name;
      document.getElementById('datestart').value        = rows.item(0).datestart;
      document.getElementById('timestart').value        = rows.item(0).timestart;
      document.getElementById('datefinish').value       = rows.item(0).datefinish;
      document.getElementById('timefinish').value       = rows.item(0).timefinish;
      document.getElementById('local').value            = rows.item(0).local;
      document.getElementById('info').value             = rows.item(0).info;
      document.getElementById("imgactivity").src        = rows.item(0).activity;
      document.getElementById("usernickname").innerHTML = rows.item(0).usernickname.substring(0,15) + ", convidou!";
      namephoto  = cordova.file.dataDirectory + rows.item(0).userid + ".jpg";
      window.resolveLocalFileSystemURL(namephoto, onSuccess, onFail);
    }, null);
  });
}

function onSuccess(){
// alert("Great! This file exists " + namephoto);
    document.getElementById("photoprofile_big").src = namephoto;
    document.getElementById("photoprofile_big").style.visibility = "hidden";
    document.getElementById("photoprofile").src     = namephoto;
}
//
function onFail() {
// alert('Sorry! File not Found' + namephoto);
  document.getElementById("photoprofile_big").src = "nophoto.png";
  document.getElementById("photoprofile_big").style.visibility = "hidden";
  document.getElementById("photoprofile").src     = "nophoto.png";
}

function callPageStart(){
  window.location.href = "start.html";
}

function callConfirmYES(){
  window.location.href = "inviteyes.html";
}

function callCompletList(){
  window.location.href = "inviteall.html";
}

function callConfirmNO(){
  window.location.href = "inviteno.html";
}


function onOnlineYes() {

  var networkState = navigator.connection.type;
  if(networkState == "none" || networkState == Connection.NONE){
    navigator.notification.alert('É necessário estar online para confirmar participação.', null,'Wolppi','OK');
    window.location.href = "eventconfirm.html";
  }else{
    yesorno = "yes";
    updateDateConfirmDB();
  }
}

function onOnlineNo() {

  var networkState = navigator.connection.type;
  if(networkState == "none" || networkState == Connection.NONE){
    navigator.notification.alert('É necessário estar online para cancelar participação.', null,'Wolppi','OK');
    window.location.href = "eventconfirm.html";
  }else{
    yesorno = "no";
    updateDateConfirmDB();
  }
}

function updateDateConfirmDB(){
  invitedJS = [];
  invitedJS.push({uniqidevent:uniqidevent, useridinvited:useruniqid, yesorno:yesorno});

  obj = JSON.stringify(invitedJS);
  var xmlhttp, x = "";
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(e) {
    if (this.readyState == 4 && this.status == 200) {
       myObj = this.response;
       if (testJSON(myObj)){
           updateinvited(myObj);
       }
    }else{
        conectionCheck(this.readyState, this.status);
        }
  }
  xmlhttp.open("POST", "http://107.21.160.171/wolppi/invitedconfirm.php", true);

  xmlhttp.timeout = 10000;
  xmlhttp.ontimeout = function (e) {
    navigator.notification.alert('Servidor não encontrado!', null,'Wolppi','OK');
    window.location.href = "eventconfirm.html";
  };

  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + obj);
};

function updateinvited(myObj) {

  fileJson = JSON.parse(myObj);

  var dateconfirmation = "";
  var keyevent         = fileJson[0].uniqidevent;
  var keyuser          = fileJson[0].useridinvited;

  if (fileJson[0].yesorno == "yes"){
    var dateconfirmation = new Date();
  };
  db.transaction(function(tx) {
    tx.executeSql('UPDATE invited SET dateconfirmation=? WHERE uniqidevent=? AND useridinvited=?', [dateconfirmation, keyevent, keyuser],function(tx, result) {
       updateEvent(keyevent, yesorno);
    }, null);
  });
}

function updateEvent(keyevent, yesorno){

  if(yesorno == "yes"){
    var numinvited = 20020408;
  }else{
    var numinvited = 0;
  }

  db.transaction(function(tx) {
    tx.executeSql('UPDATE event SET numinvited=? WHERE uniqid=?', [numinvited, keyevent], function(tx, result) {
      if(yesorno == "yes"){
        navigator.notification.alert('Participação Confirmada!', null,'Wolppi','OK');
      }else{
        navigator.notification.alert('Cancelada Participação.', null,'Wolppi','OK');
      }
      window.location.href = "eventconfirm.html";
    }, null);
  });
}

function testJSON(jsonString) {
  try {
    var fileJson = JSON.parse(jsonString);
    if (fileJson && typeof fileJson === "object" && fileJson !== null) return fileJson;
  } catch (e) {}
  return false;
};
