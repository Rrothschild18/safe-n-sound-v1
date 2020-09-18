export default class Label {
  constructor(form) {
    this.form = form;
  }

  init() {
    let inputs = this.form.querySelectorAll("input");

    inputs.forEach((el) => {
      el.addEventListener("focus", (e) => {
        let label = e.target.previousElementSibling;
        label.classList.add("move");
      });
      el.addEventListener("focusout", (e) => {
        let label = e.target.previousElementSibling;
        if (e.target.value == "" && label.classList.contains("move"))
          label.classList.toggle("move");
      });
    });
  }
}
