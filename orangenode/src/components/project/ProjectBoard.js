import React from 'react';
import { Link } from 'react-router-dom';

const ProjectBoard = () => {
    return (
        <>
            <div class="container">
                <h2>Project Board</h2>
                <div class="tabs">
                    <Link to="#" class="active">
                        Overview
                    </Link>
                    <Link to="#">Board View</Link>
                </div>
                <div class="board">
                    <div class="column">
                        <h3>ToDo</h3>
                        <div class="task-card">
                            <h4>Title</h4>
                            <p>Description</p>
                            <div class="task-meta">
                                <span class="category">Category</span>
                                <span class="due-date">Due Date</span>
                            </div>
                        </div>
                        <div class="task-card">
                            <h4>Title</h4>
                            <p>Description</p>
                            <div class="task-meta">
                                <span class="category">Category</span>
                                <span class="due-date">Due Date</span>
                            </div>
                        </div>
                        <div class="new-task">+ New Task</div>
                    </div>
                    <div class="column">
                        <h3>In Progress</h3>
                        <div class="task-card">
                            <h4>Title</h4>
                            <p>Description</p>
                            <div class="task-meta">
                                <span class="category">Category</span>
                                <span class="due-date">Due Date</span>
                            </div>
                        </div>
                        <div class="task-card">
                            <h4>Title</h4>
                            <p>Description</p>
                            <div class="task-meta">
                                <span class="category">Category</span>
                                <span class="due-date">Due Date</span>
                            </div>
                        </div>
                        <div class="new-task">+ New Task</div>
                    </div>
                    <div class="column">
                        <h3>Completed</h3>
                        <div class="task-card">
                            <h4>Title</h4>
                            <p>Description</p>
                            <div class="task-meta">
                                <span class="category">Category</span>
                                <span class="due-date">Due Date</span>
                            </div>
                        </div>
                        <div class="task-card">
                            <h4>Title</h4>
                            <p>Description</p>
                            <div class="task-meta">
                                <span class="category">Category</span>
                                <span class="due-date">Due Date</span>
                            </div>
                        </div>
                        <div class="new-task">+ New Task</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectBoard;
