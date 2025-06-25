import React from 'react'
import Step1ProjectForm from './components/Step1ProjectForm'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Step2ZipUpload from './components/Step2ZipUpload'

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Step1ProjectForm />} />
        <Route path='/Step2ZipUpload' element={<Step2ZipUpload />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App
