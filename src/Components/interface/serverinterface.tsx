export interface Firstadd{

    description: string,
    diaryid: number,
    diarytitle: string,
    status: string,
    title: string
    username: string,
    token:string



}

export interface addentries{
    DiaryID: number,
description: string,
diaryid: number,
title: string,
username: string,
token:string
}

export interface dairyadd{
    diarytitle:string,
    status:string,
    token:string,
    username:string
}
export interface signup{
        name:string,
        username:string,
        password:string,
        email:string,
        diaryID: number
}

export interface updateEntries{
    description: string,
diaryid: number,
id: number,
title: string,
token: string,
username: string
}
export interface updateDiary{
    diaryid:number,
    username:string,
    token:string,
    Diarytitle:string,
    status:string
}