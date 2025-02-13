// editorMain.js
import editView from './editView.js'

export default function editorMain() {
  return {
    init() {
      console.log('[EditorMain] Initialising')
      Alpine.data('editView', editView)

      // Fetch the edit-view HTML
      this.fileFetcher('/html/editor/editView.html', '#edit-view')
    },
    fileFetcher(file, target) {
      fetch(file)
        .then(res => res.text())
        .then(html => {
          const targetElement = document.querySelector(target)
          targetElement.innerHTML = html

          // Re-initialise Alpine on the injected content
          Alpine.initTree(targetElement)
        })
        .catch(err => console.error('Error fetching file:', err))
    },
  }
}
