export type Pload = {
  showAddedit: boolean;
  addeditTitle: string;
  showPassword: boolean;
  params: Record<any, any>;
};

export type Action = {
  刷新表格: {};
  打开修改: { id: string };
  打开修改密码: { id: string };
  删除: { id: string };
};
