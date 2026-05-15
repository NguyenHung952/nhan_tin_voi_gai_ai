export function createBubble(text) {
  return `
    <div class="bubble">
      ${text}
    </div>
  `;
}

export function createOption(title, bubbles) {
  return `
    <div class="option">

      <h3>${title}</h3>

      ${bubbles
        .map(createBubble)
        .join("")}

    </div>
  `;
}
