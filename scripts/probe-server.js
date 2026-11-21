const http = require("http");
const { spawn } = require("child_process");

const PORT = 3005;

async function probe() {
  console.log("🌐 Starting Next.js server on port " + PORT + " for end-to-end HTTP verification...");

  const serverProcess = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "start", "-p", String(PORT)],
    { stdio: "pipe", shell: true }
  );

  serverProcess.stdout.on("data", (d) => {
    // console.log("[Next]:", d.toString());
  });

  serverProcess.stderr.on("data", (d) => {
    // console.error("[Next Err]:", d.toString());
  });

  // Wait for server to boot
  await new Promise((resolve) => setTimeout(resolve, 3500));

  function request(path, options = {}) {
    return new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port: PORT,
          path,
          method: options.method || "GET",
          headers: options.headers || {},
          timeout: 5000,
        },
        (res) => {
          let body = "";
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => resolve({ status: res.statusCode, body, headers: res.headers }));
        }
      );
      req.on("error", reject);
      if (options.body) req.write(options.body);
      req.end();
    });
  }

  const endpoints = [
    { path: "/", expectStatus: 200, name: "Homepage" },
    { path: "/api/categories", expectStatus: 200, name: "Categories API" },
    { path: "/api/products?limit=4", expectStatus: 200, name: "Products Catalog API" },
    { path: "/api/search/suggestions?q=samsung", expectStatus: 200, name: "Search Autocomplete API" },
    { path: "/product/samsung-galaxy-s24-5g-256gb", expectStatus: 200, name: "Product Detail Page" },
    { path: "/deals", expectStatus: 200, name: "Best Deals Page" },
    { path: "/compare", expectStatus: 200, name: "Product Comparison Matrix" },
    { path: "/blog", expectStatus: 200, name: "Buying Guides Blog Index" },
    { path: "/affiliate-disclosure", expectStatus: 200, name: "Affiliate Disclosure Page" },
    { path: "/grievance-redressal", expectStatus: 200, name: "Statutory Grievance Redressal" },
    { path: "/robots.txt", expectStatus: 200, name: "SEO Robots.txt" },
  ];

  let passed = 0;
  let failed = 0;

  for (const ep of endpoints) {
    try {
      const res = await request(ep.path);
      if (res.status === ep.expectStatus) {
        console.log(`✅ [HTTP ${res.status}] ${ep.name} (${ep.path})`);
        passed++;
      } else {
        console.error(`❌ [HTTP ${res.status} != ${ep.expectStatus}] ${ep.name} (${ep.path})`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ [FAILED REQUEST] ${ep.name} (${ep.path}):`, err.message);
      failed++;
    }
  }

  console.log("\n==================================================");
  console.log(`HTTP E2E SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log("==================================================");

  // Kill server process
  serverProcess.kill();
  process.exit(failed > 0 ? 1 : 0);
}

probe().catch((e) => {
  console.error("Probe error:", e);
  process.exit(1);
});
