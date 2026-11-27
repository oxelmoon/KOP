import FormField, { fieldStyles } from "../FormField/FormField";

export default function TextField({ id, label, value, placeholder, hint, error, onChange }) {
  return (
    <FormField id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        className={fieldStyles.control}
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
      />
    </FormField>
  );
}
