import React, { useEffect, useState } from "react";
import NetworkManager, { Endpoints } from "../../network/NetworkManager";

import { Applicant, JotformResponse } from "../../utils/utils";
import Application from "../Application/Application";
import BackgroundCheck from "../BackgroundCheck/BackgroundCheck";
import Interview from "../Interview/Interview";
import { Tabs } from "../Profile";
import UserInformation from "../UserInformation/UserInformation";

import  Loading from "../../widgets/Loading";

type Props = {
  type: string;
  data: JotformResponse | null;
  applicant: Applicant;
  interviewTime: Date | null;
};

const Content: React.FC<Props> = ({ type, data, applicant, interviewTime }) => {
  const [files, setFiles] = useState<[string, string][]>([]);

  useEffect(() => {
    getDocuments();
  }, [applicant]);

  const getDocuments = async () => {
    try {
      let f = await NetworkManager.makeRequest(Endpoints.GetFiles, {
        id: applicant.submissionId,
      });
      f = f as [string, string][];
      setFiles(f);
      console.log("updated document list");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async (filelist: FileList | null) => {
    if (filelist && filelist[0]) {
      try {
        let url = await NetworkManager.makeRequest(Endpoints.UploadFile, {
          file: filelist[0],
          id: applicant.submissionId,
          filename: filelist[0].name,
        });
        let newFiles = [...files];
        newFiles.push([filelist[0].name, url as string]);
        setFiles(newFiles);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!data) {
    return (
      <Loading/>
    );
  }

  switch (type) {
    case Tabs.UserInformation:
      return <UserInformation data={data} />;
    case Tabs.Application:
      return <Application data={data} />;
    case Tabs.Interview:
      return (
        <Interview
          data={data}
          applicant={applicant}
          interviewTime={interviewTime}
        />
      );
    case Tabs.BackgroundCheck:
      return (
        <BackgroundCheck
          data={data}
          applicant={applicant}
          files={files}
          uploadFile={uploadFile}
        />
      );
    default:
      return null;
  }
};

export default Content;
