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
                <button class="list-button button-delete"
                        @click="getData"
                        >表示</button>
                <button class="list-button button-delete"
                        @click="postData()"
                        >登録</button>
                
            </div>



        </div>
    </div>
</template>

<script>
   import firebase from 'firebase/app';
   import axios from 'axios';

   const firebaseConfig = {
    apiKey: "AIzaSyDU3yhFfduc8SKROnoa-r75o7ktjo7UYtg",
    authDomain: "test-28015.firebaseapp.com",
    databaseURL: "https://test-28015-default-rtdb.firebaseio.com",
    projectId: "test-28015",
    storageBucket: "test-28015.appspot.com",
    messagingSenderId: "395512823241",
    appId: "1:395512823241:web:0c5fc450c780c724837c18",
    measurementId: "G-YD5MYC3QWD"
    };

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
        },
        getData: function () {
            if (firebase.apps.length === 0) {
                firebase.initializeApp();
            }
                const  db = firebase.firestore();
                // データ取得
                db.collection('todos').get(
                ).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // テーブル表示
                        this.todos = [doc.data()];
                    });
                }).catch((error) => {
                    console.log(error);
                    // テーブルリセット
                    this.items = [];
                });
        },
        postData: function () {
            console.log('db接続前');
            console.log(this.todos[0]);
            console.log(this.todos[0].id);
            console.log(this.todos[0].text);
            console.log(this.todos[0].isDone);
            const isDoneString = toString(this.todos[0].isDone)
            axios.post(
                // https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/cities/LA
                // 'https://firestore.googleapis.com/v1/projects/test-28015/databases/(default)/documents/todos/tcppIyoMuilKrG1niPm7',
                'https://firestore.googleapis.com/v1/projects/test-28015/databases/(default)/documents/todos',

                
                { 
                    fields: {
                        id: {
                            stringValue: this.todos[0].id//stringValueは絶対
                        },
                        isDone:{// booleanValueでOK
                            booleanValue: this.todos[0].isDone
                        },
                        text:{
                            stringValue: this.todos[0].text
                        }
                        
                    }
                }
                
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.message);
            });
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