import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import "react-awesome-button/dist/styles.css";
import {AppContext, Store} from "./store";
import $ from 'jquery';

(window as any).$ = $;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AppContext.Provider value={new Store() as any}>
			<App/>
		</AppContext.Provider>
	</React.StrictMode>
)
