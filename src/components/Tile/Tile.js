import React, {useEffect}from 'react'
import data from '../../Utils/orders'
import './Tile.css'

function Tile(props) {
    if(props.lables.length) {
        return (
            <div className='Tiles'>
                {
                    props.lables.map((ele, index) => {
                        return (
                        <div className="TileStructure" key={index}>
                            <div>
                                <span>{ele.label1} : </span>
                                <span>{ele.value1}</span>
                            </div>
                            <div>
                                <span>{ele.label2} : </span>
                                <span>{ele.value2}</span>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return null;
    }

}

export default Tile
