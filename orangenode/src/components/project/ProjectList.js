import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = () => {
    return (
        <>
            <div class="container">
                <h2>Project List</h2>
                <div class="tabs">
                    <Link to="#" class="active">
                        Documents
                    </Link>
                    <Link to="#">Team</Link>
                    <Link to="#">Reports</Link>
                    <Link to="#">Actions</Link>
                </div>
                <div class="search-and-create">
                    <input type="text" placeholder="Search" />
                    <button class="create-button">New Project</button>
                </div>
                <div class="project-card">
                    <h3>Project 1</h3>
                    <p>Description of Project 1</p>
                    <div class="project-meta">
                        <span class="date">Due Date: 2023-05-01</span>
                        <span class="actions">
                            <button>Edit</button>
                            <button>Delete</button>
                        </span>
                    </div>
                </div>
                <div class="project-card">
                    <h3>Project 2</h3>
                    <p>Description of Project 2</p>
                    <div class="project-meta">
                        <span class="date">Due Date: 2023-06-01</span>
                        <span class="actions">
                            <button>Edit</button>
                            <button>Delete</button>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectList;
