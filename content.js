const NON_PRINTABLE_REGEX = /[\x00-\x1F\x7F-\x9F]/g;

function highlightNonPrintableWithReplacement(text) {
  return text.replace(NON_PRINTABLE_REGEX, char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).toUpperCase().padStart(4, '0');
    return `<span class="unicode-highlight">[U+${hex}]</span>`;
  });
}

function replaceTextNodeWithHighlightedSpan(textNode) {
  const parent = textNode.parentNode;
  if (!parent) return;

  const text = textNode.textContent;
  if (!NON_PRINTABLE_REGEX.test(text)) return;

  const span = document.createElement('span');
  span.innerHTML = highlightNonPrintableWithReplacement(text);
  parent.replaceChild(span, textNode);
}

function walkAndReplace(root) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: node =>
        node.parentNode &&
        !['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'IFRAME'].includes(node.parentNode.nodeName)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT
    },
    false
  );

  const nodes = [];
  let current;
  while ((current = walker.nextNode())) {
    nodes.push(current);
  }

  for (const node of nodes) {
    replaceTextNodeWithHighlightedSpan(node);
  }
}

function addToggleButton() {
  const btn = document.createElement('button');
  btn.id = 'unicode-toggle-btn';
  btn.textContent = 'Show Unicode';

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
      btn.textContent = 'Hide Unicode';
      walkAndReplace(document.body);
    } else {
      location.reload(); // crude undo
    }
  });

  document.body.appendChild(btn);
}

addToggleButton();
