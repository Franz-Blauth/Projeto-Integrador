document.addEventListener("deviceready", onDeviceReady, false);

var table = document.getElementById('tbody-register');
var rowscontrol      = [];
var rows             = [];
var grpusersJS       = [];
var rowsgrpusers     = [];
var invitedrows      = [];
var createinvited    = [];
var invitedrowsphoto = [];
var createinvitedPhoto = [];
var oldidevent       = 0;
var i                = 0;
var checkfor         = 0;
var numtimes         = 0;
var countreg         = 0;
var countsave        = 0;
var tr               = "";
var existactivity    = "";
var uniqidevent      = "";
var invitedname      = "";
var invitedtowolppi  = "";
var dateinvited      = "";
var datelist         = "";
var eraseS           = "S";
var baseok           = "1";
var eraseok          = "N";
var useridinvited    = "1";
var useridinvited1   = "1";
var invitedphoto     = "nophoto.png"
var db = null;

function onDeviceReady() {
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM invited', [], function(tx, result) {
      invitedrows = result.rows;
    })
  })

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM groups ORDER BY name ASC', [], function(tx, result) {
      rows = result.rows;
      if (rows.length == 0) {
        navigator.notification.alert('Você não tem Grupos Cadastrados', null, Wolppi,  'OK');
        window.location.href = "invite.html";
      }else{
        checkControl();
      }
    }, null);
  });
}

function checkControl() {
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM tabcontrol', [], function(tx, result) {
      rowscontrol = result.rows;
      countGroups();
    }, null);
  });
}

function countGroups() {
  db.transaction(function(tx) {
  for (i = 0; i < rows.length; i++) {
      tx.executeSql('SELECT count(*) AS totalrows, uigroups  FROM grpusers WHERE uigroups=?', [rows.item(i).id], function(tx, result) {
        rowsgrpusers = result.rows;
        if (rowsgrpusers.item(0).totalrows > 0){
          grpusersJS.push({groupid: rowsgrpusers.item(0).uigroups,
                             total: rowsgrpusers.item(0).totalrows});
        }
        checkfor = checkfor + 1;
        if (checkfor >= rows.length){
           checkfor = 0;
           showGroups();
        }
      }, null);
  }
 });
}

function showGroups(){

  if (grpusersJS.length == 0){
      navigator.notification.alert('Seus Grupos estão vazios.', null, 'Wolppi', 'OK');
      window.location.href = "invite.html";
  }

  for (var i = 0; i < rows.length; i++) {
    total = 0;
    for (j = 0; j < grpusersJS.length; j++){
      if (grpusersJS[j].groupid == rows.item(i).id){
        total      =  grpusersJS[j].total;
        namelower  =  rows.item(i).name.toLowerCase();
        tr += '<tr onClick="returnInvite(' + rows.item(i).id + ')">';
        tr += '<td style="font-variant:small-caps; width:80%">' + namelower + '</td>';
        if (total < 10){
          tr += '<td style="color: #0da205; width:10%;">' + "0" +  total + '&nbsp&nbsp&nbsp' + '</td>';
        }else{
          tr += '<td style="color: #0da205;width:10%;">' +  total + '&nbsp&nbsp&nbsp' + '</td>';
        }
        tr += '</tr>';
        tr += '<hr>';
        break;
      }
    }
  }
  table.innerHTML = tr;
}

function returnInvite(idgrp) {
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM invited', [], function(tx, result) {
      invitedrows = result.rows;
    })
  })

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM grpusers WHERE uigroups=?', [idgrp], function(tx, result) {
      rowsgrpusers = result.rows;
      createInvite();
    }, null);
  });
}

