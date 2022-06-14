var blob        = "";
var uniqidPhoto = "";
var newphoto    = "";
var imageURI    = "";
var baseok      = "1";
var localPhoto  = "";
var namephoto   = "";
var db          = null;
var eraseJS     = [];
var datebase    = new Date();
var secondbase  = datebase.getSeconds() + 3;
var minbase     = datebase.getMinutes();
var whereigo    = 0;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  localPhoto = cordova.file.dataDirectory;
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){
  document.addEventListener("backbutton", function() {}, false);
  document.getElementById('btn-confirmar').addEventListener('click', checkFields);
  start();
}

function start() {
  db.transaction(function(tx) {
  tx.executeSql('SELECT * FROM users WHERE id=? ', [1], function(tx, result) {
      rows = result.rows;
      namephoto = cordova.file.dataDirectory + rows.item(0).uniqid + ".jpg";
      window.resolveLocalFileSystemURL(namephoto, onSuccess, onFail);

      if(rows.item(0).status != 'opendoor'){
        eraseJS.push({codarea: rows.item(0).codarea,
                        phone: rows.item(0).phone,
                       uniqid: rows.item(0).uniqid});
        obj = JSON.stringify(eraseJS);
        eraserUser(obj)
      }
      uniqidPhoto = rows.item(0).uniqid;
      imageURI    = localPhoto + rows.item(0).uniqid + ".jpg";
      document.getElementById('uniqid').value     = rows.item(0).uniqid;
      document.getElementById('name').value       = rows.item(0).name;
      document.getElementById('nickname').value   = rows.item(0).nickname;
      document.getElementById('email').value      = rows.item(0).email;
      document.getElementById('country').value    = rows.item(0).country;
      document.getElementById('codarea').value    = rows.item(0).codarea;
      document.getElementById('phone').value      = rows.item(0).phone;
      if (rows.item(0).photoupload == "N"){
          imageURI = localPhoto +  rows.item(0).uniqid + ".jpg";
          uploadPhoto(imageURI);
      }
    }, null);
  });
}

function onSuccess() {
//  alert("Great! This file exists " + namephoto);
  document.getElementById("photoprofile").src = namephoto;
  return null;
}

function onFail() {
//  alert('Sorry! File not Found' + namephoto);
  document.getElementById("photoprofile").src = "nophoto.png";
  return null;
}

function checkFields(varstart) {

  var check = "";

  if (checkName()) {
    navigator.notification.alert(
      'Digite um Nome.',
      alertName,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if (checkNickname()) {
    navigator.notification.alert(
      'Digite um Apelido ',
      alertNickname,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if (checkCountry()) {
    navigator.notification.alert(
      'Digite um País',
      alertCountry,
      'Wolppi',
      'OK'
    );
    return true;
  }

  saveUser();

  if (varstart == "start") {
      varstart = "";
      window.location.href = "start.html";
  }
}

function checkName() {
  if (document.getElementById('name').value.length == 0) {
    return true;
  } else {
    return false;
  }
}

function checkNickname() {
  if (document.getElementById('nickname').value.length == 0) {
    return true;
  } else {
    return false;
  }
}

function checkCountry() {
  if (document.getElementById('country').value == "") {
    return true;
  } else {
    return false;
  }
}

function alertName() {
  document.getElementById('name').focus();
  return true;
}

function alertNickname() {
  document.getElementById('nickname').focus();
  return true;
}

function alertCountry() {
  document.getElementById('country').focus();
  return true;
}

function saveUser() {

  var name     = document.getElementById('name').value;
  var nickname = document.getElementById('nickname').value;
  var baseok   = "N";

  db.transaction(function(tx) {
    tx.executeSql('UPDATE users SET name=?, nickname=?, baseok=? WHERE id=?', [name, nickname, baseok, 1], function(tx, result) {
      navigator.notification.alert('Informações OK!', null, 'Wolppi', 'OK');
      updateUserServer();
    },null);
  });
}

function updateUserServer() {

  var loginJS = [];
  var myObj   = [];

  loginJS.push({field: document.getElementById('uniqid').value});
  loginJS.push({field: document.getElementById('name').value});
  loginJS.push({field: document.getElementById('nickname').value});

  obj = JSON.stringify(loginJS);

  var xmlhttp, x = "";

  xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function(e) {
    if (this.readyState == 4 && this.status == 200) {
      myObj = this.responseText;
      if (testJSON(myObj)) {
          updateUser(myObj);
      }
    }else{
      conectionCheck(this.readyState, this.status);
    }
  }
  xmlhttp.open("POST", "http://107.21.160.171/wolppi/users.php", true);

  xmlhttp.onerror = function (e) {
    navigator.notification.alert('Servidor não encontrado!', null,'Wolppi','OK');
    window.location.href = "users.html";
  };

  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + obj);
}

function testJSON(jsonString) {

  try {
    var fileJson = JSON.parse(jsonString);
    if (fileJson && typeof fileJson === "object" && fileJson !== null) return fileJson;
  } catch (e) {}
  return false;
};

function updateUser(myObj) {

  var fileJson = JSON.parse(myObj);
  var baseok = fileJson[0].baseok;
  db.transaction(function(tx) {
    tx.executeSql('UPDATE users SET  baseok=? WHERE id=?', [baseok, 1], function(tx, result) {
       window.location.href = "start.html";
    },null);
  });
}

function checkReg(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM users', [], function(tx, result) {
      rows = result.rows;
      if (rows.item(0).name.length == 0 || rows.item(0).nickname.length == 0) {
          navigator.notification.alert('Preencha os campos aperte confirmar.', null, 'Wolppi', 'OK');
          window.location.href = "users.html";
      }
      if (document.getElementById('name').value != rows.item(0).name || document.getElementById('nickname').value != rows.item(0).nickname){
          leaveUser();
      }
      if (rows.item(0).name.length != 0 && rows.item(0).nickname.length != 0 && document.getElementById('name').value == rows.item(0).name && document.getElementById('nickname').value == rows.item(0).nickname){
          window.location.href = "start.html";
      }
    }, null);
  });
}

