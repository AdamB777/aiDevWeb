import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Tasks from "../features/tasks/Tasks";
import HelloApi from "../features/tasks/HelloApi";
import Embedding from "../features/tasks/Embedding";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',
                element:<Tasks/>,
                children:[
                    {
                        path:'helloapi',
                        element:<HelloApi/>
                    },
                    {
                        path:'embedding',
                        element:<Embedding/>
                    },
                ]
            }
        ]
    }
])