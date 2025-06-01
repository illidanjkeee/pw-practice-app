import { Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeStorageService {
  private readonly THEME_STORAGE_KEY = 'selectedTheme';

  constructor(private themeService: NbThemeService) {
    // Initialize theme from storage on app startup
    this.loadSavedTheme();

    // Subscribe to theme changes to save them
    this.themeService.onThemeChange().subscribe(({ name }) => {
      this.saveTheme(name);
    });
  }

  /**
   * Loads the saved theme from localStorage and applies it
   */
  loadSavedTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
    if (savedTheme && this.themeService.currentTheme !== savedTheme) {
      this.themeService.changeTheme(savedTheme);
    }
  }

  /**
   * Saves the current theme to localStorage
   * @param themeName The name of the theme to save
   */
  saveTheme(themeName: string): void {
    localStorage.setItem(this.THEME_STORAGE_KEY, themeName);
  }

  /**
   * Clears the saved theme from localStorage
   */
  clearSavedTheme(): void {
    localStorage.removeItem(this.THEME_STORAGE_KEY);
  }
}