function leaveUser(){
  navigator.notification.confirm('Deseja Gravar Alteração?', onConfirm, 'Wolppi', ['Sim','Não']);
}

function onConfirm(buttonIndex) {
  if(buttonIndex == 1){
    saveUser();
  }
  else{
    window.location.href = "start.html";
  }
}

function choosePhoto(){
  window.location.href = "choosephoto.html";
}

function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = uniqidPhoto;
    options.mimeType = "image/jpg";

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "http://107.21.160.171/wolppi/filetransfer.php",
    function (result) {
        milliseconds = 3000;
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
        downloadPhoto(uniqidPhoto);
    },
    function (error) {
        window.location.href = "users.html";
    }, options);
}

function downloadPhoto(uniqidPhoto) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function (e) {
    if(this.readyState == 4 && this.status == 200) {
      var dataresponse = this.response;
      writeToFile(uniqidPhoto + '.jpg', dataresponse);
    }else{
      conectionCheck(this.readyState, this.status);
    }
  }
  xmlhttp.open('GET', 'http://107.21.160.171/wolppi/upload/' + uniqidPhoto + '.jpg');

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
                  console.log(cordova.file.dataDirectory + fileName);
                  newphoto = cordova.file.dataDirectory + fileName;
                  savePhotoDown(newphoto);
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

function savePhotoDown(localphoto) {
  var resetphoto = "Y";
  db.transaction(function(tx) {
    tx.executeSql('UPDATE users SET photoprofile=?, photoupload=? WHERE id=?', [localphoto, resetphoto, 1], function(tx, result) {
      window.location.href = "users.html";
    }, null);
  });
};

function eraserUser(obj){
  var xmlhttp, x = "";
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(e) {
    if (this.readyState == 4 && this.status == 200) {
       myObj = this.response;
       db.transaction(function(tx) {
         tx.executeSql('DROP TABLE users', [], function(tx, result) {
          goOut();
         }, null)
       });
    }else{
        conectionCheck(this.readyState, this.status);
    }
  }
  xmlhttp.open("POST", "http://107.21.160.171/wolppi/deleteuser.php", true);

  xmlhttp.timeout = 6000;
  xmlhttp.ontimeout = function (e) {
    navigator.notification.alert('Servidor não encontrado!', null,'Wolppi','OK');
    window.location.href = "codactivate.html";
  };

  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + obj);

}

function goOut(){
  navigator.notification.confirm('Ops! Algo errado com sua validação.\nDesinstale e instale o Wolppi novamente.', goOut, 'Wolppi',  ['OK']);
}


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
