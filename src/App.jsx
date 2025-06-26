import React from 'react'
import Step1ProjectForm from './components/Step1ProjectForm'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Step2ZipUpload from './components/Step2ZipUpload'
import Step3Result from './components/Step3Result'

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Step1ProjectForm />} />
        <Route path='/Step2ZipUpload' element={<Step2ZipUpload />} />
        <Route path='/Step3Result' element={<Step3Result />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App
