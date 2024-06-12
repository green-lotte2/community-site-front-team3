import React from 'react';
import moment from 'moment';

const MemberList = ({ memberList }) => {
    return (
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
                {memberList.map((members, index) => (
                    <tr key={members.uid}>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td className="no">{index + 1}</td>
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
    );
};

export default MemberList;
