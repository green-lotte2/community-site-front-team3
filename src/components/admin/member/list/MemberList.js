import { globalPath } from 'globalPaths';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ArticleList = ({ memberList, setMemberList }) => {
    console.log('멤버 리스트 가져와지니', memberList.length);
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>번호</th>
                        <th>회원</th>
                        <th>가입일</th>
                        <th>요금제</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.map((members) => (
                        <tr key={members.uid}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td></td>
                            <td>
                                {members.name}
                                <br />
                                <small>{members.email}</small>
                            </td>
                            <td>{moment(members.rdate).format('YY-MM-DD')}</td>
                            <td>
                                <span className="status paid">Paid</span>
                            </td>
                            <td>
                                <button className="btn-view">관리</button>
                                <button className="btn-del">정지</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ArticleList;
