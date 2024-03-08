import React, { useEffect, useState } from "react";
import ReusableTaskContext from "../../components/ReusableTaskContext";
import { helloapi } from "../../quests/helloapi";
import { Button, Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../api/store";
import { getAnswerHelloApiAsync, postHelloApiAnswerAsync } from "../../api/reduxFeatures/helloApiSlice";
import { AnswerFormValue } from "../../models/helloapi";
import { Form, Formik } from "formik";
import ReusableFormikInput from "../../components/ReusableFormikInput";

function HelloApi() {
  const dispatch = useAppDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const helloApiState = useSelector((state: RootState) => state.helloApi);
  const note = useSelector((state: RootState) => state.helloApi.note);
  const [notes, setNotes] = useState("");
  const initialValue = new AnswerFormValue();

  useEffect(() => {
    if (authState.token) dispatch(getAnswerHelloApiAsync(authState.token));
  }, [authState.token, dispatch]);

  const handleInputChange = (event: any) => {
    setNotes(event.target.value);
  };

  const handleFormSubmit = async (values: AnswerFormValue) => {
    let answerData: any = {
      answer: values.answer,
      token: authState.token,
    };
    console.log("taskData: ", answerData);
    await dispatch(postHelloApiAnswerAsync(answerData));
  };

  console.log("odp: ", helloApiState);
  console.log("coockie: ", helloApiState.cookie);
  return (
    <Grid>
      <Grid>
        <ReusableTaskContext quest={helloapi} initialValues={{ task: "helloapi" }} />
      </Grid>
      {authState.token !== "" ? (
        <Grid>
          odp:
          <Formik initialValues={initialValue} onSubmit={handleFormSubmit}>
            {() => (
              <Form>
                <ReusableFormikInput name='answer' placeholder='Odpowiedź' label='Odpowiedź' disabled={true} value={helloApiState.cookie} />
                <Button type='submit' variant='contained'>
                  Wyślij odpowiedź
                </Button>
              </Form>
            )}
          </Formik>
          <Grid>{note !== "" ?
           <TextField value={note} onChange={handleInputChange}/> : null}</Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default HelloApi;
