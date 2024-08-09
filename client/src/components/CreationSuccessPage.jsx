import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CreationSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const gameCode = location.state?.gameCode;

    const handlePlayNow = () => {
        navigate('/join-game');
    };

    return (
        <div className="success-page">
            <h3>Your game has successfully been created!</h3>
            <p>Your game code is: {gameCode}</p>
            <p>You can share this code with others to let them take your quiz.</p>
            <button onClick={handlePlayNow}>Play Now</button>
            {/* maybe add an option to return to the main menu or create another quiz */}
        </div>
    );
};

export default CreationSuccessPage;