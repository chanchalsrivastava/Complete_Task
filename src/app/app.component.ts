import { Component } from '@angular/core';

interface Trip {
  from: string;
  to: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  trips = [
    { start: 'BLR', end: 'MAA' },
    { start: 'MAA', end: 'HYD' },
    { start: 'BLR', end: 'HYD' },
    { start: 'HYB', end: 'DEL' },
    { start: 'HYB', end: 'DEL' },
    { start: 'DEL', end: 'BLR' },
  ];

  spacing = 150;
  height = 150;
  width = this.trips.length * this.spacing;

  getX(index: number): number {
    return index * this.spacing + 50;
  }

  getY(index: number): number {
    if (index >= this.trips.length) return 100;

    const curr = this.trips[index];
    const prev = this.trips[index - 1];

    // Level 2 if repeated trip
    if (prev && curr.start === prev.start && curr.end === prev.end) {
      return 40;
    }

    return 100;
  }

  getPath(index: number): string {
    const x1 = this.getX(index);
    const x2 = this.getX(index + 1);
    const y1 = this.getY(index);
    const y2 = this.getY(index + 1);

    if (y1 !== y2) {
      // Curved path for level difference
      const midX = (x1 + x2) / 2;
      return `M ${x1} ${y1} Q ${midX} ${y1 - 50}, ${x2} ${y2}`;
    }

    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  isContinued(index: number): boolean {
    if (index >= this.trips.length - 1) return true;
    return this.trips[index].end === this.trips[index + 1].start;
  }

  getColor(index: number): string {
    const colors = ['#5555aa', '#007bff', '#f7b733', '#888', '#999', '#6644cc'];
    return colors[index % colors.length];
  }
}