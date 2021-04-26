$(function () {
  if (window.location.href.toString().toLowerCase().indexOf("ar") > -1) {
    $('link[href="assets/styles/style.css"]').attr(
      "href",
      "/assets/styles/style.rtl.css"
    );
  } else if (window.location.href.toString().toLowerCase().indexOf("en") > -1) {
    $('link[href="assets/styles/style.rtl.css"]').attr(
      "href",
      "/assets/styles/style.css"
    );
  }
});
