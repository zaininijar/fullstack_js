import React, { useState } from "react";
import PropTypes from "prop-types";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
registerPlugin(FilePondPluginFileValidateSize, FilePondPluginImagePreview);

const InputFile = (props) => {
  const [files, initFiles] = useState([]);
  return (
    <>
      <FilePond
        files={files}
        allowFileSizeValidation={true}
        maxFileSize={500000}
        labelMaxFileSizeExceeded={"File is too large"}
      />
      <pre>{files && JSON.stringify(files, null, 2)}</pre>
    </>
  );
};

InputFile.propTypes = {};

export default InputFile;
