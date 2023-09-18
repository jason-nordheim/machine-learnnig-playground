export class AppBase {
  protected container: Element;

  constructor(container: Element, title?: string) {
    this.container = container;
    this.container.classList.add("app");
    if (title) {
      this.AddTitle(title);
    }
  }

  private AddTitle(title: string) {
    document.title = title;
    const titleElement = document.createElement("h1");
    titleElement.innerText = title;
    titleElement.style.display = "flex";
    titleElement.style.justifyContent = "center";
    this.container.appendChild(titleElement);
  }
}
