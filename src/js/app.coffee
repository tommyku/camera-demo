'use strict'

video = document.getElementById 'video'
camera = 0
videoSource = null

if (window.location.hash)
  hash = window.location.hash.replace('#', '')
  camera = parseInt(hash)

console.debug camera

sourceSelected = (videoSource)->
  constraints = {
    video: {
      optional: [{sourceId: videoSource}]
    }
  }

MediaStreamTrack.getSources((sourceInfos)->
  return if (camera < 0)

  sourceInfos.forEach((sourceInfo)->
    if (sourceInfo.kind == 'video')
      console.log(sourceInfo.id, sourceInfo.label || 'camera')

      console.debug camera

      if (camera == 0)
        videoSource = sourceInfo.id
      else
        --camera

      console.debug videoSource
  )

  console.debug videoSource


  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    navigator
      .mediaDevices
      .getUserMedia(sourceSelected(videoSource))
      .then((stream)->
        console.debug 'x'
        video.src = window.URL.createObjectURL(stream)
        video.play()
      )
  else if (navigator.webkitGetUserMedia)
    console.debug 'y'
    navigator.webkitGetUserMedia(
      sourceSelected(videoSource)
      , (stream)->
        video.src = window.URL.createObjectURL(stream)
        video.play()
      , (e)->
        console.debug e
    )
)
