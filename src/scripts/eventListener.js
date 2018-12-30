import journalData from "./journalData.js"

const eventListener = {
  journalButton () {
    // console.log("clickity");
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
};
export default eventListener