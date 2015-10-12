validateField = function (target) {
  if (target.value.length < 1) {
    $(target).addClass("invalid animated shake")
  } else {
    $(target).removeClass("invalid animated shake")
  }
}
