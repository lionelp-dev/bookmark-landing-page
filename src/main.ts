class Menu{
  navLinks: HTMLElement | null;
  buttonMenu: HTMLElement | null;
  logo: HTMLElement | null;
  body: HTMLElement | null;
  constructor(){
    this.navLinks = document.querySelector(".header__nav");
    this.buttonMenu = document.querySelector(".header__hamburger_menu")
    this.logo = document.querySelector(".header__logo")
    this.body = document.querySelector("body");
    this.handleChangeToggleMenu()
  }
  handleChangeToggleMenu(){
    this.buttonMenu?.addEventListener("click",()=>{
      if(this.navLinks?.getAttribute("data-visible") === "true"){
        this.navLinks.setAttribute("data-visible","false");
        this.buttonMenu?.setAttribute("aria-expanded","false");
        this.logo?.classList.remove("header__logo--white")
        this.buttonMenu?.classList.remove("header__hamburger_menu--white")
        this.body?.classList.remove("noscroll")
      } else if(this.navLinks?.getAttribute("data-visible") === "false"){
        this.navLinks.setAttribute("data-visible","true");
        this.buttonMenu?.setAttribute("aria-expanded","true");
        this.logo?.classList.add("header__logo--white")
        this.buttonMenu?.classList.add("header__hamburger_menu--white")
        this.body?.classList.add("noscroll")
      } 
    })
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  new Menu();
  console.log("hello") 
})  