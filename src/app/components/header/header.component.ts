import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';


@Component({
	selector   : 'app-header',
	templateUrl: './header.component.html',
	styleUrls  : ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public title: string;
	public url: string;

	constructor(
		private _route      : ActivatedRoute,
		private _router     : Router,
		) { 
		this.title = "O TEMPO (PWA)";
		this.url = GLOBAL.url;
	}

	ngOnInit() {}

}
