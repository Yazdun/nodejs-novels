const adminEndpoints = [
  {
    method: "post",
    endpoint: "/admin/authentication",
    title: "login admin",
  },
  {
    method: "get",
    endpoint: "/admin/author/",
    title: "get all authors",
  },
  {
    method: "get",
    endpoint: "/admin/author/find/:id",
    title: "get author",
  },
  {
    method: "post",
    endpoint: "/admin/author/create",
    title: "create author",
  },
  {
    method: "patch",
    endpoint: "/admin/author/update/:id",
    title: "update author",
  },
  {
    method: "delete",
    endpoint: "/admin/author/delete/:id",
    title: "delete author",
  },
  {
    method: "get",
    endpoint: "/admin/novel/",
    title: "get all novels",
  },
  {
    method: "get",
    endpoint: "/admin/novel/find/:id",
    title: "get novel",
  },
  {
    method: "post",
    endpoint: "/admin/novel/create",
    title: "create novel",
  },
  {
    method: "patch",
    endpoint: "/admin/novel/update/:id",
    title: "update novel",
  },
  {
    method: "delete",
    endpoint: "/admin/novel/delete/:id",
    title: "delete novel",
  },
  {
    method: "get",
    endpoint: "/admin/review",
    title: "get all reviews",
  },
  {
    method: "get",
    endpoint: "/admin/review/pending",
    title: "get pending reviews",
  },
  {
    method: "get",
    endpoint: "/admin/review/stats",
    title: "get review analytics",
  },
  {
    method: "delete",
    endpoint: "/admin/review/delete/:id",
    title: "delete review",
  },
  {
    method: "patch",
    endpoint: "/admin/review/approve/:id",
    title: "approve review",
  },
  {
    method: "patch",
    endpoint: "/admin/review/disapprove",
    title: "disapprove review",
  },
  {
    method: "get",
    endpoint: "/admin/stats/",
    title: "get stats",
  },
  {
    method: "get",
    endpoint: "/admin/stats/",
    title: "get stats",
  },
  {
    method: "get",
    endpoint: "/admin/users/",
    title: "get all users",
  },
  {
    method: "get",
    endpoint: "/admin/users/stats",
    title: "get users analatycs",
  },
];
