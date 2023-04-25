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
        return localStorage.getItem('accessToken');
    }
    static setAccessToken(accessToken) {
        return localStorage.setItem('accessToken', accessToken);
    }
    static setRefreshToken(refreshToken) {
        return localStorage.setItem('refreshToken', refreshToken);
    }
    static getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }
    static removeTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}

export default SessionHelper;
