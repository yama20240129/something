<template>
    <div>
        <div class="todo-form">
            <input type="text" name="todo-text" class="input-text" placeholder="please input todo"
            :value="text"
            @input="inputText"
            />
            <button
            class="add-button"
            @click="addTodo"
            >ADD TODO</button>
        </div>
        <div class="list-area">
            <div class="area-incomplete">
                <p class="todo-title">incomplete items</p>
                <ul class="todo-area">
                    <li
                        v-for="(item, i) in incompleteTodo"
                        :key="i"
                        class="list"
                    >
                    <span class="list-label">{{ item.text }}</span>
                    <span class="button-area">
                        <button class="list-button button-done"
                        @click="toggleIsDone(item,id)"
                        >DONE</button>
                    </span>
                    <span class="button-area">
                        <button class="list-button button-delete"
                        @click="deleteTodo(item,id)"
                        >DELETE</button>
                    </span>
                    </li>
                </ul>
            </div>

            <div class="area-complete">
                <p class="todo-title">complete items</p>
                <ul class="todo-area">
                    <li
                        v-for="(item, i) in doneTodo"
                        :key="i"
                        class="list"
                    >
                    <span class="list-label">{{ item.text }}</span>
                    <span class="button-area">
                        <button 
                        class="list-button"
                        @click="toggleIsDone(item,id)"
                        >RETURN</button>
                    </span>
                    <span class="button-area">
                        <button class="list-button button-delete"
                        @click="deleteTodo(item,id)"
                        >DELETE</button>
                    </span>
                    </li>
                </ul>
            </div>



        </div>
    </div>
</template>

<script>
    export default {
    data(){
        return {
            todos: [],
            text: ''
        }
    },
    methods: {
        inputText(e){
            this.text = e.target.value;
        },
        addTodo(){
            if(!this.text) return;

            const text = this.text;
            const todo = {
                id : new Date().getTime().toString(16),
                text,
                isDone: false
            };
            this.todos.push(todo)
            this.resetText();
        },
        resetText(){
            this.text = '';
        },
        deleteTodo(e){
            const index = this.getIndexBy(e);
            this.todos.splice(index, 1)
        },
        toggleIsDone(e){
            const index = this.getIndexBy(e);
            console.log('aaa');
            console.log(e.isDone);
            e.isDone = !e.isDone;
        },
        getIndexBy(id){
            const filteredTodo = this.todos.filter(todo => todo.id ===id)[0];
            const index = this.todos.indexOf(filteredTodo);
            return index;
        }
    },
    computed: {
        doneTodo(){
            return this.todos.filter( todo => todo.isDone === true);
        },
        incompleteTodo(){
            return this.todos.filter( todo => todo.isDone === false);
        }

    }
 }
</script>


<!-- 

<style scoped>

</style> -->