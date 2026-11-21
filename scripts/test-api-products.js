const { GET } = require("../src/app/api/products/route");

async function testApi() {
  const req1 = new Request("http://localhost:3000/api/products?q=iphone");
  const res1 = await GET(req1);
  const data1 = await res1.json();
  console.log("API /api/products?q=iphone status:", res1.status);
  console.log("Total products returned for 'iphone':", data1.products?.length);
  if (data1.products?.length) {
    console.log("Found:", data1.products.map(p => p.name));
  } else {
    console.log("Empty or Error:", data1);
  }

  const req2 = new Request("http://localhost:3000/api/products?q=samsung");
  const res2 = await GET(req2);
  const data2 = await res2.json();
  console.log("\nAPI /api/products?q=samsung status:", res2.status);
  console.log("Total products returned for 'samsung':", data2.products?.length);

  const req3 = new Request("http://localhost:3000/api/products?q=laptop");
  const res3 = await GET(req3);
  const data3 = await res3.json();
  console.log("\nAPI /api/products?q=laptop status:", res3.status);
  console.log("Total products returned for 'laptop':", data3.products?.length);

  const req4 = new Request("http://localhost:3000/api/products?q=watch");
  const res4 = await GET(req4);
  const data4 = await res4.json();
  console.log("\nAPI /api/products?q=watch status:", res4.status);
  console.log("Total products returned for 'watch':", data4.products?.length);
  if (data4.products?.length) {
    console.log("Found:", data4.products.map(p => p.name));
  }

  const req5 = new Request("http://localhost:3000/api/products?q=apple%20iphone");
  const res5 = await GET(req5);
  const data5 = await res5.json();
  console.log("\nAPI /api/products?q=apple iphone status:", res5.status);
  console.log("Total products returned for 'apple iphone':", data5.products?.length);
}

testApi().catch(console.error);
