import { Box, Checkbox, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SteampunkClick from "../../assets/icons/steampunkButton.png";
import Menu from "../../assets/icons/menu.png";
import Frame from "../../assets/icons/frame.png";

interface Task {
  name: string;
  path: string;
}

const tasks: Task[] = [
  { name: "helloapi", path: "/helloapi" },
  { name: "asddf", path: "/moderation" },
  { name: "moderation", path: "/moderation" },
  { name: "moderation", path: "/moderation" },
  { name: "moderation", path: "/moderation" },
  { name: "moderation", path: "/moderation" },
  { name: "moderation", path: "/moderation" },
  { name: "moderation", path: "/moderation" },
];

function Tasks() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const handleSelectTask = (taskName: string) => {
    setSelectedTask(taskName);
  };

  return (
    <Grid container spacing={0} sx={{ height: "770px", margin: "20px" }}>
      <Grid
        item
        sx={{
          position: "relative",
          backgroundImage: `url(${Menu})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "top",
          flexDirection: "column",
          marginRight:"100px",
        }}>
        <Stack sx={{ pt: "310px", pl: "15px" }}>
          <Box sx={{ maxHeight: 240, overflow: "auto" }}>
            <Table sx={{ width: "180px" }}>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow
                    key={task.name}
                    sx={{
                      backgroundImage: `url(${SteampunkClick})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "5px",
                      boxShadow: selectedTask === task.name ? "0px 4px 8px rgba(0, 0, 0, 0.5)" : "none",
                      backgroundPosition: "center",
                      cursor: "pointer",
                      "& > *": { border: 0 },
                    }}>
                    <TableCell
                      padding='checkbox'
                      sx={{
                        borderBottom: 0,
                      }}>
                      <Checkbox
                        style={{ opacity: 0 }}
                        checked={selectedTask === task.name}
                        onChange={() => handleSelectTask(task.name)}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() => handleSelectTask(task.name)}
                      sx={{ cursor: "pointer", display: "flex", alignItems: "center", height: "100%", borderBottom: 0 }}>
                      <Link to={task.path} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                        <Typography sx={{ fontFamily: "Rye, cursive", color: "#E8AB74", pl: "0px", flexGrow: 1, fontSize: "10px" }}>
                          {task.name}
                        </Typography>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Stack>
      </Grid>
      <Grid
        item
        sx={{
          flexGrow: 1,
          // position: "relative",
          backgroundImage: `url(${Frame})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          // display: "-ms-grid",
          justifyContent: "center",
          alignItems:"center",
          // height:700,
          // pb:30,
          // pr:11
        }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default Tasks;
