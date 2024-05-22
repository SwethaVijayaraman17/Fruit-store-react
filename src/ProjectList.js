import React, { useState } from "react";
import AddNewProject from "./AddNewProject";

const ProjectList = (props) => {
    const { setProjectjson, projectJson } = props;
    const [add, setAdd] = useState(false);
    return (
        <div>
            {!add ?
                <>
                    <div id='projectLayout'>
                        {projectJson.map((project) => (
                            <div className="projectDiv">
                                <h3>{project.project_name}</h3>
                                <p>{project.manager}</p>
                                <ol>
                                    {project.team_members.map((name) => (
                                        <li>{name}</li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </div>
                    <button id='add_project' onClick={() => setAdd(true)}>Add Project</button>
                </>
                : <AddNewProject setAdd={setAdd} setProjectjson={setProjectjson} projectJson={projectJson} />
            }
        </div >
    )
}

export default ProjectList;