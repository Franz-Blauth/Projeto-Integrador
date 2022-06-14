// ROTINA PARA SABER SE EXISTE FOTO GRARDADA

// uniqidusers  = rowsusers[0].uniqid;
// photoprofile = rowsusers[0].photoprofile;
// console.log(photoprofile);
// console.log(cordova.file.dataDirectory);
// window.resolveLocalFileSystemURL(photoprofile, onSuccess, onFail);
// function onSuccess() {
//   console.log("Great! This file exists");
// }
//
// function onFail() {
//   console.log('Sorry! File not Found');
// }

var data        = "";
var photo       = "";
var blob        = "";
var uniqidPhoto = "";
var newphoto    = "";
var rowsevent   = [];
var countphoto  = 0;
var db          = null;

document.addEventListener("deviceready", function(){
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
});


function onSuccessDB() {

  db.transaction(function(tx) {
    tx.executeSql('event * FROM event WHERE photoprofile<>?', [1], function(tx, result) {
      rowsevent    = result.rows;
      downloadPhoto(rowsevent.item(countphoto).userid);
      if(countphoto >= rowsusers.length){
        window.location.href = "start.html";
      }
    }, null);
  });
}

function downloadPhoto(uniqidPhoto) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function (e) {
    if (this.readyState == 4 && this.status == 200) {
        var dataresponse = this.response;
        writeToFile(uniqidPhoto + '.jpg', dataresponse);
    } else{
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
  var photoprofile = 1;
  db.transaction(function(tx) {
    tx.executeSql('UPDATE event SET photoprofile=?, uniqid=? WHERE id=?', [photoprofile, rowsevent.item(countphoto).userid], function(tx, result) {
      countphoto = countphoto + 1;
    },null);
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
