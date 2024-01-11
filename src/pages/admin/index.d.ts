export type Payload = {
	showDetail?: boolean;
	showAdd?: boolean;
	params: Record<any, any>;
};


export type Pload = {
  showAddedit: boolean;
  addeditTitle: string;
  params: Record<any, any>;
}

export type Action = {
  刷新表格: {};
  打开详情: { id: string; };
}
