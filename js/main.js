var tests = ["index_1d", "index_2d", "index_2dh"];
var currentTestIndex = 0;
var results = [];
var testTypes = ["apps", "inputs"];
var currentTypeIndex = 0;

$(window).load(function() {
  tests = shuffle(tests);

  $("#initDialog").css("display", "inherit");
  $("#btnGoFullScreen").focus();
  $("#btnGoFullScreen").click(function(e) {
    // $("#test1d").css("display","block");
    // document.getElementById('test1d').contentWindow.location.reload();
    $("#initDialog").css("display", "none");
    goFullScreen();
    launchTest(tests[0], testTypes[0]);
  });
});

function launchTest(testId, testType) {
  var iframes = document.getElementsByTagName('iframe');
  for (var i = 0; i < iframes.length; i++) {
      iframes[i].parentNode.removeChild(iframes[i]);
  }

  var iframe = document.createElement('iframe');
  // iframe.style.display = "none";
  iframe.src = testId + ".html" + '?type=' + testType + '&rand=' + Math.round(Math.random() * 10000000);
  // iframe.src = testId + ".html";
  iframe.setAttribute("id", testId);
  document.body.appendChild(iframe);

  $("#spanIdx").text("Test " + (currentTestIndex + currentTypeIndex * tests.length + 1) + " of " + tests.length * testTypes.length);
  if (testType === "apps") {
    $("#spanTarget").text('Please find the app "CBS News"');
  } else if (testType === "inputs") {
    $("#spanTarget").text('Please find "Cable/Antenna" from inputs');
  }
}

function logUsage(testId, userInput, timeElapsed, type) {
  results.push({"id": testId,
                "input": userInput,
                "time": timeElapsed,
                "type": type});
}

function proceedToNextTest() {
  if (currentTestIndex < tests.length - 1) {
    currentTestIndex++;
    $("#timeoutDialog").css("display", "inherit");
    setTimeout(function() {
      $("#timeoutDialog").css("display", "none");
      launchTest(tests[currentTestIndex], testTypes[currentTypeIndex]);
    }, 3000);
  } else {
    if (currentTypeIndex >= testTypes.length - 1) {
      alert("submit survey");
      // window.location.replace("https://docs.google.com/forms/d/1zIlhBDjh7gX25fBpLxNrVC3S1ZbJnPunyPctbCAngpg/viewform?entry.1372249966=" + usageData);
    } else {
      currentTestIndex = -1;
      currentTypeIndex++;
      proceedToNextTest();
    }
  }
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

function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};
