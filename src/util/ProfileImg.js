export const getProfileImageUrl = (profile, url) => {
    return profile && profile !== 'default' ? `${url}/prodImg/${profile}` : `/images/nonProfileImg.png`;
};
