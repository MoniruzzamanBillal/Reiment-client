import { MdOutlineClose } from "react-icons/md";

import { Dispatch, SetStateAction } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInput = {
  name: string;
  label: string;
  preview: string | null;
  setPreview: Dispatch<SetStateAction<string | null>>;
};

const ReimentImageInput = ({ label, name, preview, setPreview }: TInput) => {
  const { control } = useFormContext();

  const handleRemoveImage = (fielld: {
    onChange: (value: FileList | null) => void;
  }) => {
    setPreview(null);
    fielld.onChange(null);

    const fileInput = document.getElementById(name) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="ReimentImageInputContainer mb-5 flex flex-col gap-y-2">
      {label && <label htmlFor={name}>{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              type="file"
              id={name}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                } else {
                  setPreview(null);
                }
                field.onChange(file);
              }}
              className="border border-gray-400 p-2"
            />

            {preview && (
              <div className="mt-3 relative ">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border  "
                />

                <div className="closeIcon  absolute top-0 left-0  ">
                  <MdOutlineClose
                    className=" font-semibold text-xl cursor-pointer text-red-700 bg-red-200 "
                    onClick={() => handleRemoveImage(field)}
                  />
                </div>
              </div>
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

export default ReimentImageInput;
