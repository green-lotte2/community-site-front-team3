import { useEffect, useState } from 'react';
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

const path = globalPath.path;

function App() {
    const [data, setData] = useState(
        localStorage.getItem('orangenode') ? JSON.parse(localStorage.getItem('orangenode')) : []
    );

    const defaultDark = window.matchMedia('(prefers-colors-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    const switchTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const setName = (title, bid) => {
        const index = data.findIndex((item) => item.id === bid);
        const tempData = [...data];
        tempData[index].boardName = title;
        setData(tempData);
    };

    const dragCardInBoard = (source, destination) => {
        let tempData = [...data];
        const destinationBoardIdx = tempData.findIndex((item) => item.id.toString() === destination.droppableId);
        const sourceBoardIdx = tempData.findIndex((item) => item.id.toString() === source.droppableId);
        tempData[destinationBoardIdx].card.splice(destination.index, 0, tempData[sourceBoardIdx].card[source.index]);
        tempData[sourceBoardIdx].card.splice(source.index, 1);

        return tempData;
    };
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

    const removeCard = (boardId, cardId) => {
        const index = data.findIndex((item) => item.id === boardId);
        const tempData = [...data];
        const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

        tempData[index].card.splice(cardIndex, 1);
        setData(tempData);
    };

    const addBoard = (title) => {
        const tempData = [...data];
        tempData.push({
            id: uuidv4(),
            boardName: title,
            card: [],
        });
        setData(tempData);
    };

    const removeBoard = (bid) => {
        const tempData = [...data];
        const index = data.findIndex((item) => item.id === bid);
        tempData.splice(index, 1);
        setData(tempData);
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) return;

        setData(dragCardInBoard(source, destination));
    };

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

    /** localStorage 저장 후 서버에 넘기기 
    useEffect(() => {
        localStorage.setItem('orangenode', JSON.stringify(data));
        console.log('data ## : ', data);

        const response = axios.post(`${path}/addissue`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }, [data]);*/

    return (
        <DefaultLayout>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="project-container" data-theme={theme}>
                    <Navbar switchTheme={switchTheme} />
                    <div className="app_outer">
                        <div className="app_boards">
                            {data.map((item) => (
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
