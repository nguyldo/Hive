const express = require('express');

const app = express();

app.get('/testapi', (request, response) => {
    response.json({ template: "Hello world!" });
});

const PORT = 3005;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));