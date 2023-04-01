import createServer from './src/createServer';

const port = 3001;

const server = createServer();

try {
    server.listen(port, () => console.log(`Server started on port ${port}`))
} catch (e) {
    console.log(e)
}