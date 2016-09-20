'use strict';
var camera, hash, sourceSelected, video, videoSource;

video = document.getElementById('capture');

camera = 0;

videoSource = null;

if (window.location.hash) {
  hash = window.location.hash.replace('#', '');
  camera = parseInt(hash);
}

console.debug(camera);

sourceSelected = function(videoSource) {
  var constraints;
  return constraints = {
    video: {
      optional: [
        {
          sourceId: videoSource
        }
      ]
    }
  };
};

MediaStreamTrack.getSources(function(sourceInfos) {
  sourceInfos.forEach(function(sourceInfo) {
    if (sourceInfo.kind === 'video') {
      console.log(sourceInfo.id, sourceInfo.label || 'camera');
      console.debug(camera);
      if (camera === 0) {
        videoSource = sourceInfo.id;
      } else {
        --camera;
      }
      return console.debug(videoSource);
    }
  });
  console.debug(videoSource);
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia({
      video: true
    }).then(function(stream) {
      console.debug('x');
      video.src = window.URL.createObjectURL(stream);
      return video.play();
    });
  } else if (navigator.webkitGetUserMedia) {
    console.debug('y');
    return navigator.webkitGetUserMedia(sourceSelected(videoSource), function(stream) {
      video.src = window.URL.createObjectURL(stream);
      return video.play();
    }, function(e) {
      return console.debug(e);
    });
  }
});
