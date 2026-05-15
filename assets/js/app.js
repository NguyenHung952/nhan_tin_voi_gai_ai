import { responsePools } from "./data.js";
import { detectEmotion } from "./emotion.js";
import { createOption } from "./ui.js";

const messageInput =
  document.getElementById("message");

const result =
  document.getElementById("result");

const generateBtn =
  document.getElementById("generateBtn");

const demoBtn =
  document.getElementById("demoBtn");

const demos = [
  "Nay em tụt mood ghê",
  "Haha nay vui ác",
  "Tự nhiên em mệt ngang"
];

function randomItem(arr) {
  return arr[
    Math.floor(Math.random() * arr.length)
  ];
}

function renderReplies(message) {
  const emotion =
    detectEmotion(message);

  const html = `
    <div class="analysis">

      <p>
        Cảm xúc:
        ${emotion.emotion}
      </p>

      <p>
        Năng lượng:
        ${emotion.energy}
      </p>

    </div>

    ${createOption(
      "Mood",
      randomItem(responsePools.mood)
    )}

    ${createOption(
      "EQ Catch",
      randomItem(responsePools.eq)
    )}

    ${createOption(
      "Soft",
      randomItem(responsePools.soft)
    )}
  `;

  result.innerHTML = html;

  localStorage.setItem(
    "mts_last_message",
    message
  );
}

generateBtn.addEventListener(
  "click",
  () => {
    const message =
      messageInput.value.trim();

    if (!message) return;

    renderReplies(message);
  }
);

demoBtn.addEventListener(
  "click",
  () => {
    const random =
      randomItem(demos);

    messageInput.value = random;

    renderReplies(random);
  }
);

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const last =
      localStorage.getItem(
        "mts_last_message"
      );

    if (!last) return;

    messageInput.value = last;

    renderReplies(last);
  }
);
