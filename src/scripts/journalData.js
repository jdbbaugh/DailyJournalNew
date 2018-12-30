// import eventListener from "./eventListener.js"


const journalData = {
  getResources() {
    return fetch("http://localhost:8088/entries")
    .then(response => response.json());
  },
  saveJournalEntry (entryToSave) {
    fetch("http://localhost:8088/entries", { // Replace "url" with your API's URL
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(entryToSave)
})
  },
  deleteJournalEntry (entryToDelete) {
    fetch(`http://localhost:8088/entries/${entryToDelete}`, {
  method: "DELETE",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({id: entryToDelete})
})
.then(res => res.text())
.then(res => alert(`you deleted Journal Entry ${entryToDelete}`))
  }
};

export default journalData