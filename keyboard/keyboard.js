const Keyboard = {
  elements: {
    main: null,
    alphabetContainer: null,
    numbersContainer: null,
    keys: [],
  },

  eventHandlers: {
    onInput: null,
    onClose: null,
  },

  properties: {
    value: "",
    capsLock: false,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.alphabetContainer = document.createElement("div");
    this.elements.numbersContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.alphabetContainer.classList.add("keyboard__keys");
    this.elements.numbersContainer.classList.add("keyboard__keys");
    this.elements.alphabetContainer.appendChild(this._createAlphabet());
    this.elements.numbersContainer.appendChild(this._createNumbers());
    this.elements.keys =
      this.elements.alphabetContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.alphabetContainer);
    this.elements.main.appendChild(this.elements.numbersContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createNumbers() {
    const numbersFragment = document.createDocumentFragment();
    const keyLayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["3", "6", "9"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      keyElement.addEventListener("click", () => {
        this.properties.value += key;
        this._triggerEvent("onInput");
      });

      numbersFragment.appendChild(keyElement);

      if (insertLineBreak) {
        numbersFragment.appendChild(document.createElement("br"));
      }

      keyElement.textContent = key;
    });

    return numbersFragment;
  },

  _createAlphabet() {
    const alphabetFragment = document.createDocumentFragment();
    const keyLayout = [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",

      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",

      "caps",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      "backspace",

      "chars",
      "lang",
      "space",
      "enter",
    ];

    const keyLayoutMN = [
      "ф",
      "ц",
      "у",
      "ж",
      "э",
      "н",
      "г",
      "ш",
      "ү",
      "з",
      "к",
      "ъ",

      "й",
      "ы",
      "б",
      "ө",
      "а",
      "х",
      "р",
      "о",
      "л",
      "д",
      "п",

      "caps",
      "я",
      "ч",
      "ё",
      "с",
      "м",
      "и",
      "т",
      "ь",
      "в",
      "ю",
      "backspace",

      "chars",
      "lang",
      "space",
      "enter",
    ];

    // Creates HTML for an icon
    const createIconHTML = (src) => {
      return `<img src="${src}" alt="key icon" />`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "p", "enter", "l"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "enter":
          keyElement.classList.add("keyboard__key--enter");
          keyElement.innerHTML = "Enter";
          keyElement.addEventListener("click", () => {
            document.querySelector("#password").focus();
            this._triggerEvent("onInput");
          });
          break;

        case "backspace":
          keyElement.classList.add("keyboard__key--special");
          keyElement.innerHTML = createIconHTML("./icons/backspace.svg");
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("onInput");
          });
          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--special",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("./icons/shift.svg");
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });
          break;

        case "space":
          keyElement.classList.add("keyboard__key--space");
          keyElement.innerHTML = createIconHTML("./icons/space.svg");
          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("onInput");
          });
          break;

        case "chars":
          keyElement.classList.add("keyboard__key--special");
          keyElement.innerHTML = "{&=";
          keyElement.addEventListener("click", () => {
            document.querySelector("#password").focus();
            this._triggerEvent("onInput");
          });
          break;

        case "lang":
          keyElement.classList.add("keyboard__key--special");
          keyElement.innerHTML = createIconHTML("./icons/language.svg");
          keyElement.addEventListener("click", () => {
            document.querySelector("#password").focus();
            this._triggerEvent("onInput");
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("onInput");
          });
          break;
      }

      alphabetFragment.appendChild(keyElement);

      if (insertLineBreak) {
        alphabetFragment.appendChild(document.createElement("br"));
      }
    });

    return alphabetFragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, onInput, onClose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.onInput = onInput;
    this.eventHandlers.onClose = onClose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.onInput = onInput;
    this.eventHandlers.onClose = onClose;
    this.elements.main.classList.add("keyboard--hidden");
  },
};

window.addEventListener("DOMContentLoaded", () => {
  Keyboard.init();
});
