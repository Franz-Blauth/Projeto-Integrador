var vdb_uniqidJS        = [];
var vdb_fileJSON        = [];
var vdb_obj             = [];
var vdb_obj_eventJS     = [];
var vdb_fileinvitedJSON = []
var del_invited_JSON    = [];
var vdb_usersrows       = [];
var rowsevent           = [];
var rowscontacts        = [];
var rowsinvited         = [];
var countphoto          = 0;
var waitingsave         = 0;
var device_control      = 0;
var data                = "";
var photo               = "";
var blob                = "";
var uniqidphoto         = "";
var newphoto            = "";
var useridapp           = "";
var eventupdate         = "";
var clearphone          = "";
var startstring         = "";
var celphone            = "";
var phone9              = "";
var codarea_l2          = "";
var user_codarea        = "";
var user_phone          = "";
var user_nickname       = "";
var invitedname         = "";
var invitedupdate       = "";
var db                  = null;

document.addEventListener("backbutton", function() {}, false);
document.addEventListener("deviceready", function(){
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'});
});

function verifyUserID(){
  document.getElementById("photoprofile_big").src = "loading2.gif";
  document.getElementById("photoprofile_big").style.visibility = "visible";

  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM contacts WHERE id=? ', [1], function(tx, result) {
      var rows = result.rows;
      rowscontacts = JSON.parse(rows.item(0).value_a);
    }, null);
  });

  vdb_uniqidJS = [];

  db.transaction(function(tx) {
  tx.executeSql('SELECT * FROM users WHERE id=? ', [1], function(tx, result) {

    vdb_usersrows = result.rows;
    useridapp     = vdb_usersrows.item(0).uniqid;
    user_codarea  = vdb_usersrows.item(0).codarea;
    user_phone    = vdb_usersrows.item(0).phone;
    user_nickname = vdb_usersrows.item(0).nickname;

    vdb_uniqidJS.push({uniqid: useridapp, codarea: user_codarea, phone: user_phone});
    vdb_obj = JSON.stringify(vdb_uniqidJS);
    checkExistEventDB(vdb_obj);
    }, null);
  });
}

function checkExistEventDB(vdb_obj){
  var xmlhttp, x = "";
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(e) {
    if(this.readyState == 4 && this.status == 200) {
      vdb_obj_response = this.responseText;
      if(vdb_testJSON(vdb_obj_response)) {
         verifyExistEvent(vdb_obj_response);
      }
    }else{
          conectionCheck(this.readyState, this.status);
         }
  }
  xmlhttp.open("POST", "http://107.21.160.171/wolppi/importevent.php", true);

  xmlhttp.timeout = 13000;
  xmlhttp.ontimeout = function (e) {
    navigator.notification.alert('Servidor não encontrado!', null,'Wolppi','OK');
    window.location.href = "start.html";
  };

  xmlhttp.onerror = function (e) {
    navigator.notification.alert('Servidor não encontrado!', null,'Wolppi','OK');
    window.location.href = "start.html";
  };

  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + vdb_obj);
}

function verifyExistEvent(vdb_obj_response){

  var counteventexist = 0;

  vdb_fileJSON = JSON.parse(vdb_obj_response);

  if(vdb_fileJSON.length == 0){
    navigator.notification.alert(user_nickname+',  no momento não existem novos eventos para você.\nQuando você for convidado o Wolppi te avisará.', null,'Wolppi','OK');
    window.location.href = "start.html";
  }

  db.transaction(function(tx) {
    for(i = 0; i < vdb_fileJSON.length; i++){
      tx.executeSql('SELECT * FROM event WHERE uniqid=? ', [vdb_fileJSON[i].uniqid], function(tx, result) {
        var rowseventexist = result.rows;
        if(rowseventexist.length > 0){
          vdb_fileJSON[counteventexist].userid = "exist";
        }
        counteventexist = counteventexist + 1;
        if(counteventexist >= vdb_fileJSON.length){
          vdb_createEvent(vdb_fileJSON);
        }
      }, null);
    }
  });
}

