document.addEventListener("deviceready", onDeviceReady, false);
document.getElementById('btn-confirmar').addEventListener('click', returnGroups);
document.addEventListener("backbutton", function() {}, false);

var table = document.getElementById('tbody-register');
var contactcsaved = [];
var contactsJS    = [];
var contactS      = [];
var selectionContactcts = [];
var grpusersrows = [];
var codarea = "";
var rowsuser = [];
var contactcsaved = [];
var tr = "";
var ctrlgroupid = 0;
var ctrluserid  = " ";
var name     = " ";
var phone11  = " ";
var cordarea = " ";
var phone    = " ";
var lengthname = 0;
var newcodarea = "";
var phone9 = "";
var db = null;
var countinvited  = 0;

document.getElementById("countinvited").value = countinvited;

function onDeviceReady() {
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM tabcontrol WHERE id=?', [1], function(tx, result) {
      rows = result.rows;
      ctrlgroupid = rows.item(0).control3;
      ctrluserid  = rows.item(0).control2;
      readUsers()
    }, null);
  });
}
function readUsers(){

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM users', [], function(tx, result) {
      rowsuser    = result.rows;
      codarea = rowsuser.item(0).codarea;
      readGroups();
    }, null);
  });
}

function readGroups(){

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM grpusers WHERE uigroups=?', [ctrlgroupid], function(tx, results) {
      grpusersrows = results.rows;
      readContacts();
    }, null);
  });
}

function readContacts(){
   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;
   filter = ["displayName", "name"]; // return contact.displayName
   navigator.contacts.find(filter, onSuccess, onError, options);
}


function onSuccess(contacts) {
  var startstring = 0;
  var celphone = "";
  var clearphone = "";
  var uppername = "";
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].name != null && contacts[i].phoneNumbers != null && contacts[i].id != null) {
      uppername =  contacts[i].name.formatted.charAt(0).toUpperCase() + contacts[i].name.formatted.slice(1);

      clearphone = contacts[i].phoneNumbers[0].value.replace(/[^a-zA-Z0-9]/g, '');

      if (clearphone.length >= 11) {
        startstring = clearphone.length - 11;
        celphone = clearphone.substring(startstring, (startstring + 11))
        if(celphone.substring(2,3) == "9"){
          contactsJS.push({name: uppername.substring(0, 25),phone: celphone, check: 0});
        }
      }
    else {
        if (clearphone.length == 9) {
          celphone = codarea.toString() + clearphone.toString();
          if(celphone.substring(2,3) == "9"){
             contactsJS.push({name: uppername.substring(0, 25),phone: celphone, check: 0});
          }
        }
      }
    }
  }
  showContacts()
}

function onError(contactError) {
  alert('onError!');
}

