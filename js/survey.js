
var fieldMapping = [
  {
    type: "1dma",
    fieldId: "entry_2085924556",
  },
  {
    type: "1dmi",
    fieldId: "entry_1910128600",
  },
  {
    type: "1daa",
    fieldId: "entry_407149898",
  },
  {
    type: "1dii",
    fieldId: "entry_1405351172",
  },
  {
    type: "2dha",
    fieldId: "entry_829511515",
  },
  {
    type: "2dhi",
    fieldId: "entry_19431124",
  },
  {
    type: "2dva",
    fieldId: "entry_1835809793",
  },
  {
    type: "2dvi",
    fieldId: "entry_58791075",
  }

];

$(window).load(function() {
  var i;
  for (i = 0; i < fieldMapping.length; i++) {
    var type = fieldMapping[i].type;
    $('textarea#' + fieldMapping[i].fieldId).text(getQueryParams()[type]);
  }
});

function getQueryParams() {
    var qs = window.location.search;
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}
