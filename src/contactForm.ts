
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from './data/config';

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof FormData, string>>;
}

export class ContactForm {
  private form: HTMLFormElement;
  private submitBtn: HTMLButtonElement;
  private statusEl: HTMLElement;
  private isSubmitting: boolean = false;
  private initialized: boolean = false;

  constructor(formSelector: string) {
    const form = document.querySelector(formSelector);
    if (!form) throw new Error(`ContactForm: form "${formSelector}" not found`);
    this.form = form as HTMLFormElement;
    this.submitBtn = this.form.querySelector('[type="submit"]') as HTMLButtonElement;
    this.statusEl = this.form.querySelector('.form-status') as HTMLElement;

    this.init();
  }

  private init(): void {
    
    if (EMAIL_CONFIG.PUBLIC_KEY && EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      emailjs.init({ publicKey: EMAIL_CONFIG.PUBLIC_KEY });
      this.initialized = true;
    }

    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input as HTMLInputElement));
      input.addEventListener('input', () => this.clearFieldError(input as HTMLInputElement));
    });
  }

  private validateField(field: HTMLInputElement | HTMLTextAreaElement): boolean {
    const name = field.name as keyof FormData;
    const value = field.value.trim();
    let error = '';

    switch (name) {
      case 'name':
        if (!value) error = 'Name is required';
        else if (value.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Enter a valid email address';
        break;
      case 'message':
        if (!value) error = 'Message is required';
        else if (value.length < 10) error = 'Message must be at least 10 characters';
        break;
    }

    this.showFieldError(field, error);
    return !error;
  }

  private showFieldError(field: HTMLInputElement | HTMLTextAreaElement, error: string): void {
    const group = field.closest('.form-group');
    if (!group) return;
    const errorEl = group.querySelector('.field-error');
    if (errorEl) errorEl.textContent = error;
    field.classList.toggle('field--error', !!error);
  }

  private clearFieldError(field: HTMLInputElement | HTMLTextAreaElement): void {
    const group = field.closest('.form-group');
    if (!group) return;
    const errorEl = group.querySelector('.field-error');
    if (errorEl) errorEl.textContent = '';
    field.classList.remove('field--error');
  }

  private validate(): ValidationResult {
    const fields = Array.from(this.form.querySelectorAll('input, textarea')) as (HTMLInputElement | HTMLTextAreaElement)[];
    let allValid = true;
    const errors: ValidationResult['errors'] = {};

    fields.forEach(field => {
      const valid = this.validateField(field);
      if (!valid) {
        allValid = false;
        errors[field.name as keyof FormData] = 'Invalid';
      }
    });

    return { valid: allValid, errors };
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    if (this.isSubmitting) return;

    const result = this.validate();
    if (!result.valid) return;

    this.setLoadingState(true);

    const formData = new FormData(this.form);
    const data: FormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      if (!this.initialized) {
        
        throw new Error('EmailJS not configured. Please update src/data/config.ts with your EmailJS credentials.');
      }

      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_name: 'Pratheek D Jain',
          to_email: EMAIL_CONFIG.TO_EMAIL,
        }
      );

      this.showStatus('success', 'MESSAGE TRANSMITTED SUCCESSFULLY');
      this.form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      const isConfigError = err instanceof Error && err.message.includes('not configured');
      const message = isConfigError
        ? 'CONTACT FORM NOT CONFIGURED — See src/data/config.ts'
        : 'TRANSMISSION FAILED — PLEASE TRY AGAIN';
      this.showStatus('error', message);
    } finally {
      this.setLoadingState(false);
    }
  }

  private setLoadingState(loading: boolean): void {
    this.isSubmitting = loading;
    this.submitBtn.disabled = loading;
    this.submitBtn.classList.toggle('btn--loading', loading);
    const btnText = this.submitBtn.querySelector('.btn-text');
    if (btnText) {
      btnText.textContent = loading ? 'TRANSMITTING...' : 'SEND MESSAGE';
    }
  }

  private showStatus(type: 'success' | 'error', message: string): void {
    if (!this.statusEl) return;
    this.statusEl.textContent = message;
    this.statusEl.className = `form-status form-status--${type}`;
    this.statusEl.style.opacity = '1';

    setTimeout(() => {
      this.statusEl.style.opacity = '0';
      setTimeout(() => {
        this.statusEl.className = 'form-status';
        this.statusEl.textContent = '';
      }, 500);
    }, 5000);
  }
}