function showContacts() {

  tr = "";

  contactS = contactsJS;

  contactS.sort(function(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  for (var i = 0; i < contactS.length; i++) {
    tr += '<tr>';
    tr += '<td color: #3088da;">' + contactS[i].name.substring(0,25) + '</td>';
    tr += '<td>' + '&nbsp' + '(' + contactS[i].phone.substring(0,2) + ')' + contactS[i].phone.substring(2,11);
    tr += '<td>' + '&nbsp';
    tr += '<input id="'+ i + '"type="radio"  onClick="events(' + i + ')">' + '</td>';
    tr += '<tr>';
    tr += '<td colspan="3">';
    tr += '<hr>';
    tr += '</td>';
    tr += '</tr>';
  }
  document.getElementById("imgloading").src = 'blank.png';
  table.innerHTML = tr;
}

function events(idevent){
  document.getElementById("name").value = "";

  if(contactS[idevent].check == 0){
    contactS[idevent].check = 1;
    countinvited = countinvited + 1;
    document.getElementById("countinvited").value = countinvited;
  }
  else {
    document.getElementById(idevent).checked = false;
    contactS[idevent].check = 0;
    countinvited = countinvited - 1;
    document.getElementById("countinvited").value = countinvited;
  }

  selectionContactcts = [];

  for (var i = 0; i < contactS.length; i++) {
    if (contactS[i].check == 1){
      selectionContactcts.push({phone: contactS[i].phone, name:contactS[i].name});
    };
  }
  return true;
}

var count033 = 0;

function returnGroups(){

  if (selectionContactcts.length > 0){

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

    var uiusers    = ctrluserid;
    var datecreate = strdate;
    var hourcreate = strtime;
    var eraseok = "1";
    var baseok  = "1";
    var uigroups = ctrlgroupid;
    var countpush = 0;

    db.transaction(function(tx) {
      name       = selectionContactcts[count033].name;
      phone      = selectionContactcts[count033].phone;
      newcodarea = phone.substring(0, 2);
      phone9     = phone.substring(2, 11);
      savegrp = 0;
      for (j = 0; j < grpusersrows.length; j++){
        if(grpusersrows.item(j).eraseok != "S"         &&
           grpusersrows.item(j).codarea  == newcodarea  &&
           grpusersrows.item(j).phone    == phone9){
          savegrp = 1;
        }
      }
      for(k = 0; k < contactcsaved.length; k++){
        if(contactcsaved[k].phone == selectionContactcts[count033].phone){
          savegrp = 1;
          break;
        }
      }
      if(savegrp == 0){
        tx.executeSql('INSERT INTO grpusers (uigroups, uiusers, name, codarea, phone, datecreate, hourcreate, userid, baseok, eraseok) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [uigroups, uiusers, name, newcodarea, phone9, datecreate, hourcreate, ctrluserid, baseok, eraseok], onSuccess033);
      }
    })
  }else{
     window.location.href = "group.html";
  }
}

function onSuccess033(){
  contactcsaved.push({phone: selectionContactcts[count033].phone});
  count033 = count033 + 1
  if(count033 >= selectionContactcts.length){
    window.location.href = "grpusersdb.html";
  }else{
    returnGroups();
  }
}


function selectName() {

  document.getElementById("name").addEventListener("click", showContacts);

  tr = "";
  table.innerHTML = tr;

  if (document.getElementById('name').value != "") {
    valuename  = document.getElementById("name").value;
    valuename  = valuename.toLowerCase();
    valuename  = valuename.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    valuename  = valuename.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    valuename  = valuename.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    valuename  = valuename.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    valuename  = valuename.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    valuename  = valuename.replace(new RegExp('[Ç]','gi'), 'c');
    namelength = valuename.length;
  }else{
    showContacts();
  }

  for (var i = 0; i < contactS.length; i++) {

    text = contactS[i].name;

    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');

    upper1 =  valuename.toUpperCase();
    upper2 =  text.toUpperCase();
    var goDisplay = upper2.indexOf(upper1);

    if(upper2.match(upper1)){
      tr += '<tr>';
      tr += '<td color: #3088da;">' + contactS[i].name + '</td>';
      //    tr += '<td>' + '&nbsp&nbsp&nbsp' + contactS[i].phone;
      tr += '<td>' + '&nbsp';
      tr += '<input id="'+ i + '"type="radio"  onClick="events(' + i + ')">' + '</td>';
      tr += '<tr>';
      tr += '<td colspan="2">';
      tr += '<hr>';
      tr += '</td>';
      tr += '</tr>';
    }
  }
  table.innerHTML = tr;
}

function checkReturnGroup(){
  if(selectionContactcts.length > 0){
    navigator.notification.confirm('Incluir contatos Selecionados?', onConfirm,'Wolppi', ['Sim','Não']);
  }else{
    window.location.href = "group.html";
  }
}

function onConfirm(buttonIndex) {
  if(buttonIndex == 1){
    returnGroups();
  }
  else{
  window.location.href = "group.html";
  }
}
