const App = {
  data() {
    return {
      title: 'Notes',
      input: {
        value: '',
        placeholder: 'Type your note',
      },
      notes: [],
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
        console.log(this.notes)
      }
    },
    editNote(id) {
      const editingNote = this.notes.find(item => item.id === id);
      editingNote.editing = !editingNote.editing;
      editingNote.hiddenInput.value = editingNote.value;
    },
    submitEditingNote(id) {
      const editingNote = this.notes.find(item => item.id === id);
      editingNote.value = editingNote.hiddenInput.value;
      //close
      editingNote.editing = false;
    },
    onSubmit() {
      this.notes.push({
        id: Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1),
        value: this.input.value,
        hiddenInput: {
          value: '',
          placeholder: 'Redact your note'
        },
        editing: false
      })
      this.input.value = ""
    },
    remove(id) {
      const index = this.notes.findIndex(n => n.id === id);
      if (index !== -1) {
        this.notes.splice(index, 1);
      }
    }
  }
}

Vue.createApp(App).mount('#app')