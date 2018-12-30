(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import journal from "./journal.js"
// import journalList from "./journalList.js"
const domComponents = {
  createDomElement({
    elementType,
    content = null,
    cssClass = "",
    attributes = {}
  }) {
    const element = document.createElement(elementType);
    element.textContent = content;

    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    return element;
  }

};
var _default = domComponents;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import journalData from "./journalData.js"
const eventListener = {
  journalButton() {
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
    };
    console.log(entryObject); // journalData.saveJournalEntry(entryObject);
  }

};
var _default = eventListener;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domComponents = _interopRequireDefault(require("./domComponents.js"));

var _eventListener = _interopRequireDefault(require("./eventListener.js"));

var _journalData = _interopRequireDefault(require("./journalData.js"));

var _journalList = _interopRequireDefault(require("./journalList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const journal = {
  entryForm() {
    document.querySelector(".output").appendChild(_domComponents.default.createDomElement({
      elementType: "form",
      attributes: {
        id: "form-container"
      }
    }));
    const fieldSetArray = [1, 2, 3, 4];
    fieldSetArray.forEach(fieldId => {
      document.querySelector("#form-container").appendChild(_domComponents.default.createDomElement({
        elementType: "fieldset",
        attributes: {
          class: `field-${fieldId}`
        }
      }));
    });
    const labelArray = ["journalDate", "journalConcept", "journalEntry", "mood"];
    const contentArray = ["empty", "Date Of Entry", "Concepts Covered", "Journal Entry", "Mood"];
    let i = 0;
    labelArray.forEach(label => {
      i++; // console.log(i);

      document.querySelector(`.field-${i}`).appendChild(_domComponents.default.createDomElement({
        elementType: "label",
        content: `${contentArray[i]}`,
        attributes: {
          for: `${label}`
        }
      }));
    });
    const inputArray = ["date", "text"];
    let j = 0;
    inputArray.forEach(input => {
      j++;
      document.querySelector(`.field-${j}`).appendChild(_domComponents.default.createDomElement({
        elementType: "input",
        attributes: {
          type: `${input}`,
          name: labelArray[j - 1],
          id: labelArray[j - 1]
        }
      }));
    });
    const textAreaAndSelect = ["textarea", "select"];
    textAreaAndSelect.forEach(element => {
      j++;
      document.querySelector(`.field-${j}`).appendChild(_domComponents.default.createDomElement({
        elementType: element,
        attributes: {
          id: labelArray[j - 1],
          name: labelArray[j - 1]
        }
      }));
    });
    const moodArray = ["great", "good", "meh", "sadness", "furious"];
    moodArray.forEach(emotion => {
      document.querySelector("#mood").appendChild(_domComponents.default.createDomElement({
        elementType: "option",
        content: emotion,
        attributes: {
          value: emotion
        }
      }));
    });
    document.querySelector("#form-container").appendChild(_domComponents.default.createDomElement({
      elementType: "button",
      content: "Record Journal Entry"
    }));
    document.querySelector("button").addEventListener("click", () => {
      _eventListener.default.journalButton();
    });
    document.querySelector(".output").appendChild(_domComponents.default.createDomElement({
      elementType: "article",
      attributes: {
        id: "display-container",
        class: "entryLog"
      }
    }));

    _journalData.default.getResources().then(journalObject => {
      document.getElementById("display-container").appendChild(_journalList.default.journalContainer(journalObject));
    });
  }

};
var _default = journal;
exports.default = _default;

},{"./domComponents.js":1,"./eventListener.js":2,"./journalData.js":4,"./journalList.js":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import eventListener from "./eventListener.js"
const journalData = {
  getResources() {
    return fetch("http://localhost:8088/entries").then(response => response.json());
  },

  saveJournalEntry(entryToSave) {
    fetch("http://localhost:8088/entries", {
      // Replace "url" with your API's URL
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryToSave)
    });
  }

};
var _default = journalData;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domComponents = _interopRequireDefault(require("./domComponents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import domComponents from "./domComponents.js"
// import journal from "./journal.js"
const journalList = {
  journalContainer(journalEntries) {
    const journalContent = document.createDocumentFragment();
    const journalObjectInfo = [journalEntries.concept, journalEntries.date, journalEntries.mood, journalEntries.entry];
    let j = -1;
    journalEntries.forEach(entry => {
      const sectionContainer = document.createElement("section");
      sectionContainer.setAttribute("class", "resource-section");
      journalContent.appendChild(sectionContainer);
      const journalh2 = document.createElement("h2");
      const journalSection = document.createElement("section");
      const journalMood = document.createElement("p");
      const journalEntry = document.createElement("p");
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

};
var _default = journalList;
exports.default = _default;

},{"./domComponents":1}],6:[function(require,module,exports){
"use strict";

var _journal = _interopRequireDefault(require("./journal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import journalList from "./journalList.js";
_journal.default.entryForm(); // journalList.journalContainer();

},{"./journal.js":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudHMuanMiLCIuLi9zY3JpcHRzL2V2ZW50TGlzdGVuZXIuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWxEYXRhLmpzIiwiLi4vc2NyaXB0cy9qb3VybmFsTGlzdC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFFQSxNQUFNLGFBQWEsR0FBRztBQUNwQixFQUFBLGdCQUFnQixDQUFDO0FBQUUsSUFBQSxXQUFGO0FBQWUsSUFBQSxPQUFPLEdBQUcsSUFBekI7QUFBK0IsSUFBQSxRQUFRLEdBQUcsRUFBMUM7QUFBOEMsSUFBQSxVQUFVLEdBQUc7QUFBM0QsR0FBRCxFQUFrRTtBQUNoRixVQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixDQUFoQjtBQUNBLElBQUEsT0FBTyxDQUFDLFdBQVIsR0FBc0IsT0FBdEI7O0FBRUEsU0FBSyxJQUFJLEdBQVQsSUFBZ0IsVUFBaEIsRUFBNEI7QUFDMUIsTUFBQSxPQUFPLENBQUMsWUFBUixDQUFxQixHQUFyQixFQUEwQixVQUFVLENBQUMsR0FBRCxDQUFwQztBQUNEOztBQUNELFdBQU8sT0FBUDtBQUNEOztBQVRtQixDQUF0QjtlQVllLGE7Ozs7Ozs7Ozs7QUNmZjtBQUVBLE1BQU0sYUFBYSxHQUFHO0FBQ3BCLEVBQUEsYUFBYSxHQUFJO0FBQ2Y7QUFDQSxVQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4QixDQUFwQjtBQUNBLFVBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLGdCQUF4QixDQUF2QjtBQUNBLFVBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCLENBQXJCO0FBQ0EsUUFBSSxVQUFVLEdBQUcs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O0FBQ0Q7O0FBOUJpQixDQUFwQjtlQWlDZSxXOzs7Ozs7QUN0Q2Y7Ozs7QUFDQTtBQUdBLGlCQUFRLFNBQVIsRyxDQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gaW1wb3J0IGpvdXJuYWwgZnJvbSBcIi4vam91cm5hbC5qc1wiXG4vLyBpbXBvcnQgam91cm5hbExpc3QgZnJvbSBcIi4vam91cm5hbExpc3QuanNcIlxuXG5jb25zdCBkb21Db21wb25lbnRzID0ge1xuICBjcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGUsIGNvbnRlbnQgPSBudWxsLCBjc3NDbGFzcyA9IFwiXCIsIGF0dHJpYnV0ZXMgPSB7fSB9KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgIFxuICAgIGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBkb21Db21wb25lbnRzIiwiLy8gaW1wb3J0IGpvdXJuYWxEYXRhIGZyb20gXCIuL2pvdXJuYWxEYXRhLmpzXCJcblxuY29uc3QgZXZlbnRMaXN0ZW5lciA9IHtcbiAgam91cm5hbEJ1dHRvbiAoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJjbGlja2l0eVwiKTtcbiAgICBjb25zdCBqb3VybmFsRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam91cm5hbERhdGVcIik7XG4gICAgY29uc3Qgam91cm5hbENvbmNlcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxDb25jZXB0XCIpO1xuICAgIGNvbnN0IGpvdXJuYWxFbnRyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam91cm5hbEVudHJ5XCIpO1xuICAgIGxldCBtb29kU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb29kXCIpO1xuICAgIGxldCBtb29kVmFsdWUgPSBtb29kU2VsZWN0Lm9wdGlvbnNbbW9vZFNlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0O1xuXG5cbiAgICAgIGNvbnN0IGVudHJ5T2JqZWN0ID0ge1xuICAgICAgICBkYXRlOiBqb3VybmFsRGF0ZS52YWx1ZSxcbiAgICAgICAgY29uY2VwdDogam91cm5hbENvbmNlcHQudmFsdWUsXG4gICAgICAgIGVudHJ5OiBqb3VybmFsRW50cnkudmFsdWUsXG4gICAgICAgIG1vb2Q6IG1vb2RWYWx1ZVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZW50cnlPYmplY3QpO1xuICAgICAgLy8gam91cm5hbERhdGEuc2F2ZUpvdXJuYWxFbnRyeShlbnRyeU9iamVjdCk7XG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgZXZlbnRMaXN0ZW5lciIsImltcG9ydCBkb21Db21wb25lbnRzIGZyb20gXCIuL2RvbUNvbXBvbmVudHMuanNcIlxuaW1wb3J0IGV2ZW50TGlzdGVuZXIgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lci5qc1wiO1xuaW1wb3J0IGpvdXJuYWxEYXRhIGZyb20gXCIuL2pvdXJuYWxEYXRhLmpzXCI7XG5pbXBvcnQgam91cm5hbExpc3QgZnJvbSBcIi4vam91cm5hbExpc3QuanNcIjtcblxuY29uc3Qgam91cm5hbCA9IHtcbiAgZW50cnlGb3JtICgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm91dHB1dFwiKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiZm9ybVwiLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBpZDogXCJmb3JtLWNvbnRhaW5lclwiLFxuICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zdCBmaWVsZFNldEFycmF5ID0gWzEsMiwzLDRdXG4gICAgICBmaWVsZFNldEFycmF5LmZvckVhY2goZmllbGRJZCA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tY29udGFpbmVyXCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICAgIGVsZW1lbnRUeXBlOiBcImZpZWxkc2V0XCIsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogYGZpZWxkLSR7ZmllbGRJZH1gXG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0pO1xuICBjb25zdCBsYWJlbEFycmF5ID0gW1wiam91cm5hbERhdGVcIiwgXCJqb3VybmFsQ29uY2VwdFwiLCBcImpvdXJuYWxFbnRyeVwiLCBcIm1vb2RcIixdXG4gIGNvbnN0IGNvbnRlbnRBcnJheSA9IFtcImVtcHR5XCIsIFwiRGF0ZSBPZiBFbnRyeVwiLCBcIkNvbmNlcHRzIENvdmVyZWRcIiwgXCJKb3VybmFsIEVudHJ5XCIsIFwiTW9vZFwiXVxuICBsZXQgaSA9IDA7XG4gIGxhYmVsQXJyYXkuZm9yRWFjaChsYWJlbCA9PiB7XG4gICAgaSsrO1xuICAgIC8vIGNvbnNvbGUubG9nKGkpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5maWVsZC0ke2l9YCkuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImxhYmVsXCIsXG4gICAgICBjb250ZW50OiBgJHtjb250ZW50QXJyYXlbaV19YCxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgZm9yOiBgJHtsYWJlbH1gXG4gICAgICB9XG4gICAgfSkpXG4gIH0pO1xuICBjb25zdCBpbnB1dEFycmF5ID0gW1wiZGF0ZVwiLFwidGV4dFwiXTtcbiAgbGV0IGogPSAwO1xuICBpbnB1dEFycmF5LmZvckVhY2goaW5wdXQgPT4ge1xuICAgIGorKztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZmllbGQtJHtqfWApLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJpbnB1dFwiLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICB0eXBlOiBgJHtpbnB1dH1gLFxuICAgICAgICBuYW1lOiBsYWJlbEFycmF5W2otMV0sXG4gICAgICAgIGlkOiBsYWJlbEFycmF5W2otMV1cbiAgICAgIH1cbiAgICB9KSlcbiAgfSk7XG4gIGNvbnN0IHRleHRBcmVhQW5kU2VsZWN0ID0gW1widGV4dGFyZWFcIiwgXCJzZWxlY3RcIl1cbiAgdGV4dEFyZWFBbmRTZWxlY3QuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBqKys7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmZpZWxkLSR7an1gKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IGVsZW1lbnQsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGlkOiBsYWJlbEFycmF5W2otMV0sXG4gICAgICAgIG5hbWU6IGxhYmVsQXJyYXlbai0xXSxcbiAgICAgIH1cbiAgICB9KSlcbiAgfSk7XG4gIGNvbnN0IG1vb2RBcnJheSA9IFtcImdyZWF0XCIsIFwiZ29vZFwiLCBcIm1laFwiLCBcInNhZG5lc3NcIiwgXCJmdXJpb3VzXCJdO1xuICBtb29kQXJyYXkuZm9yRWFjaChlbW90aW9uID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcIm9wdGlvblwiLFxuICAgICAgY29udGVudDogZW1vdGlvbixcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgdmFsdWU6IGVtb3Rpb25cbiAgICAgIH1cbiAgICB9KSlcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICBlbGVtZW50VHlwZTogXCJidXR0b25cIixcbiAgICBjb250ZW50OiBcIlJlY29yZCBKb3VybmFsIEVudHJ5XCJcbiAgfSkpXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGV2ZW50TGlzdGVuZXIuam91cm5hbEJ1dHRvbigpO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICBlbGVtZW50VHlwZTogXCJhcnRpY2xlXCIsXG4gICAgYXR0cmlidXRlczoge1xuICAgICAgaWQ6IFwiZGlzcGxheS1jb250YWluZXJcIixcbiAgICAgIGNsYXNzOiBcImVudHJ5TG9nXCJcbiAgICB9XG4gIH0pKTtcbiAgICBqb3VybmFsRGF0YS5nZXRSZXNvdXJjZXMoKVxuICAgIC50aGVuKGpvdXJuYWxPYmplY3QgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5LWNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChqb3VybmFsTGlzdC5qb3VybmFsQ29udGFpbmVyKGpvdXJuYWxPYmplY3QpKTtcbiAgICB9KVxuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsIiwiLy8gaW1wb3J0IGV2ZW50TGlzdGVuZXIgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lci5qc1wiXG5cblxuY29uc3Qgam91cm5hbERhdGEgPSB7XG4gIGdldFJlc291cmNlcygpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gIH0sXG4gIHNhdmVKb3VybmFsRW50cnkgKGVudHJ5VG9TYXZlKSB7XG4gICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiLCB7IC8vIFJlcGxhY2UgXCJ1cmxcIiB3aXRoIHlvdXIgQVBJJ3MgVVJMXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlbnRyeVRvU2F2ZSlcbn0pXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRGF0YSIsImltcG9ydCBkb21Db21wb25lbnRzIGZyb20gXCIuL2RvbUNvbXBvbmVudHNcIjtcblxuLy8gaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50cy5qc1wiXG4vLyBpbXBvcnQgam91cm5hbCBmcm9tIFwiLi9qb3VybmFsLmpzXCJcblxuY29uc3Qgam91cm5hbExpc3QgPSB7XG4gIGpvdXJuYWxDb250YWluZXIgKGpvdXJuYWxFbnRyaWVzKSB7XG4gICAgY29uc3Qgam91cm5hbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cblxuICAgIGNvbnN0IGpvdXJuYWxPYmplY3RJbmZvID0gW2pvdXJuYWxFbnRyaWVzLmNvbmNlcHQsIGpvdXJuYWxFbnRyaWVzLmRhdGUsIGpvdXJuYWxFbnRyaWVzLm1vb2QsIGpvdXJuYWxFbnRyaWVzLmVudHJ5XVxuICAgIGxldCBqID0gLTE7XG4gICAgam91cm5hbEVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBjb25zdCBzZWN0aW9uQ29udGFpbmVyID1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICAgIHNlY3Rpb25Db250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyZXNvdXJjZS1zZWN0aW9uXCIpO1xuICAgICAgam91cm5hbENvbnRlbnQuYXBwZW5kQ2hpbGQoc2VjdGlvbkNvbnRhaW5lcik7XG5cbiAgICAgIGNvbnN0IGpvdXJuYWxoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKVxuICAgICAgY29uc3Qgam91cm5hbFNlY3Rpb24gPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgICAgY29uc3Qgam91cm5hbE1vb2QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxuICAgICAgY29uc3Qgam91cm5hbEVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcblxuICAgICAgam91cm5hbGgyLnRleHRDb250ZW50ID0gZW50cnkuY29uY2VwdDtcbiAgICAgIGpvdXJuYWxTZWN0aW9uLnRleHRDb250ZW50ID0gZW50cnkuZGF0ZTtcbiAgICAgIGpvdXJuYWxNb29kLnRleHRDb250ZW50ID0gZW50cnkubW9vZDtcbiAgICAgIGpvdXJuYWxFbnRyeS50ZXh0Q29udGVudCA9IGVudHJ5LmVudHJ5O1xuXG4gICAgICBzZWN0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGpvdXJuYWxoMik7XG4gICAgICBzZWN0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGpvdXJuYWxTZWN0aW9uKTtcbiAgICAgIHNlY3Rpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoam91cm5hbE1vb2QpO1xuICAgICAgc2VjdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChqb3VybmFsRW50cnkpO1xuICAgICAgXG5cbiAgICB9KTtcbiAgICByZXR1cm4gam91cm5hbENvbnRlbnQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbExpc3RcblxuXG4iLCJpbXBvcnQgam91cm5hbCBmcm9tIFwiLi9qb3VybmFsLmpzXCJcbi8vIGltcG9ydCBqb3VybmFsTGlzdCBmcm9tIFwiLi9qb3VybmFsTGlzdC5qc1wiO1xuXG5cbmpvdXJuYWwuZW50cnlGb3JtKCk7XG4vLyBqb3VybmFsTGlzdC5qb3VybmFsQ29udGFpbmVyKCk7XG5cblxuXG4iXX0=
