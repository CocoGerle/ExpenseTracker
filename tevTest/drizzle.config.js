import { defineConfig } from "drizzle-kit";

export default defineConfig({
  //aliig hurvuuleh gj bgaagaa zaaj ugsn.
  schema: "./src/database/schema.js",
  //database ni
  dialect: "postgresql",
  // haana uusgeh ni
  out: "./drizzle",
  verbose: true,
});
