<script>
import * as uuid from '../classes/uuids'
import BuildAppBar from '../components/BuildAppBar.vue'
import BuildToolbar from '../components/BuildToolbar.vue';
import ElementTemplate from '../components/ElementTemplate.vue'
import ToolbarButtons from '../components/ToolbarButtons.vue'
import IdChip from '../components/IdChip.vue'
import ModalView from '../components/ModalView.vue'
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
        ToolbarButtons,
        IdChip,
        ModalView,
        CSpacer,
    },
    data() {
        return {
            modalControl: {
                show: false,
                kind: 'delete'
            },

            sectionElements: new Array(),
            uiElements: new Array(),
            inputElements: new Array(),

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

        this.sectionElements = this.elements.getElements('section')
        this.uiElements = this.elements.getElements('ui')
        this.inputElements = this.elements.getElements('input')

        if (this.getExistingForm) {
            // fetch
        } else {
            this.form = {
                id: uuid.generateStandard(),
                name: 'Form Name',
                icon: 'mdi-clipboard-text-outline',
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
            const section = this.elements.getBlankSection()
            const instanceObject = uuid.generateInstanceIdObject()
            section.id = instanceObject.long
            section.instanceId = instanceObject.human
            return section
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
            this.selectedSection = ( typeof obj.section === typeof undefined ? -1 : obj.section )
            this.selectedField = ( typeof obj.field === typeof undefined ? -1 : obj.field )
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
    <ModalView
    :show="modalControl.show"
    @dismiss="modalControl.show = $event"
    @cancel=""
    @accept="">

        <template #title>
            <template v-if="modalControl.kind === 'delete'">
                Are you sure?
            </template>
        </template>

        <template #body>
            <template v-if="modalControl.kind === 'delete'">
                Are you sure want to delete {{ (selectedField > -1 ? `Field ${selectedField + 1} from ` : '' ) }} {{ (selectedSection > -1 ? `Section ${selectedSection + 1}` : '') }}?
                <br>
            </template>
        </template>

        <template #actions>
            <template v-if="!modalControl.kind === 'delete'">
                
            </template>
        </template>
    </ModalView>
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
                <div id="sectionElementList">
                    <v-list
                    lines="one"
                    density="compact"
                    nav
                    >
                        <draggable
                        v-model="sectionElements"
                        v-bind="dragOptions"
                        :group="{ name: 'formSections', pull: 'clone', put: false }"
                        @start="elementDrag = true"
                        @end="elementDrag = false"
                        item-key="templateId"
                        :clone="cloneElement">
                            <template #item="{element: sectionTemplate}">
                                <v-list-item
                                :id="sectionTemplate.templateId"
                                :key="sectionTemplate.templateId"
                                :title="sectionTemplate.name"
                                :subtitle="sectionTemplate.sub"
                                :prepend-icon="sectionTemplate.icon"
                                class="draggableItem"></v-list-item>
                            </template>
                        </draggable>
                        

                    </v-list>
                </div>
                <div id="uiElementList">
                    <v-list
                    lines="one"
                    density="compact"
                    nav
                    >
                        <draggable
                        v-model="uiElements"
                        v-bind="dragOptions"
                        :group="{ name: 'elementGroup', pull: 'clone', put: false }"
                        @start="elementDrag = true"
                        @end="elementDrag = false"
                        item-key="templateId"
                        :clone="cloneElement">
                            <template #item="{element: uiTemplate}">
                                <v-list-item
                                :id="uiTemplate.templateId"
                                :key="uiTemplate.templateId"
                                :title="uiTemplate.name"
                                :subtitle="uiTemplate.sub"
                                :prepend-icon="uiTemplate.icon"
                                class="draggableItem"></v-list-item>
                            </template>
                        </draggable>
                        

                    </v-list>
                </div>
                <div id="inputElementList">
                    <v-list
                    lines="one"
                    density="compact"
                    nav
                    >
                        <draggable
                        v-model="inputElements"
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
                </div>
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


                    <!-- !! BEGINNING OF NEW LITE WEIGHT FORM CONTROL -->
                    <v-list>

                        <draggable
                        v-model="form.sections"
                        v-bind="dragOptions"
                        group="formSections"
                        @start="sectionDrag = true"
                        @end="sectionDrag = false"
                        item-key="id"
                        handle=".handle">
                            <template #item="{element: section, index: sectionIndex}">
                                <div
                                :id="section.instanceId">
                                    <v-card
                                    :id="section.instanceId"
                                    :key="section.instanceId"
                                    variant="outlined"
                                    density="compact"
                                    elevation="0"
                                    >
                                    
                                        <v-toolbar
                                        density="compact"
                                        class="draggableItem handle"
                                        >
                                            <CSpacer :horizontal="true"></CSpacer>
                                            <v-icon :icon="section.icon" ></v-icon>
                                            <v-toolbar-title>{{ `[${sectionIndex + 1}] ${section.name}` }}</v-toolbar-title>
                                            <IdChip
                                            :instance-id="section.instanceId"
                                            parent-type="form"
                                            ></IdChip>
                                            <CSpacer :horizontal="true"></CSpacer>
                                            <ToolbarButtons
                                            @delete="selectedSection = sectionIndex; selectedField = -1; modalControl = { show: true, kind: 'delete'}"></ToolbarButtons>
                                        </v-toolbar>

                                        <v-card-text>
                                            <v-list>
                                                <draggable
                                                v-model="section.elements"
                                                v-bind="dragOptions"
                                                group="elementGroup"
                                                @start="elementDrag = true"
                                                @end="elementDrag = false"
                                                item-key="instanceId"
                                                handle=".handle">
                                                
                                                    <template #item="{ element: field, index: fieldIndex }">
                                                        <ElementTemplate
                                                        :source="field"
                                                        :index="fieldIndex"
                                                        >
                                                    
                                                            <template #toolbarAppendSlot>
                                                                <IdChip
                                                                :instance-id="field.instanceId"
                                                                parent-type="section"
                                                                :parent-instance="section.instanceId"
                                                                ></IdChip>
                                                                <CSpacer :horizontal="true"></CSpacer>
                                                                <ToolbarButtons
                                                                @delete="selectedSection = sectionIndex; selectedField = fieldIndex; modalControl = { show: true, kind: 'delete'}"></ToolbarButtons>
                                                            </template>

                                                        </ElementTemplate>
                                                    </template>

                                                </draggable>
                                            </v-list>
                                        </v-card-text>

                                    </v-card>
                                    <CSpacer :vertical="true"></CSpacer>
                                </div>
                            </template>
                        </draggable>

                    </v-list>


                    <!-- A. START OF SECTION AREA OF FORM -->
                    <!-- ?? B.1 START OF SECTION DRAG CONTROL -->
                    
                    
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

<style>

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

.transparent {
    background-color: rgba(0, 0, 0, 0);
}
</style>