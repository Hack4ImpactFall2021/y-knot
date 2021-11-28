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

      <textarea className="background-check-textarea">
        At w3schools.com you will learn how to make a website. They offer free
        tutorials in all web development technologies.
      </textarea>

      <div className="background-check-reference-container">
        <div className="bg-reference">
          <div className="bg-reference-title">Reference 1</div>
          <div className="background-check-reference">
            <div className="flex-row">
              <div className="bg-reference-contact">
                <div className="input-group">
                  <label>Phone</label> <br />
                  <input type="text" value="204-324-3434" disabled />
                </div>
              </div>
              <div className="bg-reference-contact">
                <div className="input-group">
                  <label>Email</label> <br />
                  <input type="text" value="gonnaquit@gmail.com" disabled />
                </div>
              </div>
            </div>

            <div className="bg-reference-address">
              <div className="input-group">
                <label>Address</label> <br />
                <input type="text" value="204-324-3434" disabled />
              </div>

              <div className="input-group">
                <input type="text" value="204-324-3434" disabled />
              </div>

              <div className="flex-row">
                <div className="input-group width-100">
                  <input type="text" value="204-324-3434" disabled />
                </div>
                <div className="input-group width-100">
                  <input type="text" value="204-324-3434" disabled />
                </div>
              </div>

              <div className="input-group">
                <input type="text" value="204-324-3434" disabled />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-reference">
          <div className="bg-reference-title">Reference 1</div>
          <div className="background-check-reference">
            <div className="flex-row">
              <div className="bg-reference-contact">
                <div className="input-group">
                  <label>Phone</label> <br />
                  <input type="text" value="204-324-3434" disabled />
                </div>
              </div>
              <div className="bg-reference-contact">
                <div className="input-group">
                  <label>Email</label> <br />
                  <input type="text" value="gonnaquit@gmail.com" disabled />
                </div>
              </div>
            </div>

            <div className="bg-reference-address">
              <div className="input-group">
                <label>Address</label> <br />
                <input type="text" value="204-324-3434" disabled />
              </div>

              <div className="input-group">
                <input type="text" value="204-324-3434" disabled />
              </div>

              <div className="flex-row">
                <div className="input-group width-100">
                  <input type="text" value="204-324-3434" disabled />
                </div>
                <div className="input-group width-100">
                  <input type="text" value="204-324-3434" disabled />
                </div>
              </div>

              <div className="input-group">
                <input type="text" value="204-324-3434" disabled />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-reference">
          <div className="bg-reference-title">Reference 1</div>
          <div className="background-check-reference">
            <div className="flex-row">
              <div className="bg-reference-contact">
                <div className="input-group">
                  <label>Phone</label> <br />
                  <input type="text" value="204-324-3434" disabled />
                </div>
              </div>
              <div className="bg-reference-contact">
                <div className="input-group">
                  <label>Email</label> <br />
                  <input type="text" value="gonnaquit@gmail.com" disabled />
                </div>
              </div>
            </div>

            <div className="bg-reference-address">
              <div className="input-group">
                <label>Address</label> <br />
                <input type="text" value="204-324-3434" disabled />
              </div>

              <div className="input-group">
                <input type="text" value="204-324-3434" disabled />
              </div>

              <div className="flex-row">
                <div className="input-group width-100">
                  <input type="text" value="204-324-3434" disabled />
                </div>
                <div className="input-group width-100">
                  <input type="text" value="204-324-3434" disabled />
                </div>
              </div>

              <div className="input-group">
                <input type="text" value="204-324-3434" disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundCheck;
