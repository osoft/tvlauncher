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

  var tileWidth = windowWidth * 0.2;
  var tileHeight = tileWidth * 9 / 16;
  var tileMargin = windowWidth * 0.0125;

  var titleTileWidth = windowWidth * 0.1625;
  var leftTitlePaneWidth = windowWidth * 0.35;

  var pageMargin = windowWidth * 0.1;

  var fzRegular = 0.02825 * windowWidth;
  var fzLarge = fzRegular * 1.5;
  var fzSmall = fzRegular * 0.6;

  addStyleString(".rowEntry { font-size: " + fzSmall + "px; margin-right: " + tileMargin + "px; margin-bottom: " + tileMargin + "px; line-height: " + tileHeight + "px; height: " + tileHeight + "px; width: " + tileWidth + "px;}");
  addStyleString(".entryPlaceHolder { width: " + pageMargin + "px; display: inline-block; }");
  addStyleString(".rowTitle { margin-left: " + pageMargin + "px; }");
  addStyleString(".dateTile { margin-right: " + pageMargin + "px; }");
  addStyleString(".leftTitlePane { width: " + leftTitlePaneWidth + "px; }");
  addStyleString(".titleTile { font-size: " + fzRegular + "px; width: " + titleTileWidth + "px; height: " + titleTileWidth + "px; line-height: " + titleTileWidth + "px; }");
  addStyleString(".verticalRowContainer { height: " + windowHeight + "px; }");
  addStyleString(".verticalRowContainer > div { top: 50%; transform: translateY(-50%); position: relative; }");
  addStyleString("body { font-size: " + 0.02825 * windowWidth + "px; }")


  // page behaviors

  // $(".singleRowContainer:first > div > .rowEntry").focus(function () {
  $(".rowEntry").focus(function () {
    // window.scrollTo(0,0);
    //$(window).scrollTo($(this), 250, {offset: function() { return {top:-windowHeight / 2, left: 0}; }});
    $('.verticalRowContainer').scrollTo($(this), 250, {offset: function() { return {top:-windowHeight / 2 + tileHeight / 2, left: 0}; }});
    // if ($(this).parent().hasClass("rowTiles")) {
    //   $(this).parent().scrollTo($(this), 250, {offset: function() { return {top:0, left: -pageMargin-5}; }});
    // }
    // if ($(this).parent().parent().hasClass("rowTiles")) {
    //   $(this).parent().parent().scrollTo($(this), 250, {offset: function() { return {top:0, left: -pageMargin-5}; }});
    // }
    dPadNav.scanFocusables(".rowEntry");
  });

  // $('.allapps').keypress(function (e) {
  //   if (e.keyCode != 13) {
  //     return;
  //   }
  //   window.location.replace("index_1d_apps.html");
  // });
  $('.target').keypress(function (e) {
    if (e.keyCode != 13) {
      return;
    }
    reportUsage();
    parent.proceedToNextTest();
  })


  $(".rowEntry:first").focus();
}

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}
