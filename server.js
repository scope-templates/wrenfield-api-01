const express = require("express");
const config = require("./config");

const app = express();
app.use(express.json());

const items = [];
let nextId = 1;

app.get("/health", (req, res) => {
  const flags = config.featureFlags();
  if (flags.healthcheck === false) {
    return res.status(503).json({ ok: false });
  }
  res.json({ ok: true });
});

app.get("/items", (req, res) => {
  res.json({ items });
});

app.post("/items", (req, res) => {
  const { sku, name, quantity } = req.body || {};
  if (typeof sku !== "string" || sku.trim() === "") {
    return res.status(400).json({ error: "sku is required" });
  }
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "name is required" });
  }
  if (!Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({ error: "quantity must be a non-negative integer" });
  }
  const item = {
    id: nextId++,
    sku: sku.trim(),
    name: name.trim(),
    quantity,
    createdAt: new Date().toISOString(),
  };
  items.push(item);
  res.status(201).json(item);
});

app.listen(config.port, "0.0.0.0", (err) => {
  if (err) throw err;
  console.log(`${config.serviceName} listening on port ${config.port}`);
});
