import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  // {
  //   id: 6,
  //   name: "Dashboard",
  //   path: "/dashboard/admin",
  //   type: ACCOUNT_TYPE.ADMIN,
  //   icon: "VscDashboard",
  // },
  {
    id: 7,
    name: "Students",
    path: "/dashboard/admin/users",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscOrganization", // for managing users
  },
  {
    id: 8,
    name: "Instructors",
    path: "/dashboard/admin/instructors",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAccount", // instructors as part of system
  },
  {
    id: 9,
    name: "Courses",
    path: "/dashboard/admin/courses",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscBook", // course management
  },
  // {
  //   id: 10,
  //   name: "Analytics",
  //   path: "/dashboard/admin/analytics",
  //   type: ACCOUNT_TYPE.ADMIN,
  //   icon: "VscGraphLine", // data insights
  // },
  {
    id: 11,
    name: "Categories",
    path: "/dashboard/admin/categories",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscSymbolClass", // categorize things
  },
  // {
  //   id: 12,
  //   name: "Reports",
  //   path: "/dashboard/admin/reports",
  //   type: ACCOUNT_TYPE.ADMIN,
  //   icon: "VscReport", // user/content reports
  // },
  {
    id: 13,
    name: "Payments",
    path: "/dashboard/admin/payments",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscCreditCard", // transactions and earnings
  },
  // {
  //   id: 14,
  //   name: "Notifications",
  //   path: "/dashboard/admin/notifications",
  //   type: ACCOUNT_TYPE.ADMIN,
  //   icon: "VscBell", // alert center
  // },
  {
    id: 15,
    name: "Support Tickets",
    path: "/dashboard/admin/support",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscCommentDiscussion", // support center
  },
  // {
  //   id: 16,
  //   name: "Admin Roles",
  //   path: "/dashboard/admin/roles",
  //   type: ACCOUNT_TYPE.ADMIN,
  //   icon: "VscShield", // role permissions
  // },
  // {
  //   id: 17,
  //   name: "Activity Logs",
  //   path: "/dashboard/admin/logs",
  //   type: ACCOUNT_TYPE.ADMIN,
  //   icon: "VscHistory", // logs or admin activity
  // },
];
