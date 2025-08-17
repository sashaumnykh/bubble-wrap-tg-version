import { Component, ElementRef, ViewChild } from '@angular/core';
import { BubbleObj } from '../models/bubbleObj';

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
  killerBubblePressed: boolean = false;

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

    this.numberOfBubbles = 60;

    this.listBubbles = new Array(this.numberOfBubbles).fill(null).map(() => new BubbleObj());
    let killerIndex = Math.floor(Math.random() * this.numberOfBubbles);
    this.listBubbles[killerIndex].isKiller = true;

    this.arrangeBubbles();
  }

  arrangeBubbles() {
    const container = this.containerRef.nativeElement;
    const gap = 4;
    const totalBubbleSize = this.bubbleSize + gap;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const safeOffset = 8;
    const availableHeight = height - safeOffset;

    this.columns = Math.floor(width / totalBubbleSize);
    const rows = Math.ceil(this.listBubbles.length / this.columns);

    // Теперь можно распределить пупырки по сетке
    let index = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        if (index >= this.listBubbles.length) break;
        const bubble = this.listBubbles[index];
        bubble.x = c * totalBubbleSize;
        bubble.y = r * totalBubbleSize;
        index++;
      }
    }
  }

  pop(bubble: BubbleObj) {
    if (bubble.isKiller) {
      this.killerBubblePressed = true;
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
    this.areAllPopped = this.listBubbles.filter(b => !b.isKiller).every(b => b.isPopped);

    /*
    if (this.areAllPopped) {
      this.listBubbles = new Array(this.numberOfBubbles).fill(null).map(() => new BubbleObj());
    }*/
  }
  
  playAgain() {
    this.listBubbles = new Array(this.numberOfBubbles).fill(null).map(() => new BubbleObj());
    let killerIndex = Math.floor(Math.random() * this.numberOfBubbles);
    this.listBubbles[killerIndex].isKiller = true;
    this.killerBubblePressed = false;
    this.areAllPopped = false;
  }
}