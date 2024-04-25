import { Button, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReusableTaskContext from "../../components/ReusableTaskContext";
import { moderation } from "../../quests/moderation";
import { RootState, useAppDispatch } from "../../api/store";
import { useSelector } from "react-redux";
import { getQuestionsModerateAsync, postModerationAnswerAsync, postModerationGptAsync } from "../../api/reduxFeatures/moderationSlice";
import { Form, Formik } from "formik";
import { ModerationAnswerFormValue, ModerationGPTFormValue } from "../../models/moderation";


function Moderation() {
  const dispatch = useAppDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const moderationState = useSelector((state: RootState) => state.moderation);
  const initialValueModerationGPT = new ModerationGPTFormValue();
  const initialValueModerationAnswer = new ModerationAnswerFormValue();
  const gptAnswers = useSelector((state: RootState) => state.moderation.choice);
  const note = useSelector((state: RootState) => state.moderation.note);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (authState.token) dispatch(getQuestionsModerateAsync(authState.token));
  }, [authState.token, dispatch]);

  const moderationSubmit = async (values: ModerationGPTFormValue) => {
    let sentencesData: any = {
      sentences: moderationState.input,
    };
    console.log("sentencesData: ", sentencesData);
    await dispatch(postModerationGptAsync(sentencesData));
  };

  const handleInputChange = (event: any) => {
    setNotes(event.target.value);
  };

  const answerSubmit = async (values: ModerationAnswerFormValue) => {
    const answer = [values.zd1, values.zd2, values.zd3, values.zd4].map(Number);
    let moderationData:any={
      answer,
      token:authState.token
    }
    console.log("answer moderatuion submit: ",moderationData);
    await dispatch(postModerationAnswerAsync(moderationData))
  };

  return (
    <Grid sx={{maxWidth:700}}>
      <Grid>
        <ReusableTaskContext quest={moderation} initialValues={{ task: "moderation" }} />
        {authState.token !== "" ? (
          <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "5px" }}>
           <Grid sx={{ textAlign: 'left' }}>
  {moderationState.input && moderationState.input.map((item, index) => (
    <div key={index}>{index + 1}.{item}</div>
  ))}
</Grid>

            <Formik initialValues={initialValueModerationGPT} onSubmit={moderationSubmit}>
              {() => (
                <Form>
                  <Button type='submit' variant='contained'>
                    Moderacja
                  </Button>
                </Form>
              )}
            </Formik>
            <Grid>
              {gptAnswers.map((gpt, index) => (
                <Grid key={index}>{gpt.message.content}</Grid>
              ))}
            </Grid>
            <Grid>
            <Formik initialValues={initialValueModerationAnswer} onSubmit={answerSubmit}>
  {({ values, handleChange }) => (
    <Form>
      <Grid container spacing={2}>
  <Grid item xs={3} sx={{ textAlign: 'left' }}>
    <Typography variant='h5' sx={{ fontSize: 'small' }}>Zdanie 1</Typography>
    <RadioGroup name='zd1' value={values.zd1} onChange={handleChange}>
       <FormControlLabel value="1" control={<Radio />} label='1'  sx={{ fontSize: 'small' }} />
        <FormControlLabel value="0" control={<Radio />} label='0'  sx={{ fontSize: 'small' }} />
    </RadioGroup>
  </Grid>

  <Grid item xs={3} sx={{ textAlign: 'left' }}>
    <Typography variant='h5' sx={{ fontSize: 'small' }}>Zdanie 2</Typography>
    <RadioGroup name='zd2' value={values.zd2} onChange={handleChange}>
       <FormControlLabel value="1" control={<Radio />} label='1' sx={{ fontSize: 'small' }}  />
        <FormControlLabel value="0" control={<Radio />} label='0' sx={{ fontSize: 'small' }}  />
    </RadioGroup>
  </Grid>

  <Grid item xs={3} sx={{ textAlign: 'left' }}>
    <Typography variant='h5' sx={{ fontSize: 'small' }}>Zdanie 3</Typography>
    <RadioGroup name='zd3' value={values.zd3} onChange={handleChange}>
       <FormControlLabel value="1" control={<Radio />} label='1' sx={{ fontSize: 'small' }}  />
        <FormControlLabel value="0" control={<Radio />} label='0' sx={{ fontSize: 'small' }}  />
    </RadioGroup>
  </Grid>

  <Grid item xs={3} sx={{ textAlign: 'left' }}>
    <Typography variant='h5' sx={{ fontSize: 'small' }}>Zdanie 4</Typography>
    <RadioGroup name='zd4' value={values.zd4} onChange={handleChange}>
       <FormControlLabel value="1" control={<Radio />} label='1' sx={{ fontSize: 'small' }}  />
        <FormControlLabel value="0" control={<Radio />} label='0' sx={{ fontSize: 'small' }}  />
    </RadioGroup>
  </Grid>
</Grid>


      <Button type='submit' variant='contained'>
        Wyślij odpowiedź
      </Button>
    </Form>
  )}
</Formik>

            </Grid>
          </Grid>
        ) : null}
      </Grid>
      <Grid>{note !== "" ?
           <TextField value={note} onChange={handleInputChange}/> : null}</Grid>
    </Grid>
  );
}
export default Moderation;
