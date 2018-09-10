import {Injectable} from '@angular/core';
import {CV} from '../models/cv/cv.model';
import {environment} from '../environments/environment';
import {LocalSettings} from '../models/local-settings.model';
import {SectionUnit} from '../enums/section.enum';
import {ProfileFolder} from '../models/profileFolder';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static names = environment.local;

  constructor() {
  }

// USER METHODS
  public static saveUser(data) {
    localStorage.setItem(this.names.profile, JSON.stringify(data));
  }

  public static removeUser() {
    localStorage.removeItem(this.names.profile);
  }

  public static getCurrentUser() {
    const user = localStorage.getItem(this.names.profile);
    return JSON.parse(user) || null;
  }

  public static getUserName() {
    const user = JSON.parse(localStorage.getItem(this.names.profile));
    return user.username || null;
  }

  public static getUserType() {
    const user = JSON.parse(localStorage.getItem(this.names.profile));
    let usertype = user.usertype;
    usertype = usertype.slice(1, usertype.length - 1);
    return usertype;
  }

  public static getUserToken() {
    const user = JSON.parse(localStorage.getItem(this.names.profile));
    if (user && user.token) {
      return user.token;
    }
    return null;
  }

// SETTINGS METHODS
  public static getSettings(): LocalSettings {
    const settings = localStorage.getItem(this.names.settings);
    return JSON.parse(settings) || null;
  }

  public static setCurrentFolder(folder: ProfileFolder) {
    let settings = this.getSettings();
    if (!settings) {
      settings = new LocalSettings();
    }
    settings.profile.currentFolder = JSON.stringify(folder);
    localStorage.setItem(this.names.settings, JSON.stringify(settings));
  }

  public static setMenuSection(section: SectionUnit) {
    let settings = this.getSettings();
    if (!settings) {
      settings = new LocalSettings();
    }
    settings.profile.currentSection = section;
    localStorage.setItem(this.names.settings, JSON.stringify(settings));
  }

  public static getCurrentFolder(): { id: number, name: string } {
    const settings = this.getSettings();
    if (settings && settings.profile && settings.profile.currentFolder) {
      return JSON.parse(settings.profile.currentFolder);
    }
    return null;
  }

  public static getCurrentMenuSection(): number {
    const settings = this.getSettings();
    if (settings && settings.profile && settings.profile.currentSection !== undefined) {
      return settings.profile.currentSection;
    }
    return null;
  }

// CV METHODS
  public static saveCV(cv: CV) {
    const cvStr = JSON.stringify(cv);
    localStorage.setItem(this.names.cv, cvStr);
  }

  public static getCV() {
    const cv = JSON.parse(localStorage.getItem(this.names.cv));
    return cv || null;
  }

  public static getCvTemplate() {
    const template = JSON.parse(localStorage.getItem(this.names.cv));
    return template || null;
  }

// END CV METHODS

}
