<script>
import * as uuid from '../classes/uuids'
import BuildAppBar from '../components/BuildAppBar.vue'
import BuildToolbar from '../components/BuildToolbar.vue';
import ElementTemplate from '../components/ElementTemplate.vue'
import ToolbarButtons from '../components/ToolbarButtons.vue'
import IdChip from '../components/IdChip.vue'
import ModalView from '../components/ModalView.vue'
import CSpacer from '../components/CSpacer.vue'
import PeekCode from '../components/PeekCode.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
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
        PeekCode,
        LoadingOverlay,
    },
    data() {
        return {
            modalControl: {
                show: false,
                kind: 'delete'
            },

            ready: {
                loading: true,
                hideUI: true,
                message: 'Loading, please wait...'
            },
            
            showCode: false,

            sectionElements: new Array(),
            uiElements: new Array(),
            inputElements: new Array(),

            detailsPanel: new Array(),

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

        this.detailsPanel = this.elements.populateDetailsPanel()
        console.log("🚀 ~ file: BuildView.vue:80 ~ mounted ~ this.detailsPanel:", this.detailsPanel)

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

        this.ready.hideUI = false
        this.ready.loading = false
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
        getSelectedObjectKeys: function(obj) {
            return Object.keys(obj.options)
        },
        methodModelValue: function(propName) {
            if (this.selectedField > -1) {
                return this.form.sections[this.selectedSection].elements[this.selectedField].props[propName]
            } else if (this.selectedSection > -1 ) {
                return this.form.sections[this.selectedSection][propName]
            } else {
                return ''
            }
        },
        setMethodModelValue: function(propName, val) {
            if (this.selectedField > -1) {
                this.form.sections[this.selectedSection].elements[this.selectedField].props[propName] = val
            } else if (this.selectedSection > -1) {
                this.form.sections[this.selectedSection][propName] = val
            }
        }
    }
}
</script>

