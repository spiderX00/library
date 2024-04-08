import { Injectable } from '@angular/core';
import { Logger, ILogObj } from "tslog";

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly DEFAULT_LOGGER_NAME = 'Logger';
  private readonly logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger({ name: this.DEFAULT_LOGGER_NAME });
  }

  public getLogger(name?: string): Logger<ILogObj> {
    this.logger.settings.name = name;
    return this.logger;
  }
}
