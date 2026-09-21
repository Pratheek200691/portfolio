
export type AnimationDirection = 'forward' | 'backward';

export interface AnimationOptions {
  duration?: number;
  easing?: string;
}

export class AnimationController {
  private readonly defaultDuration = 700;
  private readonly defaultEasing = 'cubic-bezier(0.77, 0, 0.175, 1)';
  private activeSection: HTMLElement | null = null;

  constructor() {}

    public transition(
    exitSection: HTMLElement | null,
    enterSection: HTMLElement,
    direction: AnimationDirection,
    onComplete?: () => void
  ): void {
    const duration = this.defaultDuration;

    
    enterSection.style.display = 'flex';
    enterSection.style.transition = 'none';
    enterSection.style.opacity = '0';
    enterSection.style.transform = direction === 'forward'
      ? 'translateY(60px) scale(0.97)'
      : 'translateY(-60px) scale(0.97)';
    enterSection.style.filter = 'blur(4px)';
    enterSection.classList.add('section--entering');

    
    if (exitSection) {
      exitSection.style.transition = `all ${duration}ms ${this.defaultEasing}`;
      exitSection.style.opacity = '0';
      exitSection.style.transform = direction === 'forward'
        ? 'translateY(-60px) scale(0.97)'
        : 'translateY(60px) scale(0.97)';
      exitSection.style.filter = 'blur(4px)';
      exitSection.classList.add('section--exiting');
    }

    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        enterSection.style.transition = `all ${duration}ms ${this.defaultEasing}`;
        enterSection.style.opacity = '1';
        enterSection.style.transform = 'translateY(0) scale(1)';
        enterSection.style.filter = 'blur(0px)';

        setTimeout(() => {
          if (exitSection) {
            exitSection.style.display = 'none';
            exitSection.style.transition = 'none';
            exitSection.style.opacity = '';
            exitSection.style.transform = '';
            exitSection.style.filter = '';
            exitSection.classList.remove('section--entering', 'section--exiting');
          }
          enterSection.classList.remove('section--entering');
          this.activeSection = enterSection;
          if (onComplete) onComplete();
        }, duration + 50);
      });
    });
  }

    public animateWords(container: HTMLElement, words: string[]): HTMLElement[] {
    container.innerHTML = '';
    const spans: HTMLElement[] = [];

    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'speech-word';
      span.textContent = word + (i < words.length - 1 ? ' ' : '');
      span.style.opacity = '0';
      span.style.transition = 'none';
      container.appendChild(span);
      spans.push(span);
    });

    return spans;
  }

    public revealWord(spans: HTMLElement[], index: number): void {
    if (index < 0 || index >= spans.length) return;

    
    spans.forEach(s => s.classList.remove('word--active'));

    
    for (let i = 0; i <= index; i++) {
      const span = spans[i];
      if (span.style.opacity !== '1') {
        span.style.transition = 'opacity 0.15s ease, color 0.3s ease';
        span.style.opacity = '1';
      }
    }

    
    spans[index]?.classList.add('word--active');

    
    setTimeout(() => {
      spans[index]?.classList.remove('word--active');
    }, 300);
  }

    public revealAllWords(spans: HTMLElement[]): void {
    spans.forEach(span => {
      span.style.transition = 'opacity 0.3s ease';
      span.style.opacity = '1';
    });
  }

    public staggerIn(elements: HTMLElement[], delayMs: number = 80): void {
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'none';

      setTimeout(() => {
        el.style.transition = `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * delayMs + 100);
    });
  }

    public bootSequence(lines: string[], container: HTMLElement, msPerLine: number = 350): Promise<void> {
    return new Promise(resolve => {
      container.innerHTML = '';
      let lineIndex = 0;

      const showNextLine = () => {
        if (lineIndex >= lines.length) {
          resolve();
          return;
        }
        const line = document.createElement('div');
        line.className = 'boot-line';
        line.textContent = lines[lineIndex];
        line.style.opacity = '0';
        container.appendChild(line);

        requestAnimationFrame(() => {
          line.style.transition = 'opacity 0.3s ease';
          line.style.opacity = '1';
        });

        lineIndex++;
        setTimeout(showNextLine, msPerLine);
      };

      showNextLine();
    });
  }
}