<template>
    <LoadingOverlay
    :show="ready.loading">
    </LoadingOverlay>
    <template v-if="!ready.hideUI">
        <!-- <PeekCode
        :show="showCode"
        @update="showCode = $event">
            <template #title>
                <v-toolbar class="transparent">
                    <v-toolbar-title>Peek Code</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                        color="error"
                        variant="tonal"
                        @click.stop="showCode = false">Close</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
            </template>
            <template #body>
                <pre>
                    {{ JSON.stringify(form, null, 1) }}
                </pre>
            </template>
        </PeekCode> -->
        <ModalView
        :show="modalControl.show"
        @dismiss="modalControl.show = $event"
        >

            <template #title>
                <template v-if="modalControl.kind === 'delete'">
                    Are you sure?
                </template>
                <template v-if="modalControl.kind === 'peekCode'">
                    Peek Code
                </template>
                <template v-if="modalControl.kind === 'formEditor'">
                    Edit Form
                </template>
                <template v-if="modalControl.kind === 'sectionEditor'">
                    Edit Section
                </template>
                <template v-if="modalControl.kind === 'elementEditor'">
                    Edit Element
                </template>
            </template>

            <template #body>
                <template v-if="modalControl.kind === 'delete'">
                    Are you sure want to delete {{ (selectedField > -1 ? `Field ${selectedField + 1} from ` : '' ) }} {{ (selectedSection > -1 ? `Section ${selectedSection + 1}` : '') }}?
                    <br>
                </template>
                <template v-if="modalControl.kind === 'peekCode'">
                    <pre>
                        {{ JSON.stringify(form, null, 1) }}
                    </pre>
                </template>
                <template v-if="modalControl.kind === 'formEditor'">
                    <pre>
                        {{ JSON.stringify(form, null, 1) }}
                    </pre>
                </template>
                <template v-if="modalControl.kind === 'sectionEditor'">
                    <pre>
                        {{ JSON.stringify(form.sections[selectedSection], null, 1) }}
                    </pre>
                </template>
                <template v-if="modalControl.kind === 'elementEditor'">
                    <v-row>
                        <v-col></v-col>
                    </v-row>
                    <pre>
                        {{ JSON.stringify(form.sections[selectedSection].elements[selectedField], null, 1) }}
                    </pre>
                </template>
            </template>

            <template #actions>
                <template v-if="modalControl.kind !== 'delete'">
                    <!-- awaiting implementation -->
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
                                    <v-btn
                                    v-bind="props"
                                    icon="mdi-form-textbox"
                                    @click="modalControl = { show: true, kind: 'formEditor' }"></v-btn>
                                </template>
                            </v-tooltip>
                            <v-tooltip
                            text="Peek Code"
                            location="bottom">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                    v-bind="props"
                                    icon="mdi-code-json"
                                    @click="modalControl = { show: true, kind: 'peekCode'}"></v-btn>
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
                                            <v-toolbar-title>{{ `[${sectionIndex + 1}] ${section.name}` }} ({{ section.elements.length }} element{{section.elements.length > 1 ? 's' : ''}})</v-toolbar-title>
                                            <IdChip
                                            :instance-id="section.instanceId"
                                            parent-type="form"
                                            ></IdChip>
                                            <CSpacer :horizontal="true"></CSpacer>
                                            <!-- @edit="updateDetailsPanelFor({ section: sectionIndex, field: -1 })" -->
                                                <ToolbarButtons
                                                @edit="selectedSection = sectionIndex; selectedField = -1; modalControl = { show: true, kind: 'sectionEditor'}"
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
                                                            @update:props="$event => field.props = $event"
                                                            >
                                                        
                                                                <template #toolbarAppendSlot>
                                                                    <IdChip
                                                                    :instance-id="field.instanceId"
                                                                    parent-type="section"
                                                                    :parent-instance="section.instanceId"
                                                                    ></IdChip>
                                                                    <CSpacer :horizontal="true"></CSpacer>
                                                                    <ToolbarButtons
                                                                    @edit="selectedSection = sectionIndex; selectedField = fieldIndex; modalControl = { show: true, kind: 'elementEditor'}"
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
            
        <!-- <v-navigation-drawer
        location="right"
        :rail="hideDetailsPanel">
            <BuildToolbar
            title="Details"
            :hide-points-left="false"
            @click="$event => hideDetailsPanel = $event">
        
                <template #content>
                    
                        <template v-if="selectedField > -1">
                            <IdChip
                            :instanceId="form.sections[selectedSection].elements[selectedField].instanceId"
                            parent-type="input"
                            :parent-instance="form.sections[selectedSection].instanceId"
                            ></IdChip>
                        </template>
                        <template v-else-if="selectedSection > -1">
                            <IdChip
                            :instanceId="form.sections[selectedSection].instanceId"
                            parent-type="section"
                            ></IdChip>
                        </template>
                        <div>
                            <v-list
                            v-for="(option, optionIndex) in detailsPanel"
                            :key="optionIndex"
                            lines="one"
                            >

                                <div v-if="(typeof option.id === typeof undefined)">
                                    <v-list-subheader>
                                        {{ option.name }}
                                    </v-list-subheader>
                                    <v-divider></v-divider>
                                </div>
                                <div v-else-if="option.shouldRender">
                                    <v-list-item>
                                        <CSpacer :vertical="true"></CSpacer>
                                        
                                        <template v-if="option.type === 'select'">
                                            <v-select
                                            variant="outlined"
                                            density="compact"
                                            :label="option.uiLabel"
                                            item-title="title"
                                            item-value="value"
                                            :persistent-hint="(option.hint !== '' || typeof option.hint !== typeof undefined)"
                                            :hide-details="(option.hint === '' || typeof option.hint === typeof undefined)"
                                            :hint="option.hint"
                                            :items="elements.getChoicesByKey(option.lookupKey)"
                                            :model-value="methodModelValue(option.propName)"
                                            @update:modelValue="$event => setMethodModelValue(option.propName, $event)"
                                            ></v-select>
                                        </template>

                                        <template v-if="option.type === 'string'">
                                            <v-text-field
                                            variant="outlined"
                                            density="compact"
                                            :label="option.uiLabel"
                                            :persistent-hint="(option.hint !== '' || typeof option.hint !== typeof undefined)"
                                            :hide-details="(option.hint === '' || typeof option.hint === typeof undefined)"
                                            :hint="option.hint"
                                            :value="methodModelValue(option.propName)"
                                            @update:modelValue="$event => setMethodModelValue(option.propName, $event)"
                                            ></v-text-field>
                                        </template>

                                        <template v-if="option.type === 'bool'">
                                            <v-checkbox
                                            variant="outlined"
                                            density="compact"
                                            :label="option.uiLabel"
                                            :persistent-hint="(option.hint !== '' || typeof option.hint !== typeof undefined)"
                                            :hide-details="(option.hint === '' || typeof option.hint === typeof undefined)"
                                            :hint="option.hint"
                                            :model-value="methodModelValue(option.propName)"
                                            @update:modelValue="$event => setMethodModelValue(option.propName, $event)"
                                            ></v-checkbox>
                                        </template>

                                        <template v-if="option.type === 'button'">
                                            <v-btn
                                            block
                                            color="primary"
                                            @click="modalControl = { show: true, kind: option.propName }">
                                                {{ option.uiLabel }}
                                            </v-btn>
                                        </template>
                                        
                                        <CSpacer :vertical="true"></CSpacer>
                                    </v-list-item>
                                </div>
                            </v-list>
                        </div>
                    
                </template>

            </BuildToolbar>
        </v-navigation-drawer> -->
    </template>
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