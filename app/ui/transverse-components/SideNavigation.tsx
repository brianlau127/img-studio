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
      {/* 
        THIS IS THE LINE TO MODIFY.
        Add the `sx` prop to the Toolbar to control the height.
        The default is around 64px on desktop. Let's make it taller.
      */}
      <Toolbar sx={{ minHeight: '90px' }}> 
        {/* Logo */}
        {/* You may need to adjust your logo's size to fit the new height */}
        <Image priority src={icon} width={200} alt="ImgStudio" />

        {/* This is a spacer that pushes the navigation links to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Use a horizontal Stack to lay out the navigation buttons */}
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
                <Typography variant="body1" sx={{ textTransform: 'none' }}>
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
