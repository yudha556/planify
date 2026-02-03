import app from "./app";
import { env } from "./config/env";

const PORT = env.port || 4000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
