import {InputButton} from "@/components/customs/input/InputButton";


interface Props {
    onDownload?: Function
    onUpload?: Function
}

export const InputUploadFile = (props: Props) => {
    const { onDownload, onUpload } = props

    // ** Handle function
    const uploadFile = () => {
        if(onUpload) onUpload()
    }

    const downloadFile = () => {
        if(onDownload) onDownload()
    }

    return (
        <>
            <div className='right-upload-down-button'>
                <InputButton onClick={downloadFile}
                             title='Template' icon={} className='css-bg-color'/>
                <InputButton type='upload' title='Browse'
                             icon={} onClick={uploadFile} className='css-bg-color'/>
            </div>
        </>
    )
}