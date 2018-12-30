import journal from "./journal.js"

const domComponents = {
  createDomElement({ elementType, content = null, cssClass = "", attributes = {} }) {
    const element = document.createElement(elementType);
    element.textContent = content;
    
    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    return element;
  },
}

export default domComponents