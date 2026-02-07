export interface KintoneApp {
  appId: string;
  code: string;
  name: string;
  description: string;
  spaceId: string | null;
  threadId: string | null;
  createdAt: string;
  creator: {
    code: string;
    name: string;
  };
  modifiedAt: string;
  modifier: {
    code: string;
    name: string;
  };
}

export interface KintoneAppsResponse {
  apps: KintoneApp[];
}
