document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("offline", onOffline, false);

var loginJS = [];
var myObj = [];
var thisresponse = "";
var readyState = "";
var status = "";
var datebase    = new Date();
var secondbase  = datebase.getSeconds() + 3;
var minbase     = datebase.getMinutes();
var whereigo    = 0;
var codactivate = 0;
var db = null;

function onDeviceReady() {
  db = window.sqlitePlugin.openDatabase({name: 'wolppi.db', location: 'default'}, onSuccessDB);
}

function onSuccessDB(){
  document.getElementById("imgloading").src = 'blank.png';
  document.addEventListener("backbutton", function() { }, false);
  onOnline();
};

function onOffline(){
  navigator.notification.alert(
  'Você está off-line! \n\n Ative Wi-Fi ou Dados Móveis',
  alertnetwork,
  'Wolppi',
  'OK'
  );
}

function alertnetwork() {
  navigator.notification.beep(1);
  window.location.href = "createuser.html";
};

function onOnline(){
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(e) {
    if (this.readyState == 4 && this.status == 200) {
       whereigo = this.response;
    }
  };
  xmlhttp.open("GET", "http://107.21.160.171/wolppi/conectioncheck.php");

  xmlhttp.timeout = 3000;
  xmlhttp.ontimeout = function (e) {
  };
  xmlhttp.send();

  var myVar = setInterval(countTime, 3000);
}

function countTime(){

  var datestart    = new Date();
  var secondstart  = datestart.getSeconds();
  var minstart     = datestart.getMinutes();

  if(parseInt(secondstart) > parseInt(secondbase)){
    if(whereigo == 1){
      document.getElementById('btn-confirmar').addEventListener('click', checkFields);
    }else {
      navigator.notification.confirm('É necessario estar conectado a internet para prosseguir.', onConfirm, 'Wolppi', ['OK'] );
      function onConfirm(buttonIndex) {
        if(buttonIndex == 1){
          countTime();
        }
      }
    }
  }

  if (parseInt(minbase) != parseInt(minstart)){
    if(whereigo == 1){
      document.getElementById('btn-confirmar').addEventListener('click', checkFields);
    }else {
      navigator.notification.confirm('É necessario estar conectado a internet para prosseguir.', onConfirm, 'Wolppi', ['OK'] );
      function onConfirm(buttonIndex) {
        if(buttonIndex == 1){
          countTime();
        }
      }
    }
  }
}

