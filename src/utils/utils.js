export const handleInput = (event, setter) => {
    const { name, value } = event.target;
    setter((previousUser) => ({ ...previousUser, [name]: value }));
}