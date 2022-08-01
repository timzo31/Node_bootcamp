const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////////////////////////
//////////   SERVER    ///////////////

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = temp.replace(/{%IMAGE%}/g, product.image);
  output = temp.replace(/{%PRICE%}/g, product.price);
  output = temp.replace(/{%FROM%}/g, product.from);
  output = temp.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = temp.replace(/{%QUANTITY%}/g, product.quantity);
  output = temp.replace(/{%DESCRIPTION%}/g, product.description);
  output = temp.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = temp.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req.url);

  const pathName = req.url;

  // Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    console.log(cardsHtml);

    res.end(output);

    // Product Page
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(tempProduct);

    // API Route
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello-world",
    });
    res.end("<h1>Page not Found!</h1>");
  }
});

server.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port ", process.env.PORT || 8000);
});

//////////////////////////////////////
////////////   FILES   ///////////////
// Blocking, Synchronous way
/*
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written successfully!");
*/

// Non-blocking, Asynchronous way
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR occured !!!");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written !");
      });
    });
  });
});
console.log("Will read file");
*/
