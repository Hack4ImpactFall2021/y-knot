import React from 'react';
import { Dropzone, FileItem, FileValidated } from '@dropzone-ui/react';
import './BackgroundCheck.css';
interface BackgroundCheckProps {
  files: FileValidated[];
  updateFiles: (files: FileValidated[]) => void;
}
const BackgroundCheck = (props: BackgroundCheckProps) => {
  return (
    <div className="background-check-container">
      <Dropzone onChange={props.updateFiles} value={props.files}>
        {props.files.map((file: any) => (
          <FileItem {...file} preview info key={file.id} />
        ))}
      </Dropzone>

      <textarea className='background-check-textarea'>
        At w3schools.com you will learn how to make a website. They offer free
        tutorials in all web development technologies.
      </textarea>
    </div>
  );
};

export default BackgroundCheck;
