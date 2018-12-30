import eventListener from "./eventListener";

// import domComponents from "./domComponents";

// import domComponents from "./domComponents.js"
// import journal from "./journal.js"

const journalList = {
  journalContainer (journalEntries) {
    const journalContent = document.createDocumentFragment();
    journalEntries.forEach(entry => {
      const sectionContainer =document.createElement("section");
      sectionContainer.setAttribute("class", "resource-section");
      sectionContainer.setAttribute("id", `section-${entry.id}`)
      journalContent.appendChild(sectionContainer);

      const journalh2 = document.createElement("h2")
      const journalSection =document.createElement("section");
      const journalMood = document.createElement("p")
      const journalEntry = document.createElement("p")
      const entryDeleteButton = document.createElement("button")

      journalh2.textContent = entry.concept;
      journalSection.textContent = entry.date;
      journalMood.textContent = entry.mood;
      journalEntry.textContent = entry.entry;
      entryDeleteButton.textContent = "Delete Entry"
      entryDeleteButton.setAttribute("id",`delete-${entry.id}`)

      sectionContainer.appendChild(journalh2);
      sectionContainer.appendChild(journalSection);
      sectionContainer.appendChild(journalMood);
      sectionContainer.appendChild(journalEntry);
      sectionContainer.appendChild(entryDeleteButton);
      entryDeleteButton.addEventListener("click", () => {
        eventListener.deleteJournalEntry();
      })
      

    });
    return journalContent;
  }
}

export default journalList


