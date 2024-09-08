import clientManager from './clientManager.js';
import stylesManager from './stylesManager.js';
import invoiceManager from './invoiceManager.js';
import toastManager from './toastManager.js';

// Initialize toastManager and assign it to window
window.toastManager = toastManager();
window.callToast = window.toastManager.callToast.bind(window.toastManager);

document.addEventListener('alpine:init', () => {
    Alpine.data('tabManager', () => ({
        tabSelected: 'clients',
        tabContent: '',
        isLoading: true, // Set initial loading state to true

        async init() {
            // Ensure isLoading is initially set to true, then trigger content load
            await this.loadInitialContent();
        },

        async loadInitialContent() {
            // Load initial content without setting isLoading to false immediately
            await this.loadTabContent('clients');
            this.isLoading = false; // This should trigger the initial enter transition
        },

        async tabButtonClicked(tabName) {
            await this.changeTab(tabName);
        },

        tabContentActive(tabName) {
            return this.tabSelected === tabName;
        },

        async changeTab(tabName) {
            this.isLoading = true; // Trigger leave transition

            setTimeout(async () => {
                await this.loadTabContent(tabName);
                this.isLoading = false; // Trigger enter transition
            }, 200); // Adjust timeout to match transition duration
        },

        async loadTabContent(tabName) {
            const response = await fetch(`/${tabName}.html`);
            const content = await response.text();
            this.tabSelected = tabName;

            this.$nextTick(() => {
                this.tabContent = content;
                this.initTabComponent(tabName);
            });
        },

        initTabComponent(tabName) {
            if (tabName === 'styles') {
                Alpine.data('stylesManager', stylesManager);
            } else if (tabName === 'clients') {
                Alpine.data('clientManager', clientManager);
            } else if (tabName === 'invoices') {
                Alpine.data('invoiceManager', invoiceManager);
            }
        },
    }));

    Alpine.data('clientManager', clientManager);
    Alpine.data('stylesManager', stylesManager);
    Alpine.data('invoiceManager', invoiceManager);
    Alpine.data('toastManager', toastManager);
});
