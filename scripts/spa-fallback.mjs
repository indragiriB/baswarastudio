// GitHub Pages tidak punya rewrite; salin index.html ke 404.html supaya
// URL langsung seperti /services tetap membuka aplikasi.
import { copyFileSync } from "node:fs";
copyFileSync("dist/index.html", "dist/404.html");
console.log("dist/404.html created");
