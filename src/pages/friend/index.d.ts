export type Pload = {
  showAddedit: boolean;
  addeditTitle: string;
  params: Record<any, any>;
};

export type Action = {
  刷新表格: {};
  打开修改: { id: string };
  删除: { id: string };
};
