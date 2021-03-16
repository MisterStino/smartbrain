import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner toCenter"> 
                    <img style={{paddingTop: '10px'}} alt='brain' src={ brain }/> 
                </div>
            </Tilt> 
        </div>
    )
}
 

export default Logo;