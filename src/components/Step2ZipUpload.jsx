import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Step2ZipUpload = () => {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a ZIP file.");

        const formData = new FormData();
        formData.append('zipFile', file);

        try {
            const res = await axios.post('http://localhost:3030/api/upload-zip', formData);
            setSummary(res.data);
        } catch (err) {
            console.error("Upload failed:", err);
            const msg = err.response?.data?.error || "Server error";
            alert(`Upload failed: ${msg}`);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-2">Upload Certificate ZIP</h2>
            <label>Upload zip file</label>
            <input className='input-field' type="file" accept=".zip" onChange={handleFileChange} />
            <button
                className="bg-blue-600 text-white mr-3 px-4 py-2 mt-2 rounded"
                onClick={handleUpload}
            >
                Upload
            </button>

            {summary && (
                <div className="mt-4 bg-gray-100 p-4 rounded">
                    <p>Total Records: {summary.totalRecords}</p>
                    <p>Valid: ✅ {summary.valid}</p>
                    <p>Invalid: ❌ {summary.invalid}</p>
                    <p>Estimated Time: ⏱️ {summary.estimateTime}</p>
                    <p>Batch Breakdown: 📦 {summary.batchBreakdown}</p>
                </div>
            )}

            <button
                className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
                onClick={() => navigate('/Step3Result')}
            >
                Next
            </button>
        </div>
    );
};

export default Step2ZipUpload;
