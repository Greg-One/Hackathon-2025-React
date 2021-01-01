import React, { useState } from 'react';
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router';
import Category from './Category';
import Submit from './Submit';
import Transform from './Transform';
import Main from './Main';
import SubmitResult from './SubmitResult';
import LawPopup from './LawPopup';
import Storage from './units/storage';

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

  function handleSubmitClick({ email: emailSend }) {
    setEmail(emailSend);
    Storage.removeItem();
    setSubmitResultPopupOpen(true);
  }

  function handleSubmitOkClick() {
    closeAllPopups();
    history.push('./');
  }

  const handleStepSubmit = () => history.push('./submit');

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
          <Redirect to="/" />
        </Route>
      </Switch>
      <LawPopup
        isOpen={isViewLawPopupOpen}
        onClose={closeAllPopups}
      />
      <SubmitResult
        history={history}
        isOpen={isSubmitResultPopupOpen}
        onClose={handleSubmitOkClick}
        email={email}
      />

    </div>
  );
}

export default App;
