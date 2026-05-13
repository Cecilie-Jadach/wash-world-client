export type CheckboxProps = {
  label: React.ReactNode;
  id: string;
  showRequired?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
