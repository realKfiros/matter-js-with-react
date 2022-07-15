import {action, makeObservable, observable} from "mobx";
import React from "react";

export const AppContext = React.createContext(null);

export interface StoreProps {
	playing: boolean;
}
export class Store implements StoreProps
{
	@observable playing: boolean = false;

	constructor()
	{
		makeObservable(this);
	}

	@action.bound
	setPlaying(playing: boolean)
	{
		this.playing = playing;
	}
}