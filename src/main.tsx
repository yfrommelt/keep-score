import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import {BrowserRouter, Route, Routes} from "react-router";
import theme from './styles/theme';
import GameHistory from './GameHistory';
import GameNew from "./GameNew";
import GameDashboard from "./GameDashboard";
import AppErrorBoundary from "./components/AppErrorBoundary";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <AppErrorBoundary>
                    <CssBaseline/>
                    <Routes>
                        <Route path="/" element={<GameHistory/>}/>
                        <Route path="/game/new" element={<GameNew/>}/>
                        <Route path="/game/:id" element={<GameDashboard/>}/>
                    </Routes>
                </AppErrorBoundary>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
