import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Recents() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <h3 className="main-h3-title">
                <AccessAlarmsIcon />
                최근 방문
            </h3>
            <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
                <CardContent>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ bgcolor: red[500] }} variant="h9">
                            제목
                        </Typography>
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    </div>

                    <Typography variant="body2" color="textSecondary">
                        September 14, 2016
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

/**
 *             <div className="updatess">
                <h2>최근 업데이트</h2>
                <div className="updates">
                    <div className="update">
                        <img src={`${path}/uploads/logo192.png`} alt="Feature Icon" style={{ width: '70px' }} />
                        <h3>새로운 기능 출시</h3>
                        <p>최신 업데이트를 확인하세요</p>

                        <p className="time">5일 전</p>
                    </div>
                    <div className="update">
                        <img src="/images/icon/notification.png" alt="Feature Icon" style={{ width: '70px' }} />
                        <h3>다가오는 행사</h3>
                        <p>커뮤니티 모임 날짜를 저장하세요</p>
                        <p className="time">2주 후</p>
                    </div>
                    <div className="update">
                        <img src="/images/icon/notification.png" alt="Feature Icon" style={{ width: '70px' }} />
                        <h3>중요 공지</h3>
                        <p>중요한 소식을 확인 하세요</p>
                        <p className="time">방금 전</p>
                    </div>
                </div>
            </div>

                        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                <ExpandMoreIcon />
            </ExpandMore>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add
                    1 cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                </CardContent>
            </Collapse>
 */
