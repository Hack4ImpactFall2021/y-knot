import React, { useEffect, useState } from 'react';
import NetworkManager, { Endpoints } from '../../network/NetworkManager';

import { Applicant, JotformResponse } from '../../utils/utils';
import { Tabs } from '../TProfile';
import TraineeProfile from '../YourProfilePage/TraineeProfile';

type Props = {
    type: string,
    data: JotformResponse | null,
    applicant: Applicant,
}

const Content: React.FC<Props> = ({ type, data, applicant}) => {

    const [files, setFiles] = useState<[string, string] []>([]);

    useEffect(() => {
        getDocuments();
    }, [applicant])
    
    const getDocuments = async () => {
        try {
            let f = await NetworkManager.makeRequest(Endpoints.GetFiles, {id: applicant.submissionId});
            f = f as [string, string] [];
            setFiles(f);
            console.log('updated document list');
        } catch (error) {
            console.log(error);
        }
    }

    const uploadFile = async (filelist: FileList | null) => {
        if (filelist && filelist[0]) {
            try {
            let url = await NetworkManager.makeRequest(Endpoints.UploadFile, {file: filelist[0], id: applicant.submissionId,  filename: filelist[0].name});
            let newFiles = [...files];
            newFiles.push([filelist[0].name, (url as string)]);
            setFiles(newFiles);
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (data) {
        switch (type) {
            case Tabs.TraineeProfile:
                return (<TraineeProfile data={data} />);
            default:
                return null;
        }
    } else {
        return <div style={{ backgroundColor: '#ececec', width: '100%', height: '656px' }}></div>;
    }
}

export default Content;