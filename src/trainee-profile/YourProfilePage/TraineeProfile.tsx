import React from 'react';

import './TraineeProfile.css';
import { JotformResponse } from '../../utils/utils';

type Props = {
    data: JotformResponse;
}

const TraineeProfile: React.FC<Props> = ({ data }) => {

    const response = data['content']['answers'];

    return (
        <div className='trainee-profile'>
            <div className='occupation response-box'>
                <h1 className='response-title'>Occupation</h1>
                <div className='response-body'>
                    <p className='response-text'>{response['4']['answer']}</p>
                </div>
            </div>

            <div className='education response-box'>
                <h1 className='response-title'>Highest Educational Achivement</h1>
                <div className='response-body'>
                    <p className='response-text'>{response['5']['answer']}</p>
                </div>
            </div>


            <div className='phone response-box'>
                <h1 className='response-title'>Phone Number</h1>
                <div className='response-body'>
                    <p className='response-text'>{response['6']['answer'] && response['6']['prettyFormat']}</p>
                </div>
            </div>

            <div className='email response-box'>
                <h1 className='response-title'>Email</h1>
                <div className='response-body'>
                    <p className='response-text'>{response['7']['answer']}</p>
                </div>
            </div>

            <div className='address response-box'>
                <h1 className='response-title address-title'>Address</h1>

                <div className='address1'>
                    <div className='response-body'>
                        <p className='response-text'>{response['8']['answer'] && response['8']['answer']['addr_line1']}</p>
                        <p className='response-subtext'>Street Address 1</p>
                    </div>
                </div>

                <div className='address2'>
                    <div className='response-body'>
                        <p className='response-text'>{response['8']['answer'] && response['8']['answer']['addr_line2']}</p>
                        <p className='response-subtext'>Street Address 2</p>
                    </div>
                </div>

                <div className='city'>
                    <div className='response-body'>
                        <p className='response-text'>{response['8']['answer'] && response['8']['answer']['city']}</p>
                        <p className='response-subtext'>City</p>
                    </div>
                </div>

                <div className='state'>
                    <div className='response-body'>
                        <p className='response-text'>{response['8']['answer'] && response['8']['answer']['state']}</p>
                        <p className='response-subtext'>State</p>
                    </div>
                </div>

                <div className='zip-code'>
                    <div className='response-body'>
                        <p className='response-text'>{response['8']['answer'] && response['8']['answer']['postal']}</p>
                        <p className='response-subtext'>Zip Code</p>
                    </div>
                </div>

            </div>

            <div className='background-check response-box'>
                <h1 className='response-title'>Is user an employee of any of the following, FBI, Secret Service, CIA or police department?</h1>
                <div className='response-body'>
                    <input disabled type='radio' checked={response['38']['answer'] === 'Yes'} />
                    <p className='response-text radio-text'>Yes</p>
                    <input disabled type='radio' checked={response['38']['answer'] === 'No'} />
                    <p className='response-text radio-text'>No</p>
                </div>
            </div>



        </div>
    )
}

export default TraineeProfile;