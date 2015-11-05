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
  var testCounter = currentTypeIndex + currentTestIndex * testTypes.length + 1;
  if (testCounter === 1) {
    $('#timeoutDialog > div > div:nth-of-type(1) > span').text("The test will take approximately in total 5 minutes. Please make sure you have this much of uninterrupted time.");
    $('#timeoutDialog > div > div:nth-of-type(3) > span').text("Use your keyboard to:");
    $('#timeoutDialog > div > div:nth-of-type(5) > span').html("&#x21E6;&#x21E7;&#x21E8;&#x21E9;: Move focus &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter/Return: Select");
  } else {
    $('#timeoutDialog > div > div:nth-of-type(1) > span').text("");
    $('#timeoutDialog > div > div:nth-of-type(3) > span').text("");
    $('#timeoutDialog > div > div:nth-of-type(5) > span').text("");
  }

  $('#timeoutDialog > div > div:nth-of-type(7) > span').text("Test " + (currentTypeIndex + currentTestIndex * testTypes.length + 1) + " of " + tests.length * testTypes.length + ":");

  if (testType === "apps") {
    $('#timeoutDialog > div > div:nth-of-type(9) > span').html('Find the app <span class="spanKeyword">"CBS News"</span>');
  } else if (testType === "inputs") {
    $('#timeoutDialog > div > div:nth-of-type(9) > span').html('Find the input source <span class="spanKeyword">"PlayStation"</span>');
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
      $("#spanTarget").text('Find the app "CBS News"');
    } else if (testType === "inputs") {
      $("#spanTarget").text('Find the input source "PlayStation"');
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
