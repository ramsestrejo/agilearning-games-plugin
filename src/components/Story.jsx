import React from "react";
import { useHookstate } from '@hookstate/core';
import './Story.css';

const Story = () => {
    return (
        <div className="story-screen">
            <h1>Story Game</h1>
            <div>
                <h2>Exit Game</h2>
                <div>
                    <p>Page 1/4{/* pageNumber changer thing here */} </p>
                </div>
                <p>lesson/course</p>
            </div>
            
            {/* Turn these p's into a component containing the text of the story*/}
            <p>All the information here</p>
            <p>More information? and here is a thing</p>

            <div>
            </div>
        </div>
    );
};

export default Story