var countevent = 0;
function vdb_createEvent(vdb_fileJSON){

  if(vdb_fileJSON.length <= 0){
    window.location.href = "start.html";
  }

  vdb_obj_eventJS = [];

  db.transaction(function(tx) {

    var uniqid           = vdb_fileJSON[countevent].uniqid;
    var name             = vdb_fileJSON[countevent].name;
    var datestart        = vdb_fileJSON[countevent].datestart;
    var timestart        = vdb_fileJSON[countevent].timestart;
    var datefinish       = vdb_fileJSON[countevent].datefinish;
    var timefinish       = vdb_fileJSON[countevent].timefinish;
    var datelimite       = vdb_fileJSON[countevent].datelimite;
    var timelimite       = vdb_fileJSON[countevent].timelimite;
    var local            = vdb_fileJSON[countevent].local;
    var info             = vdb_fileJSON[countevent].info;
    var userid           = vdb_fileJSON[countevent].userid;
    var usernickname     = vdb_fileJSON[countevent].usernickname;
    var datecreate       = vdb_fileJSON[countevent].datecreate;
    var hourcreate       = vdb_fileJSON[countevent].hourcreate;
    var numinvited       = vdb_fileJSON[countevent].numinvited;
    var nunconfirm       = vdb_fileJSON[countevent].nunconfirm;
    var baseok           = "2";
    var eraseok          = vdb_fileJSON[countevent].eraseok;
    var activity         = vdb_fileJSON[countevent].activity;

    if(vdb_fileJSON[countevent].userid != "exist"){
      tx.executeSql('INSERT INTO event (uniqid, name, datestart, timestart, datefinish, timefinish, datelimite, timelimite, local, info, userid, usernickname, datecreate, hourcreate, activity, baseok) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [uniqid, name, datestart, timestart, datefinish, timefinish, datelimite, timelimite, local, info, userid, usernickname, datecreate, hourcreate, activity, baseok], onSuccess035);
    }else{
      onSuccess035();
    }
  });
}

function onSuccess035(){
  vdb_obj_eventJS.push({uniqidevent: vdb_fileJSON[countevent].uniqid, codarea: user_codarea, phone: user_phone});
  countevent = countevent + 1;
  if (countevent >= vdb_fileJSON.length){
    checkExistInvitedDB(vdb_obj_eventJS);
  }else{
    vdb_createEvent(vdb_fileJSON)
  }
}

function checkExistInvitedDB(vdb_obj_eventJS){

  vdb_obj = JSON.stringify(vdb_obj_eventJS);
  var xmlhttp, x = "";
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(e) {
    if(this.readyState == 4 && this.status == 200) {
      vdb_obj_response = this.responseText;
      alert(vdb_obj_response);
      if(vdb_testJSON(vdb_obj_response)) {
        verifyExistInvited(vdb_obj_response);
      }
    }else{
      conectionCheck(this.readyState, this.status);
    }
  }
  xmlhttp.open("POST", "http://107.21.160.171/wolppi/importinvited.php", true);

  xmlhttp.onerror = function (e) {
    navigator.notification.alert('Servidor não encontrado!', null,'Wolppi','OK');
  };

  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + vdb_obj);
}


var count036 = 0;

function verifyExistInvited(vdb_obj_response){

  var countinvitedexist = 0;

  vdb_fileJSON = JSON.parse(vdb_obj_response);

  if(vdb_fileJSON.length == 0){
   window.location.href = "start.html";
  }

  db.transaction(function(tx) {
    for(i = 0; i < vdb_fileJSON.length; i++){
      tx.executeSql('SELECT * FROM invited WHERE uniqidevent=? AND codarea=? AND phone=?', [vdb_fileJSON[i].uniqidevent, vdb_fileJSON[i].codarea, vdb_fileJSON[i].phone], function(tx, result) {
        var rowsinvitedexist = result.rows;
        if(rowsinvitedexist.length > 0){
          vdb_fileJSON[countinvitedexist].invitedname = "exist";
        }
        countinvitedexist = countinvitedexist + 1;
        if(countinvitedexist >= vdb_fileJSON.length){
          vdb_createinvited(vdb_fileJSON);
        }
      }, null);
    }
  });
}

count016 = 0;

