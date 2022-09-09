import express from 'express';
import fallback from 'express-history-api-fallback';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist/`));
app.use(fallback('./dist/index.html', { root: __dirname }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has been started on ${PORT} port`);
});
