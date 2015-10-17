var t0 = 0;
$(window).load(function() {
  // $("body > div").css("display", "none");
  //
  // $(".initDialog").css("display", "block");
  //
  // $(".initDialog button").click(function () {
  //   // goFullScreen();
  //   $("body > div").css("display", "block");
  //   $('div.initDialog').css("display", "none");
  //   init();
  // });
  //
  // $(".initDialog button").focus();

  init();

});

function init() {
  t0 = getTimeStamp();
  // init row entries
  $('.rowEntry').addClass("focusable");
  $('.rowEntry').each(function (index, element) {
    $(element).attr("id", "rowEntry_" + index);
    $(element).attr("tabindex", "-1");
  })

  // init dimension
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  var tileWidth = windowWidth * 0.1625;
  var tileHeight = tileWidth;
  var tileMargin = 1;

  var pageMargin = windowWidth * 0.1;

  addStyleString(".rowEntry { margin-right: " + tileMargin + "px; margin-bottom: " + tileMargin + "px; line-height: " + tileHeight + "px; height: " + tileHeight + "px; width: " + tileWidth + "px;}");
  addStyleString(".entryPlaceHolder { width: " + pageMargin + "px; display: inline-block; }");
  addStyleString(".rowTitle { margin-left: " + pageMargin + "px; }");
  addStyleString(".dateTile { margin-right: " + pageMargin + "px; }");
  addStyleString(".singleRowContainer { position: absolute; top: 50%; transform: translateY(-50%); }");

  // page behaviors

  // $(".singleRowContainer:first > div > .rowEntry").focus(function () {
  $(".rowEntry").focus(function () {
    // window.scrollTo(0,0);
    $(window).scrollTo($(this), 250, {offset: function() { return {top:-windowHeight / 2, left: 0}; }});
    if ($(this).parent().hasClass("rowTiles")) {
      $(this).parent().stop();
      $(this).parent().scrollTo($(this), 250, {offset: function() { return {top:0, left: -pageMargin-5}; }});
    }
    if ($(this).parent().parent().hasClass("rowTiles")) {
      $(this).parent().parent().stop();
      $(this).parent().parent().scrollTo($(this), 250, {offset: function() { return {top:0, left: -pageMargin-5}; }});
    }
    dPadNav.scanFocusables(".rowEntry");
  });

  $('.allapps').keypress(function (e) {
    if (e.keyCode != 13) {
      return;
    }

    // usageData += "|" + (getTimeStamp() - t0);
    // parent.logUsage("index_1d", usageData, getTimeStamp() - t0);
    reportUsage();
    window.location.replace("index_1d_apps.html");
  });
  $('.target').keypress(function (e) {
    if (e.keyCode != 13) {
      return;
    }
    usageData += "|" + (getTimeStamp() - t0);
    window.location.replace("https://docs.google.com/forms/d/1zIlhBDjh7gX25fBpLxNrVC3S1ZbJnPunyPctbCAngpg/viewform?entry.1372249966=" + usageData);
  })


  // init date
  var d = new Date();
  $('.dateTile').text((d.getMonth() + 1) + "/" + d.getDate());

  $(".rowEntry:first").focus();
}

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}
