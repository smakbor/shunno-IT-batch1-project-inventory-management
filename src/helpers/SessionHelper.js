class SessionHelper {
    static setLayout(layout) {
        return localStorage.setItem('layout', JSON.stringify(layout));
    }
    static getLayout() {
        return JSON.parse(localStorage.getItem('layout'));
    }

    static initLayout(layout) {
        return localStorage.setItem('layout', JSON.stringify(layout));
    }

    static getLanguage() {
        return localStorage.getItem('i18nextLng');
    }
    static setLanguage(language) {
        return localStorage.setItem('i18nextLng', language);
    }
    static getAccessToken() {
        return localStorage.getItem('hnfeAccessToken');
    }
    static setAccessToken(accessToken) {
        if (!accessToken) return undefined;
        return localStorage.setItem('hnfeAccessToken', accessToken);
    }
    static removeTokens() {
        localStorage.removeItem('hnfeAccessToken');
    }
    static getActiveStore() {
        return JSON.parse(localStorage.getItem('activeStore'));
    }
    static removeActiveStore() {
        localStorage.removeItem('activeStore');
    }
}

export default SessionHelper;
