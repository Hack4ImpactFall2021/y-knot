import React from 'react';

import { JotformResponse } from '../../utils/utils';
import Application from '../Application/Application';
import BackgroundCheck from '../BackgroundCheck/BackgroundCheck';
import Interview from '../Interview/Interview';
import { Tabs } from '../Profile';
import UserInformation from '../UserInformation/UserInformation';

type Props = {
    type: string,
    data: JotformResponse | null
}

const Content: React.FC<Props> = ({ type, data }) => {
    if (data) {
        switch (type) {
            case Tabs.UserInformation:
                return (<UserInformation data={data} />);
            case Tabs.Application:
                return (<Application data={data} />);
            case Tabs.Interview:
                return (<Interview data={data}/>);
            case Tabs.BackgroundCheck:
                return (<BackgroundCheck data={data} />);
            default:
                return null;
        }
    } else {
        return <div style={{ backgroundColor: '#ececec', width: '100%', height: '656px' }}></div>;
    }
}

export default Content;