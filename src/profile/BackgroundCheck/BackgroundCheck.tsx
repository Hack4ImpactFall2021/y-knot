import React, { useEffect, useRef, useState } from "react";
import { Applicant, JotformResponse } from "../../utils/utils";

import "./BackgroundCheck.css";
import file from "../assets/file.png";
import error from "../assets/error.png";
import NetworkManager, { Endpoints } from "../../network/NetworkManager";

type Props = {
  data: JotformResponse;
  applicant: Applicant;
  files: [string, string][];
  uploadFile: any;
};

const BackgroundCheck: React.FC<Props> = ({ data, files, uploadFile }) => {
  const response = data["content"]["answers"];

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {response["38"]["answer"] === "Yes" ? (
        <div className="bg-check-exempt">
          <img src={error} />
          <h2 style={{ fontSize: "24px", marginLeft: "10px" }}>
            This applicant is exempt from the background check.
          </h2>
        </div>
      ) : null}

      <div className="bg-check-results">
        <div className="bg-check-results-header">
          <h1>
            {files.length === 0
              ? "Upload Background Check"
              : `${files.length} Uploaded Document${
                  files.length === 1 ? "" : "s"
                }`}
          </h1>
          <input
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => uploadFile(e.target.files)}
          />
          <button
            onClick={() => {
              if (inputRef) {
                inputRef.current?.click();
              }
            }}
          >
            Choose File
          </button>
        </div>
        {files.length > 0 ? (
          <div className="bg-check-results-body">
            <hr
              style={{
                borderTop: "1px solid black",
                width: "100%",
                marginTop: "-10px",
                marginBottom: "15px",
              }}
            ></hr>
            {files.map((f) => {
              return (
                <div key={f[1]} className="bg-check-results-tile">
                  <img src={file} />
                  <a href={f[1]} target="_blank">
                    {f[0]}
                  </a>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="response-box">
        <h1 className="response-title">
          <b>Reference 1:</b>
        </h1>
        <div className="response-body">
          <p className="response-text">
            {response["26"]["answer"] && response["26"]["prettyFormat"]}
          </p>
        </div>
      </div>

      <div className="phone-reference1 response-box">
        <h1 className="response-title">Phone Number</h1>
        <div className="response-body">
          <p className="response-text">
            {response["29"]["answer"] && response["29"]["prettyFormat"]}
          </p>
        </div>
      </div>

      <div className="email-reference1 response-box">
        <h1 className="response-title">Email</h1>
        <div className="response-body">
          <p className="response-text">{response["28"]["answer"]}</p>
        </div>
      </div>

      <div className="address-background-check response-box reference1">
        <h1 className="response-title address-title">Address</h1>

        <div className="address1">
          <div className="response-body">
            <p className="response-text">
              {response["27"]["answer"] &&
                response["27"]["answer"]["addr_line1"]}
            </p>
            <p className="response-subtext">Street Address 1</p>
          </div>
        </div>

        <div className="address2">
          <div className="response-body">
            <p className="response-text">
              {response["27"]["answer"] &&
                response["27"]["answer"]["addr_line2"]}
            </p>
            <p className="response-subtext">Street Address 2</p>
          </div>
        </div>

        <div className="city">
          <div className="response-body">
            <p className="response-text">
              {response["27"]["answer"] && response["27"]["answer"]["city"]}
            </p>
            <p className="response-subtext">City</p>
          </div>
        </div>

        <div className="state">
          <div className="response-body">
            <p className="response-text">
              {response["27"]["answer"] && response["27"]["answer"]["state"]}
            </p>
            <p className="response-subtext">State</p>
          </div>
        </div>

        <div className="zip-code">
          <div className="response-body">
            <p className="response-text">
              {response["27"]["answer"] && response["27"]["answer"]["postal"]}
            </p>
            <p className="response-subtext">Zip Code</p>
          </div>
        </div>
      </div>

      <div className="response-box">
        <h1 className="response-title">
          <b>Reference 2:</b>
        </h1>
        <div className="response-body">
          <p className="response-text">
            {response["30"]["answer"] && response["30"]["prettyFormat"]}
          </p>
        </div>
      </div>

      <div className="phone-reference2 response-box">
        <h1 className="response-title">Phone Number</h1>
        <div className="response-body">
          <p className="response-text">
            {response["33"]["answer"] && response["33"]["prettyFormat"]}
          </p>
        </div>
      </div>

      <div className="email-reference2 response-box">
        <h1 className="response-title">Email</h1>
        <div className="response-body">
          <p className="response-text">{response["32"]["answer"]}</p>
        </div>
      </div>

      <div className="address-background-check response-box">
        <h1 className="response-title address-title">Address</h1>

        <div className="address1">
          <div className="response-body">
            <p className="response-text">
              {response["31"]["answer"] &&
                response["31"]["answer"]["addr_line1"]}
            </p>
            <p className="response-subtext">Street Address 1</p>
          </div>
        </div>

        <div className="address2">
          <div className="response-body">
            <p className="response-text">
              {response["31"]["answer"] &&
                response["31"]["answer"]["addr_line2"]}
            </p>
            <p className="response-subtext">Street Address 2</p>
          </div>
        </div>

        <div className="city">
          <div className="response-body">
            <p className="response-text">
              {response["31"]["answer"] && response["31"]["answer"]["city"]}
            </p>
            <p className="response-subtext">City</p>
          </div>
        </div>

        <div className="state">
          <div className="response-body">
            <p className="response-text">
              {response["31"]["answer"] && response["31"]["answer"]["state"]}
            </p>
            <p className="response-subtext">State</p>
          </div>
        </div>

        <div className="zip-code">
          <div className="response-body">
            <p className="response-text">
              {response["31"]["answer"] && response["31"]["answer"]["postal"]}
            </p>
            <p className="response-subtext">Zip Code</p>
          </div>
        </div>
      </div>

      <div className="response-box">
        <h1 className="response-title">
          <b>Reference 3:</b>
        </h1>
        <div className="response-body">
          <p className="response-text">
            {response["34"]["answer"] && response["34"]["prettyFormat"]}
          </p>
        </div>
      </div>

      <div className="phone-reference3 response-box">
        <h1 className="response-title">Phone Number</h1>
        <div className="response-body">
          <p className="response-text">
            {response["37"]["answer"] && response["37"]["prettyFormat"]}
          </p>
        </div>
      </div>

      <div className="email-reference3 response-box">
        <h1 className="response-title">Email</h1>
        <div className="response-body">
          <p className="response-text">{response["36"]["answer"]}</p>
        </div>
      </div>

      <div className="address-background-check response-box">
        <h1 className="response-title address-title">Address</h1>

        <div className="address1">
          <div className="response-body">
            <p className="response-text">
              {response["35"]["answer"] &&
                response["35"]["answer"]["addr_line1"]}
            </p>
            <p className="response-subtext">Street Address 1</p>
          </div>
        </div>

        <div className="address2">
          <div className="response-body">
            <p className="response-text">
              {response["35"]["answer"] &&
                response["35"]["answer"]["addr_line2"]}
            </p>
            <p className="response-subtext">Street Address 2</p>
          </div>
        </div>

        <div className="city">
          <div className="response-body">
            <p className="response-text">
              {response["35"]["answer"] && response["35"]["answer"]["city"]}
            </p>
            <p className="response-subtext">City</p>
          </div>
        </div>

        <div className="state">
          <div className="response-body">
            <p className="response-text">
              {response["35"]["answer"] && response["35"]["answer"]["state"]}
            </p>
            <p className="response-subtext">State</p>
          </div>
        </div>

        <div className="zip-code">
          <div className="response-body">
            <p className="response-text">
              {response["35"]["answer"] && response["35"]["answer"]["postal"]}
            </p>
            <p className="response-subtext">Zip Code</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackgroundCheck;
