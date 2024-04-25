import React, { useEffect, useState } from "react";
import ReusableTaskContext from "../../components/ReusableTaskContext";
import { helloapi } from "../../quests/helloapi";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../api/store";
import { getAnswerHelloApiAsync, postHelloApiAnswerAsync } from "../../api/reduxFeatures/helloApiSlice";
import { AnswerFormValue } from "../../models/helloapi";
import { Form, Formik } from "formik";
import ReusableFormikInput from "../../components/ReusableFormikInput";
import SendButton from "../../assets/icons/formik_button.png";
import InputFrame from "../../assets/icons/formik_button.png";
import ReusableFormikButton from "../../components/ReusableFormikButton";
import ReusableAnswer from "../../components/ReusableAnswer";
import Answer from "../../assets/icons/answer_helloapi.png";

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
    <Grid sx={{ maxWidth: 700 }}>
    <Grid>
      <ReusableTaskContext quest={helloapi} initialValues={{ task: "helloapi" }} />
    </Grid>
    {authState.token !== "" ? (
      <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "5px" }}>
        <Typography variant='h5' sx={{fontFamily:"Rye", color:"#E8AB74",}}>Answer:</Typography>
        <Formik initialValues={initialValue} onSubmit={handleFormSubmit}>
          {() => (
            <Form>
              <Grid spacing={2}>
                <Grid item>
                  <ReusableFormikInput
                    name='answer'
                    placeholder='Odpowiedź'
                    label=''
                    disabled={true}
                    value={helloApiState.cookie}
                    inputFrame={InputFrame}
                  />
                </Grid>
                <Grid item>
                  <ReusableFormikButton imagePath={SendButton}>Send</ReusableFormikButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        {/* Note TextField goes here, right after Formik but still within the parent Grid */}
        {note !== "" ? (
          <ReusableAnswer
              value={note || ""}
              onChange={handleInputChange} imagePath={Answer}/>
        ) : null}
      </Grid>
    ) : null}
  </Grid>
  
  );
}

export default HelloApi;
