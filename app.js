const App = {
  data() {
    return {
      title: 'Notes',
      input: {
        value: '',
        placeholder: 'Type your note'
      },
      notes: []
    }
  },

  watch: {
    notes: {
      handler(updatedList) {
        localStorage.setItem('notes', JSON.stringify(updatedList))
      },
      deep: true
    }
  },

  mounted() {
  this.getNotes();
  },


  methods: {
    getNotes() {
      const localNotes = localStorage.getItem('notes');
      if (localNotes) {
        this.notes = JSON.parse(localNotes)
      }
    },
    onSubmit() {
      this.notes.push(this.input.value)
      // localStorage.setItem('note', 'hello world')
      this.input.value = ""
    },
    remove(index) {
      console.log(`note ${index} has been removed`)
      this.notes.splice(index, 1)
    }
  }
}

Vue.createApp(App).mount('#app')