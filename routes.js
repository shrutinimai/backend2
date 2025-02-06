const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.end(`
            <form action="/message" method="POST">
            <label>Name:</label>
            <input type="text" name="username"></input>
            <button type="submit">add</button>
            </form>
        `);
    } else {
        if (req.url === "/message") {
            let body = [];
            req.on("data", (chunks) => {
                body.push(chunks);
            });
            req.on("end", () => {
                let buffer = Buffer.concat(body); 
                let formdata = buffer.toString(); 
                const formValues = formdata.split('=')[1]; 
                fs.writeFile('formValues.txt', formValues, (err) => { 
                    res.statusCode = 302; 
                    res.setHeader('Location', '/'); 
                    res.end();
                });
            });
        } else {
            if (req.url === '/read') {
                fs.readFile('formValues.txt', (err, data) => { 
                    if (err) {
                        console.log(err);
                        res.end("<h1>Error reading file</h1>");
                        return;
                    }
                    console.log(data.toString());
                    res.end(`
                        <h1>${data.toString()}</h1>
                    `);
                });
            }
        }
    }
};

exports.requestHandler = requestHandler;
