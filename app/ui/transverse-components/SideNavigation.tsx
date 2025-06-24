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

'use client'

import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'

// Import the correct components for a Top Bar
import { AppBar, Toolbar, Stack, Typography, Button, Box } from '@mui/material'

import Image from 'next/image'
import icon from '../../../public/cropped-Admazes-logo_white.png'
import { pages } from '../../routes'
import theme from '../../theme'

const { palette } = theme

export default function TopNav() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <AppBar position="sticky" sx={{ background: palette.background.paper }}>
      
      <Toolbar sx={{ minHeight: '150px' }}> 
 
        
        <Image priority src={icon} width={300} alt="ImgStudio" />

        
        <Box sx={{ flexGrow: 1 }} />

     
        <Stack direction="row" spacing={1}>
          {Object.values(pages).map(({ name, href, status }) => (
            <Button
              key={name}
              disabled={status === 'false'}
              onClick={() => router.push(href)}
              sx={{
                // Style for the active link
                bgcolor: pathname === href ? 'rgba(0,0,0,0.5)' : 'transparent',
                color: pathname === href ? 'white' : palette.secondary.light,
                fontWeight: pathname === href ? 500 : 400,
                px: 2,
                py: 1,
                // Add hover effect
                '&:hover': {
                  bgcolor:
                    pathname === href ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.25)',
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1" sx={{ textTransform: 'none',  fontSize: '20px', }}>
                  {name}
                </Typography>
                {status === 'false' && (
                  <Typography
                    variant="caption"
                    sx={{ color: palette.secondary.light }}
                  >
                    / SOON
                  </Typography>
                )}
              </Stack>
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
