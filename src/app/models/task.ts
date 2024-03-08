export interface Task {
  task?: string;
  code?: number; 
  msg?: string;
  token?: string;
}
export class TaskFormValues {
  task: string = "";

  constructor(t?: TaskFormValues) {
    if (t) {
      this.task = t?.task;
    }
  }
}
