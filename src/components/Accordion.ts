export default class Accordion extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "tablist");
    const accordionTriggers = Array.from(
      this.querySelectorAll(".accordion-item__trigger")
    );
    accordionTriggers.forEach((trigger: Element) => {
      const id = trigger.getAttribute("href")?.replace("#", "");
      const panel = id && document.getElementById(id);
      trigger.setAttribute("aria-expanded", "false");
      id && trigger.setAttribute("aria-controls", id);
      trigger.setAttribute("aria-disabled", "false");
      panel && panel.setAttribute("role", "region");
      panel && panel.setAttribute("aria-labelledby", id);
      panel && panel.setAttribute("hidden", "hidden");
      trigger.addEventListener("click", (e: Event) => {
        e.preventDefault();
        this.activate(trigger);
      });
    });
    this.activate(accordionTriggers[0]);
  }
  activate(trigger: Element) {
    const currentTrigger = this.querySelector('[aria-expanded="true"]');
    if (currentTrigger !== null) {
      const currentPanel = document.getElementById(
        currentTrigger.getAttribute("aria-controls") || ""
      );
      console.log( currentPanel)
      currentTrigger.setAttribute("aria-expanded", "false");
      currentPanel?.setAttribute("hidden", "hidden");
    }
    const id = trigger.getAttribute("aria-controls");
    const panel = id && document.getElementById(id);
    trigger.setAttribute("aria-expanded", "true");
    panel && panel.removeAttribute("hidden");
  }
}

customElements.define("accordion-group", Accordion);
