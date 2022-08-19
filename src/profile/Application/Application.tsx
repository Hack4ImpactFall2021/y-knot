import React from 'react';
import { JotformResponse } from '../../utils/utils';

import './Application.css';

type Props = {
    data: JotformResponse
}

const Application: React.FC<Props> = ({ data }) => {

    const response = data['content']['answers'];

    return (
        <div className='user-application'>

            <div className='response'>
                <h1 className='response-title'>Is there any characteristic in a mentee that you may be uncomfortable handling? Please specify.</h1>
                <div className='response-body-lg'>
                    <p className='response-text-lg'>
                        {response['14']['answer']}
                    </p>
                </div>
            </div>

            <div className='response'>
                <h1 className='response-title'>Can you be a mentor for more than one person at the same time?</h1>
                <div className='response-body'>
                    <input type='radio' disabled checked={response['39']['answer'] === 'Yes'} />
                    <p className='radio-text'>Yes</p>
                    <input type='radio' disabled checked={response['39']['answer'] === 'No'} />
                    <p className='radio-text'>No</p>
                </div>
            </div>

            <div className='response'>
                <h1 className='response-title'>Days Available</h1>
                <div className='response-body'>
                    <input type='checkbox' disabled checked={response['43']['answer'] && response['43']['answer'].includes('Monday')} />
                    <p className='radio-text'>Monday</p>
                    <input type='checkbox' disabled checked={response['43']['answer'] && response['43']['answer'].includes('Tuesday')} />
                    <p className='radio-text'>Tuesday</p>
                    <input type='checkbox' disabled checked={response['43']['answer'] && response['43']['answer'].includes('Wednesday')} />
                    <p className='radio-text'>Wednesday</p>
                    <input type='checkbox' disabled checked={response['43']['answer'] && response['43']['answer'].includes('Thursday')} />
                    <p className='radio-text'>Thursday</p>
                    <input type='checkbox' disabled checked={response['43']['answer'] && response['43']['answer'].includes('Friday')} />
                    <p className='radio-text'>Friday</p>
                    <input type='checkbox' disabled checked={response['43']['answer'] && response['43']['answer'].includes('Saturday')} />
                    <p className='radio-text'>Saturday</p>
                    <input type='checkbox' disabled checked={response['43']['answer'] && response['43']['answer'].includes('Sunday')} />
                    <p className='radio-text'>Sunday</p>
                </div>
            </div>

            <div className='response'>
                <h1 className='response-title'>Number of hours available per week</h1>
                <div className='response-body'>
                    <input type='radio' disabled checked={response['19']['answer'] === '0-1'} />
                    <p className='radio-text'>0-1</p>
                    <input type='radio' disabled checked={response['19']['answer'] === '1-2'} />
                    <p className='radio-text'>1-2</p>
                    <input type='radio' disabled checked={response['19']['answer'] === '2-3'} />
                    <p className='radio-text'>2-3</p>
                    <input type='radio' disabled checked={response['19']['answer'] === '3-4'} />
                    <p className='radio-text'>3-4</p>
                    <input type='radio' disabled checked={response['19']['answer'] === '4-5'} />
                    <p className='radio-text'>4-5</p>
                    <input type='radio' disabled checked={response['19']['answer'] === '5 or more'} />
                    <p className='radio-text'>5 or more</p>
                </div>
            </div>

            <div className='response'>
                <h1 className='response-title'>Age Preference</h1>
                <div className='response-body'>
                    <input type='checkbox' disabled checked={response['9']['answer'] && response['9']['answer']['0']} />
                    <p className='radio-text'>Elementary</p>
                    <input type='checkbox' disabled checked={response['9']['answer'] && response['9']['answer']['1']} />
                    <p className='radio-text'>Middle School</p>
                    <input type='checkbox' disabled checked={response['9']['answer'] && response['9']['answer']['2']} />
                    <p className='radio-text'>High School</p>
                    <input type='checkbox' disabled checked={response['9']['answer'] && response['9']['answer']['other']} />
                    <p className='radio-text'>Other:</p>
                    <div className='response' style={{ paddingLeft: '0px' }}>
                        <div className='response-body'>
                            <p className='response-text'>{response['9']['answer']['other']}</p>
                        </div>
                    </div>
                </div>
            </div>



            <div className='response'>
                <h1 className='response-title'>Do you have any health limitations?</h1>
                <div className='response-body'>
                    <input type='radio' disabled checked={response['20']['answer'] === 'Yes'} />
                    <p className='radio-text'>Yes</p>
                    <input type='radio' disabled checked={response['20']['answer'] === 'No'} />
                    <p className='radio-text'>No</p>
                </div>
            </div>

            <div className='response'>
                <h1 className='response-title'>Will you agree to have Y-KNOT Inc. check your background through federal and state agencies for criminal records and child abuse and neglect proceedings?</h1>
                <div className='response-body'>
                    <input type='radio' disabled checked={response['21']['answer'] === 'Yes'} />
                    <p className='radio-text'>Yes</p>
                    <input type='radio' disabled checked={response['21']['answer'] === 'No'} />
                    <p className='radio-text'>No</p>
                </div>
            </div>

        </div>
    );
}

export default Application;