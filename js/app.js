$(document).ready(function () {
  var target = $('<ul></ul>').appendTo('#search-results');

  $('#search-term').on('submit', function (event) {
    event.preventDefault();
    getVideos(this.getElementsByTagName('input')[0].value);
  });

  function getVideos(searchTerm) {
    $.getJSON(
      'https://www.googleapis.com/youtube/v3/search',
      {
        'key': 'AIzaSyAzvly5yMScTKIJTnr4PUg48lZ2pHZ4ru8',
        'part': 'snippet',
        'q': searchTerm
      },
      function (data) {
        console.log(data);
        if (data.error) { return showError(data.error); }
        showVideos(data.items);
      });
  }

  function showError(err) {
    if (typeof err !== 'string') { err = JSON.stringify(err); }
    target
      .find('.error').remove().end()
      .prepend('<li class="error">' + err + '</li>');
  }

  function showVideos(items) {
    target.empty();
    items.forEach(function (item) {
      var videoUrl, thumbUrl;
      if (item.id.kind !== 'youtube#video') { return; }
      videoUrl = 'https://youtube.com/watch?v=' + item.id.videoId;
      thumbUrl = item.snippet.thumbnails.default.url;
      target.append(
        '<li>' +
          '<a href="' + videoUrl + '"><img src="' + thumbUrl + '"></a>' +
        '</li>');
    });
  }
});