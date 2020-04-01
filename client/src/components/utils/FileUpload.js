import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import { storage } from './firebase'
function FileUpload(props) {

    let [Url, setUrl] = useState([])
    useEffect(() => {
        if (props.images) {
            setUrl(props.images)
        }
    }, [props])

    const onDrop = (files) => {
        const file = files[0]
        const fileType = file["type"]
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"]
        if (validImageTypes.includes(fileType)) {
            if (file) {
                const uploadTask = storage.ref(`images/${file.name}`).put(file)
                uploadTask.on(
                    "state_changed",
                    snapshot => {
                    },
                    error => {
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(file.name)
                            .getDownloadURL()
                            .then(url => {
                                props.refreshFunction([...Url, url])
                                setUrl([...Url, url])
                            })
                    }
                )
            }
        } else {
            alert("Error please choose an image to upload")
        }
    }

    const onDelete = (url) => {
        const currentIndex = url.indexOf(url);

        let newUrl = [...Url]
        newUrl.splice(currentIndex, 1)

        setUrl(newUrl)
        props.refreshFunction(newUrl)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
               { Url.map((url, index) => (
                    <div onClick={() => onDelete(url)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={url} alt={`productImg-${index}`} />
                    </div>
                ))}

            </div>

        </div>
    )
}


export default FileUpload