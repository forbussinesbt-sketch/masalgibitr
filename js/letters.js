const content = [
{ text: "Sana söyleyemediğim her şeyi bu kağıtlara hapsettim...", type: "normal" },
{ text: "Mars ve Venüs arasındaki o uçurum...", type: "pain" },
{ text: "Son kelime, son veda...", type: "pain" },
{ text: "elveda", type: "normal" }
];

let i = 0;

/* ELEMENTLER */
const sActive = document.getElementById('sheet-active');
const tActive = document.getElementById('t-active');
const tNext = document.getElementById('t-next');
const wrapper = document.getElementById('wrapper');
const music = document.getElementById('seda');
const fTxt = document.getElementById('final-text');
const warning = document.getElementById('pain-warning');

/* INIT */
tActive.innerText = content[0].text;
tNext.innerText = content[1]?.text || "";

/* PAIN SYSTEM */
let painLevel = 0;
let timeout = null;
let locked = false;

function triggerPain() {
if (locked) return;

if (navigator.vibrate) navigator.vibrate(100);

painLevel++;

document.body.style.background =
`linear-gradient(rgba(180,0,0,${painLevel * 0.12}), rgba(180,0,0,${painLevel * 0.12})), #1a1a1a`;

if (painLevel >= 3) {
locked = true;
warning.style.opacity = "1";

```
setTimeout(() => {
  warning.style.opacity = "0";
  painLevel = 0;
  document.body.style.background = "#1a1a1a";
  locked = false;
}, 2000);

return;
```

}

clearTimeout(timeout);
timeout = setTimeout(() => {
painLevel = Math.max(0, painLevel - 1);
document.body.style.background = "#1a1a1a";
}, 1000);
}

/* CLICK */
sActive.addEventListener('click', () => {

if (locked) return;

if (content[i].type === "pain") {
triggerPain();
}

sActive.classList.add('torn-off');

setTimeout(() => {

```
i++;

if (i < content.length) {

  tActive.innerText = content[i].text;
  tNext.innerText = content[i + 1]?.text || "";

  sActive.classList.remove('torn-off');

} else {

  wrapper.style.opacity = '0';
  setTimeout(() => wrapper.style.display = 'none', 1500);

  fTxt.style.opacity = "1";

  music.volume = 0;
  music.play().catch(() => {});

  let fade = setInterval(() => {
    if (music.volume < 0.5) {
      music.volume += 0.02;
    } else {
      clearInterval(fade);
    }
  }, 150);
}
```

}, 700);
});

