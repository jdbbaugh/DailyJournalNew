import domComponents from "./domComponents";

// import domComponents from "./domComponents.js"
// import journal from "./journal.js"

const journalList = {
  journalContainer (journalEntries) {
    const journalContent = document.createDocumentFragment();


    const journalObjectInfo = [journalEntries.concept, journalEntries.date, journalEntries.mood, journalEntries.entry]
    let j = -1;
    journalEntries.forEach(entry => {
      const sectionContainer =document.createElement("section");
      sectionContainer.setAttribute("class", "resource-section");
      journalContent.appendChild(sectionContainer);

      const journalh2 = document.createElement("h2")
      const journalSection =document.createElement("section");
      const journalMood = document.createElement("p")
      const journalEntry = document.createElement("p")

      journalh2.textContent = entry.concept;
      journalSection.textContent = entry.date;
      journalMood.textContent = entry.mood;
      journalEntry.textContent = entry.entry;

      sectionContainer.appendChild(journalh2);
      sectionContainer.appendChild(journalSection);
      sectionContainer.appendChild(journalMood);
      sectionContainer.appendChild(journalEntry);
      

    });
    return journalContent;
  }
}

export default journalList


