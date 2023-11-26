<template>
    <a-card>
      <h2>{{t('todo')}}</h2>
      <a-list :dataSource="todos" bordered>
        <template #renderItem="{ item, index }">
          <a-list-item>
            {{ item.text }}
            <todo-actions
              @onEdit="() => editTodo(index)"
              @onDelete="() => deleteTodo(index)"
            />
          </a-list-item>
        </template>
      </a-list>
      <a-input v-model:value="newTodo" />
      <a-button data-testid="addOrEdit" class="my-2" @click="() => addOrEdit()" :disabled="!newTodo">
        {{ editModal ? t("update") : t("add") }}
      </a-button>
    </a-card>
  </template>
  
  <script lang="ts">
  import { ref } from "vue";
  import { Card, List, ListItem, Input, Button } from "ant-design-vue";
  import TodoActions from "./components/TodoActions.vue";
  import { useI18n } from "vue-i18n";
  interface Todo {
    text: string;
    editing: boolean;
  }
  export default {
    components: {
      "a-card": Card,
      "a-list": List,
      "a-list-item": ListItem,
      "a-input": Input,
      "a-button": Button,
      TodoActions,
    },
    setup() {
      const {t}=useI18n()
      const todos = ref<Todo[]>([]);
      const newTodo = ref("");
      const editingIndex = ref<number | null>(null);
      const editModal = ref(false);
  
      const addOrEdit = () => {
        if (newTodo?.value?.trim() === "") return;
        if (editModal.value && editingIndex.value !== null) {
          todos.value[editingIndex.value].text = newTodo.value;
          editModal.value = false;
        } else {
          todos.value.push({ text: newTodo.value, editing: false });
        }
  
        newTodo.value = "";
      };
  
      const editTodo = (index: number) => {
        editingIndex.value = index;
        editModal.value = true;
        newTodo.value = todos.value[index].text;
      };
  
      const deleteTodo = (index: number) => {
        todos.value.splice(index, 1);
      };
  
      const saveEdit = () => {
        if (editingIndex.value !== null) {
          todos.value[editingIndex.value].text = newTodo.value;
          editingIndex.value = null;
          editModal.value = false;
        }
      };
      return {
        deleteTodo,
        editTodo,
        addOrEdit,
        newTodo,
        todos,
        editModal,
        saveEdit,
        t,
      };
    },
  };
  </script>