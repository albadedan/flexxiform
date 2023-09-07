<script>
import * as uuid from '../classes/uuids'
import BuildAppBar from '../components/BuildAppBar.vue'
import BuildToolbar from '../components/BuildToolbar.vue';
import ElementTemplate from '../components/ElementTemplate.vue'
import CSpacer from '../components/CSpacer.vue'
import { useElementStore } from '../stores/elementStore'
export default {
    setup() {
        const elements = useElementStore()
        return { elements }
    },
    components: {
        BuildAppBar,
        BuildToolbar,
        ElementTemplate,
        CSpacer,
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
            selectedSection: -1,
            selectedField: -1,
            
            form: {},
            //blankSection: { id: "", name: 'Section Name', desc: 'Section Description' }
            
            
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                disabled: false,
                ghostClass: "ghost"
            };
        },
    },
    mounted() {

        this.formElements = this.elements.getElements()

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
        log: function(event) {
            console.log("🚀 ~ file: BuildView.vue:88 ~ event:", event)
        },
        cloneElement: function(element) {
            // get a new instance id object
            const instanceObject = uuid.generateInstanceIdObject()
            const newElement = JSON.parse(JSON.stringify(element))

            newElement.id = instanceObject.long
            newElement.instanceId = instanceObject.human

            return newElement
        },
        updateDetailsPanelFor: function(obj) {
            this.selectedSection = -1
            this.selectedField = -1
            console.log("🚀 ~ file: BuildView.vue:106 ~ updateDetailsPanelFor ~ obj:", obj)
            this.selectedSection = obj.section
            console.log("🚀 ~ file: BuildView.vue:108 ~ this.selectedSection:", this.selectedSection)
            this.selectedField = obj.field
            console.log("🚀 ~ file: BuildView.vue:110 ~ this.selectedField:", this.selectedField)
        },
        // getSelectedObjectKeys() {
        //     return Object.keys(this.form.sections[this.selectedSection].elements[this.selectedField].options)
        // },
        getSelectedObjectKeys(obj) {
            return Object.keys(obj.options)
        },
        moveUp: function(obj) {
            console.log("🚀 ~ file: Move UP", obj)
            
        },
        moveDown: function(obj) {
            console.log("🚀 ~ file: Move DOWN", obj)
        }
    }
}
</script>

