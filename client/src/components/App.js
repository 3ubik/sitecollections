import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import UploadPage from "./views/UploadPage/UploadPage";
import MyCollectionsPage from './views/MyCollectionsPage/MyCollectionsPage';
import DetailCollection from './views/DetailCollectionPage/DetailCollectionPage';
import UpdateCollectionPage from './views/UpdateCollectionPage/UpdateCollectionPage';
import ItemAdd from './views/AddItemsPage/ItemAdd';
import TypeofNewItem from './utils/TypeofNewItem';
import ItemsOfCollection from './views/ItemsOfCollection/ItemsOfCollection';
import ItemComments from './utils/CommentsOfItem/ItemComments';


function App() {
  return (
    <Suspense  fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/collections/upload/:userId" component={Auth(UploadPage, true)} />
          <Route exact path="/collections/get/:userId" component={Auth(MyCollectionsPage, null)} />                           
          <Route exact path="/collections/:collectionId" component={Auth(DetailCollection, null)} />
          <Route exact path="/collections/update/:collectionId" component={Auth(UpdateCollectionPage, null)} />
          <Route exact path="/collections/itemadd/:collectionId" component={Auth(ItemAdd, null)} />
          <Route exact path="/collections/upDatefield/:collectionId" component={Auth(TypeofNewItem, null)} />
          <Route exact path="/collections/Additem/:collectionId" component={Auth(ItemAdd, null)} />
          <Route exact path="/collections/itemsOfCollection/:collectionId" component={Auth(ItemsOfCollection, null)} />         
          <Route exact path="/collections/CommentsOfItem/:itemId" component={Auth(ItemComments, null)} /> 
          
          
         
        </Switch>
      </div>
        </Suspense>
  );
}

export default App;
