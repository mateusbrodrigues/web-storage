class App {
  constructor() {
    this.initializeForm();
    this.listValues();
  }

  initializeForm() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("form submitted");
      this.save({ key: form.key.value, value: form.keyValue.value });
      this.listValues();
      form.reset();
      form.key.focus();
    });
  }

  save({ key, value }) {
    console.log("saving data...");
    window.localStorage.setItem(key, value);
  }

  listValues() {
    console.log("listing data...");
    const ls = window.localStorage;
    if (!ls.length) {
      this.resetTable();
      return;
    }
    const lsKeys = Object.keys(ls);
    const allValues = lsKeys.map(this.toHTML).join("");
    this.addToHTML(allValues);
  }

  toHTML(key) {
    const value = window.localStorage.getItem(key);
    const html = `
        <tr>
          <th scope="row">${key}</th>
          <td>${value}</td>
          <td style="cursor: pointer" onclick="app.delete('${key}')">
            🗑️
          </td>
        </tr>
      `;
    return html;
  }

  addToHTML(allValues) {
    console.log("adding to HTML...");
    const listValues = document.getElementById("listValues");
    listValues.innerHTML = "";
    listValues.insertAdjacentHTML("beforeend", allValues);
  }

  resetTable() {
    const listValues = document.getElementById("listValues");
    listValues.innerHTML = '<td colSpan="3">No data available</td>';
  }

  delete(key) {
    if (confirm("Are you sure?")) {
      window.localStorage.removeItem(key);
      this.listValues();
    }
  }
}

// TODO: edit values: fill the form, alter the value and save
// TODO: use html5 dialog instead of confirm

const app = new App();
