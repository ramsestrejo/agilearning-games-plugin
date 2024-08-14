import React from "react";
import {
    useParams,
    useSearchParams,
    useNavigate,
    useLocation,
} from "react-router-dom";
import "./CreationSuccessPage.css";

const CreationSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    // for going to the join game page where users can enter their code
    const handlePlayNow = () => {
        navigate("/join-game");
    };

    // for going back to the create game screen
    const handleCreateAnother = () => {
        navigate("/create-game");
    };

    return (
        <div className="success-page">
        <h3>Your {searchParams.get("type")} has successfully been created!</h3>
        <p>Your game code is: {id}</p>
        <p>
            You can share this code with others to let them take your{" "}
            {searchParams.get("type")}.
        </p>
        <button className="play-now-button" onClick={handlePlayNow}>Play Now</button>
        <button className="create-another-button" onClick={handleCreateAnother}>Create Another Game</button>
        </div>
    );
};

export default CreationSuccessPage;