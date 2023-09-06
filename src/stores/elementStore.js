import { defineStore } from 'pinia'
//import * as uuid from '../classes/uuids'

export const useElementStore = defineStore('elements', {
    state: () => ({ 
        elementArray: [
            {
                elementTemplateId: 1,
                instanceId: '',
                name: 'Text',
                sub: 'Single line',
                icon: 'mdi-text',
                options: {
                    type: 'text'
                }
            },
            {
                elementTemplateId: 1,
                instanceId: '',
                name: 'Text Long',
                sub: 'Multiline',
                icon: 'mdi-text-long',
                options: {
                    type: 'text'
                }
            },
            {
                elementTemplateId: 1,
                instanceId: '',
                name: 'Number',
                sub: 'Integer/Decimal',
                icon: 'mdi-numeric',
                options: {
                    type: 'number'
                }
            },
        ],
    }),
    getters: {
        list: (state) => { return state.elementArray },
    },
    actions: {
        getElements() {
            return this.elementArray
        },
        saveAlert() {
            //this.alerts.push(payload)
        },
        clearAlerts() {
            //this.alerts = []
        }
    },
})