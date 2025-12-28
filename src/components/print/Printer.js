/**
 * Printer utility for generating print-friendly content
 */
class Printer {

  /**
   * Sanitize HTML content to prevent XSS attacks
   * @param {string} html - HTML string to sanitize
   * @returns {string} Sanitized HTML
   */
  sanitizeHTML(html) {
    // Create a temporary element to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // Remove potentially dangerous elements
    const dangerousTags = ['script', 'iframe', 'object', 'embed', 'link', 'style'];
    dangerousTags.forEach(tag => {
      const elements = temp.getElementsByTagName(tag);
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    });

    // Remove event handlers from all elements
    const allElements = temp.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i];
      const attrs = el.attributes;
      for (let j = attrs.length - 1; j >= 0; j--) {
        const attrName = attrs[j].name.toLowerCase();
        if (attrName.startsWith('on') || attrName === 'href' && attrs[j].value.startsWith('javascript:')) {
          el.removeAttribute(attrs[j].name);
        }
      }
    }

    return temp.innerHTML;
  }

  /**
   * Print content from a DOM element by ID
   * @param {string} id - The ID of the element to print
   */
  print(id) {
    const content = document.getElementById(id);
    if (!content) {
      console.error(`Printer: Element with id "${id}" not found`);
      return;
    }

    const pri = document.getElementById("ifmcontentstoprint");
    if (!pri || !pri.contentWindow) {
      console.error('Printer: Print frame not found');
      return;
    }

    const printWindow = pri.contentWindow;
    printWindow.document.open();

    // Sanitize content before writing to prevent XSS
    const sanitizedContent = this.sanitizeHTML(content.innerHTML);
    printWindow.document.write(sanitizedContent);

    const body = printWindow.document.getElementsByTagName("body")[0];
    if (body) {
      body.setAttribute("class", "printer-body");
    }

    // Add print stylesheet
    const head = printWindow.document.getElementsByTagName("head")[0];
    if (head) {
      const css = document.createElement("link");
      css.setAttribute("rel", "stylesheet");
      css.setAttribute("href", "/print.css");
      css.setAttribute("type", "text/css");
      head.appendChild(css);
    }

    printWindow.document.close();

    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 1000);
  }

}

export default new Printer()
