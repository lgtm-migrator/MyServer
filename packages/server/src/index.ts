import app from './app';

let port = process.env.PORT || 4003;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})