export const menuData = [
  {
    key: "dashboard",
    title: "Dashboard",
    link: "/dashboard",
    icon: "widgets",
    subMenu: [
      {
        key: "overview",
        title: "Overview",
        link: `/dashboard/overview`,
        icon: "overview",
      },
    ],
  },
  {
    key: "master",
    title: "Master",
    link: "/dashboard/master/users",
    icon: "admin_panel_settings",
    subMenu: [
      {
        key: "users",
        title: "User Management",
        link: "/dashboard/master/users",
        icon: "category",
      },
      {
        key: "foods",
        title: "Food Database",
        link: `/dashboard/master/food-database`,
        icon: "manage",
      },
      {
        key: "meal-plan",
        title: "Meal Plan & Recomemendation",
        link: `/dashboard/master/meal-plans`,
        icon: "request",
      },
      {
        key: "subscription-plan",
        title: "Subscription Plan",
        link: `/dashboard/master/subscription-plan`,
        icon: "request",
      }
    ],
  },
  {
    key: "report",
    title: "Report",
    link: "/dashboard/report/user-engagement-tracking",
    icon: "fact_check",
    subMenu: [
      {
        key: "user-engagement-tracking",
        title: "User Engagement Tracking",
        link: `/dashboard/report/user-engagement-tracking`,
        icon: "list",
      },
      {
        key: "user-activity",
        title: "User Activity",
        link: `/dashboard/report/user-activity`,
        icon: "user",
      },
      {
        key: "meal-and-calorie",
        title: "Meal & Calorie",
        link: `/dashboard/report/meal-and-calorie`,
        icon: "restaurant",
      },
      {
        key: "user-reports",
        title: "User Reports",
        link: `/dashboard/report/user-reports`,
        icon: "group",
      },
      {
        key: "meal-and-nutrition",
        title: "Meal & Nutrition",
        link: `/dashboard/report/meal-and-nutrition`,
        icon: "nutrition",
      },
      {
        key: "subscription-revenue",
        title: "Subscription & Revenue",
        link: `/dashboard/report/subscription-revenue`,
        icon: "payments",
      },
    ],
  },
  // {
  //   key: "admin",
  //   title: "Admin",
  //   link: "/dashboard/admin/staffs",
  //   icon: "manage_accounts",
  //   subMenu: [
  //     {
  //       key: "staffs",
  //       title: "Staffs",
  //       link: `/dashboard/admin/staffs`,
  //       icon: "people",
  //     },
  //     {
  //       key: "roles",
  //       title: "Roles",
  //       link: `/dashboard/admin/roles`,
  //       icon: "admin_panel_settings",
  //     },
  //   ],
  // },  
  {
    key: "notification",
    title: "Notification",
    link: "/dashboard/notification/alerts",
    icon: "notifications",
    subMenu: [
      {
        key: "alerts",
        title: "Manage Notifications and Alerts",
        link: `/dashboard/notification/alerts`,
        icon: "notification_important",
      },
    ],
  },  
];
 