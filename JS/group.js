var db = null;
var tr = "";
var savegrp = 2;
var numrowsmax = "";
var numrows = 0;
var rows = "";
var rowscontrol = "";
var idbd = "";
var userid = "";
var rowsgrp = "";
var contactsJS = [];
var baseok = "1";
var contactS  = [];
var grpID = "";
var checkname = "";
var table = document.getElementById('tbody-register');

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  document.addEventListener("backbutton", function() {}, false);
  document.getElementById('btn-confirmar').addEventListener('click', checkFields);
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessdb);
}

function onSuccessdb(){
  regId();
}

function regId() {
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM users WHERE id=?', [1], function(tx, results) {
      idbd = results.rows;
      userid = idbd.item(0).uniqid;
      countRows();
    }, null);
  });
}

function countRows() {
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM groups', [], function(tx, results) {
      rows = results.rows
      numrowsmax = rows.length;
      numrows = rows.length;
      checkControl();
    }, null);
  });
}

function checkControl(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM tabcontrol', [], function(tx, result) {
      rowscontrol = result.rows;
      if (rowscontrol.item(0).control3 != ""){
          for (i = 0; i < rows.length; i++){
              if (rows.item(i).id == parseInt(rowscontrol.item(0).control3)){
                  savegrp = 1;
                  numrows = i;
                  displayFields(i);
                  break;
              }
          }
      }
      else{
          savegrp = 0;
      }
    }, null);
  });
}

function checkFields() {

  if (document.getElementById('name').value == "") {
      navigator.notification.alert(
      'Digite um nome.',
      alertDismissed,
      'Wolppi',
      'OK' //
    );
    return true;
  }

  function alertDismissed() {
    document.getElementById('name').focus();
    return true;
  }

  if (savegrp == 0){
     savegroups();
  }
  else{
      if (document.getElementById('name').value != checkname){
          updateGroup()
      }
  }
};

function savegroups() {

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
  var datecreate = strdate;
  var hourcreate = strtime;
  var UIspace = "1";

  db.transaction(function(tx) {
      tx.executeSql('INSERT INTO groups (uniqid, name, baseok, datecreate, hourcreate, userid) VALUES (?, ?, ?, ?, ?, ?)', [UIspace, name, baseok, datecreate, hourcreate, userid], function(tx, result) {
        savegrp = 1;
        newGroup();
      },null);
  });
}

function newGroup(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT MAX(id) AS id, name FROM groups', [], function(tx, results) {
      rowsmax = results.rows;
      rowsmax.item(0).id;
      updateControl3();
    }, null);
  });
}

function updateControl3(){
  db.transaction(function(tx) {
    tx.executeSql('UPDATE tabcontrol SET control2=?, control3=? WHERE id=?', [userid, rowsmax.item(0).id, 1], function(tx, result) {
      navigator.notification.alert('Grupo incluído com sucesso!', null,'Wolppi','OK');
      window.location.href = "groupui.html";
    },null);
  });
}

function moveUp() {
  if ((numrows + 1) < numrowsmax) {
    numrows = numrows + 1;
    displayFields(numrows);
  }
  return null;
}

function moveDown() {
  if (numrows > 0) {
    numrows = numrows - 1;
    savegrp = 1;
    displayFields(numrows);
  }
  return null;
}

function displayFields() {
  tr = "";
  eraseok = "S";
  document.getElementById('name').value = rows.item(numrows).name;
  checkname = document.getElementById('name').value;

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM grpusers WHERE uigroups=? AND eraseok<>? ORDER BY name ASC', [rows.item(numrows).id, eraseok], function(tx, result) {
    rowsgrp = result.rows;
    document.getElementById('qtdgroup').value = rowsgrp.length;
    for (j = 0; j < rowsgrp.length; j++) {

      len01 = rowsgrp.item(j).name.length;
      len02 = 30 - len01;
      complt = "";

      for (k = 0; k < len02; k++){
          complt = complt + "&nbsp";
      }

      tr += '<tr>';
      tr += '<td style="font-weight: lighter;" onClick="deleteUser(' + rowsgrp.item(j).id + ')">' + rowsgrp.item(j).name + complt;
      tr += '<td style="font-weight: lighter;">' + '&nbsp' + '(' + rowsgrp.item(j).codarea + ')' + '&nbsp' + rowsgrp.item(j).phone;
      tr += '<tr>';
      tr += '<td colspan="2">';
      tr += '<hr>';
      tr += '</td>';
      tr += '</tr>';
    }
    table.innerHTML = tr;
    }, null);
  });
}

function deleteUser(cols){
  navigator.notification.confirm(
    'Excluir o contato do Grupo?',
    onConfirm,
    'Wolppi',
    ['Sim','Não']
  );

  function onConfirm(buttonIndex) {
      if(buttonIndex == 1){
        eraseok = "S";
        db.transaction(function(tx) {
          tx.executeSql('UPDATE grpusers SET eraseok=? WHERE id=?', [eraseok, cols], function(tx, result) {
            displayFields();
          }, null);
        });
      }
  }
}

function callContacts() {
  if(document.getElementById('name').value == ""){
    navigator.notification.alert('Selecione um Grupo.', null,'Wolppi','OK');
    return null;
  }else{
    db.transaction(function(tx) {
      tx.executeSql('UPDATE tabcontrol SET control2=?, control3=? WHERE id=?', [userid, rows.item(numrows).id,  1], function(tx, result) {
        window.location.href = "contacts.html";
      },null);
    });
  }
}

function updateGroup(){

  name = document.getElementById('name').value;
  db.transaction(function(tx) {
    tx.executeSql('UPDATE groups SET name=?, baseok=? WHERE id=?', [name, baseok, rows.item(numrows).id], onSuccessExit);
  });
}

function onSuccessExit(){
  db.transaction(function(tx) {
    tx.executeSql('UPDATE tabcontrol SET control2=?, control3=? WHERE id=?', [userid, rows.item(numrows).id, 1],function(tx, result) {
      navigator.notification.alert('Alteração OK!', null,'Wolppi','OK');
      window.location.href = "groupdbup.html";
    }, null);
 });
}

function callPageStart(){
  var clearcontrol1 = "";
  var clearcontrol2 = "";
  var clearcontrol3 = "";
  var clearcontrol4 = "";
  var clearcontrol5 = "";

  db.transaction(function(tx) {
    tx.executeSql('UPDATE tabcontrol SET control1=?, control2=?, control3=?, control4=?, control5=? WHERE id=?', [clearcontrol1, clearcontrol2, clearcontrol3, clearcontrol4, clearcontrol5, 1], function(tx, result) {
      window.location.href = "erasegrpusers.html";
    },null)
  });
}