function createInvite(){

  var date  =  new Date();
  var day   =  date.getDate();
  var month =  date.getMonth();
  var year  =  date.getFullYear();
  var hour  =  date.getHours();
  var min   =  date.getMinutes();

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

  datelist = strdate;
  eraseok = "N";

  for (i = 0; i < rowsgrpusers.length; i++){

    if (rowscontrol.item(0).control2 == "1"){
        var uniqidevent = rowscontrol.item(0).control1;
    }else{
        var uniqidevent = rowscontrol.item(0).control2;
    };

    var codarea     = rowsgrpusers.item(i).codarea;
    var phone       = rowsgrpusers.item(i).phone;
    var invitedname = rowsgrpusers.item(i).name;
    var createevent = "1";
    var baseok      = "1";
    var dateconfirmation = "";
    countreg = 0;

    for (j = 0; j < invitedrows.length; j++){
      if(uniqidevent == invitedrows.item(j).uniqidevent &&
         codarea     == invitedrows.item(j).codarea     &&
         phone       == invitedrows.item(j).phone       &&
         eraseS      != invitedrows.item(j).eraseok){
        countreg = 1;
        break;
      }
    }

    if (countreg == 0){
      createinvited.push({uniqidevent:uniqidevent, useridinvited:useridinvited, invitedname:invitedname, codarea:codarea, phone:phone, datelist:datelist, createevent:createevent, baseok:baseok, eraseok:eraseok, dateconfirmation:dateconfirmation});
    }

    numtimes = numtimes + 1;
    if (numtimes >= rowsgrpusers.length){
        countreg = 0;
        includePhotoJSON(createinvited);
    }
  }
}

function includePhotoJSON(createinvited){
  if(countreg < createinvited.length){
    findInvitedPhoto(createinvited)
  }else{
    countsave = 0;
    controlInvitedGroup(createinvitedPhoto)
  }
}

function findInvitedPhoto(createinvited){
  var uniqidevent      = createinvited[countreg].uniqidevent;
  var invitedname      = createinvited[countreg].invitedname;
  var codarea          = createinvited[countreg].codarea;
  var phone            = createinvited[countreg].phone;
  var datelist         = createinvited[countreg].datelist;
  var createevent      = createinvited[countreg].createevent;
  var baseok           = createinvited[countreg].baseok;
  var eraseok          = createinvited[countreg].eraseok;
  var dateconfirmation = createinvited[countreg].dateconfirmation;


  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM invited WHERE codarea=? AND phone=? AND useridinvited<>? LIMIT 1', [codarea, phone, useridinvited1], function(tx, result) {
      invitedrowsphoto  = result.rows;
      if(invitedrowsphoto.length > 0){
        usersidinvited = invitedrowsphoto.item(0).useridinvited;
        createinvitedPhoto.push({uniqidevent:uniqidevent, useridinvited:invitedrowsphoto.item(0).useridinvited, invitedname:invitedname, codarea:codarea, phone:phone, datelist:datelist, createevent:createevent, baseok:baseok, eraseok:eraseok, dateconfirmation:dateconfirmation, invitedphoto:invitedphoto});
      }else{
        useridinvited  = "1";
        createinvitedPhoto.push({uniqidevent:uniqidevent, useridinvited:useridinvited, invitedname:invitedname, codarea:codarea, phone:phone, datelist:datelist, createevent:createevent, baseok:baseok, eraseok:eraseok, dateconfirmation:dateconfirmation, invitedphoto:invitedphoto});
      }
      countreg = countreg + 1;
      includePhotoJSON(createinvited);
    }, null);
  });
}

function controlInvitedGroup(createinvitedPhoto){
  if(countsave < createinvitedPhoto.length){
    saveInvitedGroups(createinvitedPhoto);
  }else{
    window.location.href = "invite.html";
  }
}

function saveInvitedGroups(createinvitedPhoto){
  var uniqidevent      = createinvitedPhoto[countsave].uniqidevent;
  var useridinvited    = createinvitedPhoto[countsave].useridinvited;
  var invitedname      = createinvitedPhoto[countsave].invitedname;
  var codarea          = createinvitedPhoto[countsave].codarea;
  var phone            = createinvitedPhoto[countsave].phone;
  var datelist         = createinvitedPhoto[countsave].datelist;
  var createevent      = createinvitedPhoto[countsave].createevent;
  var baseok           = createinvitedPhoto[countsave].baseok;
  var eraseok          = createinvitedPhoto[countsave].eraseok;
  var dateconfirmation = createinvitedPhoto[countsave].dateconfirmation;
  var invitedphoto     = "nophoto.png";

  db.transaction(function(tx) {
    tx.executeSql('INSERT INTO invited (uniqidevent, useridinvited, invitedname, codarea, phone, datelist, createevent, baseok, eraseok, dateconfirmation, invitedphoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [uniqidevent, useridinvited, invitedname, codarea, phone, datelist, createevent, baseok, eraseok, dateconfirmation, invitedphoto], function(tx, result) {
      countsave = countsave + 1;
      controlInvitedGroup(createinvitedPhoto);
    },null);
  });
}
