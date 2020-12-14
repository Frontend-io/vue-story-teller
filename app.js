const app = Vue.createApp({
    data() {
        return {
            stories: this.readDb() ,
            fields:{
                title: '',
                author: '',
                description: '',
                tags: [],
                color: '',
                read: false,
                date: new Date().toLocaleDateString()
            },
            edit:{},
            form: [
                {name: "title", placeholder: "Story title"},
                {name: "author", placeholder: "Author"},
                {name: "tags", placeholder: "Tags separated by comma "},
                {name: "color", select: ['red', 'green', 'blue', 'purple'], placeholder: "Story theme"},
            ],
            modalOpen: false
        }
    },
    methods: {
        createNewStory(e, story){
            e.preventDefault();
            if(Object.keys(this.edit)){
                const update = [...this.stories]
                update[this.edit.replaceIndex] = story
                this.stories = update
            }else{
                this.stories = [{...story},...this.stories];
            }
            this.modalOpen = false;
            this.resetForm();
            this.saveToDb();
            console.log(story)
        },
        editStory(story, index){
            Object.assign(this.edit,{
                replaceIndex: index,
                ...this.fields,
            })
            Object.assign(this.fields,{
                ...story,
            })
            this.modalOpen = true
        },
        toggleModal(){
            this.modalOpen = !this.modalOpen
        },
        readStory(index){
            const oldStory = [...this.stories]
            oldStory[index].read = !oldStory[index].read;
            this.stories = oldStory
        },
        deleteStory(index){
            const oldStory = [...this.stories];
            oldStory.filter((s,i) => i !== index );
            this.stories = oldStory;
            console.log( oldStory)
        },
        resetForm(){
            this.fields.title = '',
            this.fields.author = '',
            this.fields.description = '',
            this.fields.tags= []
        },
        saveToDb(){
            window.localStorage.setItem('stories', JSON.stringify(this.stories))
        },
        readDb(){
            const ls = JSON.parse(window.localStorage.getItem('stories'))
            return ls || []
        },

    },
});

app.mount("#app")