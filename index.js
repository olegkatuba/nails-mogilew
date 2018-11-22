import app from './api'
import './db'

const port = +process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});