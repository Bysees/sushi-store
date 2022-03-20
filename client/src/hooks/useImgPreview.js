import { useState } from "react"

export const useImgPreview = (defaultSrc) => {
  const [src, setSrc] = useState(defaultSrc)

  const previewImageHandler = (e) => {
    const file = e.target.files[0]
    if (file) {
      const previewSrc = URL.createObjectURL(file)
      setSrc(previewSrc)
    }
  }

  return { src, setSrc, previewImageHandler }
}