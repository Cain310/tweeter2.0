

$(document).ready(function () {
  var maxLength = 140;
  $("#countstroke").keyup(function () {
    var length = $(this).val().length;
    var length = maxLength - length;
    if (length < 0) {
      $("#count").text(length).addClass("negcountercolor");
      ($("#errorMessage").text("Too Many Characters!!!"));
      ($("#errorMessage").addClass("negcountercolor"));
    } else {
      $('#count').text(length).removeClass("negcountercolor");
      $('#errorMessage').text(length).removeClass("negcountercolor");
      ($("#errorMessage").text("Compose Leaf"));
    }
  });
})
