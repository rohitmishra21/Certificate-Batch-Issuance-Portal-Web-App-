# 🎓 Certificate Processing App

This project is a 3-step web application designed to help institutions manage and verify student certificates efficiently.

## 📌 Project Overview

The app lets you:

1. **Enter Certificate Details** (Step 1)
2. **Upload a ZIP of Certificates + Excel Sheet** (Step 2)
3. **View Summary of Valid/Invalid Certificates** (Step 3)

It's a simple, clear workflow for batch certificate processing.

---

## 🚀 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express
- **Libraries**: axios, multer, jszip, xlsx, react-router-dom

---

## 📂 Project Structure

client/
└── src/
└── components/
├── Step1ProjectForm.jsx
├── Step2ZipUpload.jsx
└── Step3Result.jsx

server/
├── Routes/
│ └── Step1Route.js
│ └── Step2Route.js
└── results/
└── result.json

yaml
Copy
Edit


---

## 🧭 Step-by-Step Instructions

### Step 1: Add Certificate Details

- Go to the first form page.
- Fill in fields like:
  - Project Name
  - Description
  - Issuer
  - Issue Date
  - PDF file
- Submit the form → Data will be stored (or passed to the next step).

### Step 2: Upload ZIP File

- Upload a `.zip` file containing:
  - One Excel file with student data
  - Multiple PDF certificate files
- The backend extracts the data, matches PDFs with Excel entries, and generates a result summary.

### Step 3: View Final Result

- Summary will show:
  - ✅ Valid matches
  - ❌ Invalid ones
  - 📦 Batch breakdown
  - ⏱️ Estimated time to process

---

## ⚙️ How to Run the App

### 1. Clone the Repo

```bash
git clone https://github.com/rohitmishra-27/certificate-app.git
cd certificate-app
