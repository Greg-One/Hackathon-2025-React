import React, {useState} from "react";
import Category from "./Category";
import Submit from "./Submit";
import Transform from "./Transform";
import Main from "./Main";
import SubmitResult from "./SubmitResult";
import LawPopup from "./LawPopup";
import {Redirect, Route} from "react-router";
import {Switch, useHistory} from "react-router";

function App() {
    const [email, setEmail] = useState('');
    const [isViewLawPopupOpen, setViewLawPopupOpen] = useState(false);
    const [isSubmitResultPopupOpen, setSubmitResultPopupOpen] = useState(false);

    const history = useHistory();

    function handleViewLawClick() {
        setViewLawPopupOpen(true);
    }

    function closeAllPopups() {
        setViewLawPopupOpen(false);
        setSubmitResultPopupOpen(false);
    }

    function handleSubmitClick({email: emailSend}) {
        setEmail(emailSend);
        localStorage.removeItem('data');
        setSubmitResultPopupOpen(true);
    }

    function handleSubmitOkClick() {
        closeAllPopups();
        history.push('./');
    }
    function handleStepSubmit() {
        history.push('./submit');
    }

    return (
        <div className="page">
            <Switch>
                <Route exact path="/">
                    <Main
                        history={history}
                        onLawClick={handleViewLawClick}
                    />
                </Route>
                <Route exact path="/category">
                    <Category
                        history={history}
                    />
                </Route>
                <Route exact path="/transform">
                    <Transform
                        history={history}
                        onLawClick={handleViewLawClick}
                        onStepNext={handleStepSubmit}
                    />
                </Route>
                <Route exact path="/submit">
                    <Submit
                        history={history}
                        onSubmit={handleSubmitClick}
                    />
                </Route>
                <Route path="/">
                    <Redirect to="/"/>
                </Route>
            </Switch>
            <LawPopup
                isOpen={isViewLawPopupOpen}
                onClose={closeAllPopups}
            />
            <SubmitResult
                history={history}
                isOpen={isSubmitResultPopupOpen}
                onClose={closeAllPopups}
                onOk={handleSubmitOkClick}
                email={email}
            />
        </div>
    );
}

export default App;
