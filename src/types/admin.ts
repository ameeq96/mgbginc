export type AdminField = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "url"
    | "number"
    | "textarea"
    | "richtext"
    | "checkbox"
    | "date"
    | "datetime"
    | "select"
    | "media";
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: { label: string; value: string }[];
  defaultValue?: string | number | boolean | null;
};

export type AdminColumn = {
  key: string;
  label: string;
  type?: "text" | "date" | "boolean" | "status" | "image" | "rating";
};

export type AdminResourceConfig = {
  title: string;
  description: string;
  endpoint: string;
  noun: string;
  fields: AdminField[];
  columns: AdminColumn[];
};
