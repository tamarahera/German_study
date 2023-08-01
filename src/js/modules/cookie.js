const cookie = () => {
    const cookieStorage = { // створ свій об'єкт з методами по типу localStorage
        getItem: (key) => {
            const cookies = document.cookie.split(';')
                .map(item => item.split('='))
                .reduce((acc, [key, value]) => ({
                    ...acc, [key.trim()] : value
                }), {});
            return cookies[key];
        },
        setItem: (key, value) => {
            document.cookie = `${key}=${value};expires=Sun, 17 Jun 2050 06:12:51 GTM`
        }
    }

    const storageType = cookieStorage;
    const consentPropertyType = 'site_consent';
  
    const toggleStorage = (prop) => { // зберігаємо згоду юзера
        storageType.setItem(consentPropertyType, prop);
    }

    const btnCancel = document.querySelector('[data-btn="cookie-reject"]');
    const btnAccept = document.querySelector('[data-btn="cookie-accept"]');

    btnAccept.addEventListener('click', () => {
        toggleStorage(true);
    });

    btnCancel.addEventListener('click', () => {
        toggleStorage(false);
    });

}

export default cookie;