function vdb_createinvited(vdb_fileinvitedJSON){

  if(vdb_fileinvitedJSON.length <= 0){
     window.location.href = "start.html";
  }

  alert(JSON.stringify(vdb_fileinvitedJSON));

  var uniqidevent        = vdb_fileinvitedJSON[count016].uniqidevent;
  var useridinvited      = vdb_fileinvitedJSON[count016].useridinvited;
      invitedname        = vdb_fileinvitedJSON[count016].invitedname;
      alert("primeiro " + invitedname);
  var codarea            = vdb_fileinvitedJSON[count016].codarea;
  var phone              = vdb_fileinvitedJSON[count016].phone;
  var invitedphoto       = vdb_fileinvitedJSON[count016].invitedphoto;
  var datelist           = vdb_fileinvitedJSON[count016].datelist;
  var dateinvited        = vdb_fileinvitedJSON[count016].dateinvited;
  var dateconfirmation   = vdb_fileinvitedJSON[count016].dateconfirmation;
  var invitedtowolppi    = vdb_fileinvitedJSON[count016].invitedtwolppi;
  var createevent        = vdb_fileinvitedJSON[count016].createevent;
  var baseok             = "2";
  var eraseok            = vdb_fileinvitedJSON[count016].eraseok;
  var datecreate         = vdb_fileinvitedJSON[count016].datecreate;
  var hourcreate         = vdb_fileinvitedJSON[count016].hourcreate;
  var codareacontrol     = vdb_fileinvitedJSON[count016].codareacontrol;
  var phonecontrol       = vdb_fileinvitedJSON[count016].phonecontrol;

  for(k = 0; k < rowscontacts.length; k++){
    if(vdb_fileinvitedJSON[count016].codarea == rowscontacts[k].codarea && vdb_fileinvitedJSON[count016].phone == rowscontacts[k].phone){
      invitedname = rowscontacts[k].name;
      alert("segundo " + invitedname);
      break;
    }
  }

  if(user_codarea == vdb_fileinvitedJSON[count016].codarea && user_phone == vdb_fileinvitedJSON[count016].phone){
    invitedname = user_nickname;
    alert("terceiro " + invitedname);
  }

  if(vdb_fileinvitedJSON[count016].invitedname == "exist"){
    onSuccess016(vdb_fileinvitedJSON);
  }else{
    db.transaction(function(tx) {
      alert("vou gravar " + invitedname);
      tx.executeSql('INSERT INTO invited (uniqidevent, useridinvited, invitedname, codarea, phone, invitedphoto, datelist, dateinvited, dateconfirmation, invitedwolppi, createevent, baseok, eraseok) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [uniqidevent, useridinvited, invitedname, codarea, phone, invitedphoto, datelist, dateinvited, dateconfirmation, invitedtowolppi, createevent, baseok, eraseok], function(tx, result) {
        onSuccess016(vdb_fileinvitedJSON);
      }, null);
    });
  }
}

function onSuccess016(vdb_fileinvitedJSON){
  if(user_codarea == vdb_fileinvitedJSON[count016].codareacontrol && user_phone == vdb_fileinvitedJSON[count016].phonecontrol){
    del_invited_JSON.push({uniqidevent:vdb_fileinvitedJSON[count016].uniqidevent, codarea:vdb_fileinvitedJSON[count016].codareacontrol, phone:vdb_fileinvitedJSON[count016].phonecontrol});
  }
  count016 = count016 + 1;
  if(count016 >= vdb_fileinvitedJSON.length || vdb_fileinvitedJSON.length == 0){
    delUpdate();
  }else{
    vdb_createinvited(vdb_fileinvitedJSON)
  }
}

function delUpdate(){

  vdb_obj = JSON.stringify(del_invited_JSON);
  var xmlhttp, x = "";
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(e) {
    if(this.readyState == 4 && this.status == 200) {
        checkEventPhotoprofile();
    }else{
      conectionCheck(this.readyState, this.status);
    }
  }
  xmlhttp.open("POST", "http://107.21.160.171/wolppi/delinvitedupdate.php", true);

  xmlhttp.onerror = function (e) {
    navigator.notification.alert('Servidor não encontrado!', null,'Wolppi','OK');
  };

  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + vdb_obj);

}

function vdb_testJSON(jsonString) {
  try {
    var fileJson = JSON.parse(jsonString);
    if (fileJson && typeof fileJson === "object" && fileJson !== null) return fileJson;
  } catch (e) {}
  return false;
}

