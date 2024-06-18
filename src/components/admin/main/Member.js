import axios from 'axios';
import { globalPath } from 'globalPaths';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Member = () => {
    const url = globalPath.path;
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${url}/admin/member/list`);
            setMemberList(response.data.slice(0, 5)); // 최대 5명 출력
        };
        fetchData();
    }, [url]);
    return (
        <>
            <div className="member-list">
                <h3>회원 목록</h3>
                <ItemContainer>
                    {memberList.map((member) => (
                        <Item key={memberList.uid}>
                            <ul>
                                <li>{member.uid}</li>
                                <li>
                                    <small>{member.email}</small>
                                </li>
                                <li>
                                    <small>{member.company}</small>
                                </li>
                                <DateItem>{moment(member.rdate).format('YY-MM-DD')}</DateItem>
                            </ul>
                        </Item>
                    ))}
                </ItemContainer>
            </div>
        </>
    );
};

export default Member;

// Styled Components
const ItemContainer = styled.div`
    display: flex;
    flex-direction: column; /* 항목을 세로로 정렬 */
    gap: 10px; /* 항목 간의 간격 설정 */
    color: #86879d;
`;

const Item = styled.div`
    ul {
        display: flex; /* 가로로 정렬 */
        list-style: none;
        padding: 0;
        gap: 5px; /* li 요소 간의 간격 설정 */
        justify-content: space-between; /* li 요소를 양 끝에 배치 */
    }
    li {
        margin-bottom: 10px;
    }
`;

const DateItem = styled.li`
    margin-left: auto; /* 오른쪽으로 정렬 */
`;
