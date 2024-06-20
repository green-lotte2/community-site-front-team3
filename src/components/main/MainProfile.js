import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import MainAvatar from './MainAvatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MainMember from './MainMember';
import { globalPath } from 'globalPaths';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ profile, name }) {
    const [expanded, setExpanded] = React.useState(false);
    const url = globalPath.path; // url 설정
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <h4 className="main-h3-title">
                <AccountBoxIcon />
                프로필 보기
            </h4>
            <Card className="main-profile">
                <CardHeader
                    avatar={<MainAvatar profile={profile} name={name} />}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={<MainMember profile={profile} url={url} />}
                />
            </Card>
        </>
    );
}
