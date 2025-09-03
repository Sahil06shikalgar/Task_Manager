import{
    LuLayoutDashboard,
    LuUser,
    LuClipboardCheck,
    LuSquareCheck,
    LuLogOut
} from 'react-icons/lu';

export const SLIDE_MENU_DATA=[
    {
        id:"01",
        label:"Dashboard",
        icon:LuLayoutDashboard,
        path:"/admin/dashboard"
    },
    {
        id:"02",
        label:"Manage_Tasks",
        icon:LuUser,
        path:"/admin/tasks"
    },
    {
        id:"03",
        label:"Create Task",
        icon:LuClipboardCheck,
        path:"/admin/create-task"
    },
    {
        id:"04",
        label:"Team Memeber",
        icon:LuSquareCheck,
        path:"/admin/users"
    },
    {
        id:"05",
        label:"Logout",
        icon:LuLogOut,
        path:"/login"
    },
];

export const SLIDE_MENU_USER_DATA=[
    {
        id:"01",
        label:"Dashboard",
        icon:LuLayoutDashboard,
        path:"/user/dashboard"
    },
    {
        id:"02",
        label:"My Task",
        icon:LuUser,
        path:"/user/task"
    },
   
    {
        id:"05",
        label:"Logout",
        icon:LuLogOut,
        path:"/login"
    },
];

export const PRIORITY_DATA=[
   {label:"Low",value:"Low"},
   {label:"Medium",value:"Medium"},
   {label:"High",value:"High"}
]

export const STATUS_DATA=[
   {label:"Pending",value:"Pending"},
   {label:"In Progress",value:"In Progress"},
   {label:"Comleted",value:"Done"}
]