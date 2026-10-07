# Wrenfield API

Inventory API for the Wrenfield stockroom. Items are kept in memory, so the list resets whenever the process restarts.

## Running locally

```
npm install
npm start
```

The API listens on `0.0.0.0:8080` by default. Configuration is read from the environment in `config.js`.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | no | Port to listen on (defaults to 8080). |
| `SERVICE_NAME` | no | Name used in the startup log (defaults to `wrenfield-api`). |
| `FEATURE_FLAGS` | no | JSON object of flags, for example `{"healthcheck":true}`. Set `healthcheck` to `false` to make `/health` answer 503 while the service is drained. |

## Routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Liveness check, answers `{"ok":true}`. |
| `GET` | `/items` | Lists all items. |
| `POST` | `/items` | Adds an item: `{"sku":"WR-1042","name":"Brass hinge","quantity":40}`. |
