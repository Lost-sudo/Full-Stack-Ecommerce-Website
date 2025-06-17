export * from "./components";

export interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  export interface Stat {
    number: string;
    label: string;
  }
  
  export interface NavLink {
    href: string;
    label: string;
    active?: boolean;
  }