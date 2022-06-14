var model  = "";
var serial = "";
var uuid   = "";

var getPhone = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
      model  = device.model;
      serial = device.serial;
      uuid   = device.uuid;
    },
};

getPhone.initialize();
