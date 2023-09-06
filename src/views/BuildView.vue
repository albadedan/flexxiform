<script>
import * as uuid from '../classes/uuids'
import BuildAppBar from '../components/BuildAppBar.vue'
import BuildToolbar from '../components/BuildToolbar.vue';
import { useElementStore } from '../stores/elementStore'
export default {
    setup() {
        const elements = useElementStore()
        return { elements }
    },
    components: {
        BuildAppBar,
        BuildToolbar,
    },
    data() {
        return {
            formElements: new Array(),

            hideElementsPanel: false,
            hideDetailsPanel: false,

            getExistingForm: false,

            // form publishing control
            publishingDisabled: true,

            // dragging controls
            sectionDrag: false,
            elementDrag: false,

            // selection control
            selected: { type: undefined, id: undefined },

            form: {},
            blankSection: { id: "", name: 'Section Name', desc: 'Section Description' }


        }
    },
    mounted() {

        this.formElements = this.elements.list

        if (this.getExistingForm) {
            // fetch
        } else {
            this.form = {
                id: uuid.generateStandard(),
                name: 'Form Name',
                icon: 'mdi-book-open-page-variant-outline',
                treatSectionsAsPages: false,
                sections: []
            }
            this.insertNewSectionAtEnd()
            this.insertNewSectionAtEnd()
            this.insertNewSectionAtEnd()
            this.dev_pushElements()
        }
    },
    methods: {
        insertNewSectionAtEnd: function() {
            this.insertNewSectionAt(-1)
        },
        insertNewSectionAt: function( /** @type {number} */ index ) {
            const section = this.generateBlankSection()
            if (index === -1) {
                this.form.sections.push( { ...section } )
            } else {
                this.form.sections.splice(index, 0, { ...section } )
            }
        },
        generateBlankSection: function() {
            return { 
                id: uuid.generateStandard(),
                hid: uuid.generateHumanReadable(),
                name: 'Section Name',
                desc: 'Section Description',
                elements: []
            }
        },
        dev_pushElements: function() {
            for (let i = 0; i < this.form.sections.length; i++) {
                this.form.sections[i].elements.push(...this.elements.list)
                this.form.sections[i].elements[this.form.sections[i].elements.length - 1].instanceId = uuid.generateNamedShort()
            }

        },
        log: function(event) {
            console.log("🚀 ~ file: BuildView.vue:88 ~ event:", event)
        }
    }
}
</script>

