import { useEffect, useState } from 'react';
import { PROJECT_KANBAN_PATH } from 'requestPath';
import { useSelector } from 'react-redux';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from 'use-local-storage';
import Navbar from '../../components/project/Navbar';
import Board from '../../components/project/Board';
import Editable from '../../components/project/Editable';
import DefaultLayout from 'layouts/DefaultLayout';
import axios from 'axios';
import { globalPath } from 'globalPaths';
import { useLocation, useParams } from 'react-router-dom';
const path = globalPath.path;

function App() {
    //const { proNo } = useParams();
    const authSlice = useSelector((state) => state.authSlice);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const proNo = queryParams.get('proNo');

    // data에 localStorage에 담긴 값 담아주기
    const [data, setData] = useState(
        localStorage.getItem('orangenode') ? JSON.parse(localStorage.getItem('orangenode')) : []
    );
    // 다크 화면 전환
    const defaultDark = window.matchMedia('(prefers-colors-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    const switchTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    // 보드 이름 업데이트
    const setName = (title, bid) => {
        const index = data.findIndex((item) => item.id === bid);
        const tempData = [...data];
        tempData[index].boardName = title;
        setData(tempData);
    };
    // 다른 보드로 카드 이동
    const dragCardInBoard = (source, destination) => {
        let tempData = [...data];
        const destinationBoardIdx = tempData.findIndex((item) => item.id.toString() === destination.droppableId);
        const sourceBoardIdx = tempData.findIndex((item) => item.id.toString() === source.droppableId);
        tempData[destinationBoardIdx].card.splice(destination.index, 0, tempData[sourceBoardIdx].card[source.index]);
        tempData[sourceBoardIdx].card.splice(source.index, 1);

        return tempData;
    };
    // 같은 보드에서 카드 이동
    const dragCardInSameBoard = (source, destination) => {
        let tempData = [...data];
        const boardIdx = tempData.findIndex((item) => item.id.toString() === source.droppableId);
        const [movedCard] = tempData[boardIdx].card.splice(source.index, 1);
        tempData[boardIdx].card.splice(destination.index, 0, movedCard);
        return tempData;
    };
    // 카드 추가
    const addCard = (title, bid) => {
        const index = data.findIndex((item) => item.id === bid);
        const tempData = [...data];
        tempData[index].card.push({
            id: uuidv4(),
            title: title,
            tags: [],
            task: [],
        });
        setData(tempData);
    };
    // 카드 삭제
    const removeCard = (boardId, cardId) => {
        const index = data.findIndex((item) => item.id === boardId);
        const tempData = [...data];
        const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

        tempData[index].card.splice(cardIndex, 1);
        setData(tempData);
    };
    // 보드 생성
    const addBoard = (title) => {
        const tempData = [...data];
        tempData.push({
            id: uuidv4(),
            boardName: title,
            card: [],
        });
        setData(tempData);
    };
    // 보드 삭제
    const removeBoard = (bid) => {
        const tempData = [...data];
        const index = data.findIndex((item) => item.id === bid);
        tempData.splice(index, 1);
        setData(tempData);
    };
    // 카드를 이동 시켰을 때 이동한 카드의 데이터 업데이트
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            setData(dragCardInSameBoard(source, destination));
        } else {
            setData(dragCardInBoard(source, destination));
        }
    };
    // 카드 수정
    const updateCard = (bid, cid, card) => {
        const index = data.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...data];
        const cards = tempBoards[index].card;

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        tempBoards[index].card[cardIndex] = card;
        console.log(tempBoards);
        setData(tempBoards);
    };

    // proNo값이 렌더링 될 때 마다 데이터 조회
    useEffect(() => {
        if (proNo) {
            selectKanbanList();
        }
    }, [proNo]);

    // 화면 이동을 할 때 데이터 저장
    useEffect(() => {
        // 사용자가 페이지를 떠나려고 할 때 실행
        const handleBeforeUnload = (event) => {
            saveHandler();
            event.preventDefault();
        };
        // 사용자가 페이지를 떠날 때 handleBeforeUnload 함수 실행(데이터 저장)
        window.addEventListener('beforeunload', handleBeforeUnload);
        localStorage.removeItem('orangenode');
        // 컴포넌트가 언마운트 될 때 beforeunload 이벤트 리스너 제거 및 데이터 저장
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            saveHandler();
            localStorage.removeItem('orangenode');
        };
    }, [data]);

    // 칸반리스트 출력
    const selectKanbanList = async () => {
        try {
            console.log('proNo:', proNo);
            const response = await axios.get(`${PROJECT_KANBAN_PATH}?proNo=${proNo}`, { withCredentials: true });
            if (response.data) {
                console.log('response.data:', response.data);
                if (response.data.length === 0) {
                    localStorage.removeItem('orangenode');
                    setData([]);
                } else {
                    localStorage.setItem('orangenode', JSON.stringify(response.data));
                    setData(response.data);
                }
            } else {
                console.log('No data received');
                setData([]);
            }
        } catch (error) {
            console.error('Error fetching kanban list:', error);
        }
    };

    // 칸반보드 데이터 저장
    const saveHandler = async () => {
        localStorage.setItem('orangenode', JSON.stringify(data));
        try {
            const response = await axios.post(
                `${path}/kanban/create`,
                {
                    proNo: proNo,
                    content: JSON.stringify(data),
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('response.data :', response.data);
        } catch (error) {
            console.error('post 에러:', error);
        }
    };

    return (
        <DefaultLayout>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="project-container" data-theme={theme}>
                    <Navbar switchTheme={switchTheme} />
                    <div className="app_outer">
                        <div className="app_boards">
                            {Array.isArray(data) &&
                                data.map((item) => (
                                    <Board
                                        key={item.id}
                                        id={item.id}
                                        name={item.boardName}
                                        card={item.card}
                                        setName={setName}
                                        addCard={addCard}
                                        removeCard={removeCard}
                                        removeBoard={removeBoard}
                                        updateCard={updateCard}
                                    />
                                ))}
                            <Editable
                                class={'add__board'}
                                name={'Add Board'}
                                btnName={'Add Board'}
                                onSubmit={addBoard}
                                placeholder={'Enter Board  Title'}
                            />
                        </div>
                    </div>
                </div>
            </DragDropContext>
        </DefaultLayout>
    );
}
export default App;
