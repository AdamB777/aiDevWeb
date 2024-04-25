import { Button, Grid, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { TaskFormValues } from "../models/task";
import ReusableFormikInput from "./ReusableFormikInput";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../api/store";
import { getTokenAsync } from "../api/reduxFeatures/authSlice";
import { useSelector } from "react-redux";
import ReusableTooltipButton from "./ReusableTooltipButton";
import TooltipButton from "../assets/icons/tooltip_button.png";
import SendButton from "../assets/icons/formik_button.png";
import InputFrame from "../assets/icons/input_frame.png";
import ReusableFormikButton from "./ReusableFormikButton";
import TokenFrame from "../assets/icons/token_frame.png"
import ReusableTokenInput from "./ReusableTokenInput";
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
  }, [authState.token]);

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
    <Grid sx={{paddingTop:12, justifyContent:"center", width:500,paddingLeft:12}}>
    <Grid container justifyContent='flex-end' spacing={1} style={{ marginBottom: "5px",paddingRight:"25px" }}>
  <Grid item>
    <ReusableTooltipButton text={"iPl"} title={quest} imagePath={TooltipButton}/>
  </Grid>
  <Grid item>
    <ReusableTooltipButton text={"iEn"} title={quest} imagePath={TooltipButton} />
  </Grid>
</Grid>


      <Grid>
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {() => (
            <Form>
              <Grid container sx={{justifyContent:'start'}}  spacing={4}>
                <Grid item>
                <ReusableFormikInput name='task' placeholder='Nazwa zadania' label='Nazwa zadania' disabled={true} inputFrame={InputFrame} /></Grid>
                <Grid item>
              <ReusableFormikButton imagePath={SendButton}>Send</ReusableFormikButton></Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid sx={{pt:1,}}>
      <ReusableTokenInput 
          value={token}
          onChange={handleInputChange} imagePath={TokenFrame}/>

      </Grid>
    </Grid>
  );
}

export default ReusableTaskContext;
