var data = "";
var photo = "";
var blob = "";
var uniqidPhoto = "";
var newphoto = "";
var db = null;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM users', [], function(tx, result) {
      var rows = result.rows;
      uniqidPhoto = rows.item(0).uniqid;
      }, null);
  });
}

function pickPhoto() {
   navigator.camera.getPicture(onSuccess, onFail, {
     quality: 50,
     sourceType: Camera.PictureSourceType.CAMERA,
     destinationType: Camera.DestinationType.NATIVE_URI,
     saveToPhotoAlbum: true,
     correctOrientation: true

   });
}

function pickGalery() {
   navigator.camera.getPicture(onSuccess, onFail, {
     quality: 50,
     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
     destinationType: Camera.DestinationType.NATIVE_URI,
     saveToPhotoAlbum: true,
     correctOrientation: true

   });
}

function onSuccess(imageURI) {
  var resetphoto = "N";
  db.transaction(function(tx) {
    tx.executeSql('UPDATE users SET photoprofile=?, photoupload=? WHERE id=?', [imageURI, resetphoto, 1], function(tx, result) {
      uploadPhoto(imageURI);
    },null);
  });
};

function moveTrash() {
  var localphoto = "nophoto.png ";
  db.transaction(function(tx) {
    tx.executeSql('UPDATE users SET photoprofile=? WHERE id=?', [localphoto, 1], function(tx, result) {
      navigator.notification.alert( 'Foto apagada!', null, 'Wolppi', 'OK' );
      window.location.href = "users.html";
      }, null);
  });
};

function onFail(message) {
  navigator.notification.alert( 'Não foi possivél completar operação!', null, 'Wolppi', 'OK' );
};

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
