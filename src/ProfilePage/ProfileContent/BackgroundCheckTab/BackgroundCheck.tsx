import React from 'react';
import { Dropzone, FileItem } from '@dropzone-ui/react';


interface BackgroundCheckProps {
  files: any;
  updateFiles: (files: any) => void;

} 
const BackgroundCheck = (props:BackgroundCheckProps) => {
  return (
    <div>
      <Dropzone
      
        onChange={props.updateFiles}
        value={props.files}
      >
        {props.files.map((file: any) => (
          <FileItem
            {...file}
            preview
            info
            key={file.id}
          />
        ))}
      </Dropzone>
    </div>
  );
};

export default BackgroundCheck;
