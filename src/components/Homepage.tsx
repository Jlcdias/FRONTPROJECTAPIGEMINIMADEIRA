import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

function Homepage() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            navigate("/Error");
        }
    }, [navigate]);

    const handleSignOut = () => {
        auth.signOut();
        navigate("/Error");
    }


  return (
    <div>Homepage
        <a onClick={()=> handleSignOut}>Sign Out</a>


        {/* {arrayQuestionsAnswers.map(item=>(
            <div key={item.id}>
                <p><Message className="question"> (item.question)</Message></p>
                <p><Message className="answer"> (item.question)</Message></p>
        ))} */}
    </div>
  )
}

export default Homepage