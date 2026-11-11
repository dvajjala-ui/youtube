// Local receiver for browser-side frame capture (research use).
// Usage: node frame-server.mjs [outDir]   (default: ./frames)
// The page POSTs { name, data } where data is a canvas dataURL; we write the JPEG.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] || "frames");
fs.mkdirSync(out, { recursive: true });

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") { res.end(); return; }
    let b = "";
    req.on("data", (d) => (b += d));
    req.on("end", () => {
      try {
        const { name, data } = JSON.parse(b);
        if (!/^[a-zA-Z0-9._-]+$/.test(name)) throw new Error("bad name");
        fs.writeFileSync(path.join(out, name), Buffer.from(data.split(",")[1], "base64"));
        res.end("ok");
      } catch (e) {
        res.statusCode = 500;
        res.end(String(e));
      }
    });
  })
  .listen(8765, "127.0.0.1", () => console.log("frame receiver listening on 8765, out:", out));