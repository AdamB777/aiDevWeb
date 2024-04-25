export interface ModerationApi {
  code: number;
  msg: string;
  input: string[];
}
export interface ModerationGPT {
  sentences: string;
  choices?: Choice[];
}
export interface Choice {
  message: {
    content: string;
  };
}
export class ModerationGPTFormValue{
  sentences:string="";
  constructor(s?:ModerationGPTFormValue){
    if(s){
      this.sentences=s.sentences
    }
  }
}
export interface ModerationAnswer{
  answer:number[]
  token:string
  note?:string
  // zd1: number;
  // zd2: number;
  // zd3: number;
  // zd4: number;
}
export class ModerationAnswerFormValue {
  answer: number[] = [];
  token: string = "";
  zd1: number = 0;
  zd2: number = 0;
  zd3: number = 0;
  zd4: number = 0;

  constructor(data?: Partial<ModerationAnswerFormValue>) {
    if (data) {
      this.zd1 = data.zd1 ?? 0;
      this.zd2 = data.zd2 ?? 0;
      this.zd3 = data.zd3 ?? 0;
      this.zd4 = data.zd4 ?? 0;
      this.token = data.token ?? "";
      this.answer = [this.zd1, this.zd2, this.zd3, this.zd4];
    }
  }
}

