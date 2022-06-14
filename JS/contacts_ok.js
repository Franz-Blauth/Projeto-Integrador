document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
console.log(JSON.stringify(navigator.contacts));
var options = new ContactFindOptions();
options.filter = "";
options.multiple = true;
filter = ["displayName", "name"]; // return contact.displayName
navigator.contacts.find(filter, onSuccess, onError, options);

}

function onSuccess(contacts) {

//  console.log(JSON.stringify(contacts));
  alert(contacts.length);
  for(i = 0; i < contacts.length; i++){
    if (contacts[i].displayName != null && contacts[i].phoneNumbers != null && contacts[i].id != null){
      contactsJS.push({name: contacts[i].displayName,
                     phone: contacts[i].phoneNumbers[0].value});
    }
  }
  alert(contactsJS.length);
}

function onError(contactError) {
  console.log('onError!');
}

for (var k = 0; k < contacts.length; k++) {

  if (contacts[k].displayName != null && contacts[k].phoneNumbers != null){

    clearphone = contacts[k].phoneNumbers[0].value.replace(/[^a-zA-Z0-9]/g, '');
    startstring = clearphone.length - 11;

    if (clearphone.length >= 11) {
      celphone   = clearphone.substring(startstring, (startstring + 11));
      phone9     = clearphone.substring(2,11);
      codarea_l2 = clearphone.substring(0,2);
    }
    else {
      if (clearphone.length == 9) {
        phone9 = clearphone.toString();
        codarea_l2 = user_codarea;
      }
    }

    if( vdb_fileinvitedJSON[i].codarea == codarea_l2 && vdb_fileinvitedJSON[i].phone == phone9){
      var invitedname = contacts[k].displayName;
      break;
    }
  }
}
