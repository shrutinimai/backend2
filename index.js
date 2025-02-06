const http=require('http');
const server=http.createServer((req,res)=>{
    if(req.url=='/'){
        res.end(`
            <h1>hello everyone</h1>
            <h1>homepage</h1>`)
    }
})
server.listen(3000,()=>{
    console.log("server is running");
})