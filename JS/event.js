document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
   document.addEventListener("backbutton", function(){
   }, false);
}

window.addEventListener('load', dateStart);
window.addEventListener('load', timeStart);
window.addEventListener('load', dateFinish);
window.addEventListener('load', timeFinish);

function dateStart() {
    document.getElementById("datestart").readOnly = true;
    $( "#datestart" ).datepicker({
      minDate: 0,
      dateFormat: 'D dd/mm/yy',
      dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
      dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
      dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
      monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    });
};

function timeStart() {
  document.getElementById("timestart").readOnly = true;
  $( "#timestart" ).timepicker({
    timeFormat: 'HH:mm',
    interval: 15,
    });
};

function dateFinish() {
    document.getElementById("datefinish").readOnly = true;
    $( "#datefinish" ).datepicker({
      minDate: 0,
      dateFormat: 'D dd/mm/yy',
      dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
      dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
      dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
      monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    });
};

function timeFinish() {
  document.getElementById("timefinish").readOnly = true;
  $( "#timefinish" ).timepicker({
    timeFormat: 'HH:mm',
    interval: 15
    });
};
