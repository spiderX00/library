import { Directive, HostBinding, Input, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoggerService } from '../services/logger/logger.service';

@Directive({
  selector: '[addClassIfRequired]',
  standalone: true
})
export class AddClassIfRequiredDirective implements OnInit {
  @Input() control!: FormControl<string | null>;

  // Declare logger service
  private loggerService: LoggerService = inject(LoggerService);
  private logger = this.loggerService.getLogger();

  ngOnInit() {
    if (!this.control) {
      this.logger.error('FormControl is required for the nsAddClassIsRequired directive.');
      return;
    }

    if (!(this.control instanceof FormControl)) {
      this.logger.error('Invalid FormControl provided for nsAddClassIsRequired directive.');
      return;
    }
  }

  @HostBinding('class.is-required')
  get isRequired() {
    return this.control?.dirty && this.control.hasError('required');
  }
}
