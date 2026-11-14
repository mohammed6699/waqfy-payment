import { Component, computed, input, model, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-shared-stars',
  styleUrl: './shared-stars.css',
  templateUrl: './shared-stars.html',
})
export class SharedStars {
  value = model(0);
  max = input(5);
  readonly = input(false);
  hovered = signal(0);
  stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));

  // the hover preview wins over the saved value
  display = computed(() => this.hovered() || this.value());

  select(star: number) {
    if (!this.readonly()) this.value.set(star);
  }

  hover(star: number) {
    if (!this.readonly()) this.hovered.set(star);
  }
}
