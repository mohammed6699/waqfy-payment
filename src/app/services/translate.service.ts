import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class LanuageService {
    private languageSubject = new BehaviorSubject<string>('en');
    language$ = this.languageSubject.asObservable();
    private document = inject(DOCUMENT)

    constructor(
        private translate: TranslateService
    ) { 
        const storedLang = localStorage.getItem('language') || 'en';
        this.languageSubject.next(storedLang);
        this.translate.use(storedLang);
        this.changeDirection(storedLang)
    }
    changeLang(lang: string){
        localStorage.setItem('language', lang);
        this.translate.use(lang);
        this.changeDirection(lang)
        this.languageSubject.next(lang)
    }
    private changeDirection(lang: string) {
        const htmlTag = this.document.documentElement;
        htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
        htmlTag.setAttribute('lang', lang);
        if (lang === 'ar') {
            this.document.body.classList.add('rtl-mode');
        }else{
            this.document.body.classList.add('ltr-mode');
        }
    }
}