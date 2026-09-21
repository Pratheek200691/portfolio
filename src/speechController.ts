
export interface SpeechWordBoundaryEvent {
  wordIndex: number;
  charIndex: number;
  word: string;
}

export type SpeechStateCallback = (speaking: boolean) => void;
export type WordBoundaryCallback = (event: SpeechWordBoundaryEvent) => void;

export class SpeechController {
  private synth: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private enabled: boolean = true;
  private onStateChange: SpeechStateCallback | null = null;
  private onWordBoundary: WordBoundaryCallback | null = null;
  private currentText: string = '';
  private wordsArray: string[] = [];
  private initialized: boolean = false;

  constructor() {
    this.synth = window.speechSynthesis;
    this.initVoices();
  }

  private initVoices(): void {
    const loadVoices = () => {
      const voices = this.synth.getVoices();
      if (voices.length > 0) {
        this.selectedVoice = this.selectMaleEnglishVoice(voices);
        this.initialized = true;
      }
    };

    loadVoices();
    if (!this.initialized) {
      this.synth.addEventListener('voiceschanged', loadVoices, { once: true });
    }
  }

  private selectMaleEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    const englishVoices = voices.filter(v =>
      v.lang.startsWith('en') || v.lang.startsWith('EN')
    );

    
    const deepVoicePriority = [
      'microsoft david desktop',   
      'google uk english male',    
      'daniel',                    
      'gordon',                    
      'bruce',                     
      'fred',                      
      'james',                     
      'george',
      'paul',
      'mark',
      'richard',
      'michael',
      'nathan',
      'ryan',
      'eric',
    ];
    for (const keyword of deepVoicePriority) {
      const voice = englishVoices.find(v => v.name.toLowerCase().includes(keyword));
      if (voice) return voice;
    }

    
    const maleKeywords = ['male', 'man', 'guy', 'tom', 'alex', 'sam', 'david', 'jack', 'jason', 'kevin'];
    for (const keyword of maleKeywords) {
      const voice = englishVoices.find(v => v.name.toLowerCase().includes(keyword));
      if (voice) return voice;
    }

    
    const femaleKeywords = ['female', 'woman', 'girl', 'samantha', 'victoria', 'kate', 'karen', 'moira', 'tessa', 'fiona', 'veena', 'ava', 'allison', 'susan'];
    const nonFemaleEnglish = englishVoices.find(v =>
      !femaleKeywords.some(k => v.name.toLowerCase().includes(k))
    );
    if (nonFemaleEnglish) return nonFemaleEnglish;

    
    return englishVoices[0] || voices[0] || null;
  }

  public setOnStateChange(cb: SpeechStateCallback): void {
    this.onStateChange = cb;
  }

  public setOnWordBoundary(cb: WordBoundaryCallback): void {
    this.onWordBoundary = cb;
  }

  public speak(text: string): void {
    if (!this.enabled) return;
    this.stop();

    this.currentText = text;
    this.wordsArray = text.trim().split(/\s+/);

    this.utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      this.utterance.voice = this.selectedVoice;
    }
    this.utterance.rate = 1;   
    this.utterance.pitch = 0.7;    
    this.utterance.volume = 1.0;

    let wordIndex = 0;

    this.utterance.onboundary = (event: SpeechSynthesisEvent) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        
        let idx = 0;
        let charCount = 0;
        for (let i = 0; i < this.wordsArray.length; i++) {
          if (charCount >= charIndex) {
            idx = i;
            break;
          }
          charCount += this.wordsArray[i].length + 1;
          idx = i + 1;
        }
        wordIndex = Math.min(idx, this.wordsArray.length - 1);

        if (this.onWordBoundary) {
          this.onWordBoundary({
            wordIndex,
            charIndex,
            word: this.wordsArray[wordIndex] || '',
          });
        }
      }
    };

    this.utterance.onstart = () => {
      if (this.onStateChange) this.onStateChange(true);
    };

    this.utterance.onend = () => {
      if (this.onStateChange) this.onStateChange(false);
      // Reveal all remaining words
      if (this.onWordBoundary && this.wordsArray.length > 0) {
        this.onWordBoundary({
          wordIndex: this.wordsArray.length - 1,
          charIndex: this.currentText.length,
          word: this.wordsArray[this.wordsArray.length - 1] || '',
        });
      }
    };

    this.utterance.onerror = () => {
      if (this.onStateChange) this.onStateChange(false);
    };

    this.synth.speak(this.utterance);
  }

  public stop(): void {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
    if (this.onStateChange) this.onStateChange(false);
  }

  public replay(): void {
    if (this.currentText) {
      this.speak(this.currentText);
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stop();
    }
    return this.enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public isSpeaking(): boolean {
    return this.synth.speaking;
  }

  public isSupported(): boolean {
    return 'speechSynthesis' in window;
  }

    public startTimedWordReveal(text: string, msPerWord: number = 180): () => void {
    const words = text.trim().split(/\s+/);
    let index = 0;
    const interval = setInterval(() => {
      if (index < words.length) {
        if (this.onWordBoundary) {
          this.onWordBoundary({ wordIndex: index, charIndex: 0, word: words[index] });
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, msPerWord);

    return () => clearInterval(interval);
  }
}
