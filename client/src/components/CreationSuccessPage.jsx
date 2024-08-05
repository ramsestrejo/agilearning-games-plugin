import React from 'react';
import { useParams } from 'react-router-dom';

const CreationSuccessPage = () => {
//     const { gameCode } = useParams();

    return (
        <div className="success-page">
            <h1>Quiz Successfully Created !</h1>
            {/* <p>Your game code is: {gameCode}</p> */}
            <p>You can share this code with others to let them take your quiz.</p>
        </div>
    );
};

export default CreationSuccessPage;