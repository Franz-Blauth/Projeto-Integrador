document.addEventListener("deviceready", onDeviceReady, false);
document.getElementById('btn-confirmar').addEventListener('click', returnInvite);

var table = document.getElementById('tbody-register');
var selectionContactcts = [];
var contactsJS          = [];
var contactS            = [];
var rowscontrol         = []
var invitedrows         = [];
var createinvited       = [];
var contactcsaved       = [];
var createinvitedPhoto  = [];
var tr                  = "";
var name                = "";
var phone11             = "";
var codarea             = "";
var phone               = "";
var datecreate          = "";
var hourcreate          = "";
var eraseok             = "N";
var baseok              = "1";
var strdate             = "";
var hourcreate          = "";
var newcodarea          = "";
var phone9              = "";
var uniqidevent1        = "";
var useridinvited       = "";
var useridinvited1      = "";
var invitedphoto        = "nophoto.png"
var numtimes            = 0;
var countreg            = 0;
var lengthname          = 0;
var countinvited        = 0;
var db = null;

document.getElementById("countinvited").value = countinvited;

function onDeviceReady() {
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM users', [], function(tx, result) {
      rowsusers  = result.rows;
      codarea      = rowsusers.item(0).codarea;
    }, null);
  });

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM tabcontrol WHERE id=?', [1], function(tx, result) {
      rowscontrol = result.rows;
      if (rowscontrol.item(0).control2 == "1"){
        uniqidevent = rowscontrol.item(0).control1;
      }else{
        uniqidevent = rowscontrol.item(0).control2;
      };
    }, null);
  });

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM invited WHERE uniqidevent=?', [uniqidevent], function(tx, result) {
      invitedrows = result.rows;
    })
  })

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

    if (contacts[i].name.formatted != undefined && contacts[i].name != null && contacts[i].phoneNumbers != null && contacts[i].phoneNumbers[0].value != undefined && contacts[i].id != null && contacts[i].id != undefined){

      uppername =  contacts[i].name.formatted.charAt(0).toUpperCase() + contacts[i].name.formatted.slice(1);
      clearphone = contacts[i].phoneNumbers[0].value.replace(/[^a-zA-Z0-9]/g, '');

      if (clearphone.length >= 11) {
        startstring = clearphone.length - 11;
        celphone = clearphone.substring(startstring, (startstring + 11))
        if(celphone.substring(2,3) == "9"){
          contactsJS.push({name: uppername.substring(0, 25),phone: celphone, check: 0});
        }
      }
      else{
        if (clearphone.length == 9) {
          celphone = codarea + clearphone;
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
    tr += '<tr style="text-decoration:none;">';
    tr += '<td style="text-decoration:none;">' + contactS[i].name.substring(0,20) + '</td>';
    tr += '<td style="text-decoration:none;">' + '&nbsp' + '(' + contactS[i].phone.substring(0,2) + ')' + contactS[i].phone.substring(2,11);
    tr += '<td style="text-decoration:none;">' + '&nbsp';
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

function events(idevent) {

  document.getElementById('name').value = "";

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

function returnInvite(){

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

    datecreate    = strdate;
    hourcreate    = strtime;
    eraseok       = "S";
    baseok        = "1";
    contactcsaved = [];

    for (i = 0; i < selectionContactcts.length; i++){
      invitedname = selectionContactcts[i].name;
      phone       = selectionContactcts[i].phone;
      newcodarea  = phone.substring(0, 2);
      phone9      = phone.substring(2, 11);
      countreg    = 0;

      for (j = 0; j < invitedrows.length; j++){
        if(newcodarea  == invitedrows.item(j).codarea     &&
          phone9       == invitedrows.item(j).phone       &&
          eraseok      != invitedrows.item(j).eraseok){
          countreg = 1;
          break;
        }
      }

      for(k = 0; k < createinvited.length; k++){
        if(createinvited[k].codarea == newcodarea &&
           createinvited[k].phone   == phone9){
          countreg = 1;
          break;
        }
      }
      if(countreg == 0){
        createinvited.push({codarea:newcodarea, phone:phone9, invitedname:invitedname});
      }

      numtimes = numtimes + 1;
      if(numtimes >= selectionContactcts.length){
        countreg = 0;
        controlInvitedPhoto(createinvited);
      }
    }
  }else{
      window.location.href = "invite.html";
  }
}

function controlInvitedPhoto(createinvited){
  if(countreg < createinvited.length){
    invitedPhotoPush(createinvited);
  }else{
    countreg = 0;
    controlCreateInvite(createinvitedPhoto);
  }
};

function invitedPhotoPush(createinvited){

  var useridinvited1 = "1";
  var codarea        = createinvited[countreg].codarea;
  var phone          = createinvited[countreg].phone;
  var invitedname    = createinvited[countreg].invitedname;

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM invited WHERE codarea=? AND phone=? AND useridinvited<>? LIMIT 1', [codarea, phone, useridinvited1], function(tx, result) {
      invitedrowsphoto  = result.rows;
      if(invitedrowsphoto.length > 13){
        createinvitedPhoto.push({codarea:codarea, phone:phone, invitedname:invitedname, invitedphoto:invitedphoto, useridinvited:invitedrowsphoto.item(0).useridinvited});
      }else{
        createinvitedPhoto.push({codarea:codarea, phone:phone, invitedname:invitedname, invitedphoto:invitedphoto, useridinvited:useridinvited1});
      }
      countreg = countreg + 1;
      controlInvitedPhoto(createinvited);
    }, null);
  });
}

function controlCreateInvite(createinvitedPhoto){
  if(countreg < createinvitedPhoto.length){
    createInvite(createinvitedPhoto);
  }else{
    window.location.href = "invite.html";
  }
}


function createInvite(createinvitedPhoto){

  useridinvited    = createinvitedPhoto[countreg].useridinvited;
  invitedname      = createinvitedPhoto[countreg].invitedname;
  newcodarea       = createinvitedPhoto[countreg].codarea;
  phone9           = createinvitedPhoto[countreg].phone;
  createevent      = "1";
  baseok           = "1";
  eraseok          = "N";
  dateconfirmation = "";
  invitedphoto     = "nophoto.png";

  db.transaction(function(tx) {
     tx.executeSql('INSERT INTO invited (uniqidevent, useridinvited, invitedname, codarea, phone, datelist, createevent, baseok , eraseok, dateconfirmation, invitedphoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [uniqidevent, useridinvited, invitedname, newcodarea, phone9, datecreate, createevent, baseok , eraseok, dateconfirmation, invitedphoto], function(tx, result) {
       countreg = countreg + 1;
       controlCreateInvite(createinvitedPhoto);
     },null);
  });
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
