import * as Yup from "yup";

const TaskValidationSchema = Yup.object().shape({
  task: Yup.string().required("Nazwa zadania jest wymagana"),
});

export default TaskValidationSchema;
