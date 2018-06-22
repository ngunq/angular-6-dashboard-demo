import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'dns';

@Injectable()
export class AppConfig {
  private configFileUrl = 'assets/data/config.json';
  public config: Object = null;
  constructor(private http: HttpClient) { }

  public getConfig(key: string) {
    return this.config[key];
  }

  public load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.configFileUrl).subscribe(response => {
        this.config = response;
        resolve(true);
      });
    });
  }
}