<template>
    <v-app-bar elevation="0">
        <BuildAppBar
        :disabled="publishingDisabled"></BuildAppBar>
    </v-app-bar>

    <v-navigation-drawer
    location="left"
    :rail="hideElementsPanel">
        <BuildToolbar
        title="Elements"
        @click="$event => hideElementsPanel = $event">

            <template #content>
                <v-list
                lines="one"
                density="compact"
                nav
                >

                    <v-list-subheader>
                        Sections
                    </v-list-subheader>

                    <v-list-subheader>
                        Fields
                    </v-list-subheader>

                    <draggable
                    v-model="formElements"
                    group="elementGroup"
                    @start="$event => log($event)"
                    @end="elementDrag = false"
                    item-key="">
                        <template #item="{element: fieldTemplate}">
                            <v-list-item
                            :key="fieldTemplate.id"
                            :title="fieldTemplate.name"
                            :subtitle="fieldTemplate.sub"
                            :prepend-icon="fieldTemplate.icon"></v-list-item>
                        </template>
                    </draggable>
                    

                </v-list>
            </template>

        </BuildToolbar>
    </v-navigation-drawer>

    <v-main scrollable>
        <v-container fluid>
            <v-card>
                <v-row>
                    <v-col>
                        <v-card-title>
                            Form
                        </v-card-title>
                    </v-col>
                    <v-col>
                        <v-card-title>
                            Preview
                        </v-card-title>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-container>

                    <!-- A. START OF SECTION AREA OF FORM -->
                    <!-- ?? B.1 START OF SECTION DRAG CONTROL -->
                    <draggable
                    v-model="form.sections"
                    group="formSections"
                    @start="sectionDrag = true"
                    @end="sectionDrag = false"
                    item-key="id">

                        <!-- ?? B.2 START OF SECTION DRAG TEMPLATE -->
                        <template #item="{element: section}">

                            <div>
                                <!-- ?? B.3 EACH ROW REPRESENTS ONE WHOLE SECTION -- START -->
                                <v-row>
                                    <v-col>
                                        <v-card
                                        elevation="1">

                                            <!-- ?? B.4 START OF SECTION VISIBILITY CONTROL -->
                                            <v-expansion-panels>
                                                <v-expansion-panel>

                                                    <!-- ?? B.5 SECTION TITLE AREA -->
                                                    <v-expansion-panel-title>

                                                        <!-- ?? B.6 TOOLBAR FOR SECTION ACTIONS, SUCH AS MOVE -->
                                                        <v-toolbar 
                                                        density="compact">

                                                            <v-icon icon="mdi-drag"></v-icon>
                                                            <v-toolbar-title>
                                                                <v-toolbar-title>
                                                                    ({{ form.sections.indexOf(section) + 1 }}) {{ section.name }}
                                                                </v-toolbar-title>
                                                            </v-toolbar-title>
                                                            <v-spacer></v-spacer>
                                                            <v-toolbar-items
                                                            variant="tonal">
                                                                <v-btn
                                                                icon="mdi-arrow-down-bold-outline"></v-btn>
                                                                <v-btn
                                                                icon="mdi-arrow-up-bold-outline"></v-btn>
                                                            </v-toolbar-items>
                                                        </v-toolbar>
                                                        <!-- ?? B.6 END OF TOOLBAR FOR SECTION ACTIONS, SUCH AS MOVE -->

                                                    </v-expansion-panel-title>
                                                    <!-- ?? B.5 END OF SECTION TITLE AREA -->

                                                    <!-- !! C.1 BEGINNING OF THIS SECTIONS'S ELEMENT AREA -->
                                                    <v-expansion-panel-text>
                                                        <v-expansion-panels>

                                                            <!-- !! C.2 BEGINNING OF ELEMENT GROUP AREA -->
                                                            <v-expansion-panel>

                                                                <!-- !! C.3 BEGINNING OF ELEMENT GROUP CONTROL AREA -->
                                                                <v-expansion-panel-title>
                                                                    <v-toolbar density="compact">
                                                                        <v-icon icon="mdi-drag"></v-icon>
                                                                        <v-toolbar-title>Elements</v-toolbar-title>
                                                                    </v-toolbar>
                                                                </v-expansion-panel-title>
                                                                <!-- !! C.3 END OF ELEMENT GROUP CONTROL AREA -->

                                                                <!-- %% D.1 BEGINNING OF INDIVIDUAL ELEMENT AREA -->
                                                                <v-expansion-panel-text>

                                                                    <!-- @@ E.1 START OF DRAG ELEMENT CONTROL -->
                                                                    <v-card-text>
                                                                        
                                                                        <!-- $$ F.1 START OF ELEMENT DRAG COMPONENT -->
                                                                        <draggable
                                                                        v-model="section.elements"
                                                                        group="elementGroup"
                                                                        @start="elementDrag = true"
                                                                        @end="elementDrag = false"
                                                                        item-key="instanceId">

                                                                            <template #item="{element: field}">
                                                                                <v-container fluid>
                                                                                    <v-card elevation="1">
                                                                                        <v-row>
                                                                                            <v-col>
                                                                                                <v-card-title>{{ field }}</v-card-title>
                                                                                            </v-col>
                                                                                            <v-col></v-col>
                                                                                        </v-row>
                                                                                    </v-card>
                                                                                </v-container>
                                                                            </template>

                                                                        </draggable>
                                                                        <!-- $$ F.1 END OF ELEMENT DRAG COMPONENT -->
                                                                    
                                                                    </v-card-text>
                                                                    <!-- @@ E.1 END OF DRAG ELEMENT CONTROL -->

                                                                </v-expansion-panel-text>
                                                                <!-- %% D.1 END OF INDIVIDUAL ELEMENT AREA -->

                                                            </v-expansion-panel>
                                                            <!-- !! C.2 END OF ELEMENT GROUP AREA -->

                                                        </v-expansion-panels>
                                                    </v-expansion-panel-text>
                                                    <!-- !! C.1 END OF THIS SECTIONS'S ELEMENT AREA -->

                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                            <!-- ?? B.4 END OF SECTION AREA VISIBILITY -->

                                        </v-card>
                                    </v-col>
                                </v-row>
                                <!-- ?? B.3 END OF INDIVIDUAL SECTION -->
                            </div>
                            

                        </template>
                        <!-- ?? B.2 END OF SECTION DRAG TEMPLATE -->

                    </draggable>
                    <!-- ?? B.1 END OF SECTION DRAG CONTROL -->
                    <!-- END OF SECTION AREA OF FORM -->

                </v-container>
            </v-card>
        </v-container>
    </v-main>
        
    <v-navigation-drawer
    location="right"
    :rail="hideDetailsPanel">
        <BuildToolbar

        title="Details"
        :hide-points-left="false"
        @click="$event => hideDetailsPanel = $event">
    
            <template #content>

            </template>

        </BuildToolbar>
    </v-navigation-drawer>
</template>