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

},{"./journal.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _domComponents = _interopRequireDefault(require("./domComponents.js"));

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
      i++;
      console.log(i);
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
  }

};
var _default = journal;
exports.default = _default;

},{"./domComponents.js":1}],3:[function(require,module,exports){
"use strict";

var _journal = _interopRequireDefault(require("./journal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_journal.default.entryForm();

},{"./journal.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RvbUNvbXBvbmVudHMuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7QUFFQSxNQUFNLGFBQWEsR0FBRztBQUNwQixFQUFBLGdCQUFnQixDQUFDO0FBQUUsSUFBQSxXQUFGO0FBQWUsSUFBQSxPQUFPLEdBQUcsSUFBekI7QUFBK0IsSUFBQSxRQUFRLEdBQUcsRUFBMUM7QUFBOEMsSUFBQSxVQUFVLEdBQUc7QUFBM0QsR0FBRCxFQUFrRTtBQUNoRixVQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixDQUFoQjtBQUNBLElBQUEsT0FBTyxDQUFDLFdBQVIsR0FBc0IsT0FBdEI7O0FBRUEsU0FBSyxJQUFJLEdBQVQsSUFBZ0IsVUFBaEIsRUFBNEI7QUFDMUIsTUFBQSxPQUFPLENBQUMsWUFBUixDQUFxQixHQUFyQixFQUEwQixVQUFVLENBQUMsR0FBRCxDQUFwQztBQUNEOztBQUNELFdBQU8sT0FBUDtBQUNEOztBQVRtQixDQUF0QjtlQVllLGE7Ozs7Ozs7Ozs7O0FDZGY7Ozs7QUFFQSxNQUFNLE9BQU8sR0FBRztBQUNkLEVBQUEsU0FBUyxHQUFJO0FBQ1gsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxXQUFsQyxDQUE4Qyx1QkFBYyxnQkFBZCxDQUErQjtBQUMzRSxNQUFBLFdBQVcsRUFBRSxNQUQ4RDtBQUUzRSxNQUFBLFVBQVUsRUFBRTtBQUNWLFFBQUEsRUFBRSxFQUFFO0FBRE07QUFGK0QsS0FBL0IsQ0FBOUM7QUFNQSxVQUFNLGFBQWEsR0FBRyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsQ0FBdEI7QUFDRSxJQUFBLGFBQWEsQ0FBQyxPQUFkLENBQXNCLE9BQU8sSUFB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QUEvQixDQUE1QztBQU9ELEtBUkQ7QUFVQzs7QUFsRWEsQ0FBaEI7ZUFzRWUsTzs7Ozs7O0FDeEVmOzs7O0FBRUEsaUJBQVEsU0FBUiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBqb3VybmFsIGZyb20gXCIuL2pvdXJuYWwuanNcIlxuXG5jb25zdCBkb21Db21wb25lbnRzID0ge1xuICBjcmVhdGVEb21FbGVtZW50KHsgZWxlbWVudFR5cGUsIGNvbnRlbnQgPSBudWxsLCBjc3NDbGFzcyA9IFwiXCIsIGF0dHJpYnV0ZXMgPSB7fSB9KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgIFxuICAgIGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBkb21Db21wb25lbnRzIiwiaW1wb3J0IGRvbUNvbXBvbmVudHMgZnJvbSBcIi4vZG9tQ29tcG9uZW50cy5qc1wiXG5cbmNvbnN0IGpvdXJuYWwgPSB7XG4gIGVudHJ5Rm9ybSAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdXRwdXRcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImZvcm1cIixcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgaWQ6IFwiZm9ybS1jb250YWluZXJcIixcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgY29uc3QgZmllbGRTZXRBcnJheSA9IFsxLDIsMyw0XVxuICAgICAgZmllbGRTZXRBcnJheS5mb3JFYWNoKGZpZWxkSWQgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLWNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgICBlbGVtZW50VHlwZTogXCJmaWVsZHNldFwiLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6IGBmaWVsZC0ke2ZpZWxkSWR9YFxuICAgICAgICB9XG4gICAgICB9KSlcbiAgICB9KTtcbiAgY29uc3QgbGFiZWxBcnJheSA9IFtcImpvdXJuYWxEYXRlXCIsIFwiam91cm5hbENvbmNlcHRcIiwgXCJqb3VybmFsRW50cnlcIiwgXCJtb29kXCIsXVxuICBjb25zdCBjb250ZW50QXJyYXkgPSBbXCJlbXB0eVwiLCBcIkRhdGUgT2YgRW50cnlcIiwgXCJDb25jZXB0cyBDb3ZlcmVkXCIsIFwiSm91cm5hbCBFbnRyeVwiLCBcIk1vb2RcIl1cbiAgbGV0IGkgPSAwO1xuICBsYWJlbEFycmF5LmZvckVhY2gobGFiZWwgPT4ge1xuICAgIGkrKztcbiAgICBjb25zb2xlLmxvZyhpKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5maWVsZC0ke2l9YCkuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcImxhYmVsXCIsXG4gICAgICBjb250ZW50OiBgJHtjb250ZW50QXJyYXlbaV19YCxcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgZm9yOiBgJHtsYWJlbH1gXG4gICAgICB9XG4gICAgfSkpXG4gIH0pO1xuICBjb25zdCBpbnB1dEFycmF5ID0gW1wiZGF0ZVwiLFwidGV4dFwiXTtcbiAgbGV0IGogPSAwO1xuICBpbnB1dEFycmF5LmZvckVhY2goaW5wdXQgPT4ge1xuICAgIGorKztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZmllbGQtJHtqfWApLmFwcGVuZENoaWxkKGRvbUNvbXBvbmVudHMuY3JlYXRlRG9tRWxlbWVudCh7XG4gICAgICBlbGVtZW50VHlwZTogXCJpbnB1dFwiLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICB0eXBlOiBgJHtpbnB1dH1gLFxuICAgICAgICBuYW1lOiBsYWJlbEFycmF5W2otMV0sXG4gICAgICAgIGlkOiBsYWJlbEFycmF5W2otMV1cbiAgICAgIH1cbiAgICB9KSlcbiAgfSk7XG4gIGNvbnN0IHRleHRBcmVhQW5kU2VsZWN0ID0gW1widGV4dGFyZWFcIiwgXCJzZWxlY3RcIl1cbiAgdGV4dEFyZWFBbmRTZWxlY3QuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBqKys7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmZpZWxkLSR7an1gKS5hcHBlbmRDaGlsZChkb21Db21wb25lbnRzLmNyZWF0ZURvbUVsZW1lbnQoe1xuICAgICAgZWxlbWVudFR5cGU6IGVsZW1lbnQsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIGlkOiBsYWJlbEFycmF5W2otMV0sXG4gICAgICAgIG5hbWU6IGxhYmVsQXJyYXlbai0xXSxcbiAgICAgIH1cbiAgICB9KSlcbiAgfSk7XG4gIGNvbnN0IG1vb2RBcnJheSA9IFtcImdyZWF0XCIsIFwiZ29vZFwiLCBcIm1laFwiLCBcInNhZG5lc3NcIiwgXCJmdXJpb3VzXCJdO1xuICBtb29kQXJyYXkuZm9yRWFjaChlbW90aW9uID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RcIikuYXBwZW5kQ2hpbGQoZG9tQ29tcG9uZW50cy5jcmVhdGVEb21FbGVtZW50KHtcbiAgICAgIGVsZW1lbnRUeXBlOiBcIm9wdGlvblwiLFxuICAgICAgY29udGVudDogZW1vdGlvbixcbiAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgdmFsdWU6IGVtb3Rpb25cbiAgICAgIH1cbiAgICB9KSlcbiAgfSk7XG4gIFxuICB9LFxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWwiLCJpbXBvcnQgam91cm5hbCBmcm9tIFwiLi9qb3VybmFsLmpzXCJcblxuam91cm5hbC5lbnRyeUZvcm0oKTsiXX0=
