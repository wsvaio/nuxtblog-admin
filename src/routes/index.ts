import type { RouteRecordRaw } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    icon?: string;
    show?: boolean;
    disabled?: boolean;
    sort?: number;
    tabName?: string;
    data?: {
      id?: string;
      parentId?: string;
      ancestors?: string;
      clientId?: string;
      name?: string;
      icon?: string;
      type?: "C" | "M" | "F";
      perms?: string;
      path?: string;
      component?: string;
      currentActiveMenu?: string;
      isExternalLink?: 1 | 0;
      isCache?: 0 | 1;
      isDisplay?: 0 | 1;
      sort?: number;
      state?: 0 | 1;
      remark?: string;
      createTime?: string;
      createById?: string;
      createBy?: string;
    };
  }
}

// 导入路由组件
export const components = Object.entries<AnyObject>(import.meta.glob("@/pages/**/Index.vue", { eager: true })).map(
  ([k, v]) => {
    return {
      path: k.replace("/src/pages", "").replace("/Index.vue", ""),
      component: markRaw(v.default),
    };
  }
);

export function getComponent(path: string) {
  return components.find(item => item.path == path)?.component || getComponent("/404");
}

// 获取动态路由
export async function getDynamicRoutes() {
  return [];
  // const data: any[] = await permissionTreeList();
  const data: any[] = [];
  return deepMap(data, item => {
    return {
      path: item.path,
      name: item.component || item.path,
      meta: {
        title: item.name,
        icon: item.icon,
        show: item.isDisplay != 0,
        sort: item.sort,
        data: { ...item },
      },
      component: item.type == "M" ? getComponent(item.component) : undefined,
      children: item?.children?.filter(item => item.type != "F"),
    } as RouteRecordRaw;
  }) as RouteRecordRaw[];
}

// 获取静态路由
export function getStaticRoutes(): RouteRecordRaw[] {
  return [
    {
      path: "/article",
      name: "/article",
      meta: { title: "文章", icon: "i-material-symbols-article-outline" },
      component: getComponent("/article"),
    },
    {
      path: "/tag",
      name: "/tag",
      meta: { title: "标签", icon: "i-ph-bookmarks" },
      component: getComponent("/tag"),
    },
    {
      path: "/type",
      name: "/type",
      meta: { title: "类型", icon: "i-carbon-types" },
      component: getComponent("/type"),
    },
    {
      path: "/music",
      name: "/music",
      meta: { title: "音乐", icon: "i-carbon-types" },
      component: getComponent("/music"),
    },
    {
      path: "/admin",
      name: "/admin",
      meta: { title: "管理员", icon: "i-carbon-types" },
      component: getComponent("/admin"),
    },
    {
      path: "/comment",
      name: "/comment",
      meta: { title: "评论", icon: "i-carbon-types" },
      component: getComponent("/comment"),
    },
    {
      path: "/user",
      name: "/user",
      meta: { title: "用户", icon: "i-carbon-types" },
      component: getComponent("/user"),
    },
    {
      path: "/friend",
      name: "/friend",
      meta: { title: "朋友们", icon: "i-carbon-types" },
      component: getComponent("/friend"),
    },

  ];
}

export default [
  {
    path: "/login",
    name: "login",
    component: getComponent("/login"),
  },
  {
    path: "/403",
    name: "403",
    meta: { title: "403", show: false },
    component: getComponent("/403"),
  },
  {
    path: "/404",
    name: "404",
    meta: { title: "404", show: false },
    component: getComponent("/404"),
  },
  {
    path: "/500",
    name: "500",
    meta: { title: "500", show: false },
    component: getComponent("/500"),
  },
  { path: "/:pathMatch(.*)", redirect: "/404" },
] as RouteRecordRaw[];
