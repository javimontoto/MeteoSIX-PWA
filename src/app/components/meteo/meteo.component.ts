import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../../services/meteo.service';


@Component({
	selector   : 'app-meteo',
	templateUrl: './meteo.component.html',
	styleUrls  : ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {
	public title         : string;
	public loading       : boolean;
	public status        : string;	// Para advertir si hay error
	public meteo_search  : MeteoSearch;
	public selected_place: MeteoPlace;
	public weather       : Array<any>;
	public places        : Array<MeteoPlace>;
	public my_places     : Map<string, MeteoPlace>;

	constructor(
		private _meteoService: MeteoService
		) { 
		this.title        = "El tiempo";
		this.loading      = false;
		this.meteo_search = new MeteoSearch("");
		this.places       = [];
		this.weather      = [];
		if (localStorage.getItem('myPlaces')){
			this.my_places = new Map(JSON.parse(localStorage.getItem('myPlaces')));
		}else{
			this.my_places = new Map();
		}
	}

	ngOnInit() {}

	/** Método para cargar los lugares según la cadena introducida **/
	getPlace(){
		this.places  =[];
		this.weather = [];	
		this.loading = true;

		// Quitamos lo que venga despues del primer espacio en blanco
		if (this.meteo_search.search_place.indexOf(' ')>0)
			this.meteo_search.search_place = this.meteo_search.search_place.slice(0,this.meteo_search.search_place.indexOf(' '));
		
		this._meteoService.getPlace(this.meteo_search.search_place).subscribe(
			response => {
				this.loading = false;
				if(response.features){
					this.status = 'success';
					// console.log(response.features[0].geometry.coodinates[1]);
					response.features.forEach(place => {
						var one_place = new MeteoPlace(
							place.properties.id,
							place.properties.name,
							place.properties.municipality,
							place.properties.province,
							place.properties.type,
							place.geometry.coordinates[1],
							place.geometry.coordinates[0]);
						this.places.push(one_place);
					});

					// Ordenamos por el nombre del lugar
					this.places.sort(function(a,b) {
						return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
					}); 

					//this.meteo_search.search_place = null;
					
				}else{
					this.status = 'error';
				}

			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				if(errorMessage != null){
					this.loading = false;
					this.status = 'error';
				}
			}
			);
	}


	/** Método para cargar el tiempo de un lugar **/
	getWeather(place: MeteoPlace){
		this.places=[];
		this.loading = true;
		this.weather = [];		
		this.selected_place = place;

		this._meteoService.getWeather(place.id).subscribe(
			response => {
				this.loading = false;
				if(response!=null){
					this.status = 'success';
					
					response.features[0].properties.days.forEach(day =>{
						var one_day = new Day(new Date(),[]);
						one_day.date = new Date(day.timePeriod.begin.timeInstant.slice(0,-12));
						day.variables[0].values.forEach((sky,key) => {
							var hour = new Hour("","","","");
							hour.time = sky.timeInstant; //.slice(11,-6);
							hour.skyText = sky.value;
							hour.skyIcon = sky.iconURL;
							hour.temp = day.variables[1].values[key].value;
							one_day.hours.push(hour);
						});
						this.weather.push(one_day);
					});
					this.weather.splice(-1,1); 	// Borramos el último día (para que sean 4)
				}else{
					this.status = 'error';
				}

			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				if(errorMessage != null){
					this.loading = false;
					this.status = 'error';
				}
			}
			);
	}

	/** Método para salvar un lugar en favoritos **/
	savePlace(){
		// console.log("Save Place");
		if (localStorage.getItem('myPlaces'))
			this.my_places = new Map(JSON.parse(localStorage.getItem('myPlaces')));
		this.my_places.set(this.selected_place.id, this.selected_place);
		//this.my_places.push(this.selected_place);
		localStorage.setItem('myPlaces',JSON.stringify(Array.from(this.my_places.entries())));
		// console.log(this.my_places);
	}

	/** Método para borrar un lugar de favoritos **/
	deletePlace(){
		// console.log("Delete Place");		
		this.my_places = new Map(JSON.parse(localStorage.getItem('myPlaces')));
		this.my_places.delete(this.selected_place.id);
		localStorage.setItem('myPlaces',JSON.stringify(Array.from(this.my_places.entries())));
		// console.log(this.my_places);
	}

	/** Método para recuperar los lugares guardados en favoritos **/
	getMyPlaces(){
		this.weather = [];
		this.places=[];
		this.places = Array.from(this.my_places.values());
	}
}



/***************************************/
/*** INTERFACES y CLASSES auxiliares ***/
/***************************************/

interface marker {
	lat: number;
	lng: number;
	label: string;
	description: string;
	draggable: boolean;
}

class MeteoSearch{
	constructor(
		public search_place:string
		){}
}

class MeteoPlace{
	constructor(
		public id:string,
		public name:string,
		public municipality:string,
		public province:string,
		public type:string,
		public latitude:string,
		public longitude:string
		){}
}

class Hour{
	constructor(
		public time: string,
		public temp: string,
		public skyText: string,
		public skyIcon: string
		){}
}

class Day{
	constructor(
		public date: Date,
		public hours: Array<Hour>
		){}
}
