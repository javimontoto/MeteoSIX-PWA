import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable({
	providedIn: 'root'
})
export class MeteoService {
	public url: string;
	//public identity;
	//private token: string;
	private meteoSIX_key: string;

	constructor(public _http: HttpClient) { 
		this.url = GLOBAL.url_meteo;
		//this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjNhMGQ3MTc3ZWJiMDI1OTA3MzEyNGIiLCJuYW1lIjoiSmF2aSIsInN1cm5hbWUiOiJNb250b3RvIiwiYWRkcmVzcyI6bnVsbCwicGhvbmUiOm51bGwsIm5pY2siOiJKYXZpODIiLCJlbWFpbCI6ImphdmlAamF2aW1vbnRvdG8uY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImltYWdlIjpudWxsLCJpYXQiOjE1MzA1MzE0ODAsImV4cCI6MTUzMzEyMzQ4MH0.Xi3HfWu5F_VLXjNJAX2cM4ZZO46RS467l_N5299fSX8";
		this.meteoSIX_key = "si4yEMLTwx1Q27F970459TM1qT6K68z75NY3QI3n0hZ15ok066P6nb92h87LIrTx";
	}

	/** Método para cargar los lugares según la cadena introducida **/
	getPlace(place= null): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'findPlaces?location='+place+'&API_KEY='+this.meteoSIX_key, {headers:headers});
	}

	/** Método para cargar el tiempo de un lugar **/
	getWeather(place_id): Observable<any>{
		let headers = new HttpHeaders();

		return this._http.get(
			this.url+'getNumericForecastInfo?locationIds='+place_id
			//+'&lang=es'
			//+'&format=text/html'
			+'&variables=sky_state,temperature'
			+'&API_KEY='+this.meteoSIX_key, 
			{headers:headers}
			);
	}
}