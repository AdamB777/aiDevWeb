import { Checkbox, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

interface Task {
  name: string;
  path: string;
}

const tasks: Task[] = [
  { name: 'helloapi', path: '/helloapi' },
  { name: 'embedding', path: '/embedding' },
  // Dodaj więcej zadań tutaj
];

function Tasks() {

  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const handleSelectTask = (taskName: string) => {
    setSelectedTask(taskName);
  };

  return (
    <Grid container spacing={1} sx={{height:"100vh"}}>
      <Grid item xs={2} sx={{bgcolor:'tomato'}}>
        <Stack>
          <Paper>
            <Table>
          <TableHead sx={{ bgcolor: 'darkgrey' }}>
          <TableRow>
              <TableCell colSpan={2} align='center'>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', width:'100%', textTransform: 'uppercase', alignItems:'center', textAlign:'center', justifyContent:'center' }}>
                  Zadania
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow key={task.name} sx={{ bgcolor: index % 2 === 0 ? 'white' : 'lightgrey' }}>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={selectedTask === task.name}
                        onChange={() => handleSelectTask(task.name)}
                        onClick={(event)=>event.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell onClick={()=>handleSelectTask(task.name)} sx={{cursor:'pointer'}}>
                      <Link to={task.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography>{task.name}</Typography>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Stack>
      </Grid>
      <Grid item xs={10} sx={{ bgcolor: 'green' }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default Tasks;