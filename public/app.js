import itemEditor from '/components/items/itemEditor.js'
import clientManager from '/Managers/clientManager.js'
import invoiceManager from '/Managers/invoiceManager.js'
import editorManager from '/Managers/editorManager.js'
// import toastManager from '/Managers/toastManager.js'
// import tosterMan from '/components/toasts/tosterMan.js'

// Initialize toastManager and assigns it to window
// window.toastManager = toastManager()
// window.callToast = window.toastManager.callToast.bind(window.toastManager)
// window.callError = window.toastManager.toastError.bind(window.toastManager)
// window.callSuccess = window.toastManager.toastSuccess.bind(window.toastManager)
// window.callWarning = window.toastManager.toastWarning.bind(window.toastManager)
// window.callInfo = window.toastManager.toastInfo.bind(window.toastManager)

document.addEventListener('alpine:init', () => {
  console.log('##---- App.js --> Alpine initializes in App js')

  Alpine.data('tabManager', () => ({
    tabSelected: Alpine.$persist('').as('tabSelected'),
    globalTabContent: Alpine.$persist('').as('globalTabContent'),
    isLoading: true,
    sideBar: Alpine.$persist(true).as('sideBar'),

    async init() {
      console.log('>>---- Tab Manager Initialized')
      const clientsExist = await Alpine.store('clients').fetchClients()
      const selectedClient = localStorage.getItem('selectedClient')

      if (!clientsExist) {
        console.warn('No clients exist. Redirecting to clients manager for creation.')
        await this.loadTabContent('clients')
        Alpine.store('clients').openClientCreationModal()
        return
      }

      // If clients exist but no client is selected
      if (!selectedClient) {
        console.warn('Clients available but no client selected. Opening client selection modal.')
        await this.loadTabContent('clients')
        Alpine.store('clients').openModal()
        return
      }

      // If a client exists and is selected, proceed normally
      if (!this.tabSelected) {
        await this.loadTabContent('clients')
      } else {
        await this.loadTabContent(this.tabSelected)
      }

      this.isLoading = false
    },
    tabContentActive(globalTabName) {
      return this.tabSelected === globalTabName
    },

    async loadTabContent(globalTabName) {
      try {
        const response = await fetch(`/html/${globalTabName}.html`)
        const content = await response.text()
        this.tabSelected = globalTabName // Persist tab selection
        this.globalTabContent = content // Persist content

        this.initTabComponent(globalTabName)
      } catch (error) {
        console.error(`Error loading tab content for ${globalTabName}:`, error)
      }
    },

    async initTabComponent(globalTabName) {
      this.isLoading = false
      if (globalTabName === 'clients') {
        Alpine.data('clientManager', clientManager)
      } else if (globalTabName === 'invoices') {
        Alpine.data('invoiceManager', invoiceManager)
      } else if (globalTabName === 'editor') {
        Alpine.data('editorManager', editorManager)
      }
    },

    sideBarOpen() {
      this.sideBar = !this.sideBar
    },

    async tabButtonClicked(globalTabName) {
      if (this.tabSelected !== globalTabName) {
        await this.changeTab(globalTabName)
      }
    },

    async changeTab(globalTabName) {
      this.isLoading = true
      setTimeout(async () => {
        await this.loadTabContent(globalTabName)
        this.isLoading = false
      }, 200)
    },
  }))
  // Initialization of component managers
  Alpine.data('clientManager', clientManager)
  Alpine.data('itemEditor', itemEditor)
  Alpine.data('invoiceManager', invoiceManager)
  Alpine.data('editorManager', editorManager)
  // Alpine.data('tosterMan', tosterMan)
  // Alpine.data('toastManager', toastManager)
})
document.addEventListener('alpine:initialized', () => {
  if (Alpine) {
    console.log('##----------------------->Alpine and its dependencies started <-----------------------##')
  } else {
    console.log('No Alpine whatsup?')
  }
})
// document.addEventListener('toast-show', () => {
//   console.log('Received the event', tosterMan())
// })
