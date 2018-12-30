import domComponents from "./domComponents";

// import domComponents from "./domComponents.js"
// import journal from "./journal.js"

const journalList = {
  journalContainer (journalEntries) {
    let journalContent = document.createDocumentFragment();
    const journalElements = ["h2", "section", "p", "p"];
    const journalObjectInfo = [journalEntries.concept, journalEntries.date, journalEntries.mood, journalEntries.entry]
    let j = 0;
    journalEntries.forEach(entry => {
      j++;
      journalContent.appendChild(domComponents.createDomElement({
        elementType: "section",
        attributes: {
          class: "resource-section",
          id: `resource-${j}`
        }
      }));
    });
    return journalContent;
  }
}

export default journalList


