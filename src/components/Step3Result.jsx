
import React, { useState } from 'react';
import axios from 'axios';

const Step3Result = () => {
    const [loading, setLoading] = useState(false);
    const [statusList, setStatusList] = useState([]);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3030/api/generate-certificates');
            setStatusList(response.data.statusList || []);
        } catch (err) {
            console.error('Generation failed:', err);
            alert('Failed to generate certificates.');
        } finally {
            setLoading(false);
        }
    };

    const downloadSingleCertificate = async (name) => {
        try {
            const filename = `${name.replace(/ /g, '_')}.pdf`;
            const response = await axios.get(`http://localhost:3030/api/certificate/${filename}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('Download failed:', err);
            alert(`Failed to download certificate for ${name}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Step 3: Generate Certificates</h2>

                <button
                    onClick={handleGenerate}
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition mb-4 mx-auto"
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Certificates'}
                </button>

                {Array.isArray(statusList) && statusList.length > 0 && (
                    <table className="w-full border text-sm mb-4">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">Student Name</th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statusList.map((item, index) => (
                                <tr key={index}>
                                    <td
                                        className={`border px-4 py-2 ${item.status === 'Generated'
                                            ? 'cursor-pointer underline text-blue-600 hover:text-blue-800'
                                            : 'text-gray-400 cursor-not-allowed'
                                            }`}
                                        onClick={() => {
                                            if (item.status !== 'Generated') return;
                                            downloadSingleCertificate(item.name);
                                        }}
                                    >
                                        {item.name}
                                    </td>
                                    <td
                                        className={`border px-4 py-2 ${item.status === 'Generated'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                            }`}
                                    >
                                        {item.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Step3Result;
