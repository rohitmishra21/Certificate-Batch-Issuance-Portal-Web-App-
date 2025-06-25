import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Step1ProjectForm = () => {

    const navigate = useNavigate()
    const [formData, setformData] = useState({
        projectName: '',
        description: '',
        issuer: '',
        issueDate: '',
        pdfFile: null
    })

    function handleChange(e) {
        const { name, value, type, files } = e.target;
        setformData({
            ...formData,
            [name]: type === "file" ? files[0] : value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("certificateProject", JSON.stringify(formData));

        navigate('/Step2ZipUpload')
        console.log(formData);
    };

    return (
        <div className='flex justify-center items-center bg-gray-100 h-screen'>
            <form onSubmit={handleSubmit} className='md:w-1/4 bg-white py-8 px-8 rounded-3xl'>
                <h1 className='text-3xl py-3.5 font-semibold'>Create Certificate Project</h1>

                <label>Project Name</label>
                <input
                    className='input-field'
                    type="text"
                    name="projectName"
                    onChange={handleChange}
                    value={formData.projectName}
                    required
                />

                <label>Description</label>
                <input
                    className='input-field'
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                    required
                />

                <label>Issuer</label>
                <input
                    className='input-field'
                    type="text"
                    name="issuer"
                    onChange={handleChange}
                    value={formData.issuer}
                    required
                />

                <label>Issue Date</label>
                <input
                    className='input-field'
                    type="date"
                    name="issueDate"
                    onChange={handleChange}
                    value={formData.issueDate}
                    required
                />

                <label>Upload Sample PDF</label>
                <input
                    className='input-field'
                    type="file"
                    accept="application/pdf"
                    name="pdfFile"
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className='input-field font-semibold bg-blue-500 text-white'
                >
                    Next Step
                </button>
            </form>
        </div>
    );
};

export default Step1ProjectForm;
