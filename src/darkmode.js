;(() => {
  function setDarkMode(doc = document) {
    const key = 'theme'
    const query = '(prefers-color-scheme: dark)'
    const isSystemDarkMode = window.matchMedia(query).matches
    const isDarkMode =
      window.localStorage[key] === 'dark' ||
      (!(key in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) doc.documentElement.classList.add('dark')
  }

  setDarkMode()
})()
