$(window).load(function() {
    init();
});

function enableFocus(classSelector) {
  var className = classSelector.split(".")[1];
  $(classSelector).addClass("focusable");
  $(classSelector).each(function (index, element) {
    $(element).attr("id", className + "_" + index);
    $(element).attr("tabindex", "-1");
  });
}

function init() {
  // init row entries
  $('.rowEntry').addClass("focusable");
  $('.rowEntry').each(function (index, element) {
    $(element).attr("id", "rowEntry_" + index);
    $(element).attr("tabindex", "-1");
  });

  enableFocus(".recommendationPoster");
  enableFocus(".featureAppVertical");
  enableFocus(".featureAppHorizontal");


  // init dimension
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  var tileWidth = windowWidth * 0.1875;
  var tileHeight = tileWidth * 9 / 16;
  var tileMargin = windowHeight * 0.0025;

  var pageMargin = windowWidth * 0.05;

  var posterWidth = windowWidth * 0.1675;
  var posterHeight = tileHeight * 3 + tileMargin * 2;

  var featureHorizontalWidth = windowWidth * 0.25;
  var featureVerticalWidth = (featureHorizontalWidth - tileMargin) / 2;

  var sectionMargin = windowWidth * 0.025;

  addStyleString(".rowEntry { margin-right: " + tileMargin + "px; margin-bottom: " + tileMargin + "px; line-height: " + tileHeight + "px; height: " + tileHeight + "px; width: " + tileWidth + "px;}");
  addStyleString(".entryPlaceHolder { width: " + pageMargin + "px; display: inline-block; }");
  addStyleString(".rowTitle { margin-left: " + pageMargin + "px; }");
  addStyleString(".dateTile { margin-right: " + pageMargin + "px; }");

  addStyleString(".recommendationPoster { line-height: " + posterHeight + "px; height: " + posterHeight + "px; width: " + posterWidth + "px;}");
  addStyleString(".featureAppHorizontal { margin-bottom: " + tileMargin * 1.5 + "px; line-height: " + tileHeight + "px; height: " + tileHeight + "px; width: " + featureHorizontalWidth + "px;}");
  addStyleString(".featureAppVertical { margin-right: " + tileMargin + "px; line-height: " + (2 * tileHeight + tileMargin) + "px; height: " + (2 * tileHeight + tileMargin) + "px; width: " + featureVerticalWidth + "px;}");
  addStyleString(".sectionContainer { margin-right: " + sectionMargin + "px; }");
  addStyleString("body {margin-left: " + sectionMargin + "px;}")
  // page behaviors
    dPadNav.scanFocusables();

  // $(".singleRowContainer:first > div > .rowEntry").focus(function () {
  $(".focusable").focus(function () {
    // window.scrollTo(0,0);
    // $(window).scrollTo($(this), 250, {offset: function() { return {top:-windowHeight / 2, left: 0}; }});
    if ($(this).parent().hasClass("rowTiles")) {
      // $(this).parent().scrollTo($(this), 250, {offset: function() { return {top:0, left: -pageMargin-5}; }});
    }
    if ($(this).parent().parent().hasClass("rowTiles")) {
      // $(this).parent().parent().scrollTo($(this), 250, {offset: function() { return {top:0, left: -pageMargin-5}; }});
    }
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

  $(".focusable:first").focus();

  dPadNav.overrideMovement("recommendationPoster_0", "right", "featureAppHorizontal_0");
  // dPadNav.overrideMovement("featureAppHorizontal_0", "right", "rowEntry_0");
}

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}
