
export type NavigationDirection = 'forward' | 'backward';

export interface ScrollControllerOptions {
  totalSections: number;
  onSectionChange: (index: number, direction: NavigationDirection) => void;
  debounceMs?: number;
}

export class ScrollController {
  private currentIndex: number = 0;
  private totalSections: number;
  private isTransitioning: boolean = false;
  private debounceMs: number;
  private onSectionChange: (index: number, direction: NavigationDirection) => void;

  
  private touchStartY: number = 0;
  private touchStartX: number = 0;
  private touchThreshold: number = 50;

  
  private wheelAccumulator: number = 0;
  private wheelThreshold: number = 60;

  
  private boundHandleWheel: (e: WheelEvent) => void;
  private boundHandleKeydown: (e: KeyboardEvent) => void;
  private boundHandleTouchStart: (e: TouchEvent) => void;
  private boundHandleTouchEnd: (e: TouchEvent) => void;

  constructor(options: ScrollControllerOptions) {
    this.totalSections = options.totalSections;
    this.onSectionChange = options.onSectionChange;
    this.debounceMs = options.debounceMs ?? 900;

    this.boundHandleWheel = this.handleWheel.bind(this);
    this.boundHandleKeydown = this.handleKeydown.bind(this);
    this.boundHandleTouchStart = this.handleTouchStart.bind(this);
    this.boundHandleTouchEnd = this.handleTouchEnd.bind(this);

    this.attachListeners();
  }

  private attachListeners(): void {
    window.addEventListener('wheel', this.boundHandleWheel, { passive: false });
    window.addEventListener('keydown', this.boundHandleKeydown);
    window.addEventListener('touchstart', this.boundHandleTouchStart, { passive: true });
    window.addEventListener('touchend', this.boundHandleTouchEnd, { passive: true });
  }

  private handleWheel(e: WheelEvent): void {
    e.preventDefault();
    if (this.isTransitioning) return;

    this.wheelAccumulator += e.deltaY;

    if (Math.abs(this.wheelAccumulator) >= this.wheelThreshold) {
      const direction = this.wheelAccumulator > 0 ? 'forward' : 'backward';
      this.wheelAccumulator = 0;
      this.navigate(direction);
    }
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (this.isTransitioning) return;

    
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        this.navigate('forward');
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        this.navigate('backward');
        break;
    }
  }

  private handleTouchStart(e: TouchEvent): void {
    this.touchStartY = e.touches[0].clientY;
    this.touchStartX = e.touches[0].clientX;
  }

  private handleTouchEnd(e: TouchEvent): void {
    if (this.isTransitioning) return;
    const deltaY = this.touchStartY - e.changedTouches[0].clientY;
    const deltaX = this.touchStartX - e.changedTouches[0].clientX;

    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > this.touchThreshold) {
      this.navigate(deltaY > 0 ? 'forward' : 'backward');
    }
  }

  public navigate(direction: NavigationDirection): void {
    if (this.isTransitioning) return;

    const newIndex = direction === 'forward'
      ? Math.min(this.currentIndex + 1, this.totalSections - 1)
      : Math.max(this.currentIndex - 1, 0);

    if (newIndex === this.currentIndex) return;

    this.currentIndex = newIndex;
    this.isTransitioning = true;
    this.onSectionChange(this.currentIndex, direction);

    setTimeout(() => {
      this.isTransitioning = false;
    }, this.debounceMs);
  }

  public goToSection(index: number): void {
    if (index === this.currentIndex || this.isTransitioning) return;
    const direction: NavigationDirection = index > this.currentIndex ? 'forward' : 'backward';
    this.currentIndex = index;
    this.isTransitioning = true;
    this.onSectionChange(this.currentIndex, direction);

    setTimeout(() => {
      this.isTransitioning = false;
    }, this.debounceMs);
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public destroy(): void {
    window.removeEventListener('wheel', this.boundHandleWheel);
    window.removeEventListener('keydown', this.boundHandleKeydown);
    window.removeEventListener('touchstart', this.boundHandleTouchStart);
    window.removeEventListener('touchend', this.boundHandleTouchEnd);
  }
}
