import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import WebFont from 'webfontloader';

import '@mdi/font/css/materialdesignicons.css'
import 'flatpickr/dist/flatpickr.css';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { VNumberInput } from 'vuetify/components'

import { VFileUpload } from 'vuetify/labs/VFileUpload'

const vuetify = createVuetify({
    components: {
        ...components,
        VFileUpload,
        VNumberInput,
    },
    directives,
    defaults: {
        VTextField: {
            variant: 'outlined',
            density: 'compact',
        },
        VTextarea: {
            variant: 'outlined',
            density: 'compact',
        },
        VLabel: {
            color: 'black',
        },
        VBtn: {
            color: 'grey-darken-4',
            variant: 'flat',
            rounded: '0',
            ripple: false,
        },
        VSelect: {
            variant: 'outlined',
        },
        VList: {
            elevation: '0',
            rounded: '0',
        },
        VCard: {
            elevation: '0',
            rounded: '0',
        },
        VExpansionPanel: {
            elevation: '0',
            rounded: '0',
        },
    },
    display: {
        thresholds: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
});

const appName = import.meta.env.VITE_APP_NAME || 'LPF';

WebFont.load({
    google: {
        families: ['Playfair Display']
    },
    active: function() {
        createInertiaApp({
            title: (title) => `${title} - ${appName}`,
            resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
            setup({ el, App, props, plugin }) {
                return createApp({ render: () => h(App, props) })
                    .use(plugin)
                    .use(vuetify)
                    .use(ZiggyVue)
                    .mount(el);
            },
            progress: {
                color: '#4B5563',
            },
        });
    }
});
