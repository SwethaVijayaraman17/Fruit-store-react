import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';

const AddNewProject = (props) => {

    const { setAdd, setProjectjson } = props;

    const [initialValues, setInitialValues] = useState({
        project_name: '',
        manager: '',
        team_members: []
    })

    const [addMember, setAddMember] = useState(1);
    const [success, setsuccess] = useState('');

    const validationSchema = Yup.object().shape({
        manager: Yup.string().required('Manager name is required !!'),
        project_name: Yup.string().required('Project Name is required !!'),
        team_members: Yup.array().min(1, 'Please enter atleast one team member !!')
    });

    console.log(initialValues, "val")
    const handleTeamMembers = (idx, setFieldValue, values, value) => {
        const newArr = [...values.team_members]
        newArr[idx] = value;
        setFieldValue('team_members', newArr);
    }

    const handleFomSubmit = (values) => {
        setProjectjson(prev => [...prev, values]);
        setsuccess('Project Added Successfully');
    }

    const displayMemberInput = (errors, touched, handleBlur, setFieldValue, values) => (
        <>
            {Array.from({ length: addMember }, (_, index) => (
                <input onBlur={handleBlur} name={`teamMember${index + 1}`} id={`teamMember${index + 1}`} onChange={(e) => handleTeamMembers(index, setFieldValue, values, e.target.value)} />
            ))}
            <div id='teamMemberErr'>{touched.team_members && errors.team_members ? errors.team_members : ''}</div>
        </>

    );

    const AddMember = () => {
        setAddMember(addMember + 1);
    }

    return (
        <>
            <button id='backBtn' onClick={() => setAdd(false)}>Back</button>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFomSubmit}
            >

                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    handleBlur,
                    touched,
                }) => (
                    <form id='projectForm'>
                        {console.log(errors, values, 'rrr')}
                        <div className='formDiv'>
                            <div>
                                <label>Project Name</label>
                                <div>
                                    <input onBlur={handleBlur} name='project_name' value={values.project_name} onChange={handleChange} />
                                    <div id='projectNameErr'>{touched.project_name && errors.project_name ? errors.project_name : ''}</div>
                                </div>
                            </div>

                            <div>
                                <label>Manager</label>
                                <div>
                                    <input onBlur={handleBlur} name='manager' value={values.manager} onChange={handleChange} />
                                    <div id='managerErr'>{touched.manager && errors.manager ? errors.manager : ''}</div>
                                </div>
                            </div>

                            <div>
                                <label>Team Members</label>
                                <div>
                                    {displayMemberInput(errors, touched, handleBlur, setFieldValue, values)}
                                    <button type="button" id='addMember' onClick={AddMember}>Add member</button>
                                </div>
                            </div>
                        </div>


                        <button type="button" id='createProject' onClick={handleSubmit}>Create Project</button>
                        <h3>{success}</h3>

                    </form>
                )}

            </Formik>
        </>
    )
}

export default AddNewProject;