import React from 'react';
import Table from '../Table/Table.js'

const FaceRecognition = ({imageURL,age, masculine, feminine, multiculturalAppearance, showTable}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2 center'>
                <img alt='' src={imageURL} width='400px' height='auto'/>
                <div>
                    <Table 
                    age={age}
                    masculine={masculine}  
                    feminine={feminine} 
                    multiculturalAppearance={multiculturalAppearance}
                    showTable={showTable}
                    />
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;