import { useState } from "react"

export const useImgPreview = (defaultSrc = '') => {
  const [previewImg, setPreviewImg] = useState(defaultSrc)

  const previewImageHandler = (e) => {
    const file = e.target.files[0]
    if (file) {
      const src = URL.createObjectURL(file)
      setPreviewImg(src)
    }
  }

  return { previewImg, previewImageHandler }
}