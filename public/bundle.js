(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _journal = _interopRequireDefault(require("./journal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

},{"./journal.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _journalData = _interopRequireDefault(require("./journalData.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    console.log(entryObject);

    _journalData.default.saveJournalEntry(entryObject);
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const journal = {
  entryForm() {
    document.querySelector(".output").appendChild(_domComponents.default.createDomElement({
      elementType: "div",
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
  }

};
var _default = journal;
exports.default = _default;

},{"./domComponents.js":1,"./eventListener.js":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventListener = _interopRequireDefault(require("./eventListener.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

},{"./eventListener.js":2}],5:[function(require,module,exports){
"use strict";

var _journal = _interopRequireDefault(require("./journal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_journal.default.entryForm();

},{"./journal.js":3}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudHMuanMiLCIuLi9zY3JpcHRzL2V2ZW50TGlzdGVuZXIuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWxEYXRhLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7O0FBRUEsTUFBTSxhQUFhLEdBQUc7QUFDcEIsRUFBQSxnQkFBZ0IsQ0FBQztBQUFFLElBQUEsV0FBRjtBQUFlLElBQUEsT0FBTyxHQUFHLElBQXpCO0FBQStCLElBQUEsUUFBUSxHQUFHLEVBQTFDO0FBQThDLElBQUEsVUFBVSxHQUFHO0FBQTNELEdBQUQsRUFBa0U7QUFDaEYsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBaEI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLE9BQXRCOztBQUVBLFNBQUssSUFBSSxHQUFULElBQWdCLFVBQWhCLEVBQTRCO0FBQzFCLE1BQUEsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsR0FBckIsRUFBMEIsVUFBVSxDQUFDLEdBQUQsQ0FBcEM7QUFDRDs7QUFDRCxXQUFPLE9BQVA7QUFDRDs7QUFUbUIsQ0FBdEI7ZUFZZSxhOzs7Ozs7Ozs7OztBQ2RmOzs7O0FBRUEsTUFBTSxhQUFhLEdBQUc7QUFDcEIsRUFBQSxhQUFhLEdBQUk7QUFDZjtBQUNBLFVBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLGFBQXhCLENBQXBCO0FBQ0EsVUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQXZCO0FBQ0EsVUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSxRQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixNQUF4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RDtBQUdDOztBQXhFYSxDQUFoQjtlQTRFZSxPOzs7Ozs7Ozs7OztBQy9FZjs7OztBQUdBLE1BQU0sV0FBVyxHQUFHO0FBQ2xCLEVBQUEsWUFBWSxHQUFHO0FBQ2IsV0FBTyxLQUFLLENBQUMsK0JBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUQsR0FKaUI7O0FBS2xCLEVBQUEsZ0JBQWdCLENBQUUsV0FBRixFQUFlO0FBQzdCLElBQUEsS0FBSyxDQUFDLCtCQUFELEVBQWtDO0FBQUU7QUFDekMsTUFBQSxNQUFNLEVBQUUsTUFEK0I7QUFFdkMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUY4QjtBQUt2QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFdBQWY7QUFMaUMsS0FBbEMsQ0FBTDtBQU9EOztBQWJpQixDQUFwQjtlQWdCZSxXOzs7Ozs7QUNuQmY7Ozs7QUFHQSxpQkFBUSxTQUFSIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGpvdXJuYWwgZnJvbSBcIi4vam91cm5hbC5qc1wiXG5cbmNvbnN0IGRvbUNvbXBvbmVudHMgPSB7XG4gIGNyZWF0ZURvbUVsZW1lbnQoeyBlbGVtZW50VHlwZSwgY29udGVudCA9IG51bGwsIGNzc0NsYXNzID0gXCJcIiwgYXR0cmlidXRlcyA9IHt9IH0pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgXG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGRvbUNvbXBvbmVudHMiLCJpbXBvcnQgam91cm5hbERhdGEgZnJvbSBcIi4vam91cm5hbERhdGEuanNcIlxuXG5jb25zdCBldmVudExpc3RlbmVyID0ge1xuICBqb3VybmFsQnV0dG9uICgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNsaWNraXR5XCIpO1xuICAgIGNvbnN0IGpvdXJuYWxEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb3VybmFsRGF0ZVwiKTtcbiAgICBjb25zdCBqb3VybmFsQ29uY2VwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam91cm5hbENvbmNlcHRcIik7XG4gICAgY29uc3Qgam91cm5hbEVudHJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb3VybmFsRW50cnlcIik7XG4gICAgbGV0IG1vb2RTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vb2RcIik7XG4gICAgbGV0IG1vb2RWYWx1ZSA9IG1vb2RTZWxlY3Qub3B0aW9uc1ttb29kU2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHQ7XG5cblxuICAgICAgY29uc3QgZW50cnlPYmplY3QgPSB7XG4gICAgICAgIGRhdGU6IGpvdXJuYWxEYXRlLnZhbHVlLFxuICAgICAgICBjb25jZXB0OiBqb3VybmFsQ29uY2VwdC52YWx1ZSxcbiAgICAgICAgZW50cnk6IGpvdXJuYWxFbnRyeS52YWx1ZSxcbiAgICAgICAgbW9vZDogbW9vZFZhbHVlXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhlbnRyeU9iamVjdCk7XG4gICAgICBqb3VybmFsRGF0YS5zYXZlSm91cm5hbEVudHJ5KGVudHJ5T2JqZWN0KTtcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBldmVudExpc3RlbmVyIiwiaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50cy5qc1wiXG5pbXBvcnQgZXZlbnRMaXN0ZW5lciBmcm9tIFwiLi9ldmVudExpc3RlbmVyLmpzXCI7XG5cbmNvbnN0IGpvdXJuYWwgPSB7XG4gIGVudHJ5Rm9ybSAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImRpdlwiLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBpZDogXCJmb3JtLWNvbnRhaW5lclwiLFxuICAgICAgfVxuICAgIH0pKTtcbiAgICBjb25zdCBmaWVsZFNldEFycmF5ID0gWzEsMiwzLDRdXG4gICAgICBmaWVsZFNldEFycmF5LmZvckVhY2goZmllbGRJZCA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tY29udGFpbmVyXCIpLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICAgIGVsZW1lbnRUeXBlOiBcImZpZWxkc2V0XCIsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogYGZpZWxkLSR7ZmllbGRJZH1gXG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0pO1xuICBjb25zdCBsYWJlbEFycmF5ID0gW1wiam91cm5hbERhdGVcIiwgXCJqb3VybmFsQ29uY2VwdFwiLCBcImpvdXJuYWxFbnRyeVwiLCBcIm1vb2RcIixdXG4gIGNvbnN0IGNvbnRlbnRBcnJheSA9IFtcImVtcHR5XCIsIFwiRGF0ZSBPZiBFbnRyeVwiLCBcIkNvbmNlcHRzIENvdmVyZWRcIiwgXCJKb3VybmFsIEVudHJ5XCIsIFwiTW9vZFwiXVxuICBsZXQgaSA9IDA7XG4gIGxhYmVsQXJyYXkuZm9yRWFjaChsYWJlbCA9PiB7XG4gICAgaSsrO1xuICAgIC8vIGNvbnNvbGUubG9nKGkpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5maWVsZC0ke2l9YCkuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImxhYmVsXCIsXG4gICAgICBjb250ZW50OiBgJHtjb250ZW50QXJyYXlbaV19YCxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgZm9yOiBgJHtsYWJlbH1gXG4gICAgICB9XG4gICAgfSkpXG4gIH0pO1xuICBjb25zdCBpbnB1dEFycmF5ID0gW1wiZGF0ZVwiLFwidGV4dFwiXTtcbiAgbGV0IGogPSAwO1xuICBpbnB1dEFycmF5LmZvckVhY2goaW5wdXQgPT4ge1xuICAgIGorKztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZmllbGQtJHtqfWApLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJpbnB1dFwiLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICB0eXBlOiBgJHtpbnB1dH1gLFxuICAgICAgICBuYW1lOiBsYWJlbEFycmF5W2otMV0sXG4gICAgICAgIGlkOiBsYWJlbEFycmF5W2otMV1cbiAgICAgIH1cbiAgICB9KSlcbiAgfSk7XG4gIGNvbnN0IHRleHRBcmVhQW5kU2VsZWN0ID0gW1widGV4dGFyZWFcIiwgXCJzZWxlY3RcIl1cbiAgdGV4dEFyZWFBbmRTZWxlY3QuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBqKys7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmZpZWxkLSR7an1gKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IGVsZW1lbnQsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGlkOiBsYWJlbEFycmF5W2otMV0sXG4gICAgICAgIG5hbWU6IGxhYmVsQXJyYXlbai0xXSxcbiAgICAgIH1cbiAgICB9KSlcbiAgfSk7XG4gIGNvbnN0IG1vb2RBcnJheSA9IFtcImdyZWF0XCIsIFwiZ29vZFwiLCBcIm1laFwiLCBcInNhZG5lc3NcIiwgXCJmdXJpb3VzXCJdO1xuICBtb29kQXJyYXkuZm9yRWFjaChlbW90aW9uID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcIm9wdGlvblwiLFxuICAgICAgY29udGVudDogZW1vdGlvbixcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgdmFsdWU6IGVtb3Rpb25cbiAgICAgIH1cbiAgICB9KSlcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1jb250YWluZXJcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICBlbGVtZW50VHlwZTogXCJidXR0b25cIixcbiAgICBjb250ZW50OiBcIlJlY29yZCBKb3VybmFsIEVudHJ5XCJcbiAgfSkpXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGV2ZW50TGlzdGVuZXIuam91cm5hbEJ1dHRvbigpO1xuICB9KTtcbiAgfSxcblxufVxuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsIiwiaW1wb3J0IGV2ZW50TGlzdGVuZXIgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lci5qc1wiXG5cblxuY29uc3Qgam91cm5hbERhdGEgPSB7XG4gIGdldFJlc291cmNlcygpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gIH0sXG4gIHNhdmVKb3VybmFsRW50cnkgKGVudHJ5VG9TYXZlKSB7XG4gICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiLCB7IC8vIFJlcGxhY2UgXCJ1cmxcIiB3aXRoIHlvdXIgQVBJJ3MgVVJMXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlbnRyeVRvU2F2ZSlcbn0pXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRGF0YSIsImltcG9ydCBqb3VybmFsIGZyb20gXCIuL2pvdXJuYWwuanNcIlxuXG5cbmpvdXJuYWwuZW50cnlGb3JtKCk7XG5cblxuXG4iXX0=
