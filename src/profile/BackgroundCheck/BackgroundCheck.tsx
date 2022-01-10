import React from 'react';
import { JotformResponse } from '../../utils/utils';

import './BackgroundCheck.css';
import file from '../assets/file.png';

type Props = {
    data: JotformResponse
}

const BackgroundCheck: React.FC<Props> = ({data}) => {

    const response = data['content']['answers'];

    return (
        <div className='user-background-check'>

            <div className='bg-check-results'>
                <div className='bg-check-results-header'>
                    <h1>1 Uploaded Document</h1>
                    <div>
                        <button>Upload</button>
                    </div>
                </div>

                <div className='bg-check-results-body'>
                    <hr style={{borderTop: '1px solid black', width: '100%', marginTop: '-10px', marginBottom: '15px'}}></hr>
                    <div className='bg-check-results-tile'>
                        <img src={file}/>
                        <a href='#' target="_blank">Background_Check_1.pdf</a>
                    </div>
                    
                </div>

            </div>

            <div className='response-box'>
                <h1 className='response-title'><b>Reference 1:</b></h1>
                <div className='response-body'>
                    <p className='response-text'>{response['26']['answer'] && response['26']['prettyFormat']}</p>
                </div>
            </div>
            <div className='phone-reference1 response-box'>
                <h1 className='response-title'>Phone Number</h1>
                <div className='response-body'>
                    <p className='response-text'>{response['29']['answer'] && response['29']['prettyFormat']}</p>
                </div>
                
            </div>

            <div className='email-reference1 response-box'>
                <h1 className='response-title'>Email</h1>
                <div className='response-body'>
                    <p className='response-text'>{response['28']['answer']}</p>
                </div>
            </div>

            <div className='address-background-check response-box reference1'>
                <h1 className='response-title address-title'>Address</h1>

                <div className='address1'>
                    <div className='response-body'>
                        <p className='response-text'>{response['27']['answer'] && response['27']['answer']['addr_line1']}</p>
                        <p className='response-subtext'>Street Address 1</p>
                    </div>
                </div>

                <div className='address2'>
                    <div className='response-body'>
                        <p className='response-text'>{response['27']['answer'] && response['27']['answer']['addr_line2']}</p>
                        <p className='response-subtext'>Street Address 2</p>
                    </div>
                </div>

                <div className='city'>
                    <div className='response-body'>
                        <p className='response-text'>{response['27']['answer'] && response['27']['answer']['city']}</p>
                        <p className='response-subtext'>City</p>
                    </div>
                </div>

                <div className='state'>
                    <div className='response-body'>
                        <p className='response-text'>{response['27']['answer'] && response['27']['answer']['state']}</p>
                        <p className='response-subtext'>State</p>
                    </div>
                </div>

                <div className='zip-code'>
                    <div className='response-body'>
                        <p className='response-text'>{response['27']['answer'] && response['27']['answer']['postal']}</p>
                        <p className='response-subtext'>Zip Code</p>
                    </div>
                </div>

            </div>

            <div className='response-box'>
                <h1 className='response-title'><b>Reference 2:</b></h1>
                <div className='response-body'>
                    <p className='response-text'>{response['30']['answer'] && response['30']['prettyFormat']}</p>
                </div>
            </div>

            <div className='phone-reference2 response-box'>
                <h1 className='response-title'>Phone Number</h1>
                <div className='response-body'>
                    <p className='response-text'>{response['33']['answer'] && response['33']['prettyFormat']}</p>
                </div>
            </div>

            <div className='email-reference2 response-box'>
                <h1 className='response-title'>Email</h1>
                <div className='response-body'>
                    <p className='response-text'>{response['32']['answer']}</p>
                </div>
            </div>



            <div className='address-background-check response-box'>
                <h1 className='response-title address-title'>Address</h1>

                <div className='address1'>
                    <div className='response-body'>
                        <p className='response-text'>{response['31']['answer'] && response['31']['answer']['addr_line1']}</p>
                        <p className='response-subtext'>Street Address 1</p>
                    </div>
                </div>

                <div className='address2'>
                    <div className='response-body'>
                        <p className='response-text'>{response['31']['answer'] && response['31']['answer']['addr_line2']}</p>
                        <p className='response-subtext'>Street Address 2</p>
                    </div>
                </div>

                <div className='city'>
                    <div className='response-body'>
                        <p className='response-text'>{response['31']['answer'] && response['31']['answer']['city']}</p>
                        <p className='response-subtext'>City</p>
                    </div>
                </div>

                <div className='state'>
                    <div className='response-body'>
                        <p className='response-text'>{response['31']['answer'] && response['31']['answer']['state']}</p>
                        <p className='response-subtext'>State</p>
                    </div>
                </div>

                <div className='zip-code'>
                    <div className='response-body'>
                        <p className='response-text'>{response['31']['answer'] && response['31']['answer']['postal']}</p>
                        <p className='response-subtext'>Zip Code</p>
                    </div>
                </div>

            </div>

            <div className='response-box'>
                <h1 className='response-title'><b>Reference 3:</b></h1>
                <div className='response-body'>
                    <p className='response-text'>{response['34']['answer'] && response['34']['prettyFormat']}</p>
                </div>
            </div>

            <div className='phone-reference3 response-box'>
                <h1 className='response-title'>Phone Number</h1>
                <div className='response-body'>
                    <p className='response-text'>{response['37']['answer'] && response['37']['prettyFormat']}</p>
                </div>
            </div>

            <div className='email-reference3 response-box'>
                <h1 className='response-title'>Email</h1>
                <div className='response-body'>
                    <p className='response-text'>{response['36']['answer']}</p>
                </div>
            </div>




            <div className='address-background-check response-box'>
                <h1 className='response-title address-title'>Address</h1>

                <div className='address1'>
                    <div className='response-body'>
                        <p className='response-text'>{response['35']['answer'] && response['35']['answer']['addr_line1']}</p>
                        <p className='response-subtext'>Street Address 1</p>
                    </div>
                </div>

                <div className='address2'>
                    <div className='response-body'>
                        <p className='response-text'>{response['35']['answer'] && response['35']['answer']['addr_line2']}</p>
                        <p className='response-subtext'>Street Address 2</p>
                    </div>
                </div>

                <div className='city'>
                    <div className='response-body'>
                        <p className='response-text'>{response['35']['answer'] && response['35']['answer']['city']}</p>
                        <p className='response-subtext'>City</p>
                    </div>
                </div>

                <div className='state'>
                    <div className='response-body'>
                        <p className='response-text'>{response['35']['answer'] && response['35']['answer']['state']}</p>
                        <p className='response-subtext'>State</p>
                    </div>
                </div>

                <div className='zip-code'>
                    <div className='response-body'>
                        <p className='response-text'>{response['35']['answer'] && response['35']['answer']['postal']}</p>
                        <p className='response-subtext'>Zip Code</p>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default BackgroundCheck;