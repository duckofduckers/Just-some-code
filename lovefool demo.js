"use strict";
// typing out lovefool demo by wifiskeleton with rainbow letters in js
// timestamps are kinda weird i just guessed based off of what it sounded like lol
const stuff = [
 { d: 0, t: "Oh yeah" },
 { d: 200, t: "Walk around with my eyes on the ground" },
 { d: 100, t: "And my head in my ass 'cause I can't get it out" },
 { d: 500, t: "You look at me like I'm just some kind of fool" },
 { d: 200, t: "But that's all I can really be for you" },
 { d: 600, t: "Been like this for like thirteen years" },
 { d: 200, t: "I spent most of my life swallowed up by my fears" },
 { d: 400, t: "And I'll be like this for most of the day" },
 { d: 200, t: "I'll be out in the cold 'til my palms turn grey" },
 { d: 500, t: "Hey, hey, hey, what more can I say" },
 { d: 300, t: "Hey, hey, you looked so beautiful already" },
 { d: 200, t: "Get me out of this place" },
 { d: 300, t: "I'm so excited to be anything" }
];
const speed = 55; // ms per letter, tweak if too fast/slow if it needs it
const step = 12; // hue change per letter for rainbow thing
const out = process.stdout;
const wait = ms => new Promise(r => setTimeout(r, ms));
const reset = "\x1b[0m";
const bold = "\x1b[1m";
const line = "─".repeat(45) + "\n";
const total = 360 / step;
// precompute the rainbow colors once so we arent doing math every letter like a psychopath because I hate math..
const colors = Array.from({ length: total }, (_, i) => {
      const h = i * step;
  const c = s => Math.round(127.5 * (1 + Math.sin((h + s) * Math.PI / 180)));
        return `\x1b[38;2;${c(0)};${c(120)};${c(240)}m`;
});
let i = 0;
const type = async txt => {
   for (let j = 0, n = txt.length; j < n; j++) {
  out.write(colors[i] + txt[j] + reset);
        i = (i + 1) % total;
   await wait(speed);
 }
 out.write("\n");
};
const bye = code => {
 out.write(reset + "\n");
 process.exit(code);
};
process.on("SIGINT", () => bye(0));
process.on("uncaughtException", err => {
 out.write(`${reset}Error: ${err?.message ?? "unknown"}\n`);
 bye(1);
});
(async () => {
 out.write(`\n${bold}🎵 lovefool demo - wifiskeleton${reset}\n\n${line}`);
 for (const s of stuff) {
      if (s.d) await wait(s.d);
  await type(s.t);
 }
 out.write(`${line}${bold}🎵 [Song complete]${reset}\n\n`);
})();
