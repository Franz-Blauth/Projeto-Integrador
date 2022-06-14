document.addEventListener("deviceready", onDeviceReady, false);

var db            = null;
var rows          = [];
var rowscontrol   = [];
var idbd          = [];
var rowsinvited   = [];
var eventJS       = [];
var userid        = "";
var usenickname   = "";
var strdate       = "";
var strtime       = "";
var lastid        = "";
var datecreate    = "";
var hourcreate    = "";
var oldactivity   = "";
var chooseprivate = "";
var uniqidevent   = "";
var namephoto     = ""
var checkphoto    = ""
var saveevent     = 0;
var xbf           = "92607691";
var eventid       = 0;
var eraseok       = "S";
var firstactivity = "iconactivity/exclamation.png";

function onDeviceReady() {
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){
  document.getElementById('btn-confirmar').addEventListener('click', checkFields);
  document.addEventListener("backbutton", function() {}, false);
  regid();
}

function regid() {
  document.getElementById("photo_blank").style.visibility = "hidden";
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM users WHERE id=?', [1], function(tx, results){
      idbd = results.rows;
      userid = idbd.item(0).uniqid;
      usernickname = idbd.item(0).nickname;
      checkphoto =  cordova.file.dataDirectory + idbd.item(0).uniqid + ".jpg";
      window.resolveLocalFileSystemURL(checkphoto, onSuccess, onFail);
      checkControl();
    }, null);
  });
}

function checkControl(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM tabcontrol WHERE id=?', [1], function(tx, result) {
      rowscontrol = result.rows;
      countInvited();
    }, null);
  });
}

function photoprofile_big(){
  document.getElementById("photoprofile_big").src = namephoto;
  document.getElementById("photoprofile_big").style.visibility = "visible";
}

function photoprofile_small(){
  document.getElementById("photoprofile_big").style.visibility = "hidden";
}

function countInvited() {

  var confirm_yes = 0;
  var confirm_no  = 0;

  if (rowscontrol.item(0).control2 == "1"){
    var uniqidevent  = rowscontrol.item(0).control1;
  }else{
    var uniqidevent = rowscontrol.item(0).control2;
  };
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM invited WHERE uniqidevent=? AND eraseok<>?', [uniqidevent, eraseok], function(tx, result) {
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

      if (rowscontrol.item(0).control1 != ""){
        saveevent = 1;
        eventid = parseInt(rowscontrol.item(0).control1);
        displayFields(eventid);
      }
      else{
        if (rowscontrol.item(0).control1 == ""){
          if (rowscontrol.item(0).control5 != ""){
            displayFieldsJS(rowscontrol.item(0).control5);
          }else{
            checkphoto = cordova.file.dataDirectory + idbd.item(0).uniqid + ".jpg";
            window.resolveLocalFileSystemURL(checkphoto, onSuccess, onFail);
            if(rowscontrol.item(0).control4 != ""){
              document.getElementById("imgactivity").src = rowscontrol.item(0).control4
            }else{
              document.getElementById("imgactivity").src = firstactivity;
            }
          }
        }
      }
    }, null);
 });
}

