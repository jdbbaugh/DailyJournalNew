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

var _journalData = _interopRequireDefault(require("./journalData.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventListener = {
  journalButton() {
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
    console.log(entryObject);

    _journalData.default.saveJournalEntry(entryObject);
  },

  deleteJournalEntry() {
    let entryToDelete = event.target.id.split("-");
    console.log(entryToDelete[1]);

    _journalData.default.deleteJournalEntry(entryToDelete[1]);

    console.log(`section-${entryToDelete[1]}`);
    let goodByeSearchResults = document.getElementById(`section-${entryToDelete[1]}`);
    goodByeSearchResults.parentNode.removeChild(goodByeSearchResults);
  }

};
var _default = eventListener;
exports.default = _default;

},{"./journalData.js":4}],3:[function(require,module,exports){
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
      content: "Record Journal Entry",
      attributes: {
        id: "entry-button"
      }
    }));
    document.querySelector("#entry-button").addEventListener("click", () => {
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
  },

  deleteJournalEntry(entryToDelete) {
    fetch(`http://localhost:8088/entries/${entryToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: entryToDelete
      })
    }).then(res => res.text()).then(res => alert(`you deleted Journal Entry ${entryToDelete}`));
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

var _eventListener = _interopRequireDefault(require("./eventListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import domComponents from "./domComponents";
// import domComponents from "./domComponents.js"
// import journal from "./journal.js"
const journalList = {
  journalContainer(journalEntries) {
    const journalContent = document.createDocumentFragment();
    journalEntries.forEach(entry => {
      const sectionContainer = document.createElement("section");
      sectionContainer.setAttribute("class", "resource-section");
      sectionContainer.setAttribute("id", `section-${entry.id}`);
      journalContent.appendChild(sectionContainer);
      const journalh2 = document.createElement("h2");
      const journalSection = document.createElement("section");
      const journalMood = document.createElement("p");
      const journalEntry = document.createElement("p");
      const entryDeleteButton = document.createElement("button");
      journalh2.textContent = entry.concept;
      journalSection.textContent = entry.date;
      journalMood.textContent = entry.mood;
      journalEntry.textContent = entry.entry;
      entryDeleteButton.textContent = "Delete Entry";
      entryDeleteButton.setAttribute("id", `delete-${entry.id}`);
      sectionContainer.appendChild(journalh2);
      sectionContainer.appendChild(journalSection);
      sectionContainer.appendChild(journalMood);
      sectionContainer.appendChild(journalEntry);
      sectionContainer.appendChild(entryDeleteButton);
      entryDeleteButton.addEventListener("click", () => {
        _eventListener.default.deleteJournalEntry();
      });
    });
    return journalContent;
  }

};
var _default = journalList;
exports.default = _default;

},{"./eventListener":2}],6:[function(require,module,exports){
"use strict";

var _journal = _interopRequireDefault(require("./journal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import journalList from "./journalList.js";
_journal.default.entryForm(); // journalList.journalContainer();

},{"./journal.js":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudHMuanMiLCIuLi9zY3JpcHRzL2V2ZW50TGlzdGVuZXIuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWxEYXRhLmpzIiwiLi4vc2NyaXB0cy9qb3VybmFsTGlzdC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFFQSxNQUFNLGFBQWEsR0FBRztBQUNwQixFQUFBLGdCQUFnQixDQUFDO0FBQUUsSUFBQSxXQUFGO0FBQWUsSUFBQSxPQUFPLEdBQUcsSUFBekI7QUFBK0IsSUFBQSxRQUFRLEdBQUcsRUFBMUM7QUFBOEMsSUFBQSxVQUFVLEdBQUc7QUFBM0QsR0FBRCxFQUFrRTtBQUNoRixVQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixDQUFoQjtBQUNBLElBQUEsT0FBTyxDQUFDLFdBQVIsR0FBc0IsT0FBdEI7O0FBRUEsU0FBSyxJQUFJLEdBQVQsSUFBZ0IsVUFBaEIsRUFBNEI7QUFDMUIsTUFBQSxPQUFPLENBQUMsWUFBUixDQUFxQixHQUFyQixFQUEwQixVQUFVLENBQUMsR0FBRCxDQUFwQztBQUNEOztBQUNELFdBQU8sT0FBUDtBQUNEOztBQVRtQixDQUF0QjtlQVllLGE7Ozs7Ozs7Ozs7O0FDZmY7Ozs7QUFFQSxNQUFNLGFBQWEsR0FBRztBQUNwQixFQUFBLGFBQWEsR0FBSTtBQUNmLFVBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLGFBQXhCLENBQXBCO0FBQ0EsVUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQXZCO0FBQ0EsVUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSxRQUFJLFVBQVUsR0FBRyxR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N0I7QUFDQSxNQUFBLGdCQUFnQixDQUFDLFdBQWpCLENBQTZCLGlCQUE3QjtBQUNBLE1BQUEsaUJBQWlCLENBQUMsZ0JBQWxCLENBQW1DLE9BQW5DLEVBQTRDLE1BQU07QUFDaEQsK0JBQWMsa0JBQWQ7QUFDRCxPQUZEO0FBS0QsS0E3QkQ7QUE4QkEsV0FBTyxjQUFQO0FBQ0Q7O0FBbENpQixDQUFwQjtlQXFDZSxXOzs7Ozs7QUM1Q2Y7Ozs7QUFDQTtBQUdBLGlCQUFRLFNBQVIsRyxDQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gaW1wb3J0IGpvdXJuYWwgZnJvbSBcIi4vam91cm5hbC5qc1wiXG4vLyBpbXBvcnQgam91cm5hbExpc3QgZnJvbSBcIi4vam91cm5hbExpc3QuanNcIlxuXG5jb25zdCBkb21Db21wb25lbnRzID0ge1xuICBjcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGUsIGNvbnRlbnQgPSBudWxsLCBjc3NDbGFzcyA9IFwiXCIsIGF0dHJpYnV0ZXMgPSB7fSB9KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgIFxuICAgIGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBkb21Db21wb25lbnRzIiwiaW1wb3J0IGpvdXJuYWxEYXRhIGZyb20gXCIuL2pvdXJuYWxEYXRhLmpzXCJcblxuY29uc3QgZXZlbnRMaXN0ZW5lciA9IHtcbiAgam91cm5hbEJ1dHRvbiAoKSB7XG4gICAgY29uc3Qgam91cm5hbERhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxEYXRlXCIpO1xuICAgIGNvbnN0IGpvdXJuYWxDb25jZXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb3VybmFsQ29uY2VwdFwiKTtcbiAgICBjb25zdCBqb3VybmFsRW50cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxFbnRyeVwiKTtcbiAgICBsZXQgbW9vZFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9vZFwiKTtcbiAgICBsZXQgbW9vZFZhbHVlID0gbW9vZFNlbGVjdC5vcHRpb25zW21vb2RTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dDtcblxuXG4gICAgICBjb25zdCBlbnRyeU9iamVjdCA9IHtcbiAgICAgICAgZGF0ZTogam91cm5hbERhdGUudmFsdWUsXG4gICAgICAgIGNvbmNlcHQ6IGpvdXJuYWxDb25jZXB0LnZhbHVlLFxuICAgICAgICBlbnRyeTogam91cm5hbEVudHJ5LnZhbHVlLFxuICAgICAgICBtb29kOiBtb29kVmFsdWVcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGVudHJ5T2JqZWN0KTtcbiAgICAgIGpvdXJuYWxEYXRhLnNhdmVKb3VybmFsRW50cnkoZW50cnlPYmplY3QpO1xuICB9LFxuICBkZWxldGVKb3VybmFsRW50cnkgKCkge1xuICAgIGxldCBlbnRyeVRvRGVsZXRlID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVxuICAgIGNvbnNvbGUubG9nKGVudHJ5VG9EZWxldGVbMV0pO1xuICAgIGpvdXJuYWxEYXRhLmRlbGV0ZUpvdXJuYWxFbnRyeShlbnRyeVRvRGVsZXRlWzFdKTtcbiAgICBjb25zb2xlLmxvZygoYHNlY3Rpb24tJHtlbnRyeVRvRGVsZXRlWzFdfWApKTtcbiAgICBsZXQgZ29vZEJ5ZVNlYXJjaFJlc3VsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc2VjdGlvbi0ke2VudHJ5VG9EZWxldGVbMV19YCk7XG4gICAgZ29vZEJ5ZVNlYXJjaFJlc3VsdHMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChnb29kQnllU2VhcmNoUmVzdWx0cyk7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBldmVudExpc3RlbmVyIiwiaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50cy5qc1wiXG5pbXBvcnQgZXZlbnRMaXN0ZW5lciBmcm9tIFwiLi9ldmVudExpc3RlbmVyLmpzXCI7XG5pbXBvcnQgam91cm5hbERhdGEgZnJvbSBcIi4vam91cm5hbERhdGEuanNcIjtcbmltcG9ydCBqb3VybmFsTGlzdCBmcm9tIFwiLi9qb3VybmFsTGlzdC5qc1wiO1xuXG5jb25zdCBqb3VybmFsID0ge1xuICBlbnRyeUZvcm0gKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0XCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJmb3JtXCIsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGlkOiBcImZvcm0tY29udGFpbmVyXCIsXG4gICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnN0IGZpZWxkU2V0QXJyYXkgPSBbMSwyLDMsNF1cbiAgICAgIGZpZWxkU2V0QXJyYXkuZm9yRWFjaChmaWVsZElkID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiZmllbGRzZXRcIixcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiBgZmllbGQtJHtmaWVsZElkfWBcbiAgICAgICAgfVxuICAgICAgfSkpXG4gICAgfSk7XG4gIGNvbnN0IGxhYmVsQXJyYXkgPSBbXCJqb3VybmFsRGF0ZVwiLCBcImpvdXJuYWxDb25jZXB0XCIsIFwiam91cm5hbEVudHJ5XCIsIFwibW9vZFwiLF1cbiAgY29uc3QgY29udGVudEFycmF5ID0gW1wiZW1wdHlcIiwgXCJEYXRlIE9mIEVudHJ5XCIsIFwiQ29uY2VwdHMgQ292ZXJlZFwiLCBcIkpvdXJuYWwgRW50cnlcIiwgXCJNb29kXCJdXG4gIGxldCBpID0gMDtcbiAgbGFiZWxBcnJheS5mb3JFYWNoKGxhYmVsID0+IHtcbiAgICBpKys7XG4gICAgLy8gY29uc29sZS5sb2coaSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmZpZWxkLSR7aX1gKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwibGFiZWxcIixcbiAgICAgIGNvbnRlbnQ6IGAke2NvbnRlbnRBcnJheVtpXX1gLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBmb3I6IGAke2xhYmVsfWBcbiAgICAgIH1cbiAgICB9KSlcbiAgfSk7XG4gIGNvbnN0IGlucHV0QXJyYXkgPSBbXCJkYXRlXCIsXCJ0ZXh0XCJdO1xuICBsZXQgaiA9IDA7XG4gIGlucHV0QXJyYXkuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgaisrO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5maWVsZC0ke2p9YCkuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImlucHV0XCIsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIHR5cGU6IGAke2lucHV0fWAsXG4gICAgICAgIG5hbWU6IGxhYmVsQXJyYXlbai0xXSxcbiAgICAgICAgaWQ6IGxhYmVsQXJyYXlbai0xXVxuICAgICAgfVxuICAgIH0pKVxuICB9KTtcbiAgY29uc3QgdGV4dEFyZWFBbmRTZWxlY3QgPSBbXCJ0ZXh0YXJlYVwiLCBcInNlbGVjdFwiXVxuICB0ZXh0QXJlYUFuZFNlbGVjdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIGorKztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZmllbGQtJHtqfWApLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogZWxlbWVudCxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaWQ6IGxhYmVsQXJyYXlbai0xXSxcbiAgICAgICAgbmFtZTogbGFiZWxBcnJheVtqLTFdLFxuICAgICAgfVxuICAgIH0pKVxuICB9KTtcbiAgY29uc3QgbW9vZEFycmF5ID0gW1wiZ3JlYXRcIiwgXCJnb29kXCIsIFwibWVoXCIsIFwic2FkbmVzc1wiLCBcImZ1cmlvdXNcIl07XG4gIG1vb2RBcnJheS5mb3JFYWNoKGVtb3Rpb24gPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZFwiKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwib3B0aW9uXCIsXG4gICAgICBjb250ZW50OiBlbW90aW9uLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICB2YWx1ZTogZW1vdGlvblxuICAgICAgfVxuICAgIH0pKVxuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLWNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgIGVsZW1lbnRUeXBlOiBcImJ1dHRvblwiLFxuICAgIGNvbnRlbnQ6IFwiUmVjb3JkIEpvdXJuYWwgRW50cnlcIixcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBpZDogXCJlbnRyeS1idXR0b25cIlxuICAgIH1cbiAgfSkpXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnktYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBldmVudExpc3RlbmVyLmpvdXJuYWxCdXR0b24oKTtcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0XCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgZWxlbWVudFR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGlkOiBcImRpc3BsYXktY29udGFpbmVyXCIsXG4gICAgICBjbGFzczogXCJlbnRyeUxvZ1wiXG4gICAgfVxuICB9KSk7XG4gICAgam91cm5hbERhdGEuZ2V0UmVzb3VyY2VzKClcbiAgICAudGhlbihqb3VybmFsT2JqZWN0ID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1jb250YWluZXJcIikuYXBwZW5kQ2hpbGQoam91cm5hbExpc3Quam91cm5hbENvbnRhaW5lcihqb3VybmFsT2JqZWN0KSk7XG4gICAgfSlcbiAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbCIsIi8vIGltcG9ydCBldmVudExpc3RlbmVyIGZyb20gXCIuL2V2ZW50TGlzdGVuZXIuanNcIlxuXG5cbmNvbnN0IGpvdXJuYWxEYXRhID0ge1xuICBnZXRSZXNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIilcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xuICB9LFxuICBzYXZlSm91cm5hbEVudHJ5IChlbnRyeVRvU2F2ZSkge1xuICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIiwgeyAvLyBSZXBsYWNlIFwidXJsXCIgd2l0aCB5b3VyIEFQSSdzIFVSTFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnlUb1NhdmUpXG59KVxuICB9LFxuICBkZWxldGVKb3VybmFsRW50cnkgKGVudHJ5VG9EZWxldGUpIHtcbiAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXMvJHtlbnRyeVRvRGVsZXRlfWAsIHtcbiAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxuICBib2R5OiBKU09OLnN0cmluZ2lmeSh7aWQ6IGVudHJ5VG9EZWxldGV9KVxufSlcbi50aGVuKHJlcyA9PiByZXMudGV4dCgpKVxuLnRoZW4ocmVzID0+IGFsZXJ0KGB5b3UgZGVsZXRlZCBKb3VybmFsIEVudHJ5ICR7ZW50cnlUb0RlbGV0ZX1gKSlcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbERhdGEiLCJpbXBvcnQgZXZlbnRMaXN0ZW5lciBmcm9tIFwiLi9ldmVudExpc3RlbmVyXCI7XG5cbi8vIGltcG9ydCBkb21Db21wb25lbnRzIGZyb20gXCIuL2RvbUNvbXBvbmVudHNcIjtcblxuLy8gaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50cy5qc1wiXG4vLyBpbXBvcnQgam91cm5hbCBmcm9tIFwiLi9qb3VybmFsLmpzXCJcblxuY29uc3Qgam91cm5hbExpc3QgPSB7XG4gIGpvdXJuYWxDb250YWluZXIgKGpvdXJuYWxFbnRyaWVzKSB7XG4gICAgY29uc3Qgam91cm5hbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgam91cm5hbEVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBjb25zdCBzZWN0aW9uQ29udGFpbmVyID1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICAgIHNlY3Rpb25Db250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyZXNvdXJjZS1zZWN0aW9uXCIpO1xuICAgICAgc2VjdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgc2VjdGlvbi0ke2VudHJ5LmlkfWApXG4gICAgICBqb3VybmFsQ29udGVudC5hcHBlbmRDaGlsZChzZWN0aW9uQ29udGFpbmVyKTtcblxuICAgICAgY29uc3Qgam91cm5hbGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpXG4gICAgICBjb25zdCBqb3VybmFsU2VjdGlvbiA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgICBjb25zdCBqb3VybmFsTW9vZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXG4gICAgICBjb25zdCBqb3VybmFsRW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxuICAgICAgY29uc3QgZW50cnlEZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG5cbiAgICAgIGpvdXJuYWxoMi50ZXh0Q29udGVudCA9IGVudHJ5LmNvbmNlcHQ7XG4gICAgICBqb3VybmFsU2VjdGlvbi50ZXh0Q29udGVudCA9IGVudHJ5LmRhdGU7XG4gICAgICBqb3VybmFsTW9vZC50ZXh0Q29udGVudCA9IGVudHJ5Lm1vb2Q7XG4gICAgICBqb3VybmFsRW50cnkudGV4dENvbnRlbnQgPSBlbnRyeS5lbnRyeTtcbiAgICAgIGVudHJ5RGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGUgRW50cnlcIlxuICAgICAgZW50cnlEZWxldGVCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIixgZGVsZXRlLSR7ZW50cnkuaWR9YClcblxuICAgICAgc2VjdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChqb3VybmFsaDIpO1xuICAgICAgc2VjdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChqb3VybmFsU2VjdGlvbik7XG4gICAgICBzZWN0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGpvdXJuYWxNb29kKTtcbiAgICAgIHNlY3Rpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoam91cm5hbEVudHJ5KTtcbiAgICAgIHNlY3Rpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZW50cnlEZWxldGVCdXR0b24pO1xuICAgICAgZW50cnlEZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5kZWxldGVKb3VybmFsRW50cnkoKTtcbiAgICAgIH0pXG4gICAgICBcblxuICAgIH0pO1xuICAgIHJldHVybiBqb3VybmFsQ29udGVudDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTGlzdFxuXG5cbiIsImltcG9ydCBqb3VybmFsIGZyb20gXCIuL2pvdXJuYWwuanNcIlxuLy8gaW1wb3J0IGpvdXJuYWxMaXN0IGZyb20gXCIuL2pvdXJuYWxMaXN0LmpzXCI7XG5cblxuam91cm5hbC5lbnRyeUZvcm0oKTtcbi8vIGpvdXJuYWxMaXN0LmpvdXJuYWxDb250YWluZXIoKTtcblxuXG5cbiJdfQ==
