(function () {
  var navButtons = document.querySelectorAll(".nav-btn");

  function openNavigation(address, label) {
    var query = encodeURIComponent(address);
    var mapsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + query;
    var geoUrl = "geo:0,0?q=" + query;
    var appleMapsUrl = "maps://?daddr=" + query + "&q=" + encodeURIComponent(label);

    var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = isIOS ? appleMapsUrl : geoUrl;
      setTimeout(function () {
        window.open(mapsUrl, "_blank", "noopener");
      }, 650);
      return;
    }

    window.open(mapsUrl, "_blank", "noopener");
  }

  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var address = button.getAttribute("data-address");
      var label = button.getAttribute("data-label") || "Destinație";

      if (!address) {
        return;
      }

      openNavigation(address, label);
    });
  });
})();
