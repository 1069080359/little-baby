export type MenuItem = {
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};
