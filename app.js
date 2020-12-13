const app = Vue.createApp({
    data() {
        return {
            stories: [
                {
                    title: "The fallen heros",
                    author: "Jefferson Iyobosa",
                    description: "A story by a smart author about a country once great but lost and exploited by wickied men disguising as politicians",
                    date: new Date().toLocaleDateString(),
                    tags: ["Nigerian", "People", "Protest"]
                }
            ],
            form: [
                {name: "title", placeholder: "Story title"},
                {name: "author", placeholder: "Author"},
                {name: "description", type:"textarea", placeholder: "description"}
            ]
        }
    },
    methods: {
        createNewStory(story){
            this.stories = [...this.stories, story]
        }
    },
});

app.mount("#app")