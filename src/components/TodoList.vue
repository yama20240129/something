<template>
    <body>
        <div>
            <article class="wrap">
                <section class="todo-form">
                    <input type="text" name="todo-text" class="input-text" placeholder="何をする？"
                    :value="text"
                    @input="inputText"
                    />
                    <button
                    class="add-button"
                    @click="addTodo"
                    >ADD TODO</button>
                </section>
                <section class="list-area">
                    <div class="area-complete_incomplete">
                        <p class="todo-title">今のリスト</p>
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
                    <div class="area-complete_incomplete">
                        <p class="todo-title">達成済み</p>
                        <ul class="todo-area">
                            <li
                                v-for="(item, i) in doneTodo"
                                :key="i"
                                class="list"
                            >
                            <span class="list-label">{{ item.text }}</span>
                            <span class="button-area">
                                <button 
                                class="list-button button-return"
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
                </section>
                <section class="db-action">
                    <div>
                        <div v-if="this.todos == ''" class="bottom-area button-show"> 何もありません </div>
                    </div>
                </section>
            </article>
        </div>
    </body>
</template>

<script>
   import { db } from '../../firebase/firebase'
   import { collection, onSnapshot, deleteDoc,addDoc, query, orderBy, doc, updateDoc } from "firebase/firestore";
   
    export default {
    data(){
        const todos = [];
        const todosQuery = query(collection(db, 'todos'), orderBy('id', 'desc'));//持ってるカラムで
                onSnapshot(todosQuery, (querySnapshot) => {
                const fbTodos = [];
                querySnapshot.forEach((doc) => {
                    const todo = {
                    id: doc.id,
                    isDone: doc.data().isDone,
                    text: doc.data().text,
                    };
                    fbTodos.push(todo);
                });
                this.todos = fbTodos;
            });
        return {
            todos,
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
                id: new Date().getTime().toString(16),
                isDone: false,
                text: text,
            };
            addDoc(collection(db, 'todos'), { 
                id: new Date().getTime().toString(16),
                isDone: false,
                text: text,
        });
            this.todos.push(todo)
            this.resetText();
        },
        resetText(){
            this.text = '';
        },
        deleteTodo(e){
            const index = this.getIndexBy(e);
            this.todos.splice(index, 1);
            const Ref = collection(db, "todos");
            deleteDoc(doc(Ref, e.id));
        },
        toggleIsDone(e){
            console.log(e.isDone);
            e.isDone = !e.isDone;
            const Ref = collection(db, "todos");
            updateDoc(doc(Ref, e.id), {
                isDone: e.isDone
            });
            console.log(e.isDone);
        },
        getIndexBy(id){
            const filteredTodo = this.todos.filter(todo => todo.id ===id)[0];
            const index = this.todos.indexOf(filteredTodo);
            return index;
        },
        getData() {
                onSnapshot(collection(db, 'todos'), (querySnapshot) => {
                const fbTodos = [];
                querySnapshot.forEach((doc) => {
                    const todo = {
                    id: doc.id,
                    isDone: doc.data().isDone,
                    text: doc.data().text,
                    };
                    fbTodos.push(todo);
                });
                this.todos = fbTodos;
            });
        },
    },
    computed: {
        doneTodo(){
            return this.todos.filter( todo => todo.isDone === true);
        },
        incompleteTodo(){
            return this.todos.filter( todo => todo.isDone === false);
        }
    },
 }
</script>

<style lang="scss" scoped>

*{
    .body{
        height: 50vh;
        width: 30vh;
        
        background-color: #fcfcfa;
        font-family: "メイリオ";
    }
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    .todo-form{
        text-align: center;
        padding:80px 0 50px;
        .input-text{
            width: 300px;
            font-size: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            // -webkit-appearance: none;
            border: none;
            box-shadow: 0px 0px 12px #ccc;
            margin: 0 10px;
        }
        .add-button{
            font-size: 16px;
            padding: 12px 20px;
            border: none;
            background-color: black;
            color: #eee;
            font-weight: bold;
            border-radius: 4px;
        }
    }
    .list-area{
       display: flex;
       justify-content: space-between;
       padding: 0 20vh;
       .area-complete_incomplete{
        width: 470px;
            .todo-title{
                color: #333;
                font-size: 25px;
                text-align: center;
            }
            .todo-area{
                margin-top: 36px;
                .list{
                    align-items: center;
                    background-color: #fefefe;
                    box-shadow: 0px 2px 12px #cecece;
                    display: flex;
                    justify-content: space-between;
                    list-style: none;
                    padding: 10px 20px 10px 32px;
                    width: 100%;
                    .list:not(:first-child){
                        margin-top: 16px;

                    }
                    .list-label{
                        font-size: 20px;
                    }
                    .button-area{
                        
                        .list-button{
                            font-size: 15px;
                            padding: 6px 16px;
                            border-radius: 4px;
                            border: none;
                            color: #eee;
                        }
                        .button-done{
                            background-color: #4CAF50;
                            
                        }
                        .button-delete{
                            background-color: #ff5b4f;

                        }
                        .button-return{
                            background-color: #615fc6;
                            

                        }
                    }
                }
            }
       }
    }
    .db-action{
        // width:100%;
        display: flex;
        justify-content: center;
        .bottom-area{
            font-size: 15px;
            padding: 6px 16px;
            border-radius: 4px;
            border: none;
            margin: 50px 20px;
        }
        .button-show{
            background-color: #f5faa9;
                            color: #050000;
            }
            .button-register{
                background-color: #acf7e5;
                            color: #050000;
            }
        
    }
}
</style>