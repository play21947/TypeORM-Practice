import { Request, Response } from "express"
import { Users } from "./src/entity/user.entity"
import { AppdataSource } from "./src/db-config"

const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())

AppdataSource.initialize().then(()=>{
    console.log("Data Source has been initialized")
}).catch((err)=>{
    console.log("error on appdatasource")
    console.log(err)
})



app.get("/api/test", (req: Request, res: Response)=>{
    res.send("Hello World")
})

app.get("/api/users",  async (req: Request, res: Response)=>{
    const users = await AppdataSource.getRepository(Users).find()

    res.send(users)
})

app.get("/api/users/:id", async (req: Request, res: Response)=>{

    let {id} = req.params

    const users = await AppdataSource.getRepository(Users).findOneBy({id: Number(id)})

    res.send(users)
})

app.post("/api/signup", async (req: Request, res: Response)=>{
    let user = await AppdataSource.getRepository(Users).create(req.body)

    let result = await AppdataSource.getRepository(Users).save(user)

    res.send(result)
})


app.listen(3001, ()=>{
    console.log("server is running on port 3001")
})