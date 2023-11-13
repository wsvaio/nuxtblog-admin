import { del, get, post, put } from "./request";

const { DEV, VITE_BASE_API } = import.meta.env;

export const getArticle = get("/article/:id?");
export const postArticle = post("/article");
export const putArticle = put("/article/:id");
export const delArticle = del("/article/:id");

export const getTag = get("/tag/:id?");
export const getTagAll = get("/tag/all");
export const postTag = post("/tag");
export const putTag = put("/tag/:id");
export const delTag = del("/tag/:id");

export const getType = get("/type/:id?");
export const getTypeAll = get("/type/all");
export const postType = post("/type");
export const putType = put("/type/:id");
export const delType = del("/type/:id");

export const getComment = get("/comment/:id?");
export const getCommentAll = get("/comment/all");
export const postComment = post("/comment");
export const putComment = put("/comment/:id");
export const delComment = del("/comment/:id");

export const getUser = get("/user/:id?");
export const getUserAll = get("/user/all");
export const postUser = post("/user");
export const putUser = put("/user/:id");
export const delUser = del("/user/:id");

export const authUser = get("/user/auth");
export const authToken = get("/user/oauth/github/:code");

export const toFileUrl = (id: string) => `${DEV ? "/api" : VITE_BASE_API}/file/${id}`;
