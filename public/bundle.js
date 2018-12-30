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
    let journalContent = document.createDocumentFragment();
    const journalElements = ["h2", "section", "p", "p"];
    const journalObjectInfo = [journalEntries.concept, journalEntries.date, journalEntries.mood, journalEntries.entry];
    let j = 0;
    journalEntries.forEach(entry => {
      j++;
      journalContent.appendChild(_domComponents.default.createDomElement({
        elementType: "section",
        attributes: {
          class: "resource-section",
          id: `resource-${j}`
        }
      }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudHMuanMiLCIuLi9zY3JpcHRzL2V2ZW50TGlzdGVuZXIuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWxEYXRhLmpzIiwiLi4vc2NyaXB0cy9qb3VybmFsTGlzdC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFFQSxNQUFNLGFBQWEsR0FBRztBQUNwQixFQUFBLGdCQUFnQixDQUFDO0FBQUUsSUFBQSxXQUFGO0FBQWUsSUFBQSxPQUFPLEdBQUcsSUFBekI7QUFBK0IsSUFBQSxRQUFRLEdBQUcsRUFBMUM7QUFBOEMsSUFBQSxVQUFVLEdBQUc7QUFBM0QsR0FBRCxFQUFrRTtBQUNoRixVQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixDQUFoQjtBQUNBLElBQUEsT0FBTyxDQUFDLFdBQVIsR0FBc0IsT0FBdEI7O0FBRUEsU0FBSyxJQUFJLEdBQVQsSUFBZ0IsVUFBaEIsRUFBNEI7QUFDMUIsTUFBQSxPQUFPLENBQUMsWUFBUixDQUFxQixHQUFyQixFQUEwQixVQUFVLENBQUMsR0FBRCxDQUFwQztBQUNEOztBQUNELFdBQU8sT0FBUDtBQUNEOztBQVRtQixDQUF0QjtlQVllLGE7Ozs7Ozs7Ozs7QUNmZjtBQUVBLE1BQU0sYUFBYSxHQUFHO0FBQ3BCLEVBQUEsYUFBYSxHQUFJO0FBQ2Y7QUFDQSxVQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4QixDQUFwQjtBQUNBLFVBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLGdCQUF4QixDQUF2QjtBQUNBLFVBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCLENBQXJCO0FBQ0EsUUFBSSxVQUFVLEdBQUcs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LENBQUMsSUFBRCxFQUFPLFNBQVAsRUFBa0IsR0FBbEIsRUFBdUIsR0FBdkIsQ0FBeEI7QUFDQSxVQUFNLGlCQUFpQixHQUFHLENBQUMsY0FBYyxDQUFDLE9BQWhCLEVBQXlCLGNBQWMsQ0FBQyxJQUF4QyxFQUE4QyxjQUFjLENBQUMsSUFBN0QsRUFBbUUsY0FBYyxDQUFDLEtBQWxGLENBQTFCO0FBQ0EsUUFBSSxDQUFDLEdBQUcsQ0FBUjtBQUNBLElBQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsS0FBSyxJQUFJO0FBQzlCLE1BQUEsQ0FBQztBQUNELE1BQUEsY0FBYyxDQUFDLFdBQWYsQ0FBMkIsdUJBQWMsZ0JBQWQsQ0FBK0I7QUFDeEQsUUFBQSxXQUFXLEVBQUUsU0FEMkM7QUFFeEQsUUFBQSxVQUFVLEVBQUU7QUFDVixVQUFBLEtBQUssRUFBRSxrQkFERztBQUVWLFVBQUEsRUFBRSxFQUFHLFlBQVcsQ0FBRTtBQUZSO0FBRjRDLE9BQS9CLENBQTNCO0FBT0QsS0FURDtBQVVBLFdBQU8sY0FBUDtBQUNEOztBQWpCaUIsQ0FBcEI7ZUFvQmUsVzs7Ozs7O0FDekJmOzs7O0FBQ0E7QUFHQSxpQkFBUSxTQUFSLEcsQ0FDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGltcG9ydCBqb3VybmFsIGZyb20gXCIuL2pvdXJuYWwuanNcIlxuLy8gaW1wb3J0IGpvdXJuYWxMaXN0IGZyb20gXCIuL2pvdXJuYWxMaXN0LmpzXCJcblxuY29uc3QgZG9tQ29tcG9uZW50cyA9IHtcbiAgY3JlYXRlRG9tRWxlbWVudCh7IGVsZW1lbnRUeXBlLCBjb250ZW50ID0gbnVsbCwgY3NzQ2xhc3MgPSBcIlwiLCBhdHRyaWJ1dGVzID0ge30gfSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICBcbiAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgZG9tQ29tcG9uZW50cyIsIi8vIGltcG9ydCBqb3VybmFsRGF0YSBmcm9tIFwiLi9qb3VybmFsRGF0YS5qc1wiXG5cbmNvbnN0IGV2ZW50TGlzdGVuZXIgPSB7XG4gIGpvdXJuYWxCdXR0b24gKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tpdHlcIik7XG4gICAgY29uc3Qgam91cm5hbERhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxEYXRlXCIpO1xuICAgIGNvbnN0IGpvdXJuYWxDb25jZXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb3VybmFsQ29uY2VwdFwiKTtcbiAgICBjb25zdCBqb3VybmFsRW50cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxFbnRyeVwiKTtcbiAgICBsZXQgbW9vZFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9vZFwiKTtcbiAgICBsZXQgbW9vZFZhbHVlID0gbW9vZFNlbGVjdC5vcHRpb25zW21vb2RTZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dDtcblxuXG4gICAgICBjb25zdCBlbnRyeU9iamVjdCA9IHtcbiAgICAgICAgZGF0ZTogam91cm5hbERhdGUudmFsdWUsXG4gICAgICAgIGNvbmNlcHQ6IGpvdXJuYWxDb25jZXB0LnZhbHVlLFxuICAgICAgICBlbnRyeTogam91cm5hbEVudHJ5LnZhbHVlLFxuICAgICAgICBtb29kOiBtb29kVmFsdWVcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGVudHJ5T2JqZWN0KTtcbiAgICAgIC8vIGpvdXJuYWxEYXRhLnNhdmVKb3VybmFsRW50cnkoZW50cnlPYmplY3QpO1xuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IGV2ZW50TGlzdGVuZXIiLCJpbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzLmpzXCJcbmltcG9ydCBldmVudExpc3RlbmVyIGZyb20gXCIuL2V2ZW50TGlzdGVuZXIuanNcIjtcbmltcG9ydCBqb3VybmFsRGF0YSBmcm9tIFwiLi9qb3VybmFsRGF0YS5qc1wiO1xuaW1wb3J0IGpvdXJuYWxMaXN0IGZyb20gXCIuL2pvdXJuYWxMaXN0LmpzXCI7XG5cbmNvbnN0IGpvdXJuYWwgPSB7XG4gIGVudHJ5Rm9ybSAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImZvcm1cIixcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaWQ6IFwiZm9ybS1jb250YWluZXJcIixcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgY29uc3QgZmllbGRTZXRBcnJheSA9IFsxLDIsMyw0XVxuICAgICAgZmllbGRTZXRBcnJheS5mb3JFYWNoKGZpZWxkSWQgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLWNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgICBlbGVtZW50VHlwZTogXCJmaWVsZHNldFwiLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6IGBmaWVsZC0ke2ZpZWxkSWR9YFxuICAgICAgICB9XG4gICAgICB9KSlcbiAgICB9KTtcbiAgY29uc3QgbGFiZWxBcnJheSA9IFtcImpvdXJuYWxEYXRlXCIsIFwiam91cm5hbENvbmNlcHRcIiwgXCJqb3VybmFsRW50cnlcIiwgXCJtb29kXCIsXVxuICBjb25zdCBjb250ZW50QXJyYXkgPSBbXCJlbXB0eVwiLCBcIkRhdGUgT2YgRW50cnlcIiwgXCJDb25jZXB0cyBDb3ZlcmVkXCIsIFwiSm91cm5hbCBFbnRyeVwiLCBcIk1vb2RcIl1cbiAgbGV0IGkgPSAwO1xuICBsYWJlbEFycmF5LmZvckVhY2gobGFiZWwgPT4ge1xuICAgIGkrKztcbiAgICAvLyBjb25zb2xlLmxvZyhpKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZmllbGQtJHtpfWApLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJsYWJlbFwiLFxuICAgICAgY29udGVudDogYCR7Y29udGVudEFycmF5W2ldfWAsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGZvcjogYCR7bGFiZWx9YFxuICAgICAgfVxuICAgIH0pKVxuICB9KTtcbiAgY29uc3QgaW5wdXRBcnJheSA9IFtcImRhdGVcIixcInRleHRcIl07XG4gIGxldCBqID0gMDtcbiAgaW5wdXRBcnJheS5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICBqKys7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmZpZWxkLSR7an1gKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IFwiaW5wdXRcIixcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgdHlwZTogYCR7aW5wdXR9YCxcbiAgICAgICAgbmFtZTogbGFiZWxBcnJheVtqLTFdLFxuICAgICAgICBpZDogbGFiZWxBcnJheVtqLTFdXG4gICAgICB9XG4gICAgfSkpXG4gIH0pO1xuICBjb25zdCB0ZXh0QXJlYUFuZFNlbGVjdCA9IFtcInRleHRhcmVhXCIsIFwic2VsZWN0XCJdXG4gIHRleHRBcmVhQW5kU2VsZWN0LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgaisrO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5maWVsZC0ke2p9YCkuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBlbGVtZW50LFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBpZDogbGFiZWxBcnJheVtqLTFdLFxuICAgICAgICBuYW1lOiBsYWJlbEFycmF5W2otMV0sXG4gICAgICB9XG4gICAgfSkpXG4gIH0pO1xuICBjb25zdCBtb29kQXJyYXkgPSBbXCJncmVhdFwiLCBcImdvb2RcIiwgXCJtZWhcIiwgXCJzYWRuZXNzXCIsIFwiZnVyaW91c1wiXTtcbiAgbW9vZEFycmF5LmZvckVhY2goZW1vdGlvbiA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb29kXCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJvcHRpb25cIixcbiAgICAgIGNvbnRlbnQ6IGVtb3Rpb24sXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIHZhbHVlOiBlbW90aW9uXG4gICAgICB9XG4gICAgfSkpXG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tY29udGFpbmVyXCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXG4gICAgY29udGVudDogXCJSZWNvcmQgSm91cm5hbCBFbnRyeVwiXG4gIH0pKVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBldmVudExpc3RlbmVyLmpvdXJuYWxCdXR0b24oKTtcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3V0cHV0XCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgZWxlbWVudFR5cGU6IFwiYXJ0aWNsZVwiLFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIGlkOiBcImRpc3BsYXktY29udGFpbmVyXCIsXG4gICAgICBjbGFzczogXCJlbnRyeUxvZ1wiXG4gICAgfVxuICB9KSk7XG4gICAgam91cm5hbERhdGEuZ2V0UmVzb3VyY2VzKClcbiAgICAudGhlbihqb3VybmFsT2JqZWN0ID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheS1jb250YWluZXJcIikuYXBwZW5kQ2hpbGQoam91cm5hbExpc3Quam91cm5hbENvbnRhaW5lcihqb3VybmFsT2JqZWN0KSk7XG4gICAgfSlcbiAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbCIsIi8vIGltcG9ydCBldmVudExpc3RlbmVyIGZyb20gXCIuL2V2ZW50TGlzdGVuZXIuanNcIlxuXG5cbmNvbnN0IGpvdXJuYWxEYXRhID0ge1xuICBnZXRSZXNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIilcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xuICB9LFxuICBzYXZlSm91cm5hbEVudHJ5IChlbnRyeVRvU2F2ZSkge1xuICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIiwgeyAvLyBSZXBsYWNlIFwidXJsXCIgd2l0aCB5b3VyIEFQSSdzIFVSTFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnlUb1NhdmUpXG59KVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbERhdGEiLCJpbXBvcnQgZG9tQ29tcG9uZW50cyBmcm9tIFwiLi9kb21Db21wb25lbnRzXCI7XG5cbi8vIGltcG9ydCBkb21Db21wb25lbnRzIGZyb20gXCIuL2RvbUNvbXBvbmVudHMuanNcIlxuLy8gaW1wb3J0IGpvdXJuYWwgZnJvbSBcIi4vam91cm5hbC5qc1wiXG5cbmNvbnN0IGpvdXJuYWxMaXN0ID0ge1xuICBqb3VybmFsQ29udGFpbmVyIChqb3VybmFsRW50cmllcykge1xuICAgIGxldCBqb3VybmFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBjb25zdCBqb3VybmFsRWxlbWVudHMgPSBbXCJoMlwiLCBcInNlY3Rpb25cIiwgXCJwXCIsIFwicFwiXTtcbiAgICBjb25zdCBqb3VybmFsT2JqZWN0SW5mbyA9IFtqb3VybmFsRW50cmllcy5jb25jZXB0LCBqb3VybmFsRW50cmllcy5kYXRlLCBqb3VybmFsRW50cmllcy5tb29kLCBqb3VybmFsRW50cmllcy5lbnRyeV1cbiAgICBsZXQgaiA9IDA7XG4gICAgam91cm5hbEVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBqKys7XG4gICAgICBqb3VybmFsQ29udGVudC5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgICBlbGVtZW50VHlwZTogXCJzZWN0aW9uXCIsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogXCJyZXNvdXJjZS1zZWN0aW9uXCIsXG4gICAgICAgICAgaWQ6IGByZXNvdXJjZS0ke2p9YFxuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGpvdXJuYWxDb250ZW50O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxMaXN0XG5cblxuIiwiaW1wb3J0IGpvdXJuYWwgZnJvbSBcIi4vam91cm5hbC5qc1wiXG4vLyBpbXBvcnQgam91cm5hbExpc3QgZnJvbSBcIi4vam91cm5hbExpc3QuanNcIjtcblxuXG5qb3VybmFsLmVudHJ5Rm9ybSgpO1xuLy8gam91cm5hbExpc3Quam91cm5hbENvbnRhaW5lcigpO1xuXG5cblxuIl19
