var loopmessage = 0;

function conectionCheck(treadyState, tstatus){
  if (treadyState == 4 && tstatus == 0) {
    if (loopmessage == 0) {
      loopmessage = 1;
      var eventuimessage = "Ops! Erro de conexão, favor invormar o número " + tstatus + " para suporte@wolppi.com";
      navigator.notification.alert(eventuimessage, null, 'Wolppi', 'OK');
      window.location.href = "start.html";
    }
  }
  if (tstatus > 200) {
    if (tstatus > 400) {
      if (tstatus == 410) {
        if (loopmessage == 0) {
          var eventuimessage = "Talvez você esteja sem acesso a internet. Erro " + tstatus;
          loopmessage = 1;
          navigator.notification.alert(eventuimessage, null, 'Wolppi', 'OK');
          window.location.href = "start.html";
        }
      } else {
        if (loopmessage == 0) {
          loopmessage = 1;
          var eventuimessage = "Ops! Erro de conexão, favor invormar o número " + tstatus + " para suporte@wolppi.com";
          navigator.notification.alert(eventuimessage, null, 'Wolppi', 'OK');
          window.location.href = "start.html";
        }
      }
    }
  }
}
