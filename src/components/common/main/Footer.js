import { appVersion } from 'appVersion';
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const actions = [{ icon: <QuestionMarkIcon />, name: '문의하기' }];

const Footer = () => {
    const appversion = appVersion.version;
    return (
        <>
            <Box
                sx={{
                    height: '40px',
                    backgroundColor: '#f9f9f9',
                    fontSize: '15px',
                    color: '#333',
                    marginRight: '5px',
                }}
            >
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            href="/Write"
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                    ))}
                </SpeedDial>
            </Box>
            <footer className="mainFooter">
                <div class="container">
                    <ul>
                        <li>
                            <Link to="#">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="#">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="#">{appversion}</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default Footer;
