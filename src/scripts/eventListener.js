import journalData from "./journalData.js"

const eventListener = {
  journalButton () {
    const journalDate = document.getElementById("journalDate");
    const journalConcept = document.getElementById("journalConcept");
    const journalEntry = document.getElementById("journalEntry");
    let moodSelect = document.getElementById("mood");
    let moodValue = moodSelect.options[moodSelect.selectedIndex].text;


      const entryObject = {
        date: journalDate.value,
        concept: journalConcept.value,
        entry: journalEntry.value,
        mood: moodValue
      }
      console.log(entryObject);
      journalData.saveJournalEntry(entryObject);
  },
  deleteJournalEntry () {
    let entryToDelete = event.target.id.split("-")
    console.log(entryToDelete[1]);
    journalData.deleteJournalEntry(entryToDelete[1]);
    console.log((`section-${entryToDelete[1]}`));
    let goodByeSearchResults = document.getElementById(`section-${entryToDelete[1]}`);
    goodByeSearchResults.parentNode.removeChild(goodByeSearchResults);
  }
};
export default eventListener