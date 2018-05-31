import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AnalyticsService } from '../services/analytics.service';
import { analytics } from '../../constants/constants';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  template: `<nav></nav>
  <router-outlet></router-outlet>
  `,
  providers: [AnalyticsService]
})

export class AppComponent implements OnInit {

	constructor(private analyticsService: AnalyticsService, private router: Router,
		private titleService: Title, private activatedRoute: ActivatedRoute) {
		this.appendTrackingCode();
	}

	private appendTrackingCode() {
		try {
		  const script = document.createElement('script');
		  script.innerHTML = `
	        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	        ga('create', '` + analytics.key + `', 'auto');
		  `;
		  document.head.appendChild(script);
		} catch (ex) {
		 console.error('Error appending analytics');
		 console.error(ex);
		}
	}

	ngOnInit() {
	    this.router.events
	      .filter((event) => event instanceof NavigationEnd)
	      .map(() => this.activatedRoute)
	      .map((route) => {
	        while (route.firstChild) route = route.firstChild;
	        return route;
	      })
	      .filter((route) => route.outlet === 'primary')
	      .mergeMap((route) => route.data)
	      .subscribe((event) => this.titleService.setTitle(event['title']));
	}

	//this.analyticsService.emitEvent("testCategory", "testAction", "testLabel", 10);
}