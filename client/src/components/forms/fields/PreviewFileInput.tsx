import { FC, Dispatch, SetStateAction, useRef, FocusEventHandler } from 'react'
import { convertAlt } from '../../../utils/converter'

interface Props {
  className: string
  label: string
  previewImg: string
  setPreviewImg: Dispatch<SetStateAction<string>>
  setImgFile: Dispatch<SetStateAction<File | null>>
  accept?: string
  onFocus?: () => void
}

const PreviewFileInput: FC<Props> = ({
  className,
  label,
  previewImg,
  setImgFile,
  setPreviewImg,
  accept,
  onFocus: onFocusCallback
}) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const openFile = () => {
    fileRef.current?.click()
  }

  const removeFile = () => {
    setPreviewImg('')
    setImgFile(null)
  }

  const onChangeHandler = () => {
    const file = fileRef.current?.files?.[0]

    if (file) {
      const previewSrc = URL.createObjectURL(file)
      setPreviewImg(previewSrc)
      setImgFile(file)
    }
  }

  const onFocusHandler: FocusEventHandler = () => {
    if (onFocusCallback) {
      onFocusCallback()
    }
  }

  return (
    <div className={className}>
      <input
        ref={fileRef}
        type='file'
        accept={accept}
        onChange={onChangeHandler}
      />
      <button type='button' onClick={openFile} onFocus={onFocusHandler}>
        {label}
      </button>
      {previewImg && (
        <div>
          <img src={previewImg} alt={convertAlt(previewImg)} />
          <button type='button' onClick={removeFile}>
            <span>&times;</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default PreviewFileInput
