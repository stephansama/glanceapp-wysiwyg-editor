import * as React from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#EEEEEE",
  borderStyle: "dashed",
  backgroundColor: "#FAFAFA",
  color: "#BDBDBD",
  outline: "none",
  transition: "border .24s ease-in-out",
} satisfies React.CSSProperties;

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export function Dropover({ onDrop: onDropCallback }: { onDrop: () => void }) {
  const onDrop = React.useCallback(onDropCallback, [onDropCallback]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ accept: { "text/json": [".json", ".jsonc"] }, onDrop });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
