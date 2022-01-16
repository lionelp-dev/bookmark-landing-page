export default class NavTabs extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "tablist");
    const tabs = Array.from(this.children);
    tabs.forEach((tab, i) => {
      const id = tab.getAttribute("href")?.replace("#", "");
      const tabPanel = id && document.getElementById(id);
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("tabindex", "-1");
      id && tab.setAttribute("aria-controls", id);
      id && tab.setAttribute("id", "tab-" + id);
      tabPanel && tabPanel.setAttribute("role", "tabpanel");
      tabPanel && tabPanel.setAttribute("aria-labelledby", "tab-" + id);
      tabPanel && tabPanel.setAttribute("hidden", "hidden");
      tabPanel && tabPanel.setAttribute("tabindex", "0");

      tab.addEventListener("keyup", (e) => {
        let index:number = null;
        if (e.key === "ArrowRight") {
          index = i === tabs.length - 1 ? 0 : i + 1;
        } else if (e.key === "ArrowLeft") {
          index = i === 0 ? tabs.length - 1 : i - 1;
        } else if (e.key === "Home") {
          index = 0;
        } else if (e.key === "End") {
          index = tabs.length - 1;
        }
        if (index !== null) {
          this.activate(tabs[index]);
          tabs[index].focus();  
        }
      });

      tab.addEventListener("click", (e) => {
        e.preventDefault();
        this.activate(tab);
      });
    });

    this.activate(tabs[0]);
  }
  /**
   *  @param  {Element} tab
   */
  activate(tab: Element) {
    const currentTab = this.querySelector('[aria-selected="true"]');
    if (currentTab !== null) {
      const tabPanel = document.getElementById(
        currentTab.getAttribute("aria-controls") || ""
      );
      currentTab.setAttribute("aria-selected", "false");
      currentTab.setAttribute("tabindex", "-1");
      tabPanel?.setAttribute("hidden", "hidden");
    }
    const id = tab.getAttribute("aria-controls");
    const tabPanel = id && document.getElementById(id);
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    tabPanel && tabPanel.removeAttribute("hidden");
  }
}

customElements.define("nav-tabs", NavTabs);
