import React, { useState } from "react";
import { hookstate } from "@hookstate/core";

{/* fake database? */}
const answers = {
    1: "Answer text from database",
    2: "answer 2",
    3: "answer 3"
}

const StoryButton = ({ answerId }) => {

    const answerText = answers[answerId];


    return (
        <div>
            <button>{answerText}</button>
        </div>
    )
}

export default StoryButton