import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// pages
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CostumerPage from './pages/CostumerPage';
import AdminPage from './pages/AdminPage';
import CostumerConfigurationsPage from './pages/CostumerConfigurationsPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import StoreMainPage from './pages/StoreMainPage';
import EmailConfirmationPage from './pages/EmailConfirmationPage';


function App() {
    return (
        <BrowserRouter>
            <>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/entrar" component={SignInPage} />
                    <Route exact path="/criar-conta" component={SignUpPage} />
                    <Route exact path="/area-do-cliente" component={CostumerPage} />
                    <Route exact path="/area-do-admin" component={AdminPage} />
                    <Route exact path="/configuracoes" component={CostumerConfigurationsPage} />
                    <Route exact path="/categorias" component={CategoriesPage} />
                    <Route exact path="/produtos" component={ProductsPage} />
                    <Route exact path="/emailconfirmation/:code" component={EmailConfirmationPage} />
                    <Route exact path="/:storeId" component={StoreMainPage} />
                    <Route component={LandingPage} />
                </Switch>
            </>
        </BrowserRouter>
    );
}

export default App;