function checkFields() {

  if (checkName()) {
    navigator.notification.alert(
      'Digite o Nome do Evento.',
      alertName,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if (checkDstart()) {
    navigator.notification.alert(
      'Digite a Data Início.',
      alertDstart,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if (checkTstart()) {
    navigator.notification.alert(
      'Digite a Hora Início.',
      alertHstart,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if (checkTstart2()) {
    navigator.notification.alert(
      'Hora Início não pode ser menor que a hora atual',
      alertHstart,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if (checkDfinish()) {
    navigator.notification.alert(
      'Data Término não pode menor que a data início',
      alertDfinish,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if (checkTfinish()) {
    navigator.notification.alert(
      'Hora não pode ser nula',
      alertHfinish,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if (checkTfinish2()) {
    navigator.notification.alert(
      'Hora Término não pode ser menor que hora início',
      alertHfinish,
      'Wolppi',
      'OK'
    );
    return true;
  }
  saveEvent();
  document.getElementById("usernickname").innerHTML = "";
}

function checkName() {
  if (document.getElementById('name').value == "") {
    return true;
  } else {
    return false;
  }
}

function checkDstart() {
  if (document.getElementById('datestart').value == "") {
    return true;
  } else {
    return false;
  }
}

function checkTstart() {
  if (document.getElementById('timestart').value == "") {
    return true;
  } else {
    return false;
  }
}

function checkTstart2() {

  var dts1 = document.getElementById('datestart').value;
  var dtsnum = dts1.substring(4, 14);
  var dts2 = dtsnum.split("/");
  var dts3 = dts2[2] + dts2[1] + dts2[0];

  var tms1 = document.getElementById('timestart').value;
  var tms2 = tms1.split(":");
  var tms3 = tms2[0] + tms2[1];

  var date  = new Date();
  var day   = date.getDate();
  var month = date.getMonth();
  var year  = date.getFullYear();
  var hour  = date.getHours();
  var min   = date.getMinutes();

  var strtime = hour.toString() + min.toString();

  month = month + 1;

  if (month < 10) {
    if (day < 10){
      var strdate = year.toString() + "0" + month.toString() + "0" + day.toString();
    }else{
      var strdate = year.toString() + "0" + month.toString() + day.toString();
    }
  } else {
    if (day < 10){
      var strdate = year.toString() + month.toString() + "0" + day.toString();
    }else{
      var strdate = year.toString() + month.toString() + day.toString();
    }
  }

  if (strdate == dts3) {
    if (parseInt(strtime) > parseInt(tms3)) {
      return true;
    } else {
      return false;
    }
  }
}

function checkDfinish() {

  if (document.getElementById('datefinish').value == "") {
    return false;
  }

  var dts1 = document.getElementById('datestart').value;
  var dtsnum = dts1.substring(4, 14);
  var dts2 = dtsnum.split("/");
  var dts3 = dts2[2] + dts2[1] + dts2[0];

  var dtf1 = document.getElementById('datefinish').value;
  var dtfnum = dtf1.substring(4, 14);
  var dtf2 = dtfnum.split("/");
  var dtf3 = dtf2[2] + dtf2[1] + dtf2[0];

  if (parseInt(dtf3) < parseInt(dts3)) {
    return true;
  }
}

function checkTfinish() {
  if (document.getElementById('datefinish').value == "") {
    return false;
  }

  if (document.getElementById('timefinish').value == "") {
    return true;
  } else {
    return false;
  }
}

function checkTfinish2() {

  var dts1 = document.getElementById('datestart').value;
  var dtsnum = dts1.substring(4, 14);
  var dts2 = dtsnum.split("/");
  var dts3 = dts2[2] + dts2[1] + dts2[0];

  var dtf1 = document.getElementById('datefinish').value;
  var dtfnum = dtf1.substring(4, 14);
  var dtf2 = dtfnum.split("/");
  var dtf3 = dtf2[2] + dtf2[1] + dtf2[0];

  var tms1 = document.getElementById('timestart').value;
  var tms2 = tms1.split(":");
  var tms3 = tms2[0] + tms2[1];

  var tmf1 = document.getElementById('timefinish').value;
  var tmf2 = tmf1.split(":");
  var tmf3 = tmf2[0] + tmf2[1];

  if (isNaN(tmf1) == false) {
    var tmf3 = 0;
  }

  if (dtf3 == dts3) {
    if (parseInt(tmf3) < parseInt(tms3)) {
      return true;
    } else {
      return false;
    }
  }
}

function alertName() {
  document.getElementById('name').focus();
  return true;
}

function alertDstart() {
  document.getElementById('datestart').focus();
  return true;
}

function alertHstart() {
  document.getElementById('timestart').focus();
  return true;
}

function alertDfinish() {
  document.getElementById('datefinish').focus();
  return true;
}

function alertHfinish() {
  document.getElementById('timefinish').focus();
  return true;
}

function saveEvent(){

  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var min = date.getMinutes();

  if (hour < 10) {
    var strtime = "0" + hour.toString();
  } else {
    var strtime = hour.toString();
  }
  if (min < 10)
    strtime += "0" + min.toString();
  else {
    strtime += min.toString();
  }

  month = month + 1;

  if (month < 10) {
    if (day < 10){
      var strdate = year.toString() + "0" + month.toString() + "0" + day.toString();
    }else{
      var strdate = year.toString() + "0" + month.toString() + day.toString();
    }
  } else {
    if (day < 10){
      var strdate = year.toString() + month.toString() + "0" + day.toString();
    }else{
      var strdate = year.toString() + month.toString() + day.toString();
    }
  }

  var name = document.getElementById('name').value;
  var datestart = document.getElementById('datestart').value;
  var timestart = document.getElementById('timestart').value;
  var datefinish = document.getElementById('datefinish').value;
  var timefinish = document.getElementById('timefinish').value;
  var local = document.getElementById('local').value;
  var info = document.getElementById('info').value;
  var activity = rowscontrol.item(0).control4;
  var datecreate = strdate;
  var hourcreate = strtime;
  var uispace = "1";
  var baseOK = "1";
  var numconfirm = 1;
  var numinvited = 20020408;
  var photoprofile = "";

  db.transaction(function(tx) {

    if (saveevent != 0) {
      if (rows.item(0).userid == userid) {
        tx.executeSql('UPDATE event SET name=?, datestart=?, timestart=?, datefinish=?, timefinish=?, local=?, info=?, activity=?, baseok=? WHERE id=?', [name, datestart, timestart, datefinish, timefinish, local, info, activity, baseOK, eventid], function(tx, result) {
           window.location.href = "eventdbup.html";
         }, null);
      }else{
        navigator.notification.alert('Evento só pode ser alterado por quem criou.', null, 'Wolppi', 'OK');
      }
    }else {
        tx.executeSql('INSERT INTO event (uniqid, name, datestart, timestart, datefinish, timefinish, local, info, userid, usernickname, datecreate, hourcreate, activity, baseok, numconfirm, photoprofile, numinvited) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [  uispace, name, datestart, timestart, datefinish, timefinish, local, info, userid, usernickname, datecreate, hourcreate, activity, baseOK, numconfirm, photoprofile, numinvited], function(tx, result) {
          navigator.notification.alert('Evento Incluído com Sucesso!', null, 'Wolppi', 'OK');
          window.location.href = "eventui.html";
        }, null);
    }
  });
}

function displayFields(eventid) {

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM event WHERE id=?', [eventid], function(tx, results) {
      rows = results.rows;
      document.getElementById('name').value       = rows.item(0).name;
      document.getElementById('datestart').value  = rows.item(0).datestart;
      document.getElementById('timestart').value  = rows.item(0).timestart;
      document.getElementById('datefinish').value = rows.item(0).datefinish;
      document.getElementById('timefinish').value = rows.item(0).timefinish;
      document.getElementById('local').value      = rows.item(0).local;
      document.getElementById('info').value       = rows.item(0).info;
      document.getElementById("imgactivity").src  = rowscontrol.item(0).control4;
      oldactivity = rows.item(0).activity;
      document.getElementById("usernickname").innerHTML = rows.item(0).usernickname.substring(0,15) + ", convidou!";
      if(rows.item(0).userid == userid){
        checkphoto =  cordova.file.dataDirectory + idbd.item(0).uniqid + ".jpg";
        window.resolveLocalFileSystemURL(checkphoto, onSuccess, onFail);
      }else{
        checkphoto = cordova.file.dataDirectory + rows.item(0).userid + ".jpg";
        window.resolveLocalFileSystemURL(checkphoto, onSuccess, onFail);
      }
    }, null);
  });
}

function onSuccess() {
//  alert("Great! This file exists " + namephoto);
  namephoto = checkphoto;
  document.getElementById("photoprofile").src = namephoto;
}

function onFail() {
//  alert('Sorry! File not Found' + namephoto);
  namephoto = "nophoto.png";
  document.getElementById("photoprofile").src = namephoto;
}

function callPageStart(){
  if (rowscontrol.item(0).control1 == ""){
    if( document.getElementById('name').value       == "" &&
        document.getElementById('datestart').value  == "" &&
        document.getElementById('timestart').value  == "" &&
        document.getElementById('datefinish').value == "" &&
        document.getElementById('timefinish').value == "" &&
        document.getElementById('local').value      == "" &&
        document.getElementById('info').value       == ""){
        window.location.href = "start.html";
    }
    else{
      navigator.notification.confirm('Abandonar Inclusão?', onConfirmAdd,'Wolppi', ['Sim','Não']);
    }
  }else{
    if( document.getElementById('name').value       != rows.item(0).name ||
        document.getElementById('datestart').value  != rows.item(0).datestart ||
        document.getElementById('timestart').value  != rows.item(0).timestart ||
        document.getElementById('datefinish').value != rows.item(0).datefinish ||
        document.getElementById('timefinish').value != rows.item(0).timefinish ||
        document.getElementById('local').value      != rows.item(0).local ||
        document.getElementById('info').value       != rows.item(0).info ||
        oldactivity != rowscontrol.item(0).control4){
        navigator.notification.confirm('Gravar Alterações?', onConfirm,'Wolppi', ['Sim','Não']);
    }
    else{
      window.location.href = "start.html";
    }
  }

  function onConfirmAdd(buttonIndex) {
    if(buttonIndex == 1){
      window.location.href = "start.html";
    }
  }

  function onConfirm(buttonIndex) {
    if(buttonIndex == 1){
       saveEvent();
    }
    else{
      window.location.href = "start.html";
    }
  }
}

function chooseActivity(){
  if(saveevent == 0){
     saveFields()
  }else{
     window.location.href = "activity.html";
  }
}

function saveFields(){

  eventJS.push({name:document.getElementById('name').value ,
           datestart:document.getElementById('datestart').value ,
           timestart:document.getElementById('timestart').value ,
          datefinish:document.getElementById('datefinish').value ,
          timefinish:document.getElementById('timefinish').value ,
               local:document.getElementById('local').value ,
           namephoto:namephoto,
                info:document.getElementById('info').value});

  obj = JSON.stringify(eventJS);
  db.transaction(function(tx) {
    tx.executeSql('UPDATE tabcontrol SET control5=? WHERE id=?', [obj, 1], function(tx, result) {
      window.location.href = "activity.html";
    },null)
  });
}

function displayFieldsJS(obj){
      eventJS = JSON.parse(obj);
      document.getElementById('name').value = eventJS[0].name;
      document.getElementById('datestart').value = eventJS[0].datestart;
      document.getElementById('timestart').value = eventJS[0].timestart;
      document.getElementById('datefinish').value = eventJS[0].datefinish;
      document.getElementById('timefinish').value = eventJS[0].timefinish;
      document.getElementById('local').value = eventJS[0].local;
      document.getElementById('info').value = eventJS[0].info;
      document.getElementById("imgactivity").src = rowscontrol.item(0).control4;
      document.getElementById("photoprofile").src = eventJS[0].namephoto;
      firstactivity = rowscontrol.item(0).control4;
}

function callInvited(){
  if(rowscontrol.item(0).control1 == ""){
    checkFields();
  }else{
    if( document.getElementById('name').value       != rows.item(0).name ||
        document.getElementById('datestart').value  != rows.item(0).datestart ||
        document.getElementById('timestart').value  != rows.item(0).timestart ||
        document.getElementById('datefinish').value != rows.item(0).datefinish ||
        document.getElementById('timefinish').value != rows.item(0).timefinish ||
        document.getElementById('local').value      != rows.item(0).local ||
        document.getElementById('info').value       != rows.item(0).info ||
        oldactivity != rowscontrol.item(0).control4){
        navigator.notification.confirm('Alterações salvas, retorne para convidar.', null,'Wolppi');
        checkFields();
    }else{
      window.location.href = "invite.html";
    }
  }
}
