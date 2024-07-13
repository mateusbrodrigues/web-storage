class App {
  constructor() {
    this.initializeForm();
  }

  initializeForm() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("form submitted");
      this.save({ key: form.key.value, value: form.keyValue.value });
      form.reset();
      form.key.focus();
    });
  }

  save({ key, value }) {
    console.log("saving data...");
    console.log({ key, value });
    window.localStorage.setItem(key, value);
  }
}

new App();