<template>
    <v-app-bar v-once elevation="0">
        <BuildAppBar
        :disabled="publishingDisabled"></BuildAppBar>
    </v-app-bar>

    <v-navigation-drawer
    v-once
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
                    v-bind="dragOptions"
                    :group="{ name: 'elementGroup', pull: 'clone', put: false }"
                    @start="elementDrag = true"
                    @end="elementDrag = false"
                    item-key="templateId"
                    :clone="cloneElement">
                        <template #item="{element: fieldTemplate}">
                            <v-list-item
                            :id="fieldTemplate.templateId"
                            :key="fieldTemplate.templateId"
                            :title="fieldTemplate.name"
                            :subtitle="fieldTemplate.sub"
                            :prepend-icon="fieldTemplate.icon"
                            class="draggableItem"></v-list-item>
                        </template>
                    </draggable>
                    

                </v-list>
            </template>

        </BuildToolbar>
    </v-navigation-drawer>

    <v-main scrollable>
        <v-container fluid>
            <v-card>
                <v-toolbar density="compact">
                    <CSpacer :horizontal="true"></CSpacer>
                    <v-icon :icon="form.icon"></v-icon>
                    <v-toolbar-title>{{ form.name }}</v-toolbar-title>
                    <v-toolbar-items>
                        <v-tooltip
                        text="Edit Form Details"
                        location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="mdi-form-textbox"></v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip
                        text="Peek Code"
                        location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="mdi-code-json"></v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip
                        text="Preview"
                        location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" icon="mdi-eye-outline"></v-btn>
                            </template>
                        </v-tooltip>
                    </v-toolbar-items>
                </v-toolbar>
                <v-container>

                    <!-- A. START OF SECTION AREA OF FORM -->
                    <!-- ?? B.1 START OF SECTION DRAG CONTROL -->
                    <draggable
                    v-model="form.sections"
                    v-bind="dragOptions"
                    group="formSections"
                    @start="sectionDrag = true"
                    @end="sectionDrag = false"
                    item-key="id">

                        <!-- ?? B.2 START OF SECTION DRAG TEMPLATE -->
                        <template #item="{element: section, index: sectionIndex }">

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
                                                                    [{{ sectionIndex + 1 }}] {{ section.name }}
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
                                                                        v-bind="dragOptions"
                                                                        group="elementGroup"
                                                                        @start="elementDrag = true"
                                                                        @end="elementDrag = false"
                                                                        item-key="instanceId">

                                                                            <template #item="{element: field, index: fieldIndex}">
                                                                                <v-container fluid>
                                                                                        <v-row>
                                                                                            <v-col>
                                                                                                <ElementTemplate
                                                                                                :source="field"
                                                                                                source-depth="element"
                                                                                                :parent-id="section.id"
                                                                                                @click="updateDetailsPanelFor({section: sectionIndex, field: fieldIndex})"
                                                                                                @move-up="moveUp"
                                                                                                @move-down="moveDown"
                                                                                                ></ElementTemplate>
                                                                                            </v-col>
                                                                                        </v-row>
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
        v-memo="[selectedSection, selectedField]"
        title="Details"
        :hide-points-left="false"
        @click="$event => hideDetailsPanel = $event">
    
            <template #content>
                <template v-if="this.selectedField > -1">
                    <h5>
                        {{ form.sections[selectedSection].elements[selectedField].instanceId }}
                    </h5>
                    <v-list
                    v-for="(option, optionIndex) in getSelectedObjectKeys(form.sections[selectedSection].elements[selectedField])"
                    :key="optionIndex"
                    density="compact"
                    >
                        <v-list-item>
                            {{ form.sections[selectedSection].elements[selectedField].options[option].uiLabel }}
                            <CSpacer :vertical="true"></CSpacer>
                            <template
                            v-if="form.sections[selectedSection].elements[selectedField].options[option].type === 'string'">
                                <v-text-field
                                density="compact"
                                variant="outlined"
                                :hint="form.sections[selectedSection].elements[selectedField].options[option].hint"
                                :persistent-hint="true"
                                v-model="form.sections[selectedSection].elements[selectedField].options[option].value"
                                ></v-text-field>
                            </template>

                            <template
                            v-if="form.sections[selectedSection].elements[selectedField].options[option].type === 'bool'">
                                <v-checkbox
                                :hint="form.sections[selectedSection].elements[selectedField].options[option].hint"
                                :persistent-hint="true"
                                :label="String(form.sections[selectedSection].elements[selectedField].options[option].value)"
                                v-model="form.sections[selectedSection].elements[selectedField].options[option].value"
                                ></v-checkbox>
                            </template>

                            <template
                            v-if="form.sections[selectedSection].elements[selectedField].options[option].type === 'select'">
                                <v-select
                                density="compact"
                                variant="outlined"
                                :hint="form.sections[selectedSection].elements[selectedField].options[option].hint"
                                :persistent-hint="true"
                                :items="elements.getChoicesByKey(option)"
                                v-model="form.sections[selectedSection].elements[selectedField].options[option].value"></v-select>
                            </template>

                            <template
                            v-if="form.sections[selectedSection].elements[selectedField].options[option].type === 'radio'">
                                <v-radio-group
                                :hint="form.sections[selectedSection].elements[selectedField].options[option].hint"
                                :persistent-hint="true"
                                v-model="form.sections[selectedSection].elements[selectedField].options[option].value"
                                density="compact">
                                    <v-radio
                                    v-for="radio in elements.getChoicesByKey(option)"
                                    :key="radio"
                                    :label="radio" value="radio"></v-radio>
                                </v-radio-group>
                            </template>
                                
                        </v-list-item>
                        <CSpacer :vertical="true" ></CSpacer>
                        <v-divider></v-divider>
                    </v-list>
                </template>
            </template>

        </BuildToolbar>
    </v-navigation-drawer>
</template>

<style scoped>

.draggableItem:hover {
    cursor:grab;
}

.clickableItem:hover {
    cursor:pointer;
}

.cardHover:hover {
    box-shadow: 0 0 11px #183892;
}

.sectionGroupItem:hover {
    background-color:#5ab3fc;
}
.elementGroupItem:hover {
    background-color:#2370bd;
}

.fieldElementItem:hover {
    background-color:#183892;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.leftPanel {
    position: sticky;
    top:0;
    left: 0px;
    z-index: 2;
}

.rightPanel {
    position: sticky;
    top:0;
    right: 0px;
    z-index: 2;
}

.scroller {
    height: 100%;
}
</style>