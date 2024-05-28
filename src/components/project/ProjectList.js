import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = () => {
    return (
        <>
            <div className="project-list-container">
                <div className="project-list">
                    <h2>Project List</h2>
                    <div className="search-and-create">
                        <input type="text" placeholder="Search" />
                        <button class="create-button">New Project</button>
                    </div>
                    <div className="project-card">
                        <h3>Project 1</h3>
                        <p>Description of Project 1</p>
                        <div className="project-meta">
                            <span className="date">Due Date: 2023-05-01</span>
                            <span className="actions">
                                <button>Edit</button>
                                <button>Delete</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectList;
