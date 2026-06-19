function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function copyBibTeX() {
  const bibtexElement = document.getElementById("bibtex-code");
  const button = document.querySelector(".copy-bibtex-btn");
  const copyText = document.querySelector(".copy-text");

  if (!bibtexElement || !button || !copyText) {
    return;
  }

  const updateButton = () => {
    button.classList.add("copied");
    copyText.textContent = "Copied";
    window.setTimeout(() => {
      button.classList.remove("copied");
      copyText.textContent = "Copy";
    }, 1800);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(bibtexElement.textContent).then(updateButton).catch(() => {
      fallbackCopy(bibtexElement.textContent);
      updateButton();
    });
    return;
  }

  fallbackCopy(bibtexElement.textContent);
  updateButton();
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "absolute";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.querySelector(".scroll-to-top");
  const frameworkPanel = document.querySelector(".framework-panel");
  const frameworkButtons = document.querySelectorAll("[data-framework-mode]");

  window.addEventListener("scroll", () => {
    if (!scrollButton) {
      return;
    }
    scrollButton.classList.toggle("visible", window.scrollY > 320);
  });

  frameworkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.frameworkMode;
      if (!frameworkPanel || !mode) {
        return;
      }

      frameworkPanel.dataset.mode = mode;
      frameworkButtons.forEach((candidate) => {
        const isActive = candidate === button;
        candidate.classList.toggle("is-active", isActive);
        candidate.setAttribute("aria-pressed", String(isActive));
      });
    });
  });

  if (window.bulmaSlider) {
    window.bulmaSlider.attach();
  }
});
