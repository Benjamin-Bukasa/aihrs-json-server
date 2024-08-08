import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import serve from 'serve-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer((request, response) => {
    return serve(request, response, {
        public: './build'
    });
});

const PORT = process.env.PORT || 5173;

server.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});
