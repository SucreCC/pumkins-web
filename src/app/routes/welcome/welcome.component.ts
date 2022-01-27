import {Component, OnInit} from '@angular/core';
import Reveal from 'reveal.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router,) {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    Reveal.initialize({
      parallaxBackgroundImage: '',
      parallaxBackgroundSize: '',
      parallaxBackgroundHorizontal: 200,
      parallaxBackgroundVertical: 50,

      center: true,
      hash: true,

      // Display presentation control arrows
      controls: true,

      // Help the user learn the controls by providing hints, for example by
      // bouncing the down arrow when they first encounter a vertical slide

      // controlsTutorial: true,

      // Determines where controls appear, "edges" or "bottom-right"

      // controlsLayout: 'bottom-right',

      // Visibility rule for backwards navigation arrows; "faded", "hidden"
      // or "visible"
      // controlsBackArrows: 'faded',

      // Display a presentation progress bar
      progress: true,

      // loop:true,

      // transitionSpeed:"slow",
    });
  }

  jump() {
    this.router.navigate(['/index'])
  }
}

