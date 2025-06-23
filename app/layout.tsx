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

// ./app/layout.tsx

import * as React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { ContextProvider } from './context/app-context'
import './globals.css'

// --- Step 1: Import Box and your new TopNav component ---
import { Box } from '@mui/material'
import TopNav from './ui/transverse-components/SideNavigation' // Adjust this path if your component is elsewhere

export const metadata = {
  title: 'ImgStudio',
  description: 'Interface to generate & edit images using Google model Imagen',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body>
        <ContextProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline resets browser styles, keep it here */}
              <CssBaseline />

              {/* --- Step 2: Create the main layout container --- */}
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                
                {/* --- Step 3: Place your TopNav component here --- */}
                <TopNav />

                {/* --- Step 4: Create the main content area that will grow to fill space --- */}
                <Box
                  component="main" // Use a <main> tag for semantic HTML
                  sx={{
                    flexGrow: 1, // This makes the main content area expand
                    p: 3,        // Adds some padding around your page content
                  }}
                >
                  {/* Your page content will be rendered here */}
                  {props.children}
                </Box>
              </Box>

            </ThemeProvider>
          </AppRouterCacheProvider>
        </ContextProvider>
      </body>
    </html>
  )
}
