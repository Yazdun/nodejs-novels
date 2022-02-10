const publicEndpoints = [
  {
    method: "post",
    endpoint: "/public/authentication/join",
    title: "register user",
  },
  {
    method: "post",
    endpoint: "/public/authentication/login",
    title: "login user",
  },
  {
    method: "get",
    endpoint: "/public/author/find/:id",
    title: "get author",
  },
  {
    method: "get",
    endpoint: "/public/author/random/:id",
    title: "get random authors",
  },
  {
    method: "get",
    endpoint: "/public/author/novels/:id",
    title: "get author's novels",
  },
  {
    method: "get",
    endpoint: "/public/novel/",
    title: "get all novels",
  },
  {
    method: "get",
    endpoint: "/public/novel/find/:id",
    title: "get novel",
  },
  {
    method: "get",
    endpoint: "/public/novel/related/:id",
    title: "get related novels",
  },
  {
    method: "get",
    endpoint: "/public/review/novel/:id",
    title: "get novel reviews",
  },
  {
    method: "get",
    endpoint: "/public/search?searchTerm=",
    title: "search for query",
  },
  {
    method: "get",
    endpoint: "/public/user/find/:id",
    title: "get user",
  },
];
