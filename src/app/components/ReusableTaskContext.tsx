import { Button, Grid, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { TaskFormValues } from "../models/task";
import ReusableFormikInput from "./ReusableFormikInput";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../api/store";
import { getTokenAsync } from "../api/reduxFeatures/authSlice";
import { useSelector } from "react-redux";

interface Props {
  initialValues: TaskFormValues;
  quest: string;
}

function ReusableTaskContext({ quest, initialValues }: Props) {
  const [token, setToken] = useState("");
  const dispatch = useAppDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authState.token) {
      setToken(authState.token);
    }
  },[authState.token]);

  const handleInputChange = (event: any) => {
    setToken(event.target.value);
  };

  const handleFormSubmit = async (values: TaskFormValues) => {
    let taskData: any = {
      task: values.task,
    };
    console.log("taskData: ", taskData);
    await dispatch(getTokenAsync(taskData));
  };

  return (
    <Grid>
      <Grid>
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {() => (
            <Form>
              <ReusableFormikInput name='task' placeholder='Nazwa zadania' label='Nazwa zadania' disabled={true} />
              <Button type='submit' variant="contained">Wyślij</Button>
            </Form>
          )}
        </Formik> 
      </Grid>
      <Grid>{quest}</Grid>
      <Grid>
        <TextField label='token' variant='outlined' value={token} onChange={handleInputChange} disabled={true} />
      </Grid>
    </Grid>
  );
}

export default ReusableTaskContext;
