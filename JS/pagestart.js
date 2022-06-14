document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){
  document.addEventListener("backbutton", function() {
    navigator.notification.confirm('Sair do Wolppi?', onConfirm, 'Wolppi', ['Sim','Não'] );
      function onConfirm(buttonIndex) {
        if(buttonIndex == 1){
          navigator.app.exitApp();
        }
      }
  }, false);
  clearControl();
}

var table = document.getElementById('tbody-register');
var rows = [];
var eventJS = [];
var eventS = "";
var datebase = new Date();
var minbase  = datebase.getMinutes() + 0;
var uniqidusers = "";
var photoprofile = "";
var db = null;
var userid = "";

function countTime(){
  var datebase = new Date();
  var minstart = datebase.getMinutes();
  if (minstart > minbase){
      window.location.href = "waiting.html";
  }
}

window.setInterval("countTime()",15000);

function clearControl(){

  var clearcontrol1 = "";
  var clearcontrol2 = "";
  var clearcontrol3 = "";
  var clearcontrol4 = "";
  var clearcontrol5 = "";

  db.transaction(function(tx) {
    tx.executeSql('UPDATE tabcontrol SET control1=?, control2=?, control3=?, control4=?, control5=? WHERE id=?', [clearcontrol1, clearcontrol2, clearcontrol3, clearcontrol4, clearcontrol5, 1], onSuccessUP)
  });
}

function onSuccessUP(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM users WHERE id=?', [1], function(tx, result) {
      rowsusers = result.rows;
      uniqidusers  = rowsusers.item(0).uniqid;
      showFirst();
    }, null);
  });
}

function showFirst() {
  tr = "";
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM event', [], function(tx, result) {
      rows = result.rows;
      for (i = 0; i < rows.length; i++) {
        dts1 = rows.item(i).datestart;
        dtsnum = dts1.substring(4, 14);
        dts2 = dtsnum.split("/");
        tms1 = rows.item(i).timestart;
        tms2 = tms1.split(":");
        dts3 = dts2[2] + dts2[1] + dts2[0] + tms2[0] + tms2[1];
        datesort = parseInt(dts3);
        eventJS.push({id:rows.item(i).id,
                  uniqid:rows.item(i).userid,
                    name:rows.item(i).name,
               datestart:rows.item(i).datestart,
               timestart:rows.item(i).timestart,
            usernickname:rows.item(i).usernickname.substring(0,17),
                  uniqid:rows.item(i).uniqid,
                datesort:dts3,
                activity:rows.item(i).activity,
                numconfirm:rows.item(i).numconfirm,
              numinvited:rows.item(i).numinvited,
                  userid:rows.item(i).userid});
      }
      sortLastAdded();
    }, null);
  });
}

function sortEvent(){
  navigator.notification.confirm(
    'Como deseja ordenar os eventos?',
    onConfirm,
    'Wolppi',
    ['Data','Quem convidou', 'Alfabética']
  );
}

function onConfirm(buttonIndex) {
  switch (buttonIndex) {
    case 1:
      sortDate();
      break;
    case 2:
      sortNickname();
      break;
    case 3:
      sortNameevent();
      break;
  }
}

function sortLastAdded(){
  eventS = eventJS;
  eventS.sort(function(a, b) {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  });
  showEvents(eventS);
}

function sortDate(){
  eventS = eventJS;
  eventS.sort(function(a, b) {
    if (a.datesort > b.datesort) return -1;
    if (a.datesort < b.datesort) return 1;
    return 0;
  });
  showEvents(eventS);
}

function sortNickname(){
  eventS = eventJS;
  eventS.sort(function(a, b) {
    if (a.usernickname.toLowerCase() < b.usernickname.toLowerCase()) return -1;
    if (a.usernickname.toLowerCase() > b.usernickname.toLowerCase()) return 1;
    return 0;
  });
  showEvents(eventS);
}

