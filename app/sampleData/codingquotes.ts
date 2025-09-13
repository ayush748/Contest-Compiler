const quotes = [
  "💬 Talk is cheap 💻 show me the code. – Linus Torvalds",
  "🧩 First, solve the problem 🤔 then write the code. – John Johnson",
  "📖 Code never lies 😅 comments sometimes do. – Ron Jeffries",
  "🐞 It's not a bug 👉 it's an undocumented feature.",
  "🧠 Programming isn't about what you know 🤓 it's about what you can figure out. – Chris Pine",
  "✅ The best error message 🖥️ is the one that never shows up.",
  "📅 Weeks of coding ⏳ can save you hours of planning.",
  "📝 Good code ✨ is its own best documentation. – Steve McConnell",
  "🗑️ Deleted code 👍 is debugged code. – Jeff Sickel",
  "🏠 There is no place like 🖥️ 127.0.0.1",
  "🌌 Software is like entropy 💨 difficult to grasp, weighs nothing, and obeys physics.",
  "🚦 A good programmer 👨‍💻 looks both ways before crossing a one-way street. – Doug Linder",
  "🎭 Code is like humor 😂 when you explain it, it’s bad. – Cory House",
  "🛠️ Fix the cause 🔍 not the symptom.",
  "♻️ Before software can be reusable 🔁 it first has to be usable.",
  "💼 One man’s crappy software 👎 is another man’s full-time job 👍.",
  "🐛 Without requirements or design 📐 programming is the art of adding bugs to an empty file.",
  "❄️ Walking on water 🌊 and developing software from a specification 📑 are easy if both are frozen. – Edward V Berard",
  "🎵 99 little bugs in the code 🐛🐛 take one down ⬇️ patch it around 🔄 117 little bugs in the code.",
  "💬 There are only two kinds of languages 🤷 the ones people complain about and the ones nobody uses. – Bjarne Stroustrup",
  "⚡ The most disastrous thing 😱 you can learn is your first programming language. – Alan Kay",
  "💻 Hardware eventually fails ⚙️ software eventually works. – Michael Hartung",
  "🔐 Programming can be fun 😄 so can cryptography 🔒 but don’t mix them. – Kreitzberg & Shneiderman",
  "🚢 I don’t care if it works on your machine 🖥️ we are not shipping your machine!",
  "🖥️ It works on my machine 🤷",
  "🔢 There are 10 types of people 👨‍💻 those who understand binary and those who don’t.",
  "⚖️ In theory 📘 theory and practice are the same. In practice 😅 they’re not. – Yogi Berra",
  "🔁 To understand recursion 🔂 you must first understand recursion.",
  "👨‍💻 Any fool can write code 💻 that a computer understands. Good programmers write code that humans 👥 understand. – Martin Fowler",
  "🎯 Simplicity is the soul 💡 of efficiency. – Austin Freeman",
  "😅 The best thing about a boolean 🔘 even if you’re wrong, you’re only off by a bit.",
  "0️⃣ Real programmers start at 0 🚀",
  "🤯 Programming is 10% writing code ✍️ and 90% figuring out why it doesn’t work 😵",
  "🛠️ Don’t worry if it doesn’t work right 🤨 if everything did, you’d be out of a job 👨‍💻 – Mosher’s Law",
  "📋 Copy-and-Paste 📑 is a design pattern.",
  "⏰ I love deadlines ❤️ I like the whooshing sound 💨 they make as they fly by. – Douglas Adams",
  "🔗 Version control 🔄 because losing work sucks 😭",
  "🎯 A program does what you tell it 🗣️ not what you want it to do 🤦 – Greer’s Law",
  "😡 Me: I’ll fix that bug later 🐛. Also me: Who wrote this garbage?! 🤔",
  "😂 A user interface 🎨 is like a joke 🤣 if you explain it, it’s not good.",
  "🚀 The best performance boost ⚡ is going from nonworking ❌ to working ✅. – J. Osterhout",
  "🌙 There’s no place like production at 3 a.m. 🌃",
  "🧙 One does not simply 🙅 write bug-free code 🐞",
  "🙂 Optimism is an occupational hazard 💼 of programming 👨‍💻 – Kent Beck",
  "🕵️ Debugging is being the detective 🕶️ in a crime movie 🎬 where you’re also the murderer 🔪",
  "🐞 If debugging removes bugs 🚫 programming adds them 🐛 – Edsger Dijkstra",
  "📚 Documentation is like sex 😏 when it’s good it’s great 🙌 when it’s bad it’s better than nothing. – Dick Brandon",
  "⚡ Premature optimization 🚀 is the root 🌱 of all evil 😈 – Donald Knuth",
  "🍕 Code fast ⚡ eat pizza 🍕 sleep never 😴"
];



function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomQuote(): string {
  const randomIndex = getRandomNumber(0, quotes.length - 1);
  return quotes[randomIndex];
}