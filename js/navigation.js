const pages = {
  "colours": "pages/general/colours.html",
  "typography": "pages/general/typography.html",
  "styling-layout": "pages/general/styling-layout.html",
  "buttons": "pages/elements/buttons.html",
  "form-inputs": "pages/elements/form-inputs.html",
  "tables": "pages/elements/tables.html",
  "icons": "pages/elements/icons.html",
  "navigation-bar": "pages/elements/navigation-bar.html",
  "data-brush": "pages/elements/data-brush.html",
  "line-graphs": "pages/visualizations/line-graphs.html",
  "bar-graphs": "pages/visualizations/bar-graphs.html",
  "single-value-charts": "pages/visualizations/single-value-charts.html",
  "area-charts": "pages/visualizations/area-charts.html",
  "scatter-plots": "pages/visualizations/scatter-plots.html",
  "pie-charts": "pages/visualizations/pie-charts.html",
  "donut-charts": "pages/visualizations/donut-charts.html"
};
const content = document.getElementById("content");
let requestId = 0;

async function loadPage(button) {
  const id = button.id.slice(4);
  const request = ++requestId;
  try {
    const response = await fetch(pages[id]);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    if (request !== requestId) return;
    const template = document.createElement("template");
    template.innerHTML = html;
    const section = template.content.querySelector(".library-section");
    if (!section || section.id !== id) throw new Error("Invalid page");
    section.classList.add("active");
    content.replaceChildren(template.content);
    document.querySelectorAll(".nav-btn.active").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
  } catch (error) {
    if (request !== requestId) return;
    console.error(error);
    const message = document.createElement("p");
    message.textContent = "Unable to load this page. Please run the project using Live Server or a web server and try again.";
    content.replaceChildren(message);
  }
}

document.querySelectorAll(".nav-btn").forEach(button => {
  button.addEventListener("click", () => loadPage(button));
});
loadPage(document.querySelector(".nav-btn.active") || document.querySelector(".nav-btn"));
