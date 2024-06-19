export const getProfileImageUrl = (profile, url) => {
    return profile && profile !== 'default' ? `${url}/prodImg/${profile}` : `${url}/prodImg/BBang2.png`;
};
