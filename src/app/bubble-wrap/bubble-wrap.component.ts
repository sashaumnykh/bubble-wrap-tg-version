import { Component } from '@angular/core';
import { BubbleObj } from '../models/bubbleObj copy';

@Component({
  selector: 'app-bubble-wrap',
  standalone: false,
  templateUrl: './bubble-wrap.component.html',
  styleUrls: ['./bubble-wrap.component.scss'],
  providers: []
})

export class BubbleWrapComponent {

  listBubbles: BubbleObj[] = [];
  numberOfBubbles: number = 0;
  areAllPopped: boolean = false;

  // 60*60 px
  bubbleSize: number = 60;

  constructor(
  ) {
    var screenHeight = window.innerHeight * 0.9;
    var screenWidth = window.innerWidth;
    this.numberOfBubbles = Math.floor(screenHeight / this.bubbleSize) * Math.floor(screenWidth / this.bubbleSize);

    this.listBubbles = new Array(this.numberOfBubbles).fill(null).map(() => new BubbleObj());
  }

  async ngOnInit() {
    
  }

  pop(bubble: BubbleObj) {
    let audio = new Audio();
    audio.src =  "../assets/bubble-wrap-1.mp3";
    audio.load();
    audio.play();
    bubble.isPopped = true;
    this.areAllPopped = this.listBubbles.every(b => b.isPopped);

    /*
    if (this.areAllPopped) {
      this.listBubbles = new Array(this.numberOfBubbles).fill(null).map(() => new BubbleObj());
    }*/
  }
  
  playAgain() {
    this.listBubbles = new Array(this.numberOfBubbles).fill(null).map(() => new BubbleObj());
    this.areAllPopped = false;
  }
}