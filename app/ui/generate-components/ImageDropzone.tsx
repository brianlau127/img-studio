// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Box, IconButton } from '@mui/material'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

import theme from '../../theme'
import { fileToBase64 } from '../edit-components/EditForm'
import { Add, AddPhotoAlternate, ControlPointDuplicate } from '@mui/icons-material'
import { getAspectRatio } from '../edit-components/EditImageDropzone'
const { palette } = theme

export default function ImageDropzone(

  {
  setImage,
  image,
  onNewErrorMsg,
  size,
  maxSize,
  object,
  setValue,
  addAdditionalRefObject,
  isNewImagePossible,
}: {
  setImage: (base64Image: string) => void
  image: string | null
  onNewErrorMsg: (msg: string) => void
  size: {
    width: string
    height: string
  }
  maxSize: {
    width: number
    height: number
  }
  object: string
  setValue?: any
  addAdditionalRefObject?: () => void
  isNewImagePossible?: boolean
  refPosition?: number
}) {  
  const onDrop = async (acceptedFiles: File[]) => {
    onNewErrorMsg('') 

    const file = acceptedFiles[0]
    const MAX_FILE_SIZE_KB = 150;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_KB * 1024; 

    
    if (file.size > MAX_FILE_SIZE_BYTES) {
      onNewErrorMsg(`File size exceeds the ${MAX_FILE_SIZE_KB}KB limit. Please upload a smaller file.`);
      return; 
    }
    


    
    const allowedTypes = ['image/png', 'image/webp', 'image/jpeg']
    if (!allowedTypes.includes(file.type)) {
      onNewErrorMsg('Wrong input image format - Only png, jpeg and webp are allowed')
      return
    }

    const base64 = await fileToBase64(file)
    const newImage = `data:${file.type};base64,${base64}`
    setImage(newImage)


    if (setValue) {
      const img = new window.Image()
      img.onload = () => {
        setValue(`${object}.width`, img.width)
        setValue(`${object}.height`, img.height)
        setValue(`${object}.ratio`, getAspectRatio(img.width, img.height))
      }
      img.src = newImage
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      <Box
        id="DropzoneContainer"
        sx={{
          width: size.width,
          maxWidth: maxSize.width,
          height: size.height,
          maxHeight: maxSize.height,
          position: 'relative',
          m: 0,
          p: 0,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {!image && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'gray',
              border: '1px dotted gray',
              '&:hover': {
                border: '1px solid',
                color: palette.primary.main,
                borderColor: palette.primary.main,
                '& .MuiTypography-root': {
                  color: palette.primary.main,
                  fontWeight: 500,
                },
              },
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <AddPhotoAlternate sx={{ ml: 0.5, fontSize: '1.7rem' }} />
          </Box>
        )}
        {image && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'inline-block',
              overflow: 'hidden',
            }}
          >
            <Image
              key={image}
              src={image}
              loading="lazy"
              alt={'temp'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              width={0}
              height={0}
              quality={50}
            />
            {isNewImagePossible && addAdditionalRefObject && (
              <Box
                onClick={addAdditionalRefObject}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                  },
                  cursor: 'pointer',
                }}
              >
                <IconButton
                  onClick={addAdditionalRefObject}
                  disableRipple
                  sx={{
                    color: 'white',
                    border: 0,
                    boxShadow: 0,
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      border: 0,
                      boxShadow: 0,
                    },
                  }}
                >
                  <ControlPointDuplicate sx={{ fontSize: '1.4rem' }} />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}
