import React, { useState } from "react";
import PropTypes from "prop-types";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
registerPlugin(FilePondPluginFileValidateSize, FilePondPluginImagePreview);

const InputFile = (props) => {
  const {setFile} = props
  return (
    <>
      <FilePond
        allowFileSizeValidation={true}
        maxFileSize={500000}
        labelMaxFileSizeExceeded={"File is too large"}
        onupdatefiles={fileItems => {
          console.log("fileItems", fileItems[0].file)
          setFile(fileItems[0].file)
        }}
      />
    </>
  );
};

InputFile.propTypes = {};

export default InputFile;
