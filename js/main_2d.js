$(window).load(function() {
  // $("body > div").css("display", "none");

  // $(".initDialog").css("display", "block");

  // $(".initDialog button").click(function () {
    // goFullScreen();
    // $("body > div").css("display", "block");
    // $('div.initDialog').css("display", "none");
    init();
  // });

  // $(".initDialog button").focus();

});

function init() {
  // init row entries
  $('.rowEntry').addClass("focusable");
  $('.rowEntry').each(function (index, element) {
    $(element).attr("id", "rowEntry_" + index);
    $(element).attr("tabindex", "-1");
  })

  // init dimension
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  var tileWidth = windowWidth * 0.125;
  var tileHeight = tileWidth * 9 / 16;
  var tileMargin = windowWidth * 0.00625;

  var pageMargin = windowWidth * 0.05;

  addStyleString(".rowEntry { margin-right: " + tileMargin + "px; margin-bottom: " + tileMargin + "px; line-height: " + tileHeight + "px; height: " + tileHeight + "px; width: " + tileWidth + "px;}");
  addStyleString(".entryPlaceHolder { width: " + pageMargin + "px; display: inline-block; }");
  addStyleString(".rowTitle { margin-left: " + pageMargin + "px; }");
  addStyleString(".dateTile { margin-right: " + pageMargin + "px; }");

  // page behaviors

  // $(".singleRowContainer:first > div > .rowEntry").focus(function () {
  $(".rowEntry").focus(function () {
    // window.scrollTo(0,0);
    $(window).scrollTo($(this), 250, {offset: function() { return {top:-windowHeight / 2, left: 0}; }});
    if ($(this).parent().hasClass("rowTiles")) {
      $(this).parent().scrollTo($(this), 250, {offset: function() { return {top:0, left: -pageMargin-5}; }});
    }
    if ($(this).parent().parent().hasClass("rowTiles")) {
      $(this).parent().parent().scrollTo($(this), 250, {offset: function() { return {top:0, left: -pageMargin-5}; }});
    }
    dPadNav.scanFocusables(".rowEntry");
  });
  $('.target').keypress(function (e) {
    if (e.keyCode != 13) {
      return;
    }

    reportUsage();
    parent.proceedToNextTest();
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