function sortNameevent(){
  eventS = eventJS;
  eventS.sort(function(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
  showEvents(eventS);
}
iconusersid = "far fa-flag";
valiconup     = "far fa-check-circle";
valicondown   = "far fa-times-circle";

function showEvents(eventS){
    tr = "";

    for ( i = 0; i < rows.length; i++) {

      tr += '<tr onClick="callEvent(' + i + ')"  class="whiterows">';
      tr += '<td>' + '&nbsp&nbsp&nbsp' + '</td>';
      tr += '<td onClick="callEvent(' + i + ')" >' + '</td>';
      tr += '<td onClick="callEvent(' + i + ')" >' + '</td>';
      tr += '</tr>';
      tr += '<tr onClick="callEvent(' + i + ')">';


      if (eventS[i].numconfirm == 1){      //    verifica se o evento ja foi vizualizado fica verde ou preto
        tr += '<td colspan="2" style="font-family:sans-serif; font-variant:small-caps; width:270px; " onClick="callEvent(' + i + ')">' + '<b>' + eventS[i].name  + '</b>' + '</td>';
      }else{
        tr += '<td colspan="2" style="color:#0da205; font-family: sans-serif; font-variant:small-caps; width:270px; " onClick="callEvent(' + i + ')">' + '<b>' + eventS[i].name + '</b>' + '</td>';
      }
      if(eventS[i].userid == uniqidusers){
        tr += '<td style="color:black; width:7%;">' +  '<i class="' + iconusersid + '"></i>' + '</td>';
      }
      tr += '</tr>';

      tr += '<tr onClick="callEvent(' + i + ')">';
      tr += '<td style="font-family: sans-serif;" >' + eventS[i].usernickname + '</td>';
      tr += '<td style="color:#ccac00; width: 25%;">' +  '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +'<img class="tableicon" src="' + eventS[i].activity + '"></td>';


      tr += '<td>' + '</td>';
      tr += '</tr>';
      tr += '<tr onClick="callEvent(' + i + ')">';
      tr += '<td style="font-family:  sans-serif; font-size: 90%;" >' + eventS[i].datestart + '&nbsp' + '</td>';
      tr += '<td style="font-family:  sans-serif; font-size: 90%;" >' + eventS[i].timestart + 'H ' + '</td>';
      if(eventS[i].numinvited == 20020408){
        tr += '<td style="color:#0da205; font-size:120%;">' + '<i class="' + valiconup + '"></i>' + '</td>';
      }else{
        tr += '<td style="color:#ff8c00; font-size:120%;">' + '<i class="' + valicondown + '"></i>' + '</td>';
      }
      tr += '</tr>';
      tr += '<tr onClick="callEvent(' + i + ')" class="whiterows">';
      tr += '<td>' + '&nbsp&nbsp&nbsp' + '</td>';
      tr += '<td onClick="callEvent(' + i + ')">' + '</td>';
      tr += '<td onClick="callEvent(' + i + ')">' + '</td>';
      tr += '</tr>';
      tr += '<hr>';
    }
    table.innerHTML = tr;
}

function callEvent(eventcol){
  var numconfirm = 1;
  eventid     = eventS[eventcol].id;
  uniqid      = eventS[eventcol].uniqid;
  userid      = eventS[eventcol].userid;
  activity    = eventS[eventcol].activity;
  db.transaction(function(tx) {
    tx.executeSql('UPDATE event SET numconfirm=? WHERE id=?', [numconfirm, eventid], function(tx, result) {
    confirmEvent(eventid, uniqid, userid, activity);
    },null);
  });
}

function confirmEvent(eventid, uniqid, userid, activity){
  db.transaction(function(tx) {
    tx.executeSql('UPDATE tabcontrol SET control1=?, control2=?, control3=?, control4=? WHERE id=?', [eventid, uniqid, userid, activity, 1], function(tx, result) {
      if(userid == uniqidusers){
        window.location.href = "sincinvdateconfirmeve.html";
      }else{
        window.location.href = "sincinvdateconfirm.html";
      }
    },null);
  });
}
