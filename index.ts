import createServer from './src/createServer';

const port = 3000;

const server = createServer();

try {
    server.listen(port, () => {
        console.log(`Server is running on localhost: ${port}`);
    });
} catch (error) {
    console.log(error);
}