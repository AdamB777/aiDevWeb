export interface HelloAPi {
    code?: number;
    msg?: string;
    cookie?: string;
  }
  export interface HelloApiAnswer{
    note?:string;
    token:string;
    answer:string;
  }
  export class AnswerFormValue{
    answer:string=""
    token:string=""
    constructor(a?:AnswerFormValue){
      if(a){
        this.answer=a.answer;
        this.token=a.token;
      }
    }
  }