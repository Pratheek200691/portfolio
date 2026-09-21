
export type RobotState = 'idle' | 'speaking' | 'thinking' | 'greeting';

export class RobotAssistant {
  private state: RobotState = 'idle';
  private blinkInterval: number | null = null;
  private idleAnimationInterval: number | null = null;
  private mouthAnimationFrame: number | null = null;

  
  private robotContainer: HTMLElement;
  private statusDot: HTMLElement;
  private statusText: HTMLElement;
  private mouthElement: HTMLElement;
  private eyeLeftElement: HTMLElement;
  private eyeRightElement: HTMLElement;
  private waveformBars: NodeListOf<Element>;

  constructor(containerSelector: string) {
    const container = document.querySelector(containerSelector);
    if (!container) throw new Error(`RobotAssistant: container "${containerSelector}" not found`);
    this.robotContainer = container as HTMLElement;

    this.statusDot = this.robotContainer.querySelector('.robot-status-dot') as HTMLElement;
    this.statusText = this.robotContainer.querySelector('.robot-status-text') as HTMLElement;
    this.mouthElement = this.robotContainer.querySelector('.robot-mouth') as HTMLElement;
    this.eyeLeftElement = this.robotContainer.querySelector('.robot-eye-left') as HTMLElement;
    this.eyeRightElement = this.robotContainer.querySelector('.robot-eye-right') as HTMLElement;
    this.waveformBars = this.robotContainer.querySelectorAll('.waveform-bar');

    this.startBlinking();
    this.startIdleAnimation();
  }

  private startBlinking(): void {
    const blink = () => {
      const leftGlow = this.eyeLeftElement?.querySelector('.eye-glow') as HTMLElement;
      const rightGlow = this.eyeRightElement?.querySelector('.eye-glow') as HTMLElement;

      [leftGlow, rightGlow].forEach(el => {
        if (el) el.style.transform = 'scaleY(0.05)';
      });

      setTimeout(() => {
        [leftGlow, rightGlow].forEach(el => {
          if (el) el.style.transform = 'scaleY(1)';
        });
      }, 120);
    };

    const scheduleNextBlink = () => {
      const delay = 2500 + Math.random() * 3500;
      this.blinkInterval = window.setTimeout(() => {
        if (this.state !== 'speaking') blink();
        scheduleNextBlink();
      }, delay);
    };

    scheduleNextBlink();
  }

  private startIdleAnimation(): void {
    
    this.idleAnimationInterval = window.setInterval(() => {
      if (this.state === 'idle' && this.eyeLeftElement && this.eyeRightElement) {
        const glowIntensity = 0.7 + Math.random() * 0.3;
        const leftGlow = this.eyeLeftElement.querySelector('.eye-glow') as HTMLElement;
        const rightGlow = this.eyeRightElement.querySelector('.eye-glow') as HTMLElement;
        if (leftGlow) leftGlow.style.opacity = String(glowIntensity);
        if (rightGlow) rightGlow.style.opacity = String(glowIntensity);
      }
    }, 1500);
  }

  public setState(newState: RobotState): void {
    const prevState = this.state;
    this.state = newState;
    this.robotContainer.setAttribute('data-state', newState);

    if (prevState !== newState) {
      this.updateUI();
    }
  }

  private updateUI(): void {
    switch (this.state) {
      case 'speaking':
        this.setStatus('SPEAKING', true);
        this.activateWaveform(true);
        this.animateMouth(true);
        this.setEyeIntensity(1.0);
        break;
      case 'idle':
        this.setStatus('READY', false);
        this.activateWaveform(false);
        this.animateMouth(false);
        this.setEyeIntensity(0.8);
        break;
      case 'thinking':
        this.setStatus('PROCESSING', true);
        this.activateWaveform(false);
        break;
      case 'greeting':
        this.setStatus('ONLINE', true);
        break;
    }
  }

  private setStatus(text: string, active: boolean): void {
    if (this.statusText) this.statusText.textContent = `AI ASSISTANT — ${text}`;
    if (this.statusDot) {
      this.statusDot.classList.toggle('active', active);
    }
  }

  private activateWaveform(active: boolean): void {
    this.waveformBars.forEach(bar => {
      bar.classList.toggle('active', active);
    });
  }

  private animateMouth(speaking: boolean): void {
    if (this.mouthAnimationFrame) {
      cancelAnimationFrame(this.mouthAnimationFrame);
      this.mouthAnimationFrame = null;
    }

    if (!this.mouthElement) return;

    if (speaking) {
      this.mouthElement.classList.add('speaking');
    } else {
      this.mouthElement.classList.remove('speaking');
      this.mouthElement.style.transform = '';
    }
  }

  private setEyeIntensity(intensity: number): void {
    const leftGlow = this.eyeLeftElement?.querySelector('.eye-glow') as HTMLElement;
    const rightGlow = this.eyeRightElement?.querySelector('.eye-glow') as HTMLElement;
    if (leftGlow) leftGlow.style.opacity = String(intensity);
    if (rightGlow) rightGlow.style.opacity = String(intensity);
  }

  public onSpeakStart(): void {
    this.setState('speaking');
  }

  public onSpeakEnd(): void {
    this.setState('idle');
  }

  public greet(): void {
    this.setState('greeting');
    setTimeout(() => this.setState('idle'), 2000);
  }

  public destroy(): void {
    if (this.blinkInterval) clearTimeout(this.blinkInterval);
    if (this.idleAnimationInterval) clearInterval(this.idleAnimationInterval);
    if (this.mouthAnimationFrame) cancelAnimationFrame(this.mouthAnimationFrame);
  }
}
