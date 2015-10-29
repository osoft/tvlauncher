var tests = ["index_1d", "index_2d", "index_2dh"];
var currentTestIndex = 0;
var results = [];
var testTypes = ["inputs", "apps"];
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
    setTimeout(function() {
      var frameHeight = $('.overlayNotification').outerHeight();
      addStyleString("iframe { padding-top: " + frameHeight + "px; height: " + ($(window).height() - frameHeight) + "px; }");

      launchTest(tests[0], testTypes[0]);
    }, 1000);
  });
});

function launchTest(testId, testType) {
  if (testType === "apps") {
    $('#timeoutDialog span:first').text("In the next screen, please find 'CBS News' from Apps");
  } else if (testType === "inputs") {
    $('#timeoutDialog span:first').text("In the next screen, please find 'PlayStation' from Inputs");
  }
  $('#timeoutDialog').css("display", "inherit");

  $('#btnNext').focus();
  $('#btnNext').click(function() {
    $('#timeoutDialog').css("display", "none");


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

    $("#spanIdx").text("Test " + (currentTypeIndex + currentTestIndex * testTypes.length + 1) + " of " + tests.length * testTypes.length);
    if (testType === "apps") {
      $("#spanTarget").text('Please find the app "CBS News"');
    } else if (testType === "inputs") {
      $("#spanTarget").text('Please find "PlayStation" from Inputs');
    }
  });

}

function logUsage(testId, userInput, timeElapsed, type) {
  results.push({"id": testId,
                "input": userInput,
                "time": timeElapsed,
                "type": type});
}

function proceedToNextTest() {
  if (currentTestIndex >= tests.length - 1 && currentTypeIndex >= testTypes.length - 1) {
      var paramString = "?";
      var i = 0;
      for (i = 0; i < results.length; i++) {
        var r = results[i];

        if (i != 0) {
          paramString += "&";
        }

        if (r.id === "index_1d.html" && r.type === "apps") {
          paramString += "1dma=" + r.time + "|" + r.input;
        } else if (r.id === "index_1d.html" && r.type === "inputs") {
          paramString += "1dmi=" + r.time + "|" + r.input;
        } else if (r.id === "index_1d_apps.html" && r.type === "apps") {
          paramString += "1daa=" + r.time + "|" + r.input;
        } else if (r.id === "index_1d_inputs.html" && r.type === "inputs") {
          paramString += "1dii=" + r.time + "|" + r.input;
        } else if (r.id === "index_2d.html" && r.type === "apps") {
          paramString += "2dva=" + r.time + "|" + r.input;
        } else if (r.id === "index_2d.html" && r.type === "inputs") {
          paramString += "2dvi=" + r.time + "|" + r.input;
        } else if (r.id === "index_2dh.html" && r.type === "apps") {
          paramString += "2dha=" + r.time + "|" + r.input;
        } else if (r.id === "index_2dh.html" && r.type === "inputs") {
          paramString += "2dhi=" + r.time + "|" + r.input;
        }

      }
      window.location.replace("survey2.html" + paramString);
  } else {
    if (currentTypeIndex >= testTypes.length - 1) {
      currentTestIndex++;
      currentTypeIndex = 0;
    } else {
      currentTypeIndex++;
    }
    // $("#timeoutDialog").css("display", "inherit");
    // setTimeout(function() {
      // $("#timeoutDialog").css("display", "none");
      launchTest(tests[currentTestIndex], testTypes[currentTypeIndex]);
    // }, 1500);
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
