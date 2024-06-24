import React from 'react';
import Avatar from '@mui/material/Avatar';
import { getProfileImageUrl } from '../../util/ProfileImg';
import { globalPath } from 'globalPaths';

// 메인화면 프로필 사진 출력
const AvatarImage = ({ profile, name }) => {
    const url = globalPath.path;
    const imageUrl = getProfileImageUrl(profile, url);

    return <Avatar src={imageUrl} alt={`${name}'s profile`} sx={{ width: 128, height: 128 }} />;
};

export default AvatarImage;
