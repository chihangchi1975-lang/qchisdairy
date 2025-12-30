const panel = document.getElementById("chatPanel");
const chatLog = document.getElementById("chatLog");
const choices = document.getElementById("choices");

function toggleChat() {
  panel.classList.toggle("show");
}

const dialog = {
  start: {
    text: "Hellooo, cậu có muốn nói gì không? Tớ sẽ nghe hết 🥺",
    options: [
      { text: "Tớ mệt quá…", next: "tired" },
      { text: "Tớ nhớ cậu", next: "miss" },
      { text: "Hôm nay tớ siêu vui!!", next: "happy" }
    ]
  },
  tired: {
    text: "Sao thế tớ vẫn luôn ở đây mà",
    options: [{ text: "Cậu nói dối", next: "lie" },{ text: "Thế ạ", next: "oh" },{ text: "Ngày hôm này dài quá", next: "day" }]
  },
  lie: {
    text: "Tớ không bao giờ nói dối hết luôn",
    options: [{ text: "Chứng minh cho tớ đi", next: "prove" },{ text: "Thế thì cậu phải hứa với tớ cơ", next: "prove" }]
  },
  prove: {
    text: "Nhắn tin cho riel qchi ýyy. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  promise: {
    text: "Ummm tớ hứa. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  oh: {
    text: "Ummm, thật đó. Thương quá",
    options: [{ text: "Tớ muốn thơm", next: "a" },{ text: "Cậu có yêu tớ không?", next: "b" }]
  },
  a: {
    text: "Thế thì mai qchi thơm cho mín nhee. Cậu có cần tớ giúp gì không nè?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  b: {
    text: "Có chứ, yêu nhiều nhiều yyy.  Cậu có cần tớ giúp gì không nè?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  day: {
    text: "Thế tớ ôm cậu đi ngủ nhé",
    options: [{ text: "Ummm, thơm trán nữa cơ", next: "c" },{ text: "Cậu phải hát ru cho tớ", next: "d" }]
  },
  c: {
    text: "Được thoai em bé. Cậu có cần tớ giúp gì thêm không nè?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  d: {
    text: "Eo ơi trẻ con!! Một lần thôi đấy nhé. Thế cậu có cần tớ giúp thêm gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  miss: {
    text: "Nhớ nhiều khônggg",
    options: [{ text: "Nhiều lắm lắm luôn", next: "nao" },{ text: "Giờ tớ chỉ muốn cậu ở đây thôi", next: "o" },{ text: "Sao lại không chứu", next: "sao" }]
  },
  nao: {
    text: " Nhiều chừng nào cơ",
    options: [{ text: "Một con voi 2000 tấn", next: "ko" },{ text: " Không đo được âu, phải cả đại dương cơ", next: "doo" }]
  },
  o: {
    text: "Bay sang với tớ nè :))))",
    options: [{ text: "Luôn ấy chứ", next: "luon" },{ text: "Ngày mai tớ sẽ bắt cóc cậu luôn", next: "au" }]
  },
  sao: {
    text: "Tớ bỏ thuốc mê tớ vào bánh của cậu đấy.",
    options: [{ text: "Woaa tớ thích lắm", next: "lam" },{ text: "Cho tớ thêm 1 tỉ cái nữa!!", next: "ti" }]	
  },
  ko: {
    text: "Thế thì phải nhắn tin cho riel qchi ngay thoi!! Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  doo: {
	text: "Đần quá đấyy. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  luon: {
	text: "Tớ cũng muốn ôm cậu ngay bây giờ. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  au: {
	text: "Tớ trốn đi luôn, không cho cậu tìm đâu. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  lam: {
	text: "Cậu không sợ tớ à :)))) Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  ti: {
	text: "Ỏooo đáng yêu thíii, thơm cho một cái nè. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  happy: {
    text: "Woaaa thế thì phải thưởng cho 10 cái thơm",
    options: [{ text: "Khoonggg 100 cái cơ", next: "cai" },{ text: "Tớ cảm ơn hihihi", next: "tk" },{ text: "Tớ thích ở với cậu nhiềuu", next: "nhieu" }]
  },
  cai: {
    text: "Ummm 100 cái",
    options: [{ text: "Và ôm nữa", next: "va" },{ text: " Và làm tí nữa", next: "nua" }]
  },
  tk: {
    text: "Cậu phải thơm lại tớ cơ",
    options: [{ text: "Thơm lại, thơm lại", next: "xx" },{ text: " Cả thơm cả ôm nhee", next: "caca" }]
  },
  nhieu: {
    text: "Tớ cũng thế!! ",
    options: [{ text: "Cậu có yêu tớ nhiều không?", next: "yeu" },{ text: "Sau này tớ với cậu dành thật nhiều thời gian bên nhau nhéeee!!", next: "sau" }]
  },
  va: {
    text: "Đần vaiii. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  nua: {
    text: "Eo ơi dâm theee. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  xx: {
    text: "Cutii, em bé nhà ai mà cuti thí. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  caca: {
    text: "Được chuuu, thưởng cho 10 cái thơm nữa luôn. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  yeu: {
    text: "Có chuu, yêu nhiều lắm lắm lắm. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  sau: {
    text: "Đương nhiên rồi con thỏ của tớ. Thế cậu có cần tớ giúp gì không?",
    options: [{ text: "Mật khẩu của bức thư là gì vậy?", next: "end" }]
  },
  end: {
    text: "Cậu hãy ghép những chữ cái đầu tiên của title các note nhật kí nhee!!",
    options: []
  }
};

function renderNode(key, userText = null) {
  if (userText) {
    chatLog.innerHTML += `
      <div class="chat-msg user">${userText}</div>
    `;
  }

  const node = dialog[key];
  chatLog.innerHTML += `
    <div class="chat-msg bot">${node.text}</div>
  `;

  choices.innerHTML = "";
  node.options.forEach(o => {
    const btn = document.createElement("button");
    btn.textContent = o.text;
    btn.onclick = () => renderNode(o.next, o.text);
    choices.appendChild(btn);
  });

  chatLog.scrollTop = chatLog.scrollHeight;
}

renderNode("start");
