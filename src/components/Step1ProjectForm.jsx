import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Step1ProjectForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        issuer: '',
        issueDate: '',
        pdfFile: null,
    });

    const [fileURL, setFileURL] = useState(null);
    const [qrPosition, setQRPosition] = useState({ x: null, y: null });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            if (file && file.type === 'application/pdf') {
                setFormData({ ...formData, [name]: file });
                setFileURL(URL.createObjectURL(file));
            } else {
                alert('Please upload a valid PDF file.');
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handlePDFClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        setQRPosition({ x, y });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!qrPosition.x || !qrPosition.y) {
            alert('Please click on the PDF to mark QR code position.');
            return;
        }

        const data = new FormData();
        data.append('projectName', formData.projectName);
        data.append('description', formData.description);
        data.append('issuer', formData.issuer);
        data.append('issueDate', formData.issueDate);
        data.append('pdfFile', formData.pdfFile);

        data.append('qrX', qrPosition.x);
        data.append('qrY', qrPosition.y);
        data.append('qrWidth', 100);
        data.append('qrHeight', 100);
        data.append('nameX', 180);
        data.append('nameY', 750);
        data.append('nameFontSize', 16);

        try {
            const res = await axios.post('http://localhost:3030/api/projects', data);
            alert('Project saved successfully.');
            navigate('/Step2ZipUpload');
        } catch (err) {
            alert('Failed to save project.');
            console.error(err);
        }
    };

    return (
        <div className='flex flex-col items-center bg-gray-100 min-h-screen py-10 px-4'>
            <form
                onSubmit={handleSubmit}
                className='w-full md:w-1/2 bg-white py-8 px-8 rounded-xl shadow-md'
            >
                <h1 className='text-3xl font-bold text-center mb-6'>Create Certificate Project</h1>

                <label>Project Name</label>
                <input type='text' name='projectName' onChange={handleChange} value={formData.projectName} required className='input-field' />

                <label>Description</label>
                <input type='text' name='description' onChange={handleChange} value={formData.description} required className='input-field' />

                <label>Issuer</label>
                <input type='text' name='issuer' onChange={handleChange} value={formData.issuer} required className='input-field' />

                <label>Issue Date</label>
                <input type='date' name='issueDate' onChange={handleChange} value={formData.issueDate} required className='input-field' />

                <label>Upload Sample PDF</label>
                <input type='file' name='pdfFile' accept='application/pdf' onChange={handleChange} required className='input-field' />

                <button type='submit' className='w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700'>Next Step</button>
            </form>

            {fileURL && (
                <div className='mt-8 bg-white p-4 rounded-lg shadow-md text-center'>
                    <h2 className='text-lg font-semibold mb-2'>Click on the PDF to mark QR Code Position</h2>
                    <div onClick={handlePDFClick} className='cursor-crosshair inline-block border shadow'>
                        <Document file={fileURL} onLoadError={(err) => console.error("PDF Error:", err)}>
                            <Page pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} />
                        </Document>
                    </div>
                    {qrPosition.x && qrPosition.y && (
                        <p className='mt-2 text-green-600 font-medium'>QR Position: X = {qrPosition.x}, Y = {qrPosition.y}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Step1ProjectForm;
