import { Component, ElementRef, ViewChild } from '@angular/core';
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

  bubbleSize: number = 60;

  columns: number = 0;

  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  constructor(
  ) {
    this.listBubbles = new Array(this.numberOfBubbles).fill(null).map(() => new BubbleObj());
  }

  ngAfterViewInit() {
    const gap = 4;
    const totalBubbleSize = this.bubbleSize + gap;

    const containerEl = this.containerRef.nativeElement;
    const { width, height } = containerEl.getBoundingClientRect();

    debugger;
    const safeOffset = 8;
    const availableHeight = height - safeOffset;
    const cols = Math.floor(width / totalBubbleSize);
    const rows = Math.floor(availableHeight / totalBubbleSize);

    this.columns = cols;
    this.numberOfBubbles = cols * rows;

    this.listBubbles = new Array(this.numberOfBubbles).fill(null).map(() => new BubbleObj());
    let killerIndex = Math.floor(Math.random() * this.numberOfBubbles);
    this.listBubbles[killerIndex].isKiller = true;
  }

  pop(bubble: BubbleObj) {
    if (bubble.isKiller) {
      this.listBubbles.forEach(b => b.isPopped = true);

      setTimeout(() => {
        this.areAllPopped = true;
      }, 500);
      return;
    }
    
    let audio = new Audio();
    audio.src =  "assets/bubble-wrap-1.mp3";
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