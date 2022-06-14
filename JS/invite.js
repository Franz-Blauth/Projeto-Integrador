document.addEventListener("deviceready", onDeviceReady, false);

var table = document.getElementById('tbody-register');
var rowscontrol = [];
var invitedrows = [];
var uniqidevent = "";
var tr = "";
var i = 0;
var eraseok = "S";
var deleteOK = 0;
var valicon = "";
var iconup   = "far fa-check-circle";
var icondown = "far fa-times-circle";
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
      if(rowscontrol.item(0).control2 == "1"){
        uniqidevent = rowscontrol.item(0).control1;
      }else{
        uniqidevent = rowscontrol.item(0).control2;
      };
      showInvited();
    }, null);
  });
}

function showInvited(){
  eraseok = "S";
  db.transaction(function(tx) {
  tx.executeSql('SELECT * FROM invited WHERE uniqidevent=? AND eraseok<>? ORDER BY invitedname ASC' , [uniqidevent, eraseok], function(tx, result) {
      invitedrows = result.rows;
      for (var i = 0; i < invitedrows.length; i++) {

        if (invitedrows.item(i).dateinvited != null && invitedrows.item(i).dateinvited != ""){
          valicon = "fa fa-share";
        }else{
          valicon = "far fa-envelope";
        }

        tr += '<tr>';
        tr += '<td onClick="checkDateInvited(' + invitedrows.item(i).id + ')" style="width:4%;">' + ( i + 1) + '</td>';

        if(invitedrows.item(i).dateconfirmation != null && invitedrows.item(i).dateconfirmation != ""){
          tr += '<td onClick="checkDateInvited(' + invitedrows.item(i).id + ')" style="color:#0da205;" "width:14%;">' + '<i class="' + iconup + '"></i>' + '</td>';
        }else{
          tr += '<td onClick="checkDateInvited(' + invitedrows.item(i).id + ')" style="color:#ff8c00;" "width:14%;">' + '<i class="' + icondown + '"></i>' + '</td>';
        }
        tr += '<td onClick="checkDateInvited(' + invitedrows.item(i).id + ')" style="font-variant:small-caps; font-size:70%">' + '<i class="' + valicon + '"></i>' + '&nbsp&nbsp'  + invitedrows.item(i).invitedname.substring(0,22) + '</td>';
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

function checkDateInvited(buttonIndex) {
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM invited WHERE id=?', [buttonIndex], function(tx, result) {
      var resultinvited = result.rows;
      if (resultinvited.item(0).dateinvited == null){
        deleteInvited(buttonIndex);
      }
      else{
        navigator.notification.alert('Convite já enviado!  Exclusão não permitida.', null,'Wolppi','OK');
      }
    }, null);
  });
}

function deleteInvited(cols){

  navigator.notification.confirm(
    'Excluir da Lista?',
    onConfirm,
    'Wolppi',
    ['Sim','Não']
  );

  function onConfirm(buttonIndex) {
    if(buttonIndex == 1){
      eraseok = "S";
      db.transaction(function(tx) {
        tx.executeSql('UPDATE invited SET eraseok=? WHERE id=?', [eraseok, cols], function(tx, result) {
          tr = "";
          showInvited();
        },null);
      });
    }
  }
}

function createInvite(){

  navigator.notification.confirm(
    'Após o envio você poderá incluir novos convidados na sua lista mas não poderá excluir aqueles que já foram convidados.\n\nEnviar Convites?' ,
    onConfirm,
    'Wolppi',
    ['Sim','Não']
  );

  function onConfirm(buttonIndex) {
    if(buttonIndex == 1){
      window.location.href = "invitedbdate.html";
    }
  }
}

function photoprofile_small(){
  document.getElementById("photoprofile_big").style.visibility = "hidden";
}

function bigPhoto(i){
  document.getElementById("photoprofile_big").src = localphoto + invitedrows.item(i).useridinvited + ".jpg";
  document.getElementById("photoprofile_big").style.visibility = "visible";
}

function bigPhotoNO(i){
  document.getElementById("photoprofile_big").src = "1.jpg";
  document.getElementById("photoprofile_big").style.visibility = "visible";
}
