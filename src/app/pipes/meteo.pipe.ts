import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'meteo',
	pure: true
})
export class MeteoPipe implements PipeTransform {
	private dictionary: {[key: string]: string} = {
		'SUNNY' : 'DESPEJADO',
		'PARTLY_CLOUDY' : 'NUBES Y CLAROS',
		'HIGH_CLOUDS' : 'NUBES ALTAS', 
		'OVERCAST' : 'NUBLADO',
		'CLOUDY' : 'NUBES', 
		'FOG' : 'NIEBLA', 
		'SHOWERS' : 'CHUVASCOS', 
		'OVERCAST_AND_SHOWERS' : 'CHUVASCOS', 
		'INTERMITENT_SNOW' : '', 
		'DRIZZLE' : 'LLOVIZNA', 
		'RAIN' : 'LLUVIA', 
		'SNOW' : 'NIEVE', 
		'STORMS' : 'TORMENTAS', 
		'MIST' : 'NIEBLA', 
		'FOG_BANK' : 'BANCOS DE NIEBLA', 
		'MID_CLOUDS' : 'NUBES MEDIAS', 
		'WEAK_RAIN' : 'LLUVIA DÉBIL', 
		'WEAK_SHOWERS' : 'CHUVASCOS DÉBILES', 
		'STORM_THEN_CLOUDY' : 'NUBES Y TORMENTA', 
		'MELTED_SNOW' : 'NIEVE DERRETIDA', 
		'RAIN_HAIL' : 'GRANIZO'
	}

	constructor() {}

	transform(value: any, args?: any): any {
		return this.translate(value);
	}

	translate(value: string): string {
		return this.dictionary[value];
	}
}