const protectedEndpoints = [
  {
    method: "get",
    endpoint: "/protected/user/",
    title: "get user",
  },
  {
    method: "get",
    endpoint: "/protected/user/reviews",
    title: "get user reviews",
  },
  {
    method: "get",
    endpoint: "/protected/user/stars",
    title: "get user stars",
  },
  {
    method: "get",
    endpoint: "/protected/user/likes",
    title: "get user likes",
  },
  {
    method: "get",
    endpoint: "/protected/user/stats",
    title: "get user stats",
  },
  {
    method: "patch",
    endpoint: "/protected/user/updadte",
    title: "update user",
  },
  {
    method: "get",
    endpoint: "/protected/notification",
    title: "get notif status",
  },
  {
    method: "get",
    endpoint: "/protected/notification",
    title: "get all notifs",
  },
  {
    method: "post",
    endpoint: "/protected/review/create/:novelId",
    title: "create review on novel",
  },
  {
    method: "delete",
    endpoint: "/protected/review/:id",
    title: "delete review",
  },
  {
    method: "patch",
    endpoint: "/protected/review/update/:id",
    title: "edit review",
  },
  {
    method: "patch",
    endpoint: "/protected/status/like/:novelId",
    title: "like novel",
  },
  {
    method: "patch",
    endpoint: "/protected/status/star/:authorId",
    title: "star author",
  },
];
