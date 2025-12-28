import { useEffect } from 'react'
import { loadProgressBar } from 'axios-progress-bar'

function LoadingBar() {
  useEffect(() => {
    loadProgressBar()
  }, [])

  return <div id="nprogress-container" aria-live="polite" />
}

export default LoadingBar
