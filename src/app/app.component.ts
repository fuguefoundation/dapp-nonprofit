import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { AnalyticsService } from '../services/analytics.service';
import { analytics } from '../../constants/constants';

@Component({
  selector: 'app-root',
  template: `<nav></nav>
  <router-outlet></router-outlet>
  `,
  providers: [AnalyticsService]
})

export class AppComponent  {

	constructor(private analyticsService: AnalyticsService) {
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

	//this.analyticsService.emitEvent("testCategory", "testAction", "testLabel", 10);
}