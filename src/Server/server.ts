
import { Server, Request } from "miragejs"
import diary from '../Store/diary.json'
import users from '../Store/user.json'
import {randomBytes} from 'crypto'
import {addentries, dairyadd, Firstadd, signup, updateDiary, updateEntries} from '../Components/interface/serverinterface'
import dayjs from 'dayjs'


const generateToken = ()=> randomBytes(8).toString('hex');
export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
   
    

    routes() {
      this.namespace = "api"
      let token = '090994309'
      let id = 0
      this.get("/books",() => {
        
        return diary
      })
      this.post("/diaryrequest",(schema:any,req:Request)=>{
          const userdata = JSON.parse(req.requestBody);

          if(userdata.token ===token){
            
             const dat:any = diary.find((value)=> value.diaryID===id);
            return dat
          }

      })
      this.post("/signin",(schema:any,req:Request) =>{
          
          const newuser = JSON.parse(req.requestBody)
         
          const answer = users.find((value)=> value.username===newuser.username&& value.password===newuser.password);
         
          if(answer===undefined){
            
            return [false]
          }
          else{
            
            const  detaildiary = diary.find((value)=> value.diaryID===answer.diaryID);
            id = answer.diaryID
            
            token = generateToken();
            // datainfo = detaildiary;
            return [token,answer.username,true]
          }
          return []
      })
      this.get('/data',()=>{

        return [token]
      })
      this.get("/diaryID",()=>{
        return [users.length]
      })
      this.post("/signup",(schema:any,req:Request)=>{
          let checking = false
          const userdata:signup = JSON.parse(req.requestBody);
          
          
          users.map((value)=>{
            if(userdata.username === value.username)
            {
              checking= true
            }
          })
          if(checking===false){
            users.push(userdata)
          }
          else{
            
          }
          
          
          
        return [checking]
      })
      this.get("/logout",()=>{

        token = '';
        return []
      })
      this.get('/publicdiary',()=>{
      let datadairy = diary;
      let newdata = [{}];
      let fb = false
      diary.map(value=>{
        let answer = value.diary.map((val,key)=>{

          if(val.status==='public'){
          return  true
          }
          else{
          return false
          }
        })
      
      })
      
      newdata.push(diary.map((value)=>{
        const username =value.username;
        const userdata = value.diary.filter((val)=>val.status==='public')
        return({
          username,
          userdata
        })
      }))
      const finaldata =diary.map((value)=>{
        const username =value.username;
        const userdata = value.diary.filter((val)=>val.status==='public')
        return({
          username,
          userdata
        })
      });
      
        
   
    
        return finaldata
      })
      this.post('/adddiary',(schema:any,req:Request)=>{

        const data:Firstadd = JSON.parse(req.requestBody);
        
        if(data.token===token)
        {
          users.map((value)=>{

            if(value.username === data.username)
            {
              
              diary.push({
                diaryID: value.diaryID,
                username:data.username,
                diary:[{
                  diaryid:data.diaryid,
                  status:data.status,
                  diarytitle:data.diarytitle,
                  createdAt: dayjs().format(),
                  entries:[]
                }]
              })
              
            }
           })
        }
       
        return []
      })
      this.post('addentries',(schema:any,req:Request)=>{

          const data:addentries = JSON.parse(req.requestBody);
          
          if(data.token===token){
            diary.map((value)=>{
              if(value.diaryID===data.DiaryID && value.username === data.username){
  
                value.diary.map((val)=>{
                  if(val.diaryid===data.diaryid)
                  {
                    val.entries.push({
                      id:2,
                      title:data.title,
                      description:data.description,
                      createdAt: dayjs().format(),
                      updatedAt: dayjs().format()
                    })
                  }
                })
              }
            })
          }

        return[]
      })
      this.post('diaryadd',(schema:any,req:Request)=>{

        const data:dairyadd = JSON.parse(req.requestBody);
        if(data.token===token)
        {
          diary.map((value)=>{

            if(value.username===data.username)
            {
              
              value.diary.push({
                diaryid:value.diary.length+1,
                diarytitle:data.diarytitle,
                status:data.status,
                createdAt: dayjs().format(),
                entries:[]
              })
            }
            else{
              
            }
          })
        }
        
        return[]
      })
      this.post('deletediary',(schema:any,req:Request)=>{

        const data = JSON.parse(req.requestBody)
        
        if(token===data.token){
          diary.map((value)=>{
            if(value.username===data.username)
            {
                value.diary.map((val,key)=>{
                  if(val.diaryid === data.diaryid)
                  {
                     const inde =  value.diary.findIndex(value=>value.diaryid===data.diaryid)
                     
                     
                if (inde > -1) {
                    value.diary.splice(inde, 1);
                      }
                  }
                })
            }
          })
         

          
          
        }
        
        return[]
      })
      this.post('deleteEntries',(schema:any,req:Request)=>{

        const data= JSON.parse(req.requestBody);
        if(token===data.token){

          diary.map((value)=>{

            if(value.username===data.username){

              value.diary.map(val=>{

                if(val.diaryid===data.diaryid)
                {
                  const inde=val.entries.findIndex(value=>value.id===data.id)
                  if(inde>-1)
                  {
                    val.entries.splice(inde,1)
                  }
                }
              })
            }
          })
        }

        return[]
      })
      this.post('updateEntries',(schema:any,req:Request)=>{

          const data:updateEntries = JSON.parse(req.requestBody);
         
          if(data.token===token)
          {
            diary.map((value)=>{
              if(value.username===data.username)
              {
                value.diary.map((val)=>{
                  if(val.diaryid===data.diaryid)
                  {
                    val.entries.map((valuee,key)=>{
                      if(valuee.id===data.id){
                        const entdata ={
                          id:data.id,
                          title:data.title,
                          description:data.description,
                          createdAt:valuee.createdAt,
                          updatedAt: dayjs().format()
                        }
                       val.entries[key] = entdata
                      
                      }
                    })
                  }
                })
              }
            })
          }
        return[]
      })
      this.post('updateDiary',(schema:any,req:Request)=>{

        const data:updateDiary = JSON.parse(req.requestBody);

        if(token===token)
        {
          diary.map((value,key)=>{
            if(value.username===data.username)
            {
              value.diary.map((val,key)=>{
                if(val.diaryid===data.diaryid)
                {
                  const dataa={
                    diaryid: val.diaryid,
                    status: data.status,
                    diarytitle: data.Diarytitle,
                    createdAt: val.createdAt,
                    entries:val.entries
                  }

                  value.diary[key] = dataa
                  
                }
              })
            }
          })
        }


        return []
      })
      this.post('getimage',(schema:any,req:Request)=>{
        const jdata= JSON.parse(req.requestBody);
        
        

        return []
      })
    },
  })

  return server
}