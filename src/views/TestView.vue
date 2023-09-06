<script>
export default {
    data() {
        return {
            drag: false,
            someArray: [
                { id: 1, name: 'Malcom' },
                { id: 2, name: 'Zoe'    },
                { id: 3, name: 'Jayne'  },
                { id: 4, name: 'Kaylee' },
                { id: 5, name: 'Hoban'  }
            ]
        }
    }
}
</script>

<template>
    <v-main>
        <v-container fluid>
            <draggable
            v-model="someArray"
            group="someGroup"
            @start="drag = true"
            @end="drag = false"
            item-key="id">
                <template #item="{element}">
                    <v-container>
                        <!-- some comment -->
                        <v-row>
                            <v-col>{{ element.id }}</v-col>
                            <v-col>{{ element.name }}</v-col>
                        </v-row>
                    </v-container>
                </template>
            </draggable>
        </v-container>
    </v-main>
</template>