var t0 = 0;
var tests = ["test1d", "test2d"];
var results = [];

$(window).load(function() {

  $(".initDialog").css("display", "inherit");
  $("#btnGoFullScreen").click(function(e) {
    // $("#test1d").css("display","block");
    // document.getElementById('test1d').contentWindow.location.reload();
    $(".initDialog").css("display", "none");
    goFullScreen();
    launchTest("index_1d");
  });
});

var usageData = "-----DO-NOT-EDIT-----";

$(document).on("keydown", function (e) {
    console.log("Try Move focus: keyup " + e);
    switch (e.keyCode) {
        case 39: // Right
            usageData += "r";
            break;
        case 37: // Left
            usageData += "l";
            break;
        case 38: // Up
            usageData += "u";
            break;
        case 40: // Down
            usageData += "d";
            break;
        default:
            break;
    }
});

function launchTest(testId) {
  var iframe = document.createElement('iframe');
  // iframe.style.display = "none";
  iframe.src = testId + ".html";
  iframe.setAttribute("id", testId);
  document.body.appendChild(iframe);
}

function logUsage(testId, userInput, timeElapsed) {
  results.push({"id": testId,
                "input": userInput,
                "time": timeElapsed});
}

function getTimeStamp() {
  return Math.floor(new Date().valueOf() / 1000);
}
function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

function goFullScreen() {
  if (
	document.fullscreenEnabled ||
	document.webkitFullscreenEnabled ||
	document.mozFullScreenEnabled ||
	document.msFullscreenEnabled
  ) {
    // var i = $("body").get(0);
    var i = document.documentElement;
    if (i.requestFullscreen) {
    	i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
    	i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
    	i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
    	i.msRequestFullscreen();
    }
  }
}
