import React, { useRef } from 'react'

const PreviewFileInput = ({ className, label, img, setImgFile, setPreviewImg, ...input }) => {

  const fileRef = useRef(null)

  const openFile = () => {
    fileRef.current.click()
  }

  const onChangeHandler = () => {
    const file = fileRef.current.files[0]
    if (file) {
      const previewSrc = URL.createObjectURL(file)
      setPreviewImg(previewSrc)
      setImgFile(file)
    }
  }

  const removeFile = () => {
    setPreviewImg('')
    setImgFile(null)
  }

  return (

    <div className={className}>
      <input type="file" ref={fileRef} onChange={onChangeHandler} {...input} />
      <button type='button' onClick={openFile}>{label}</button>
      {img &&
        <div>
          <img src={img} alt="kolobus" />
          <button type='button' onClick={removeFile}>
            <span>&times;</span>
          </button>
        </div>
      }
    </div>

  )
}

export default PreviewFileInput