function checkFields() {

  if(checkCodArea()){
    navigator.notification.alert(
     'Código de área não pode ser nulo.',
     alertCodarea,
     'Wolppi',
     'OK'
    );
    return true;
  }

  if (testNumCod()){
    navigator.notification.alert(
      'Código de área só aceita números',
      alertCodarea,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if(lengthCodArea()){
    navigator.notification.alert(
      'Código de área deve ter dois dígitos',
      alertCodarea,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if(checkPhone()){
    navigator.notification.alert(
      'Celular não pode ser nulo.',
      alertPhone,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if (testNumPhone()){
    navigator.notification.alert(
      'Celular só aceita números',
      alertPhone,
      'Wolppi',
      'OK'
    );
  return true;
  }

  if(lengthPhone()){
    navigator.notification.alert(
      'Celular Inválido',
      alertPhone,
      'Wolppi',
      'OK'
    );
    return true;
  }

  if (checkEmail()){
    navigator.notification.alert(
    'Digite um email Válido.',
    alertEmail,
    'Wolppi',
    'OK'
    );
   return true;
  }
  createCodActivate();
};

function checkCodArea(){
  if (document.getElementById('codarea').value == ""){
     return true;
     }
  else{
    return false;
  }
};

function testNumCod(){
  var test = false;
  var check = document.getElementById('codarea').value;
  test = (!isNaN(parseFloat(check)) && isFinite(check));
  if (test == false){
    return true;
  }
  else{
    return false;
  }
};

function lengthCodArea(){
  if (document.getElementById('codarea').value.length != 2){
    return true;
     }
  else{
    return false;
  }
};

function checkPhone(){
  if (document.getElementById('phone').value == ""){
     return true;
  }
  else{
    return false;
  }
};

function testNumPhone(){
  var test  = false;
  var check = document.getElementById('phone').value;
  test = (!isNaN(parseFloat(check)) && isFinite(check));
  if (test == false){
    return true;
  }
  else{
    return false;
  }
};

function lengthPhone(){
  if (document.getElementById('phone').value.length != 9){
    return true;
     }
  else{
    return false;
  }
};

function checkEmail(){
  var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  var emailspace   = document.getElementById('email').value;
  var emailnospace = emailspace.trim();
  if(!filter.test(emailnospace)){
    return true;
  }
  else{
    return false;
  }
};

function alertCodarea() {
  document.getElementById('codarea').focus();
  return true;
};

function alertPhone() {
  document.getElementById('phone').focus();
  return true;
};

function alertEmail() {
  document.getElementById('email').focus();
  return true;
};

function createCodActivate(){
  var randomized  = Math.ceil(Math.random() * Math.pow(10,6));
  var checklength = randomized.toString();
  if(checklength.length < 6){
    createCodActivate()();
  }else{
    codactivate = randomized;
    createJson();
  }
}

function createJson(){
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM tabcontrol WHERE id=?', [1], function(tx, result) {
      rowscontrol = result.rows;
      loginJS.push({codarea: document.getElementById('codarea').value,
                      phone: document.getElementById('phone').value,
                     passwd: 1,
                      email: document.getElementById('email').value,
                      model: model,
                     serial: serial,
                       uuid: uuid,
                codactivate: codactivate,
                    firekey: rowscontrol.item(0).control1});

      obj = JSON.stringify(loginJS);
      if(document.getElementById('codarea').value != 0){
        document.getElementById("imgloading").src = 'tenor.gif';
        saveDB();
      }
    }, null);
  });
}

function saveDB(){
  var xmlhttp, x = "";
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(e) {
    if (this.readyState == 4 && this.status == 200) {
      myObj = this.responseText;
      if (testJSON(myObj)){
          existUser(myObj);
      }
    }
  }
  xmlhttp.open("POST", "http://107.21.160.171/wolppi/login.php", true);

  xmlhttp.onload = function (e) {
    document.getElementById("imgloading").src = 'blank.png';
  };
  xmlhttp.timeout = 3000;
  xmlhttp.ontimeout = function (e) {
    navigator.notification.alert('Servidor não encontrado!', null,'Wolppi','OK');
    window.location.href = "createuser.html";
  };

  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + obj);
}

function existUser(myObj) {

  var fileJson = JSON.parse(myObj);

  if (fileJson[0].chkphone == "" && fileJson[0].chkemail == ""){
    createUser(myObj);
  }

  if (fileJson[0].chkemail != "") {
    navigator.notification.alert('Email já existe na base Wolppi. suporte@wolppi.com ', null,'Wolppi','OK');
    window.location.href = "createuser.html"
  }else{
    if (fileJson[0].chkphone != "") {
      navigator.notification.alert('Celular já existe na base Wolppi. suporte@wolppi.com ', null,'Wolppi','OK');
      window.location.href = "createuser.html"
    }
  }
};

function testJSON(jsonString) {

  try {
    var fileJson = JSON.parse(jsonString);
    if (fileJson && typeof fileJson === "object" && fileJson !== null) return fileJson;
  } catch (e) {}
  return false;
};

function createUser(myObj) {

  var date  = new Date();
  var day   = date.getDate();
  var month = date.getMonth();
  var year  = date.getFullYear();
  var hour  = date.getHours();
  var min   = date.getMinutes();

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
    var strdate = year.toString() + "0" + month.toString() + day.toString();
  } else {
    var strdate = year.toString() + month.toString() + day.toString();
  }

  var name = "";
  var nickname = "";
  var country = 'Brasil';
  var codarea = document.getElementById('codarea').value;
  var phone   = document.getElementById('phone').value;
  var email   = document.getElementById('email').value;
  var datecreate = strdate;
  var hourcreate = strtime;
  var fileJson   = JSON.parse(myObj);
  var uniqid     = fileJson[0].uniqid;
  var passwdhash = fileJson[0].passwdhash;
  var status     = fileJson[0].opendoor;
  var baseok     = "1";
  var photoprofile = "nophoto.png";
  var photoupload  = "Y";
  var sms          = "N";

    db.transaction(function(tx) {
      tx.executeSql('INSERT INTO users(uniqid, name, nickname, passwdhash, country, codarea, phone, email, status, datecreate, hourcreate, baseok, photoprofile, photoupload) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [uniqid, name, nickname, passwdhash, country, codarea, phone, email, status, datecreate, hourcreate, baseok, photoprofile, photoupload], function(tx, result) {
        saveControl(codarea, phone, uniqid);
      }, null);
    });
};

function saveControl(codarea, phone, uniqid){

  control3 = uniqid;
  control4 = codarea;
  control5 = phone;

  db.transaction(function(tx) {
    tx.executeSql('UPDATE tabcontrol SET control3=?, control4=?, control5=? WHERE id=?', [control3, control4, control5, 1], function(tx, result) {
      window.location.href = "codactivate.html"
    },null)
  });
}