function checkEventPhotoprofile() {
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM event WHERE photoprofile<>? OR photoprofile IS NULL AND userid<>? LIMIT 1', [1, vdb_usersrows.item(0).uniqid], function(tx, result) {
      rowsevent = result.rows;
      if(rowsevent.length == 0){
        checkInvitedPhotoprofile();
      }else{
        eventupdate = rowsevent.item(0).uniqid;
        downloadPhoto(rowsevent.item(0).userid);
      }
    }, null);
  });
}

function checkInvitedPhotoprofile() {
  var photospace = "";
  var nophoto = "nophoto.png";
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM invited WHERE invitedphoto=? OR invitedphoto=? OR invitedphoto IS NULL LIMIT 1', [photospace, nophoto], function(tx, result) {
      rowsinvited = result.rows;
      if(rowsinvited.length == 0){
        window.location.href = "start.html";
      }else{
        invitedupdate = rowsinvited.item(0).id;
        downloadPhotoInvited(rowsinvited.item(0).useridinvited);
      }
    }, null);
  });
}

function downloadPhoto(uniqidphoto) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function (e) {
    if (this.readyState == 4 && this.status == 200) {
        var dataresponse = this.response;
        writeToFile(uniqidphoto + '.jpg', dataresponse);
    } else{
        conectionCheck(this.readyState, this.status);
    }
  }
  xmlhttp.open('GET', 'http://107.21.160.171/wolppi/upload/' + uniqidphoto + '.jpg');

  xmlhttp.onerror = function (e) {
    navigator.notification.alert('Servidor não encontrado!', null,'Wolppi','OK');
    window.location.href = "users.html";
  };
  xmlhttp.responseType = 'blob';
  xmlhttp.send();
}

function writeToFile(fileName, data) {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
        directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function (e) {
                  newphoto = cordova.file.dataDirectory + fileName;
                  savePhotoDown(fileName);
                };
                fileWriter.onerror = function (e) {
                    console.log('Write failed: ' + e.toString());
                };
                var blob = new Blob([data], {type: 'image/png' });
                fileWriter.write(blob);
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }, errorHandler.bind(null, fileName));
}

function savePhotoDown() {
  var photoprofile = 1;
  db.transaction(function(tx) {
    tx.executeSql('UPDATE event SET photoprofile=? WHERE uniqid=?', [photoprofile, eventupdate], null);
    checkEventPhotoprofile()
  });
};

function downloadPhotoInvited(uniqidphoto) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function (e) {
    if (this.readyState == 4 && this.status == 200) {
        var dataresponse = this.response;
        writeToFileInvited(uniqidphoto + '.jpg', dataresponse);
    } else{
        conectionCheck(this.readyState, this.status);
         }
  }
  xmlhttp.open('GET', 'http://107.21.160.171/wolppi/upload/' + uniqidphoto + '.jpg');

  xmlhttp.onerror = function (e) {
    navigator.notification.alert('Servidor não encontrado!', null,'Wolppi','OK');
    window.location.href = "users.html";
  };

  xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
  xmlhttp.responseType = 'blob';
  xmlhttp.send();
}

function writeToFileInvited(fileName, data) {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
        directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function (e) {
                  newphoto = cordova.file.dataDirectory + fileName;
                  savePhotoDownInvited(newphoto);
                };
                fileWriter.onerror = function (e) {
                    console.log('Write failed: ' + e.toString());
                };
                var blob = new Blob([data], {type: 'image/png' });
                fileWriter.write(blob);
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }, errorHandler.bind(null, fileName));
}

function savePhotoDownInvited(newphoto) {
  db.transaction(function(tx) {
    tx.executeSql('UPDATE invited SET invitedphoto=? WHERE id=?', [newphoto, invitedupdate], null);
    checkInvitedPhotoprofile()
  });
};

var errorHandler = function(fileName, e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'Storage quota exceeded';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'File not found';
      break;
    case FileError.SECURITY_ERR:
      msg = 'Security error';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'Invalid modification';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'Invalid state';
      break;
    default:
      msg = 'Unknown error';
      break;
  };

  console.log('Error (' + fileName + '): ' + msg);
}

function returnToUser(){
    window.location.href = "users.html";
}
