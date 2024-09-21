import React from 'react'

const PodcastDetails = ({params}:{params:{podcastId: string}}) => {
  return (
    <div>
      podcastId: {params.podcastId}
    </div>
  )
}

export default PodcastDetails
