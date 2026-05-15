const responsePools = {
  mood: [
    ["Nghe cái mood nay nó trôi ghê"],
    ["Kiểu nay em im im vậy cũng dễ hiểu"],
    ["Trời mưa kiểu này dễ tụt thật"]
  ],

  eq: [
    ["Nãy giờ em gồng hơi nhiều ha"],
    ["Ừa, nghe là biết em mệt rồi"],
    ["Cái kiểu cạn pin tinh thần đó hả"]
  ],

  pushpull: [
    ["Anh tính chọc em", "mà thôi nay tha"],
    ["Nay em khó chiều ghê", "mà cũng hợp mood"]
  ],

  compliment: [
    ["Ê mà em dùng chữ 'tụt mood' nghe buồn ghê"],
    ["Cái cách em kể chuyện nghe rất đời"]
  ],

  soft: [
    ["Thôi nay nghỉ sớm đi em"],
    ["Ừ, có những ngày nó vậy thiệt"]
  ],

  random: [
    ["Ủa tự nhiên anh muốn mua trà sữa cho em ghê"],
    ["Nãy giờ đọc tin em kiểu ngồi chậm lại luôn"]
  ]
};

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectEmotion(text) {
  text = text.toLowerCase();

  if (
    text.includes("mệt") ||
    text.includes("buồn") ||
    text.includes("tụt")
  ) {
    return {
      emotion: "Hơi tụt mood",
      energy: "Thấp",
      signal: "Đang mở nhẹ cảm xúc"
    };
  }

  return {
    emotion: "Trung tính",
    energy: "Ổn định",
    signal: "Đang giữ nhịp"
  };
}

function createOption(title, bubbles, index) {
  return `
    <div class="option">

      <div class="option-title">
        <h3>${title}</h3>

        <button
          class="copy-btn"
          onclick="copyText(${index})"
        >
          Copy
        </button>
      </div>

      <div id="copy-${index}">
        ${bubbles
          .map(
            bubble =>
              `<div class="bubble">${bubble}</div>`
          )
          .join("")}
      </div>

    </div>
  `;
}

function generateReplies() {
  const message =
    document.getElementById("message").value.trim();

  const mode =
    document.getElementById("mode").value;

  const result =
    document.getElementById("result");

  if (!message) {
    result.innerHTML = `
      <div class="analysis">
        <h4>⚠️ Thiếu nội dung</h4>
        <p>Nhập tin nhắn trước đã.</p>
      </div>
    `;

    return;
  }

  const data = detectEmotion(message);

  const options = [
    {
      title: "Option 1 — Mood / Image",
      bubbles: randomItem(responsePools.mood)
    },

    {
      title: "Option 2 — EQ Catch",
      bubbles: randomItem(responsePools.eq)
    },

    {
      title: "Option 3 — Pull then Push",
      bubbles: randomItem(responsePools.pushpull)
    },

    {
      title: "Option 4 — Detail Compliment",
      bubbles: randomItem(responsePools.compliment)
    },

    {
      title: "Option 5 — Sincere / Soft",
      bubbles: randomItem(responsePools.soft)
    },

    {
      title: "Option 6 — Spontaneous",
      bubbles: randomItem(responsePools.random)
    }
  ];

  let html = "";

  if (mode === "STUDIO") {
    html += `
      <div class="analysis">
        <h4>PHÂN TÍCH</h4>

        <p>
          <strong>Cảm xúc:</strong>
          ${data.emotion}
        </p>

        <p>
          <strong>Năng lượng:</strong>
          ${data.energy}
        </p>

        <p>
          <strong>Tín hiệu:</strong>
          ${data.signal}
        </p>
      </div>
    `;

    options.forEach((item, index) => {
      html += createOption(
        item.title,
        item.bubbles,
        index
      );
    });
  }

  if (mode === "LIVE") {
    options.forEach((item, index) => {
      html += createOption(
        item.title,
        item.bubbles,
        index
      );
    });
  }

  if (mode === "ONE") {
    html += createOption(
      "Best Option",
      randomItem(responsePools.eq),
      99
    );
  }

  result.innerHTML = html;
}

function copyText(index) {
  const text = document
    .getElementById(`copy-${index}`)
    .innerText
    .trim();

  navigator.clipboard.writeText(text);

  alert("Đã copy ✨");
}

function randomDemo() {
  const demos = [
    "Nay em mệt quá...",
    "Không hiểu sao em tụt mood ghê.",
    "Haha nay gặp chuyện mắc cười."
  ];

  document.getElementById("message").value =
    randomItem(demos);

  generateReplies();
}
