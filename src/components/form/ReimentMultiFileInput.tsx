import { Controller, useFormContext } from "react-hook-form";

type TMultiFileInput = {
  name: string;
  label: string;
  placeholder?: string;
  maxFiles?: number;
};

const ReimentMultiFileInput = ({
  name,
  label,
  maxFiles,
  placeholder,
}: TMultiFileInput) => {
  const { control } = useFormContext();

  return (
    <div className="RentMultiFileInputContainer mb-5 flex flex-col gap-y-1">
      {label && <label htmlFor={name}>{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={[]} // Ensure default value is an empty array for multiple files
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              type="file"
              id={name}
              accept="image/*"
              multiple
              placeholder={placeholder}
              onChange={(e) => {
                const files = Array.from(e.target.files || []); // Convert FileList to Array
                if (maxFiles && files.length > maxFiles) {
                  alert(`You can upload a maximum of ${maxFiles} files.`);
                  return;
                }
                field.onChange(files); // Set the files array in the form state
              }}
              className="border border-gray-400"
            />

            {field.value && field.value.length > 0 && (
              <ul className="mt-2 text-sm text-gray-700">
                {field.value.map((file: File, index: number) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}

            {error && (
              <p className="text-xs font-medium text-red-600">
                {error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default ReimentMultiFileInput;
