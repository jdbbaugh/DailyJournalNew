import domComponents from "./domComponents.js"
import eventListener from "./eventListener.js";
import journalData from "./journalData.js";
import journalList from "./journalList.js";

const journal = {
  entryForm () {
    document.querySelector(".output").appendChild(domComponents.createDomElement({
      elementType: "form",
      attributes: {
        id: "form-container",
      }
    }));
    const fieldSetArray = [1,2,3,4]
      fieldSetArray.forEach(fieldId => {
      document.querySelector("#form-container").appendChild(domComponents.createDomElement({
        elementType: "fieldset",
        attributes: {
          class: `field-${fieldId}`
        }
      }))
    });
  const labelArray = ["journalDate", "journalConcept", "journalEntry", "mood",]
  const contentArray = ["empty", "Date Of Entry", "Concepts Covered", "Journal Entry", "Mood"]
  let i = 0;
  labelArray.forEach(label => {
    i++;
    // console.log(i);
    document.querySelector(`.field-${i}`).appendChild(domComponents.createDomElement({
      elementType: "label",
      content: `${contentArray[i]}`,
      attributes: {
        for: `${label}`
      }
    }))
  });
  const inputArray = ["date","text"];
  let j = 0;
  inputArray.forEach(input => {
    j++;
    document.querySelector(`.field-${j}`).appendChild(domComponents.createDomElement({
      elementType: "input",
      attributes: {
        type: `${input}`,
        name: labelArray[j-1],
        id: labelArray[j-1]
      }
    }))
  });
  const textAreaAndSelect = ["textarea", "select"]
  textAreaAndSelect.forEach(element => {
    j++;
    document.querySelector(`.field-${j}`).appendChild(domComponents.createDomElement({
      elementType: element,
      attributes: {
        id: labelArray[j-1],
        name: labelArray[j-1],
      }
    }))
  });
  const moodArray = ["great", "good", "meh", "sadness", "furious"];
  moodArray.forEach(emotion => {
    document.querySelector("#mood").appendChild(domComponents.createDomElement({
      elementType: "option",
      content: emotion,
      attributes: {
        value: emotion
      }
    }))
  });
  document.querySelector("#form-container").appendChild(domComponents.createDomElement({
    elementType: "button",
    content: "Record Journal Entry",
    attributes: {
      id: "entry-button"
    }
  }))
  document.querySelector("#entry-button").addEventListener("click", () => {
      eventListener.journalButton();
  });
  document.querySelector(".output").appendChild(domComponents.createDomElement({
    elementType: "article",
    attributes: {
      id: "display-container",
      class: "entryLog"
    }
  }));
    journalData.getResources()
    .then(journalObject => {
      document.getElementById("display-container").appendChild(journalList.journalContainer(journalObject));
    })
  },
}

export default journal