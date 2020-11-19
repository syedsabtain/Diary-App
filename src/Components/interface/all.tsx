export interface Reduxer {
    user:{
        token:string,
        isAuthenticated:boolean,
        username:string,
        // diaryID:number,
        // diary:[
        //     {
        //         diaryid:number,
        //      status:string,
        //      diarytitle:string,
        //      createdAt:string,
        //      entries:[
        //         {
        //          id:number,
        //          title:string,
        //          description:string,
        //          createAt:string,
        //          updatedAt:string
        //         }]
        //     }
        // ]

    },
    diary:{
        diaryID:number,
        username:string,
        diary:[
            {
             diaryid:number,
             status:string,
             diarytitle:string,
             createdAt:string,
             entries:[
                {
                 id:number,
                 title:string,
                 description:string,
                 createAt:string,
                 updatedAt:string
                }]
            }
            
        ]
    },
    publicdiary:[
        {
            username:string,
            userdata:[
                {
                    diaryid:number,
                    status:string,
                    diarytitle:string,
                    createdAt:string,
                    entries:[
                       {
                        id:number,
                        title:string,
                        description:string,
                        createAt:string,
                        updatedAt:string
                       }]  
                }
            ]
        }
        
    ],
    publicinfo:{
        username:string,
        diaryid:number[]
    }
}
