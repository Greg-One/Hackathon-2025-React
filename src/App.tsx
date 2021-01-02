import React, { useState } from 'react';
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router';
import { History } from 'history';
import Category from './pages/Category';
import Submit from './pages/Submit';
import Transform from './pages/Transform';
import Main from './pages/Main';
import SubmitResult from './components/SubmitResult';
import LawPopup from './components/LawPopup';
import Storage from './units/storage';
import { IOrder } from './interfaces';

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isViewLawPopupOpen, setViewLawPopupOpen] = useState<boolean>(false);
  const [isSubmitResultPopupOpen, setSubmitResultPopupOpen] = useState<boolean>(false);

  const history: History = useHistory();

  function handleViewLawClick() {
    setViewLawPopupOpen(true);
  }

  function closeAllPopups() {
    setViewLawPopupOpen(false);
    setSubmitResultPopupOpen(false);
  }

  function handleSubmitClick(order:IOrder): void {
    setEmail(order.email);
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
        <Route
          exact
          path="/transform"
        >
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
        isOpen={isSubmitResultPopupOpen}
        onClose={handleSubmitOkClick}
        email={email}
      />

    </div>
  );
};

export default App;
