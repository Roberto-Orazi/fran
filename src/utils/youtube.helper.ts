export const convertToEmbedUrl = (url: string): string | null => {
  let videoId = null

  // RegExp patterns for various ways YouTube videos can be represented.
  const urlPatterns = [
    // Regular YouTube URLs
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*v=([^&]+)/,
    // youtu.be URLs
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
    // YouTube embed URLs
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
    // YouTube short URLs
    /(?:https?:\/\/)?youtu\.be\/([^?]+)/
  ]

  // Check each pattern until we find a match
  for (const pattern of urlPatterns) {
    const matches = url.match(pattern)
    if (matches && matches[1]) {
      videoId = matches[1]
      break
    }
  }

  // If we found the video ID, construct the embed URL
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }

  // If no patterns matched, return null
  return null
}
