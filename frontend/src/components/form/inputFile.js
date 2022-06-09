import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
registerPlugin(FilePondPluginFileValidateSize, FilePondPluginImagePreview);

export default function InputFile() {
  const [files, initFiles] = useState([]);
  return (
    // <div className="container mt-5">
    //   <h2 className="mb-4">React File Upload Size Validation Example</h2>
    <FilePond
      files={files}
      allowFileSizeValidation={true}
      maxFileSize={5}
      labelMaxFileSizeExceeded={"File is too large"}
    />
    // </div>
  );
}
