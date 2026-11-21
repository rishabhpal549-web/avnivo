const http = require("http");
const { spawn } = require("child_process");

const PORT = 3009;

async function testSearchHTTP() {
  console.log("Starting Next.js server on port " + PORT + "...");
  const server = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "start", "-p", String(PORT)],
    { stdio: ["ignore", "pipe", "pipe"], shell: true }
  );

  server.stdout.on("data", (d) => {
    console.log("[Next stdout]:", d.toString().trim());
  });
  server.stderr.on("data", (d) => {
    console.error("[Next stderr]:", d.toString().trim());
  });

  await new Promise((r) => setTimeout(r, 6000));

  function getJSON(path) {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${PORT}${path}`, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      }).on("error", reject);
    });
  }

  try {
    const res = await getJSON("/api/products?q=iphone");
    console.log("Response:", res.status, res.body);
  } catch (e) {
    console.error("Request error:", e.message);
  }

  server.kill();
  process.exit(0);
}

testSearchHTTP().catch(console.error);
