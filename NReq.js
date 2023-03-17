const http = require('http')
const https = require('https')

function request(method,protocal,host,port,path,payload,headers)
{
    if(port === 443){
    const options = {
    host: host,
    port: port,
    path: path,
    method: method,
    headers: headers
    }
    if(method === `POST`){
        payload = JSON.stringify(payload)
    }

    let req = https.request( options , (resp) => {

    let respdata = ``
    // resp.setEncoding('utf8')    // If response data use UTF-8 encoding

    resp.on(`data`,(chunk) => {
        respdata += chunk.toString()
    })

    resp.on(`end`, function(){
        let resp= convertStringtoJSON(respdata)
        console.log(resp)
    })
    })
    if(method === `POST`){
        req.write(payload)
    }
req.end()

function convertStringtoJSON(data)
{
    try{  
    return JSON.parse(data) 
    }catch(excp){  
    return data 
    }
}
    }else if(port === 9818){
            const PORT = process.env.PORT || port
    let server = http.createServer(onClientRequest)
    server.listen(PORT)
    console.log('Server started listening in ' + PORT )
    
    function onClientRequest(request, response)
    {
        let method = request.method
        let requrl = request.url
    
        if(method === `GET` && requrl === `/hi`)
        {
                response.write(`Hello on Get`)
        }
        else if(method === `POST` && requrl === `/hi`){
            response.write(`Hello on Post`)
                }
        else{
            response.write(`Nothing...`)
        }
        response.end()
    }
    }



}

module.exports = {
    http,
    https,
    request,
}