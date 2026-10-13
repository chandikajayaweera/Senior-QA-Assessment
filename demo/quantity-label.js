/* Browser-local proof of improvement. No network requests and no cart handler changes. */
(() => {
  const input = document.querySelector('.product-information input#quantity');
  const label = [...document.querySelectorAll('.product-information label')]
    .find(element => element.textContent.trim().replace(/:$/, '') === 'Quantity');
  if (!(input instanceof HTMLInputElement) || !(label instanceof HTMLLabelElement)) {
    throw new Error('Quantity demonstration cannot locate the expected input and visible label.');
  }
  // Capture the original attribute for a reversible, idempotent browser-local demonstration.
  if (!label.hasAttribute('data-qa-original-for')) {
    label.setAttribute('data-qa-original-for', label.getAttribute('for') ?? '');
  }
  label.htmlFor = input.id;
  window.removeQuantityLabelDemo = () => {
    const original = label.getAttribute('data-qa-original-for');
    if (original) label.setAttribute('for', original);
    else label.removeAttribute('for');
    label.removeAttribute('data-qa-original-for');
    delete window.removeQuantityLabelDemo;
  };
})();
