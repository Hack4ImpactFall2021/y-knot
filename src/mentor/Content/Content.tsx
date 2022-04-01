import React, { useEffect, useState } from 'react';
import NetworkManager, { Endpoints } from '../../network/NetworkManager';

import { Applicant, JotformResponse } from '../../utils/utils';
import { Tabs } from '../MentorProfile';
import Mentee from './Mentee';
import MentorInfo from './MentorInfo';
import LogsReports from './LogsReports';

type Props = {
    type: string,
    formData: JotformResponse | null,
}

const Content: React.FC<Props> = ({ type, formData }) => {

    const menteeList = [
        {
            name: "Jason Cavanaugh"
        },
        {
            name: "Amanda Liu"
        },
        {
            name: "Jason Cavanaugh"
        },
        {
            name: "Amanda Liu"
        },
        {
            name: "Jason Cavanaugh"
        },
        {
            name: "Amanda Liu"
        },
        {
            name: "Jason Cavanaugh"
        },
        {
            name: "Amanda Liu"
        },
        {
            name: "Jason Cavanaugh"
        },
        {
            name: "Amanda Liu"
        },
    ];
    //Eventually this list will have to come from somewhere I guess. And also we'll need to have more information for each mentee

    if (!formData) {
        return (
            <div style={{ backgroundColor: '#ececec', width: '100%', height: '656px' }}></div>
        );
    }
    switch (type) {
        case Tabs.MentorInfo:
            return (<MentorInfo data={formData} />);
        case Tabs.MenteeProfile:
            return (<Mentee mentees={menteeList}/>);
        case Tabs.LogsReports:
          return (<LogsReports />)
        default:
            return null;
    }
}

export default Content;