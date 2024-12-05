export const handleInput = (event, setter) => {
    const { name, value } = event.target;
    setter((previousUser) => ({ ...previousUser, [name]: value }));
}

export const retrieveUserFromLocalStorage = () => {
    const authStorage = localStorage.getItem('evente-se-auth');
    let initialUser = {}
    if (authStorage) {
        const [user, date] = authStorage.split('|');


        const parsedDate = new Date(date);
        const nowDate = new Date();

        const dateDiff = nowDate.getTime() - parsedDate.getTime();
        const dayInMs = 24 * 60 * 60 * 1000;
        if (dateDiff <= dayInMs) {

            initialUser = JSON.parse(user);
        }
    }

    return initialUser;
}